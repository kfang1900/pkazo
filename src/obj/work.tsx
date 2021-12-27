import { Carousel } from "react-bootstrap";

/**
 * A class representing a piece of art, holding descriptions, images, etc.
 */
export class Artwork {
    constructor(workName: string | null) {
        this.workImages = [];
        this.uniqueId = null;
        this.workName = workName ?? "New Work";
    }
    public workImages: workImage[];
    public workName: string;
    public uniqueId: string | null;

    toMap() {
        return {
            name: this.workName,
            photoUrls: this.workImages.map((img) => img.toMap())
        }
    }

    display() {
        return <>
        <img src={this.workImages[0].photoURL} alt="Work 1"/>
        </>
    }
}

export class workImage {
    constructor(photoURL: string, description: string | null) {
        this.photoURL = photoURL;
        this.description = description;
    }

    public photoURL: string;
    public description: string | null;

    toMap(){
        return {
            url: this.photoURL,
            desc: this.description,
        }
    }

    toCarouselItem() {
        return <Carousel.Item>
            <img
                className="d-block w-100"
                src={this.photoURL}
                alt="First slide"
            />
            <Carousel.Caption>
                <p>{this.description}</p>
            </Carousel.Caption>
        </Carousel.Item>
    }
}