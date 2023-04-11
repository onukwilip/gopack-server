import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import eventsRouter from "./routes/events";
import bodyParser from "body-parser";
import readmeRouter from "./routes/readme";

dotenv.config();
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/events", eventsRouter);
app.use("/readme", readmeRouter);

const server = http.createServer(app);
const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`Server listening at port ${port}`));
