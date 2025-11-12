const http =require('http');
const PORT =3000;
const HOST='localhost';

const server =http.createServer((req,res)=>{
res.writeHead(200,
    {'Content-Type':'text/plain'});
res.end("Welcome to Blogify API");
});

server.listen(PORT, HOST,()=>{
    console.log(`Server is running at http://${HOST}:${PORT}`);
});