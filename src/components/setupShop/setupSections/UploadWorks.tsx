import DimmedOverlay from "components/common/DimmedOverlay";
import ImageUploader from "components/common/ImageUploader";
import { getAuth } from "firebase/auth";
import { Artwork } from "obj/work";
import React from "react";
import { Carousel } from "react-bootstrap";

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

    toggleSignInModal = () => {
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
            <h2>{work.name}</h2>
            <Carousel children={work.workImages}/>
            { this.state.showImageUpload &&
            <DimmedOverlay children={<ImageUploader uploadUrl={url} closeModal={this.toggleSignInModal}/>}/>
            }
        </>
    }
}

