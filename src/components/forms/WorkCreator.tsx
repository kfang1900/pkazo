import DimmedOverlay from "components/common/DimmedOverlay";
import ImageUploader from "components/common/ImageUploader";
import { getAuth } from "firebase/auth";
import { Artwork } from "obj/work";
import React from "react";
import { Carousel } from "react-bootstrap";
import styles from 'styles/homepage/SignInModal.module.scss';
import Cancel from 'assets/cancel.svg';



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
}

export class WorkCreator extends React.Component<WorkCreatorProps, WorkCreatorState> {

    constructor(props: WorkCreatorProps, state: WorkCreatorState) {
        super(props, state);
        this.state = {
            showImageUpload: false,
        }
    }

    toggleUploadModal = () => {
        this.setState((oldState) => {
          let newState = {...oldState, showImageUpload: !oldState.showImageUpload};
          return newState;
        });
      }

    render() {
        const user = getAuth().currentUser;
        let work = this.props.work;
        const url = user!.uid + '/' + work.uniqueId;
        return <>
            <h2>{work.workName}</h2>
            <Carousel children={work.workImages}/>
            { this.state.showImageUpload &&
            <DimmedOverlay children={<ImageUploader uploadUrl={url} closeModal={this.toggleUploadModal}/>}/>
            }
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
