import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Carousel } from "react-bootstrap";
import styles from "styles/common/Work.module.scss";

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
        let carouselItems: JSX.Element[] = [];
        this.workImages.forEach((img) => carouselItems.push(img.toCarouselItem()));
        return <div className={styles["workDisplay"]} id={this.workName + " display"}>
            <p>{this.workName}</p>
            <Carousel
            className={styles["carousel"]}
            children={carouselItems}/>
        </div>
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
        let imgIndex = 0;
        try{
            for(const img of data.workImages){
                imageList.push(new WorkImage(img["url"], img["desc"], imgIndex));
                imgIndex++;
            }
        } catch (error){
            imageList = []
        }
        return new Artwork(data.workName, data.uniqueId, imageList, data.artist);
    }
};

export class WorkImage {
    constructor(photoURL: string, description: string | null, imgIndex: number) {
        this.photoURL = photoURL;
        this.description = description;
        this.imgIndex = imgIndex;
    }

    public imgIndex: number;
    public photoURL: string;
    public description: string | null;

    toMap(){
        return {
            url: this.photoURL,
            desc: this.description,
        }
    }

    toCarouselItem() {
        return <Carousel.Item 
        key={"Image " + this.imgIndex} className={styles["carousel-item"]}>
            <img
            className="d-block w-100"
                src={this.photoURL}
                alt={"Photo " + this.imgIndex}
            />
            <Carousel.Caption>
                <p>{this.description}</p>
            </Carousel.Caption>
        </Carousel.Item>
    }
}