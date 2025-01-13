import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UsersDetail from "./pages/UsersDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path={"/"} />
        <Route element={<UsersDetail />} path={"/:id"} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
