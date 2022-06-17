const Firestore = require("@google-cloud/firestore");

const db = new Firestore({
  projectId: "pftc0000001",
  keyFilename: "./key.json",
});

const AddDocument = async (collection, data) => {
  const docRef = db.collection(collection).doc();
  return await docRef.set(data);
};

//entry point of our application
exports.helloPubSub = (event, context) => {
  const data = Buffer.from(event.data, "base64").toString();
  const jsonData = JSON.parse(data);
  console.log(
    `File ${jsonData.filename} with url ${jsonData.url} uploaded to cloud storage by ${jsonData.email} on ${jsonData.date}`
  );
  //Adding a document to the database
  AddDocument("conversions", {
    email: jsonData.email,
    filename: jsonData.filename,
    date: jsonData.date,
    pending: jsonData.url,
    completed: "",
  });
};
