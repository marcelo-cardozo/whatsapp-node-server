# Whatsapp Node Server
Simple node server that wraps [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) and makes some funcionality available through endpoints 

## Endpoints
**Send Message**
```
/message

{
    "number": ####, // with out the + symbol
    "message":"test"
}
```
