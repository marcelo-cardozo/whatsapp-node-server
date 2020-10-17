import {Router} from 'express';
import * as service from "../services/whatsapp";

const router = Router();

type RequestMessage = { number: number, message: string }

router.post('/message', async (req, res, next) => {
    const body = req.body as RequestMessage;
    await service.sendMessage(body.number, body.message);
    res.status(200).json();
});

export default router;
