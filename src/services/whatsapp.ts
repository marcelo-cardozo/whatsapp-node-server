const {Client} = require('whatsapp-web.js');
const client = new Client();
client.on('qr', (qr: string) => {
    console.log('QR RECEIVED', qr);
});
client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

const sendMessage = async (number: number, message: string) => {
    await client.sendMessage(`${number}@c.us`, message);
}
export {sendMessage}

