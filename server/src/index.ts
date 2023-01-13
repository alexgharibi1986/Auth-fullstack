import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "reflect-metadata";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import * as dotenv from "dotenv";
import { refreshToken } from "./controllers/refreshToken";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.post("/token_refresh", refreshToken);

(async () => {
  try {
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver],
      }),
      context: ({ req, res }) => ({ req, res }),
    });

    await mongoose.connect(process.env.MONGODB_URL!);

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(5000, () => {
      console.log("Server started");
    });
  } catch (err) {
    console.log(err);
  }
})();
