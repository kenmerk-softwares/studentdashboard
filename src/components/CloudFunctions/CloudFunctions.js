import { initializeApp } from 'firebase/app';
 import { getFunctions } from 'firebase/functions';

 const app = initializeApp({
     projectId: process.env.REACT_APP_PROJECTID,
     apiKey: process.env.REACT_APP_APIKEY,
     authDomain: process.env.REACT_APP_AUTHDOMAIN,
   });
 const functions = getFunctions(app);
 export {functions};