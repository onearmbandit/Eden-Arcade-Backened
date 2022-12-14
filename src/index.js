const express = require("express");
const app = express();
const bodyParser1 = require("body-parser");
app.use(bodyParser1.json({ limit: "50mb" }));
app.use(bodyParser1.urlencoded({ limit: "50mb", extended: true }));
const userRouter = require("./routers/user.js");
//const adminRouter=require("./adminPanel/adminPanel.js")
var cors = require('cors')
const port = process.env.PORT || 5000;



const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const optionsS = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["./src/routers/*.js"],
};

const specs = swaggerJsDoc(optionsS);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(express.json());
app.use(userRouter);
//app.use("/adminPanel",homeroute)

var server2 = require("http").createServer(app);

 /*  var https = require('https');
 var fs = require('fs');
  var options = {
key: fs.readFileSync('/etc/letsencrypt/live/eden-dev.cetxlabs.com-0002/privkey.pem'),
cert: fs.readFileSync('/etc/letsencrypt/live/eden-dev.cetxlabs.com-0002/fullchain.pem'),
ca: fs.readFileSync('/etc/letsencrypt/live/eden-dev.cetxlabs.com-0002/chain.pem')

}  
var server2 = https.createServer(options,app);        */
  
 



//TESTING IS SERVER RUNNING
const server = server2.listen(port, () => {
  console.log(`Server is running on port ${port}`);
 
 
});

///SOCKET CONNECTION
var sio = require("socket.io").listen(server2);
let socket_connect = require("./_helpers/socket");
socket_connect(sio);
module.exports.io = sio;


