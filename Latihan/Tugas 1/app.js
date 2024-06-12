const http = require("http");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  
  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    res.write("<h1>Heloooo Afridho!</h1>");
    res.write("<br>");
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username" id="username"><button>Submit</button></form>'
    );
    return res.end();
  }

  if (url === "/users") {
    res.write(
      "<ul><li>Afridho Ikhsan</li><li>Rizki Septiana</li><li>Ikhwan Pratama Hidayat</li></ul>"
    );
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      console.log(message);

      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title><head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
