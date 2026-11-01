import http from 'node:http';
import {readFile} from 'node:fs/promises';
const allowed={'/':'index.html','/index.html':'index.html','/style.css':'style.css','/app.js':'app.js','/crypto.js':'crypto.js'};
http.createServer(async(req,res)=>{const path=new URL(req.url,'http://localhost').pathname;const file=allowed[path];if(!file){res.writeHead(404);res.end('Not found');return;}try{const body=await readFile(new URL(file,import.meta.url));res.writeHead(200,{'Content-Type':file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':'text/html; charset=utf-8'});res.end(body);}catch{res.writeHead(500);res.end('Unable to load app');}}).listen(4173,'127.0.0.1',()=>console.log('Cipher Lab: http://localhost:4173'));
