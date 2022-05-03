import { useState, useEffect } from "react";
import firebase from "../firebase";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import { Link, Routes, Route } from "react-router-dom";
import "../App.css";

const CreatePost = (props) => {
  const [posts, setPosts] = useState([]);

  const [userInput, setUserInput] = useState("");
  const [postText, setPostText] = useState("");

    const handleInputChange = (event) => {
      // we're telling React to update the state of our `App` component to be
      // equal to whatever is currently the value of the input field
      setUserInput(event.target.value);
    };
    const handlePostChange = (event) => {
      setPostText(event.target.value);
    };

    const handleSubmit = (event) => {
      // event.preventDefault prevents the default action (form submission and page refresh)
      event.preventDefault();
      // create a reference to our database
      const database = getDatabase(firebase);
      const dbRef = ref(database);
      // push the value of the `userInput` state to the database
      push(dbRef, { userInput, postText });
      // reset the state to an empty string
      setUserInput("");
      setPostText("");
    };

  return (
    <div className="form">
      <form action="submit">
        <label htmlFor="newBook">Add a new title</label>
        <input
          type="text"
          id="newBook"
          onChange={handleInputChange}
          value={userInput}
        />
        <label htmlFor="newBook">Post</label>
        <textarea
          id="post"
          name="Post"
          rows="20"
          cols="20"
          onChange={handlePostChange}
          value={postText}
        ></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
