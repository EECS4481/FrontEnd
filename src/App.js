import "./App.css";
import SignIn from "./pages/sign-in/sign-in";
import Home from "./pages/client/home/home";
import Chat from "./pages/client/chat/chat";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="/client/home/:userId" element={<Home />} />
      <Route exact path="/client/chat/:chatId" element={<Chat />} />
    </Routes>
  );
}

export default App;
