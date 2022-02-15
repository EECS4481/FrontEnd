import React from "react";
import { Router, Route } from "react-router";
import Home from "./home/home";
import Chat from "./chat/chat";
import SignIn from "../sign-in/sign-in";

const ClientRoutes = () => (
  <>
    <Route exact path="/client/home/:userId" element={<Home />} />
    <Route exact path="/client/chat/:chatId" element={<Chat />} />
  </>
);

export default ClientRoutes;
