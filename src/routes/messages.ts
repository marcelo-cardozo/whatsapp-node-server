import {Router} from 'express';
import * as service from "../services/whatsapp";

const router = Router();

type SendMessageBody = { number: number, message: string }

router.post('/messages', async (req, res, next) => {
    if(!service.isClientReady()){
        res.status(500).json();
    }
    const body = req.body as SendMessageBody;
    await service.sendMessage(body.number, body.message);
    res.status(200).json();
});

export default router;
