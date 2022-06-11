import { useState} from "react";
import firebase from "../firebase";
import { getDatabase, ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import {auth} from '../firebase';
import "../App.css";

const CreatePost = () => {
  let navigate = useNavigate();
  const [titleText, setTitleText] = useState("");
  const [postText, setPostText] = useState("");

  const currentDate = new Date();
  const postDate = currentDate.toLocaleString('default', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleInputChange = (event) => {
    setTitleText(event.target.value);
  };
  
  const handlePostChange = (event) => {
    setPostText(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    push(dbRef, {titleText: titleText, postText: postText, date: postDate, name: auth.currentUser.displayName, id: auth.currentUser.uid});
    setTitleText("");
    setPostText("");
    navigate("/");
  };

  return (
    <div className="form">
      <form action="submit">
        <label htmlFor="newBook">Add a new title</label>
        <input
          type="text"
          id="newBook"
          onChange={handleInputChange}
          value={titleText}
        />
        <label htmlFor="newBook">Post</label>
        <textarea
          id="post"
          name="Post"
          rows="20"
          cols="20"
          onChange={handlePostChange}
          value={postText}
          placeholder="Please login to create your own posts."
        ></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;

