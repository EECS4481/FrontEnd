import "./App.css";
import SignIn from "./sign-in/sign-in.component";
import Home from "./home/home.component";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
