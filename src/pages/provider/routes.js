import React from "react";
import { Route } from "react-router";
import Home from "./home/home";
import Chat from "./chat/chat";

const ProviderRoutes = () => (
  <>
    <Route exact path="/provider/home/" element={<Home />} />
    <Route exact path="/provider/home/:userId" element={<Home />} />
    <Route exact path="/provider/chat/:clientId" element={<Chat />} />
  </>
);

export default ProviderRoutes;
