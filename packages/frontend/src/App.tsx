import { Route, Routes } from "react-router-dom"

import HomePage from './pages/HomePage';


function App() {
  return (
    <>
    <Routes>
      <Route path="/mychats" element={<HomePage />} />
    </Routes>
    </>
  );
}

export default App;
