import React, {useState,useEffect} from 'react';
import { getApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useParams } from 'react-router';
import { loadStorageImage } from 'api/auth/firebaseAuthApi';


export const ArtistProfile = () => {
    //Grap the document id from the URL
    const { artist_id } = useParams();
    const [artistData, setData] = useState({});
    const [picture, setPicture] = useState({});

    let app = getApp();
    let db = getFirestore(app);

    useEffect(() => {
      (async () => { 
        //Get that document from the database
        const docRef = doc(db, "Artists", artist_id);
        const ref = await getDoc(docRef);
        setData(ref.data());
        const imref = await loadStorageImage(ref.data()["ProfilePicture"]);
        setPicture(imref);
      })();
    }, [artist_id, db]);

    return (
      <div>
        <div className="blog-container">
          <img alt="avatar" src={picture}></img>
          <h4>{artistData.Name}</h4>
          <p>{artistData.Bio}</p>
        </div>
      </div>
    );
  }
