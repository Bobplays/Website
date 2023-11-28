// Server.js
const http = require("http");
const fs = require("fs");
const readline = require("readline");
const url = require("url");
const path = require("path"); // Import the path module

const hostname = "127.0.0.1";
const port = 3000;

let server;

const startServer = () => {
  server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    // Parse the requested URL
    const requestedUrl = url.parse(req.url);
    
    // Check if the path is "/"
    if (!requestedUrl.pathname) {
      requestedUrl.pathname = "/home";
    }
    
    // Check if the path is "/home"
    if (requestedUrl.pathname === "/home") {
      fs.readFile("index.html", "utf8", (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        } else {
          res.end(data);
        }
      });
    } else if (requestedUrl.pathname === "/Games/Gunspin") {
      fs.readFile("Games/Gunspin.html", "utf8", (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        } else {
          res.end(data);
        }
      });
    } else if (requestedUrl.pathname === "/Games/Murder") {
      fs.readFile("Games/Murder.html", "utf8", (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        } else {
          res.end(data);
        }
      });
    }
    else if (requestedUrl.pathname === "/credits") {
      fs.readFile("Resource/pages/Credits.html", "utf8", (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        } else {
          res.end(data);
        }
      });
    } else if (requestedUrl.pathname === "/Games/bascket") {
      fs.readFile("Games/bascket.html", "utf8", (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        } else {
          res.end(data);
        }
      });
    } else if (requestedUrl.pathname.startsWith("/Resource/images/")) { // Handle image requests
      const imagePath = path.join(__dirname, requestedUrl.pathname);
      fs.readFile(imagePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "image/png"); // Set the appropriate Content-Type for your image
          res.end(data);
        }
      });
    } else {
      res.statusCode = 404;
      res.end("Not Found");
    }
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/home`);
  });

  server.on("connection", (socket) => {
    printConnectionAddress(socket.remoteAddress);
  });
};

const stopServer = () => {
  server.close(() => {
    console.log("Server stopped");
    process.exit(0);
  });
};

const restartServer = () => {
  stopServer();
  startServer();
};

// Monitor for user input from the Terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  if (input === "stop") {
    stopServer();
  }
});

// Function to print the connection address
const printConnectionAddress = (addr) => {
  console.log(`Connected by ${addr}`);
};

// Start the server by default
startServer();
