// inisiasi
import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import studentsRoute from "./routes/studentsRoute.js"

dotenv.config();

// inisiasi aplikasi
const app = express();

//middleware
app.use(cors()); // originnya beda

// parse json body
app.use(express.json());

//routes
app.use(studentsRoute);

// jalanin server
app.listen(process.env.APP_PORT, () => {
  console.log(`Server sedang berjalan ...`)
})