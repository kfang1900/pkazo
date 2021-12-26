import DimmedOverlay from "components/common/DimmedOverlay";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Field, Form, Formik, } from "formik";
import { Artwork } from "obj/work";
import React from "react"; 
import styles from 'styles/forms/AboutYouForm.module.scss';
import { WorkCreator } from "./WorkCreator";

interface PortfolioCreateProps {
    initialPortfolioName: string
}

interface PortfolioCreateState {
    submitPortfolio: (values: PortfolioProps) => Promise<void>;
    works: Artwork[],
    currentWork: Artwork,
    createWorkEnabled: boolean,
    portfolioURL: string,
    showWorkCreate: boolean,
}

interface PortfolioProps {
    title: string,
    medium: string,
    subject: string,
    style: string
}


export class PortfoiloCreate extends React.Component<PortfolioCreateProps, PortfolioCreateState> {

    constructor(props: PortfolioCreateProps, state: PortfolioCreateState){
        super(props, state);
        let db = getFirestore();
        let user = getAuth().currentUser;
        let submitPortfolio = (values: PortfolioProps) => {
            this.setState((oldState) => {
                let newState = {...oldState, 
                    portfolioURL: 'users/' + user!.uid + "/portfolios/" + values.title,
                    createWorkEnabled: true};
                return newState;
              });            
              return setDoc(doc(db, 'users/' + user!.uid + "/portfolios/" + values.title), values)
          }
        this.state = {
            portfolioURL: "",
            showWorkCreate: false,
            submitPortfolio: submitPortfolio,
            works: [],
            createWorkEnabled: false,
            currentWork: new Artwork("Dummy"),
        }

    }

    toggleWorkCreateModal() {
        this.setState((oldState) => {
            let newState = {...oldState, 
                showWorkCreate: !oldState.showWorkCreate
                };
            return newState;
          });            
    }
    

    render() {
        return <>
        <Formik
        onSubmit={this.state.submitPortfolio}
        initialValues={{
            title: this.props.initialPortfolioName,
            medium: '',
            subject: '',
            style: ''
        }}
        >
            <Form>
                <div>
                    <label className={styles["label"]}>
                        Portfolio Title
                    </label>
                    <Field name="title" className={styles["textInput"]} />
                </div>
                <div>
                    <label className={styles["label"]}>
                        Medium
                    </label>
                    <Field name="medium" className={styles["textInput"]} />
                </div>
                <div>
                    <label className={styles["label"]}>
                        Subject
                    </label>
                    <Field name="subject" className={styles["textInput"]} />
                </div>
                <div>
                    <label className={styles["label"]}>
                        Style
                    </label>
                    <Field name="style" className={styles["textInput"]} />
                </div>
                <button className={styles["submitButton"]} type="submit">
                    Submit
                </button>
            </Form>
        </Formik>
        <ul children={this.state.works.map<JSX.Element>((work) => work.display())}/>
        <button children={"New Work"} onClick={this.toggleWorkCreateModal} disabled={this.state.createWorkEnabled}/>
        {this.state.showWorkCreate && <DimmedOverlay children={<WorkCreator work={this.state.currentWork} portfolioUrl={this.state.portfolioURL} />}/>}
            </>
    }
}