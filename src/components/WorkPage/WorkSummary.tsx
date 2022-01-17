import { collection, getDocs, getFirestore, limit, query, where } from "firebase/firestore";
import { Artwork, workConverter } from "obj/work";
import React from "react";
import { Spinner } from "react-bootstrap";

interface WorkSummaryProps{
    workId: string,
}

interface WorkSummaryState{
    work: Artwork | null,
}

export class WorkSummary extends React.Component<WorkSummaryProps, WorkSummaryState>{

    constructor(props: WorkSummaryProps, state: WorkSummaryState){
        super(props, state);
        this.setState({
            work: null
        });
    }

    componentDidMount(){
        this.fetchArtwork();
    }


    fetchArtwork = async () => {
        let workRef = collection(getFirestore(), "Works").withConverter(workConverter);
        let q = query(workRef, where("uniqueId", "==", this.props.workId), limit(1));
        let docs = (await getDocs(q)).docs;
        let works: Artwork[] = [];
        docs.forEach((queryDoc) => works.push(queryDoc.data()));
        this.setState((oldState) => {return {work: works[0]}});
        }

    render() {
        if(this.state == null || this.state.work == null || this.state.work === undefined) {return <Spinner animation="border"/>;}
        return <div>
            {this.state.work.display()}
            <table>
                <tr>
                    <th>Property</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>{this.state.work.description}</td>
                </tr>
            </table>
        </div>
    }
}