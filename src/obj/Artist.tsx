import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class Artist {
    DisplayName: string;
    ProfilePicture: string | undefined;
    Bio: string | undefined;
    uid: string;

    constructor (DisplayName: string, ProfilePicture: string, Bio: string | undefined, uid: string) {
        this.DisplayName = DisplayName;
        this.ProfilePicture = ProfilePicture;
        this.Bio = Bio;
        this.uid = uid;
    }
    toString() {
        return this.DisplayName;
    }
}

// Firestore data converter
export const artistConverter = {
    toFirestore: (a: Artist) => {
        return {
            DisplayName: a.DisplayName,
            ProfilePicture: a.ProfilePicture,
            };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return new Artist(data.DisplayName, data.ProfilePicture, data.Bio, data.uid);
    }
};
