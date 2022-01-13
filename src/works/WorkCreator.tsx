import DimmedOverlay from "components/common/DimmedOverlay";
import ImageUploader from "components/common/ImageUploader";
import { Artwork, workConverter, WorkImage, ArtworkFieldsInterface } from "obj/Work";
import React, { ChangeEvent } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import styles from 'styles/forms/WorkCreator.module.scss';
import Cancel from 'assets/cancel.svg';
import { getFirestore, setDoc, doc, collection, addDoc } from "firebase/firestore";
import { Formik, Form, Field } from "formik";

interface WorkCreatorProps {
    initialWork: Artwork | null,
    artist: string,
    doneUploading: () => void
}

interface WorkCreatorState {
    work: Artwork | null,
    showImageUpload: boolean,
}

export class WorkCreator extends React.Component<WorkCreatorProps, WorkCreatorState> {

    constructor(props: WorkCreatorProps, state: WorkCreatorState) {
        super(props, state);
        this.state = {
            work: this.props.initialWork,
            showImageUpload: false,
        }
    }

    componentDidMount() {
        if (this.state.work == null) this.createNewWork();
    }

    fs = getFirestore();

    toggleUploadModal = () => {
        this.setState((oldState) => {
            let newState = { ...oldState, showImageUpload: !oldState.showImageUpload };
            return newState;
        });
    }

    createNewWork = async () => {
        let worksRef = collection(this.fs, "Works");
        let newWorkRef = await addDoc(worksRef, {
            workName: "New Work",
            artist: this.props.artist,

        });
        this.setState((oldState) => {
            let newState = { ...oldState, work: new Artwork("New Work", newWorkRef.id, [], this.props.artist) }
            return newState;
        })
    }

    handleNameChange = (newName: ChangeEvent<HTMLInputElement>) => {
        this.setState((oldState) => {
            let newWork = this.state.work;
            newWork!.workName = newName.target.value;
            let newState = { ...oldState, work: newWork };
            return newState;
        })
    }


    render() {
        if (!this.state.work) return <Spinner animation="border" />;
        let postUpload = async (url: string, desc: string) => {
            this.state.work!.workImages.push(new WorkImage(url, desc, picIndex));
        };
        let work = this.state.work;
        let currentImageURL = "Works/" + this.state.work.uniqueId + "/Images/" + this.state.work.workImages.length;
        let carouselItems: JSX.Element[] = [];
        let picIndex = 0;
        for (const img of work.workImages) {
            carouselItems.push(img.toCarouselItem());
            picIndex++;
        }
        const initialValues: ArtworkFieldsInterface = {
            workImages: this.state.work.workImages,
            medium: this.state.work.medium,
            description: this.state.work.description,
            style: this.state.work.style,
            subject: this.state.work.subject,
            date: this.state.work.date,
            workName: this.state.work.workName,
            uniqueId: this.state.work.uniqueId,
            artist: this.state.work.artist
        };
        return <div id="WorkCreator">
                <h4>Images</h4>
                <Carousel children={carouselItems} />
                <button onClick={this.toggleUploadModal}>Upload Image</button>
                {this.state.showImageUpload &&
                    <DimmedOverlay children={<ImageUploader uploadUrl={currentImageURL} closeModal={this.toggleUploadModal} postUpload={postUpload} withDesc={true} />} />
                }
                <h4>Work Information</h4>
                <Formik initialValues={initialValues} onSubmit={
                async (values, actions) => {
                    actions.setSubmitting(true);
                    await this.setState((oldState) => {
                        let newWork: Artwork = new Artwork(values.workName, values.uniqueId, values.workImages, values.artist, values.medium, values.description, values.style, values.subject, values.date);
                        let newState = { ...oldState, work: newWork }
                        return newState;
                    })
                    try{
                    let docRef = doc(this.fs, "Works", this.state.work!.uniqueId!).withConverter(workConverter);
                    setDoc(docRef, this.state.work)
                    } catch (error) {
                        //HANDLE ERRORS
                        return;
                    }
                    actions.setSubmitting(false);
                    this.props.doneUploading();
                }
            }>
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name={"workName"} className={styles["textInput"]} placeholder={"Work Name"} />
                        <Field type="text" name={"description"} className={styles["textInput"]} placeholder={"Work Description"} />
                        <Field type="text" name={"medium"} className={styles["textInput"]} placeholder={"Work Medium"} />
                        <Field type="text" name={"date"} className={styles["textInput"]} placeholder={"Date Created"} />
                        <Field type="text" name={"subject"} className={styles["textInput"]} placeholder={"Work Subject"} />
                        <Field type="text" name={"style"} className={styles["textInput"]} placeholder={"Work Style"} />
                        <button className={styles["submitButton"]} type="submit" disabled={isSubmitting}> Submit </button>
                    </Form>
                )}
            </Formik>
        </div>
    }
}

interface WorkCreateModalProps {
    artist: string,
    initialWork: Artwork | null,
    closeModal: () => void
}
export class WorkCreateModal extends React.Component<WorkCreateModalProps, {}>{
    render() {
        return <div className={styles["modal"]}>
            <div>
                <WorkCreator initialWork={this.props.initialWork} artist={this.props.artist} doneUploading={this.props.closeModal} />
            </div>
            <img
                alt='cancel'
                className={styles['cancelIcon']}
                onClick={this.props.closeModal}
                src={Cancel}
            />
        </div>
    }
}
