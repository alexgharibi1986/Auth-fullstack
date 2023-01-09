import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "reflect-metadata";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

(async () => {
  try {
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver],
      }),
    });

    await mongoose.connect(process.env.MONGODB_URL!);

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.listen(5000, () => {
      console.log("Server started");
    });
  } catch (err) {
    console.log(err);
  }
})();
