import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { apolloClient } from "./client/apolloClient";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/auth/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </AuthProvider>
);
