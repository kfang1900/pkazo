import { Carousel } from "react-bootstrap";

/**
 * A class representing a piece of art, holding descriptions, images, etc.
 */
export class Artwork {
    constructor(name: string | null) {
        this.workImages = [];
        this.uniqueId = null;
        this.name = name ?? "New Work";
    }
    public workImages: workImage[];
    public name: string;
    public uniqueId: string | null;

    toMap() {
        return {
            name: this.name,
            photoUrls: this.workImages
        }
    }
}

export class workImage {
    constructor(photoURL: string, description: string | null) {
        this.photoURL = photoURL;
        this.description = description;
    }

    public photoURL: string;
    public description: string | null;

    toCarouselItem() {
        <Carousel.Item>
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