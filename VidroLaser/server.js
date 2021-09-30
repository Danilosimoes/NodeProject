const http = require('http');
const { userInfo } = require('os');
const app = require('./app');
const port = process.env.PORT || 3000;







const server = http.createServer(app);
server.listen(port);













