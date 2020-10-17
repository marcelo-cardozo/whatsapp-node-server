import express from "express";
import whatsappRoutes from "./routes/whatsapp";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(whatsappRoutes);
app.listen(3000);
