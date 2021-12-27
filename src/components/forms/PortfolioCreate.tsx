import DimmedOverlay from "components/common/DimmedOverlay";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Field, Form, Formik, } from "formik";
import { Artwork } from "obj/work";
import React from "react"; 
import styles from 'styles/forms/AboutYouForm.module.scss';
import { WorkCreateModal} from "./WorkCreator";

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
    portfolioProps: PortfolioProps,
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
                    portfolioProps: values,
                    portfolioURL: 'users/' + user!.uid + "/portfolios/" + values.title,
                    createWorkEnabled: true};
                return newState;
              });            
              return setDoc(doc(db, 'users/' + user!.uid + "/portfolios/" + values.title), values)
          }
        this.state = {
            portfolioProps: {
                title: props.initialPortfolioName,
                medium: "",
                subject: "",
                style: ""
            },
            portfolioURL: "",
            showWorkCreate: false,
            submitPortfolio: submitPortfolio,
            works: [],
            createWorkEnabled: false,
            currentWork: new Artwork("Dummy"),
        }

    }

    enableWorkCreateModal = () => {
        this.setState((oldState) => {
            let newState = {...oldState, 
                currentWork: new Artwork("New " + this.state.portfolioProps.title + " work"),
                showWorkCreate: true
                };
            return newState;
          });            
    }

    disableWorkCreateModal = () => {
        this.setState((oldState) => {
            let newState = {...oldState, 
                showWorkCreate: false
                };
            return newState;
          });    
    }
    

    render() {
        return <>
        <Formik
        onSubmit={this.state.submitPortfolio}
        initialValues={this.state.portfolioProps}
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
        <button children={"New Work"} onClick={this.enableWorkCreateModal} disabled={!this.state.createWorkEnabled}/>
        {this.state.showWorkCreate && <DimmedOverlay children={<WorkCreateModal closeModal={this.disableWorkCreateModal} portfolioURL={this.state.portfolioURL} work={this.state.currentWork}/>}/>}
            </>
    }
}