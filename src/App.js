//Modules
import { useState, useEffect } from "react";
import { Link, Routes, Route } from 'react-router-dom';
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
} from "firebase/database";
//Config
import firebase from "./firebase";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
//styling
import "./App.css";

const App = () => {
  return (
    <div className="wrapper">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create a post</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
     
    </div>
  );
};

export default App;
