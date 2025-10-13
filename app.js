// Gemini was used for clarification and guidance

const http = require("http");
const url = require("url");
const STRINGS = require("./lang/messages/en/user.js");
const dictionary = new Map();
const GET = "GET";
const POST = "POST";
const OPTIONS = "OPTIONS";
let requestCount = 0;

const port = process.env.PORT || 8080;

// set allowed origin for CORS
const ALLOWED_ORIGIN = "https://lab4dictionary.netlify.app";

// main application class
class App {
    constructor(port) {
        this.port = port;
    }
  // function to start the server
  start() {
    const server = http
      .createServer((req, res) => {
        const method = req.method;
        const parsedUrl = url.parse(req.url, true);
        const query = parsedUrl.query;

        // handle OPTIONS requests for CORS preflight
        if (method === OPTIONS) {
            res.writeHead(204, {
                "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type", // Add any headers your frontend sends
                "Access-Control-Max-Age": 86400 // Cache preflight for 24 hours
            });
            res.end();
            return;
        }

        // set common headers for all responses (all non-OPTIONS requests)
        res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
        res.setHeader("Content-Type", "application/json");

        // input validation for 'word'
        // if (
        //   !query.word ||
        //   typeof query.word !== "string" ||
        //   !isNaN(query.word) ||
        //   query.word.trim() === ""
        // ) {
        //   res.writeHead(400);
        //   res.end(JSON.stringify({ message: STRINGS.invalidWord }));
        //   return;
        // }
        const word = query.word;

        console.log(query);
        console.log(word);

        // handle POST requests
        if (method === POST) {
          // check if word already exists
          // if (dictionary.has(word)) {
          //   res.writeHead(400);
          //   res.end(JSON.stringify({ message: STRINGS.fail }));
          // } else {
          //   // input validation for 'definition'
          //   if (
          //     !query.definition ||
          //     typeof query.definition !== "string" ||
          //     !isNaN(query.definition) ||
          //     query.definition.trim() === ""
          //   ) {
          //     res.writeHead(400);
          //     res.end(JSON.stringify({ message: STRINGS.invalidDefinition }));
          //     return;
          //   }
            const definition = query.definition;
            console.log(definition);

            // increment request count
            requestCount++;

            // add new word-definition pair to dictionary
            dictionary.set(word, definition);
            res.writeHead(200);
            // generate successful post message
            const successMessage = this.replacePlaceholder(
              STRINGS.successPost,
              {
                requestCount: requestCount,
                word: word,
                definition: definition,
                size: dictionary.size,
              }
            );
            res.end(JSON.stringify({ message: successMessage }));
          }
        }

        // handle GET requests
        if (method === GET) {
          if (dictionary.has(word)) {
            res.writeHead(200);

            // increment request count
            requestCount++;

            // generate successful get message
            const successfulGetMessage = this.replacePlaceholder(
              STRINGS.successGet,
              {
                requestCount: requestCount,
                word: word,
                definition: dictionary.get(word),
                size: dictionary.size,
              }
            );
            res.end(JSON.stringify({ message: successfulGetMessage }));
          } else {
            // handle get request word not found in dictionary
            res.writeHead(404);
            res.end(JSON.stringify({ message: STRINGS.error.replace("{1}", word) }));
          }
        }
      })
      .listen(this.port, () => {
        console.log(`Server is listening on port ${this.port}`);
      });
  }

  // function to replace placeholders in strings
  replacePlaceholder(str, data) {
    return str.replace(/\$\{(\w+)\}/g, (match, key) => data[key]);
  }
}

const app = new App(port);
app.start();

