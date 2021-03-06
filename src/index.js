const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv-safe").config();
const createServer = require("./create-server");
const db = require("./db");

(async function main() {
  const server = createServer();

  // User cookie parser
  server.express.use(cookieParser());

  // verify and extract userId from jwt
  server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
      try {
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        req.userId = userId;
      } catch (e) {
        console.error(e);
      }
    } else {
      req.userId = null;
    }
    next();
  });

  // user middleware to fetch current user
  server.express.use(async (req, res, next) => {
    if (req.userId) {
      try {
        const user = await db.query.user(
          { where: { id: req.userId } },
          `{
            id
            email
            userRoles {
              name
            }
            subscriptions {
              name
            }
          }`
        );
        req.user = user;
      } catch (e) {
        console.error(e);
      }
    }
    next();
  });

  server.start(
    {
      cors: {
        credentials: true,
        origin: [
          process.env.FRONTEND_URL,
          process.env.YOGA_PORT,
          process.env.PLAYGROUND
        ]
      },
      port: process.env.YOGA_PORT
    },
    deets => {
      console.log(
        `Server is now running on port http://localhost:${deets.port}`
      );
    }
  );
})().catch(e => console.error(e));

process.on("uncaughtException", err => {
  console.error(err);
});
