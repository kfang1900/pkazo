import DimmedOverlay from "components/common/DimmedOverlay";
import ImageUploader from "components/common/ImageUploader";
import { Artwork, workConverter, WorkImage } from "obj/Work";
import React, { ChangeEvent } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import styles from 'styles/forms/WorkCreator.module.scss';
import Cancel from 'assets/cancel.svg';
import { getFirestore, setDoc, doc, collection, addDoc } from "firebase/firestore";

interface WorkCreatorProps {
    initialWork: Artwork | null,
    artist: string
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
        if(this.state.work == null) this.createNewWork();
    }

    fs = getFirestore();

    toggleUploadModal = () => {
        this.setState((oldState) => {
            let newState = {...oldState, showImageUpload: !oldState.showImageUpload};
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
           let newState = {...oldState, work: new Artwork("New Work", newWorkRef.id, [], this.props.artist)}
           return newState;
       })
    }

    uploadWork = async () => {
        let docRef = doc(this.fs, "Works", this.state.work!.uniqueId!).withConverter(workConverter);
        setDoc(docRef, this.state.work)
    }

    handleNameChange = (newName: ChangeEvent<HTMLInputElement>) => {
        this.setState((oldState) => {
            let newWork = this.state.work;
            newWork!.workName = newName.target.value;
            let newState = {...oldState, work: newWork};
            return newState;
        })
    }

    render() {
        if(!this.state.work) return <Spinner animation="border"/>;
        let postUpload = async (url: string, desc: string) => {
            this.state.work!.workImages.push(new WorkImage(url, desc, picIndex));
        };
        let work = this.state.work;
        let currentImageURL = "Works/" + this.state.work.uniqueId + "/Images/" + this.state.work.workImages.length;
        let carouselItems: JSX.Element[] = [];
        let picIndex = 0;
        for(const img of work.workImages){
            carouselItems.push(img.toCarouselItem());
            picIndex++;
        }
        return <div id="WorkCreator">
            <input type="text" value={this.state.work.workName ?? ""} onChange={this.handleNameChange} />            
            <h4>Images</h4>
            <Carousel children={carouselItems}/>
            <button onClick={this.toggleUploadModal}>Upload Image</button>
            { this.state.showImageUpload &&
            <DimmedOverlay children={<ImageUploader uploadUrl={currentImageURL} closeModal={this.toggleUploadModal} postUpload={postUpload} withDesc={true}/>}/>
            }
            <h4>Work Information</h4>
            <button onClick={this.uploadWork}>Upload Work</button>
        </div>
    }
}

interface WorkCreateModalProps{
    artist: string,
    initialWork: Artwork | null, 
    closeModal: () => void
}
export class WorkCreateModal extends React.Component<WorkCreateModalProps, {}>{
    render() {
        return <div className={styles["modal"]}>
            <div>
                <WorkCreator initialWork={this.props.initialWork} artist={this.props.artist} />
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
