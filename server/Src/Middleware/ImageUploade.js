const { initializeApp } = require('firebase/app');
const { CatchAsync } = require('../Utils/CatchAsync');
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} = require('firebase/storage');

initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
});

const storage = getStorage();
exports.fireBaseUpload = CatchAsync(async (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const storageRef = ref(
    storage,
    `imagesStock/${req.body.email + req.files[0].originalname}`
  );
  const snapshot = await uploadBytes(storageRef, req.files[0].buffer);
  const downloadURL = await getDownloadURL(snapshot.ref);
  req.body.profilePic = downloadURL;
  next();
});
