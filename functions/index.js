const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

const serviceAccount = require("./banco-rafael-firebase.json");

const resolvers = require("./resolvers");
const { importSchema } = require("graphql-import");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fiapbancographql-rafael-default-rtdb.firebaseio.com/",
});

const app = express();

const server = new ApolloServer({
  typeDefs: importSchema("./schema/index.graphql"),
  resolvers: resolvers,
});

server.applyMiddleware({ app, path: "/", cors: true });

exports.graphql = functions.https.onRequest(app);
