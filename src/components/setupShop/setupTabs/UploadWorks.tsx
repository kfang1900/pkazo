import { Artwork } from "obj/work";
import React from "react";
import { Carousel } from "react-bootstrap";

interface WorkcreatorProps {
    work: Artwork,
}

export class WorkCreator extends React.Component<WorkcreatorProps, {}> {

    render() {
        let work = this.props.work;
        return <>
        <h2>{work.name}</h2>
            <Carousel children={work.workImages}/>
        </>
    }
}

