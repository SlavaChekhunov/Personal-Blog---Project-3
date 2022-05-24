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
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {!userAuth ? (
              <Link to="/login">Login</Link>
            ) : (
              <>
              <Link to="/create">Create a post</Link>
              <button className = "logOut" onClick={signUserOut}>Log Out</button>
              </>
            )}
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home userAuth={userAuth} />}/>
        <Route path="/create" element={<CreatePost userAuth={userAuth} />} />
        <Route path="/login" element={<Login setUserAuth={setUserAuth} />} />
      </Routes>
    </div>
  );
};

export default App;
