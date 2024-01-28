const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("./serviceAccountKey.json"),
  databaseURL: "https://migicl-default-rtdb.europe-west1.firebasedatabase.app",
});

const uid = "tkOPiu9DPCSdUEVxvdq3pZaX6Qi1";

return admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
    console.log(`Admin claim added to ${uid}`);
  });
