import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Carousel } from "react-bootstrap";

/**
 * A class representing a piece of art, holding descriptions, images, etc.
 */
export class Artwork {
    constructor(workName: string | null, uniqueId: string | null, workImages: WorkImage[] | null, artist: string) {
        this.workImages = (workImages ?? []);
        this.uniqueId = uniqueId;
        this.workName = workName;
        this.artist = artist;
    }
    public workImages: WorkImage[];
    public workName: string | null;
    public uniqueId: string | null;
    public artist: string;

    display() {
        return <>
        <p>{this.workName}</p>
        <img src={this.workImages[0].photoURL} alt="Work 1"/>
        </>
    }
}

// Firestore data converter
export const workConverter = {
    toFirestore: (w: Artwork) => {
        return {
            uniqueId: w.uniqueId,
            workName: w.workName,
            workImages: w.workImages.map((img) => img.toMap()),
            artist: w.artist,
            };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        let imageList: WorkImage[] = [];
        try{
            for(const img of data.workImages){
                imageList.push(new WorkImage(img["photoURL"], img["description"]))
            }
        } catch (error){
            imageList = []
        }
        return new Artwork(data.workName, data.uniqueId, imageList, data.artist);
    }
};

export class WorkImage {
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