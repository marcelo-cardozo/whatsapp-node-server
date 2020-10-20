import {Router} from "express";
import * as WhatsappService from "../services/whatsapp";
import {image as qrImage} from "qr-image";

const router = Router();


router.get("/qr", async (req, res, next) => {
    const qr = await WhatsappService.getQr();
    let code = qrImage(qr, { type: 'png' });
    res.setHeader('Content-type', 'image/png');  //sent qr image to client side
    code.pipe(res);
})

export default router;
