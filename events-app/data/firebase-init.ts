const admin = require("firebase-admin");
const serviceAccount = require("../data/client-fetch-next-firebase-adminsdk-mf7a5-ef3908ed27.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://client-fetch-next-default-rtdb.europe-west1.firebasedatabase.app"
});

export default admin
