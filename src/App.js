//Modules
import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from "./firebase";

//Config
import CreatePost from "./components/CreatePost";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import profile from "./profile.jpg";

//styling
import "./App.css";

const App = () => {
  const [userAuth, setUserAuth] = useState(localStorage.getItem('userAuth'));
  let navigate = useNavigate();
  const signUserOut = () => {
    signOut(auth)
    .then(() => {
      localStorage.clear()
      setUserAuth(false)
      navigate("/login")
    })
  }

  return (
    <div className="wrapper">
      <div className="header">
      <Navbar />
        <div className="profile">
          <div className="picture">
            <img src={profile} />
          </div>
          <p className="profileDescription">
            Personal Blog by
            <a className= "anchor" href="https://www.linkedin.com/in/slava-chekhunov/">
              Slava Chekhunov.
            </a>
            <br />I write about tech and put it on the internet.
          </p>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home userAuth={userAuth} />} />
        <Route path="/create" element={<CreatePost userAuth={userAuth} />} />
        <Route path="/login" element={<Login setUserAuth={setUserAuth} />} />
      </Routes>
    </div>
  );
};

export default App;
