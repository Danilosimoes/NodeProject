const http = require('http');
const { userInfo } = require('os');
const app = require('./app');
const port = process.env.PORT || 8080;





console.log(process.env.MYSQL_PORT);
console.log(process.env.HOST);
console.log(process.env.DATABASE);
console.log(process.env.USER);


const server = http.createServer(app);
server.listen(port); 














