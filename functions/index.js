const functions = require("firebase-functions/v1");
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const {getFirestore} = require("firebase-admin/firestore");
const {getAuth} = require("firebase-admin/auth");

admin.initializeApp();

exports.userRegistratioin = functions.region("asia-south1")
    .https.onCall((data, dateofb, context) => {
      return new Promise((resolve, reject)=>{
        const db = getFirestore();
        const date = new Date();
        const dob = new Date();
        dob.setDate(parseInt(data.data.dateofb.date));
        dob.setMonth(parseInt(data.data.dateofb.month));
        dob.setFullYear(parseInt(data.data.dateofb.year));
        const docRef = db.collection("users")
            .doc(data.data.userData.uid);
        docRef.set(data.data.userData).then(()=>{
          docRef.update({
            joined_date: date,
            dob: dob,
          }).then(()=>{
            resolve("User Created");
          });
        });
      });
    });
exports.addNewUserAdmin = functions
    .region("asia-south1")
    .https.onCall((data, context) => {
      return new Promise((resolve, reject) => {
        getAuth()
            .createUser({
              email: data.email,
              emailVerified: false,
              password: data.password,
              displayName: data.name,
              disabled: false,
            })
            .then((userRecord) => {
              const data = userRecord.uid;
              resolve({status: "Ok", uid: data});
            })
            .catch((error) => {
              console.log("Error creating new user:", error);
              resolve({status: "Failed", code: error});
            });
      });
    });
