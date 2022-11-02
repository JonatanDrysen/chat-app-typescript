import { Navigate, Route, Routes } from "react-router-dom"

import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={ <Navigate to="/mychats" /> } />
      <Route path="/mychats" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </>
  );
}

export default App;
