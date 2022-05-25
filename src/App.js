//Modules
import { useState } from "react";
import { Link, Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

//Config
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import Login from "./components/Login";
import { signOut } from 'firebase/auth';
import { auth } from "./firebase";
import profile from "./profile.jpg";

// console.log(profile)

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
        <h1>Oversimplified</h1>
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
      <nav>
        <ul>
          <li className="home">
            <Link to="/">Home</Link>
          </li>
          <li>
            {!userAuth ? (
              <Link to="/login">Login</Link>
            ) : (
              <>
                <Link to="/create">Create a post</Link>
                <button className="logOut" onClick={signUserOut}>
                  Log Out
                </button>
              </>
            )}
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home userAuth={userAuth} />} />
        <Route path="/create" element={<CreatePost userAuth={userAuth} />} />
        <Route path="/login" element={<Login setUserAuth={setUserAuth} />} />
      </Routes>
    </div>
  );
};

export default App;
