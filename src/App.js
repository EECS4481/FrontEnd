import "./App.css";
import SignIn from "./pages/sign-in/sign-in";
import { Routes, Route } from "react-router-dom";
import ClientRoutes from "./pages/client/routes";
import ProviderRoutes from "./pages/provider/routes";

const clientRoutes = ClientRoutes();
const providerRoutes = ProviderRoutes();

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      {clientRoutes}
      {providerRoutes}
    </Routes>
  );
}

export default App;
