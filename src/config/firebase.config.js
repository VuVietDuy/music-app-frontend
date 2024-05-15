import { initializeApp, getApp, getApps} from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAlXgPLEtC9qJJUyuFTuILa3QTBnKGf_LQ",
  authDomain: "musicapp-ca012.firebaseapp.com",
  projectId: "musicapp-ca012",
  storageBucket: "musicapp-ca012.appspot.com",
  messagingSenderId: "504474316312",
  appId: "1:504474316312:web:ba6751baed47cd9faadd6d"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export {app, storage};