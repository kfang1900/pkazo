import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { Artwork, workConverter } from "obj/Work";
import React from "react";
import { Spinner } from "react-bootstrap";

interface WorkListProps{
    artistId: string,
}

interface WorkListState{
    userWorks: Artwork[] | null,
}
export class WorkList extends React.Component<WorkListProps, WorkListState> {

    constructor(props: WorkListProps, state: WorkListState){
        super(props, state);
        this.state = {
            userWorks: null
        }
    }

    componentDidMount() {
        this.fetchArtwork();
    }

    fetchArtwork = async () => {
        let workRef = collection(getFirestore(), "Works").withConverter(workConverter);
        let q = query(workRef, where("artist", "==", this.props.artistId))
        let docs = (await getDocs(q)).docs;
        let works: Artwork[] = [];
        docs.forEach((queryDoc) => works.push(queryDoc.data()));
        this.setState((oldState) => {return {userWorks: works}});
        }

    render() {
        if(!this.state.userWorks || this.state.userWorks == null) return <Spinner animation="border"/>;
        if(this.state.userWorks.length === 0) return <p>No works.</p>
        let elements: JSX.Element[] = [];
        for(const work of this.state.userWorks){
            elements.push(work.display());
        }
        return <ul className="list-group" children={elements} />
    }
}