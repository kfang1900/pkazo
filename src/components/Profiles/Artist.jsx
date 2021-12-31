import React,{useState,useEffect} from 'react';
import { getApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useParams } from 'react-router';
import { getDownloadURL, getStorage} from "firebase/storage";
import { loadStorageImage } from 'api/auth/firebaseAuthApi';


export const ArtistProfile = () => {
    //Grap the document id from the URL
    const { artist_id } = useParams();
    const [artistData, setData] = useState({});
    const [picture, setPicture] = useState({});

    let app = getApp();
    //Get that document from the database
    let db = getFirestore(app);
    const storage = getStorage(app)

    const docRef = doc(db, "Artists", artist_id);
    const fetchArtist = async()=>{ 
      const ref = await getDoc(docRef)
      setData(ref.data())
      const imref = await loadStorageImage(ref.data()["ProfilePicture"])
      setPicture(imref)
    }
    useEffect(() => {
      fetchArtist();
    }, []);

    console.log(artistData)
    console.log({ artist_id })
    return (
      <div>
        <div className="blog-container">
          <img src={picture}></img>
          <h4>{artistData.Name}</h4>
          <p>{artistData.Bio}</p>

      </div>
      </div>
    );
  }
