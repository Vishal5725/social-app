import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Social from "./pages/Social";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
           path="/"
          element={<Social />}
          
        />
        <Route
           path="/Social"
          element={<Social />}
          
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;