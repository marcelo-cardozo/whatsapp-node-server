import express from "express";
import messageRouter from "./routes/messages";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());
app.use(messageRouter);


const server = app.listen(3000);
