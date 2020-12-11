
let dbUser = null;
const defaultNickname = "MISSINGNO";
let db = null;

if (firebase) {
    db = firebase.firestore();
}

async function isOnline() {
    let online = !!db;
    if (online) {