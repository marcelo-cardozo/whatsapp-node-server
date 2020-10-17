import fs from "fs";
import {Client, ClientSession, Message} from "whatsapp-web.js";
import * as path from "path";

const fsPromises = fs.promises;

const SESSION_PATH = path.join(__dirname, path.sep, 'session.json');
let session: ClientSession | undefined;
if (fs.existsSync(SESSION_PATH)) {
    session = JSON.parse(fs.readFileSync(SESSION_PATH).toString()) as ClientSession;
}
console.log(session);
const WhatsappClient = new Client({session});
if (!session) {
    WhatsappClient.on('authenticated', async (session) => {
        await fsPromises.writeFile(SESSION_PATH, JSON.stringify(session));
    });
}
WhatsappClient.initialize();

let _clientReady = false;
const isClientReady = (): boolean => {
    return _clientReady;
}
WhatsappClient.on("ready", () => {
    _clientReady = true;
});

const onClientReady = (listener: () => void) => {
    WhatsappClient.on("ready", () => {
        _clientReady = true;
        listener();
    });
}

const onMessageReceived = (listener: (message: Message) => void) => {
    WhatsappClient.on("message", listener);
}

const onQr = (listener: (qr: string) => void) => {
    WhatsappClient.on("qr", listener);
}
const sendMessage = async (number: number, message: string) => {
    await WhatsappClient.sendMessage(`${number}@c.us`, message);
}

export {onClientReady, onMessageReceived, onQr, isClientReady, sendMessage}
