import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import userRoute from "./routes/user_routers.js";
import noteRoute from "./routes/note_routers.js";
import cookieParser from "cookie-parser";

dotenv.config(); // Load environment variables

const app = express();

app.use(cookieParser());
// const corsOptions = {
//    origin: "https://note-app-frontend-delta.vercel.app",
//    methods: ["GET", "POST", "PUT", "DELETE"],
//    credentials: true,
//  };
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // Middleware to parse JSON request bodies

// Home route
app.get("/", (req, res) => {
   res.send("Hello, this is the home page");
});

// Corrected route paths
app.use("/user", userRoute);
app.use("/note", noteRoute);

const PORT = process.env.PORT || 3000;

// Connect to the database before starting the server
dbConnect();
app.listen(PORT, () => {
   console.log(`Listening on port ${PORT}`);
});
