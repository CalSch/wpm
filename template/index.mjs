import express from "express";
import ejs from "ejs";
import fs from "fs";
import chokidar from "chokidar";
import mime from "mime";
import { info, get, post, err, warn } from "./term.mjs";
import { config } from "dotenv";
config();
const PORT=process.env.PORT || 8080;
const HOST=process.env.HOST || "localhost";
const app=express();

/**
 * @type {Object.<string,()=>string>}
 */
let routes={};

async function loadRoute(fname) {
	routes[fname.split('.').slice(0,-1).join('.')]=(await import(`./${fname}`)).route;
}

chokidar.watch('./routes/*').addListener("all",function(ev,fname){
	info(`Reloading route ${fname.split('.').slice(0,-1).join('.')} in ${fname} (${ev})`);
	loadRoute(fname);
});

// Data every page can access:
let pageData={
	colors: {
		red: "apple",
		yellow: "banana"
	}
}

/**
 * @param {string} filePath
 * @param {express.Response} res
 */
function setFileHeaders(filePath,res) {
	let type=mime.getType(filePath);
	res.set('Content-Type',type);
	res.set('content-type',type);
}



app.get('*',(req,res,next)=>{
	let resource=req.url;
	if (resource==='/') {
		resource="/index.html";
	}
	let routeName='routes/'+resource.substring(1,resource.length).split('.').slice(0,-1).join('.');
	// console.log(resource);
	// console.log(routeName);

	if (fs.existsSync(`./public${resource}`)) {
		setFileHeaders(resource,res);
		res.send(fs.readFileSync(`./public${resource}`).toString());
	} else if (fs.existsSync(`./public${resource}.ejs`)) {
		setFileHeaders(resource,res);
		res.send(ejs.render( fs.readFileSync(`./public${resource}.ejs`).toString() , pageData));
	} else if (routes[routeName]) {
		res.send(routes[routeName](pageData,req));
	} else {
		res.status(404);
		if (routes['404']) {
			res.send(routes['404'](pageData,req));
		} else {
			res.send(`404 Could not find ${resource} on the server.`);
		}
	}

	next();
});

// Logging
app.use((req,res)=>{
	if (req.method==="GET") {
		get(`${req.originalUrl}  |  ${res.statusCode} ${res.statusMessage}`);
	} else if (req.method==="POST") {
		post(`${req.originalUrl}`);
	}
});

app.listen(PORT,HOST,()=>{
	console.log(`Listening on port http://${HOST}:${PORT}/`);
});