const http = require('http')
const app = require('./app')
require('dotenv').config()
const port = process.env.PORT_API;

const server = http.createServer(app);
server.listen(port, () => {
    console.log("Server running at localhost on PORT " + port);
});