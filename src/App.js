//Modules
import { useState, useEffect } from "react";
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
  const [posts, setPosts] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [postText, setPostText] = useState("");

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      // here we're creating a variable to store the new state we want to introduce to our app
      const newState = [];
      // here we store the response from our query to Firebase inside of a variable called data.
      // .val() is a Firebase method that gets us the information we want
      const data = response.val();
      // data is an object, so we iterate through it using a for in loop to access each book name
      for (let key in data) {
        // pushing the values from the object into our newState array
        newState.push({
          key: key,
          title: data[key].userInput,
          postText: data[key].postText,
        });
      }
      // then, we call setBooks in order to update our component's state using the local array newState
      setPosts(newState);
    });
  }, []);

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
  // this function takes an argument, which is the ID of the book we want to remove
  const handleRemoveTitle = (titleId) => {
    // here we create a reference to the database
    // this time though, instead of pointing at the whole database, we make our dbRef point to the specific node of the book we want to remove
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${titleId}`);
    // using the Firebase method remove(), we remove the node specific to the book ID
    remove(dbRef);
  };
  return (
    <div className="App">
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.key}>
              <h1>{post.title}</h1>
              <p>{post.postText}</p>
              <button onClick={() => handleRemoveTitle(post.key)}>
                Remove
              </button>
            </li>
          );
        })}
      </ul>
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

export default App;
