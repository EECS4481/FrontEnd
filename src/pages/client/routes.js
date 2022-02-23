import React from "react";
import { Route } from "react-router";
import Home from "./home/home";
import Chat from "./chat/chat";

const ClientRoutes = () => (
  <>
    <Route exact path="/client/home/" element={<Home />} />
    <Route exact path="/client/home/:userId" element={<Home />} />
    <Route exact path="/client/chat" element={<Chat />} />
  </>
);

export default ClientRoutes;
