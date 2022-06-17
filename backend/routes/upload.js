import Express from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { PDF_API_KEY } from "../app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload = Express.Router();

const storage = new Storage ({projectId:'	i-gateway-347516',keyFilename: './key.json'});

let docUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads/"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".doc" && ext !== ".docx" ) {
      return callback(new Error("Incorrect file type"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 2621441,
  },
});

upload.route("/").post(docUpload.single("image"), (req, res) => {
  if (req.file) {
    console.log("File downloaded at: " + req.file.path);
    //Upload to google cloud
    //Convert to base64
    //Send to PDF Conversion API
    await storage.bucket("i-gateway-347516.appspot.com").upload(req.file.path,{destination: "Task2/" +req.file.originalname,});

    res.send({
      status: "200",
      message: "File uploaded successfully! Processing..",
    });
  }
});


export default upload;
