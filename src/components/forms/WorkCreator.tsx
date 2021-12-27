import DimmedOverlay from "components/common/DimmedOverlay";
import ImageUploader from "components/common/ImageUploader";
import { Artwork, workImage } from "obj/work";
import React from "react";
import { Carousel } from "react-bootstrap";
import styles from 'styles/homepage/SignInModal.module.scss';
import Cancel from 'assets/cancel.svg';
import { getFirestore, setDoc, doc } from "firebase/firestore";



interface WorkListState{
    userWorks: Artwork[],
}
export class WorkList extends React.Component<{}, WorkListState> {
    render() {
        return <ul className="list-group" />
    }
}

interface WorkCreatorProps {
    work: Artwork,
    portfolioUrl: string
}

interface WorkCreatorState {
    showImageUpload: boolean,
    currentImageURL: string,
}

export class WorkCreator extends React.Component<WorkCreatorProps, WorkCreatorState> {

    constructor(props: WorkCreatorProps, state: WorkCreatorState) {
        super(props, state);
        this.state = {
            currentImageURL: this.props.portfolioUrl + "/" + this.props.work.workName + "/" + this.props.work.workImages.length,
            showImageUpload: false,
        }
    }

    uploadWork = () => {
        let fs = getFirestore();
        setDoc(doc(fs, this.props.portfolioUrl + "/" + this.props.work.workName), this.props.work.toMap())
    }

    toggleUploadModal = () => {
        this.setState((oldState) => {
            let newURL = this.props.portfolioUrl + "/" + this.props.work.workImages.length;
            let newState = {...oldState, showImageUpload: !oldState.showImageUpload, currentImageURL: newURL};
            return newState;
        });
      }

    render() {
        let postUpload = async (url: string) => {
            debugger;
            this.props.work.workImages.push(new workImage(url, null));
        };
        let work = this.props.work;
        debugger;
        return <>
            <h2>{work.workName}</h2>
            <Carousel children={work.workImages.map<JSX.Element>((img) => img.toCarouselItem())}/>
            <button onClick={this.toggleUploadModal}>Upload Image</button>
            { this.state.showImageUpload &&
            <DimmedOverlay children={<ImageUploader uploadUrl={this.state.currentImageURL} closeModal={this.toggleUploadModal} postUpload={postUpload}/>}/>
            }
            <button onClick={this.uploadWork}>Upload Work</button>
        </>
    }
}

interface WorkCreateProps{
    closeModal: () => void
    work: Artwork,
    portfolioURL: string,
}
export class WorkCreateModal extends React.Component<WorkCreateProps, {}>{
    render() {
        return <div className={styles["modal"]}>
            <div>
                <WorkCreator work={this.props.work} portfolioUrl={this.props.portfolioURL} />
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
