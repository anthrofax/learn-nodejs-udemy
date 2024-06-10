const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method)
  console.log(req.headers)

  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head>')
  res.write('<title>My first page</title>')
  res.write('<body><h1>Hello Node js!</h1></body>')
  res.write('</title>')
  res.write('</html>')
  res.end()
});

server.listen(3000);

