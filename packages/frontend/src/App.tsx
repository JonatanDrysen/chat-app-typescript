import { Route, Routes } from "react-router-dom"

import HomePage from './pages/HomePage';
import SignupPage from "./pages/SignupPage";


function App() {
  return (
    <>
    <Routes>
      <Route path="/mychats" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
    </>
  );
}

export default App;
