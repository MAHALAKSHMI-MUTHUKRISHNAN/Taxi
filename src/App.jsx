import { SignUp } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./Pages/SignInPage";
import Home from "./Pages/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<Home/>}></Route>
        <Route path="/" element={<SignInPage/>}></Route>
      </Routes>
      </Router>
  )
}

export default App
