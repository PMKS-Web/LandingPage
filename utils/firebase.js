import { initializeApp, getApps } from "firebase/app"
import {getAnalytics} from "@firebase/analytics";

"firebase/analytics"

const firebaseConfig = {
    apiKey: "AIzaSyAR0UHsnKbtwd22k4kr6BL7V3w6DlF6pbM",
    authDomain: "pmks-landing.firebaseapp.com",
    projectId: "pmks-landing",
    storageBucket: "pmks-landing.appspot.com",
    messagingSenderId: "427040798158",
    appId: "1:427040798158:web:14352f8cb042f8a9a0279f",
    measurementId: "G-KTCD07JPZ7"
};

if (!getApps().length) {
    initializeApp(firebaseConfig)
}


export const analytics = () => {
    if (typeof window !== "undefined") {
        return getAnalytics();
    } else {
        return null
    }
}