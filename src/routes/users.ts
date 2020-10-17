import {Router} from "express";
import * as WhatsappService from "../services/whatsapp";

const router = Router();

type QrResponse = {qr: string};

router.get("/qr", async (req, res, next) => {
    const qr = await WhatsappService.getQr();
    const qrResponse : QrResponse = {qr};
    res.status(200).json(qrResponse)
})

export default router;
