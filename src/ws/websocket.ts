import * as service from "../services/whatsapp";
import {Message} from "whatsapp-web.js";
import WebSocket from "ws";

type SendMessageBody = { number: number, message: string }

type MessageRequest = { action: string, data: SendMessageBody }
type QrResponse = { qr: string }

const connectionHandler = async (ws: WebSocket) => {

    service.onClientReady(() => {
        ws.send('client ready');
    });

    service.onQr((qr: string) => {
        let response: QrResponse = {qr}
        ws.send(JSON.stringify(response));
    });

    service.onMessageReceived((message: Message) => {
        ws.send(JSON.stringify(message));
    });

    ws.on("message", async (message) => {
        if (!service.isClientReady()) {
            ws.send("client not ready");
            return;
        }

        console.log('received: %s', message);
        const request = JSON.parse(message.toString()) as MessageRequest;
        switch (request.action) {
            case "send_message":
                await service.sendMessage(request.data.number, request.data.message);
                break;
        }
    });
}

export {connectionHandler}
