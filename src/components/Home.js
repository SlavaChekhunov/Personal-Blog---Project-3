import { useState, useEffect } from "react";
import firebase from "../firebase";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import { Link, Routes, Route } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const [titleText, setTitleText] = useState("");
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
          title: data[key].titleText,
          description: data[key].postText,
        });
      }
      // then, we call setBooks in order to update our component's state using the local array newState
      setPosts(newState);
    });
  }, []);

  const handleRemoveTitle = (titleId) => {
    // here we create a reference to the database
    // this time though, instead of pointing at the whole database, we make our dbRef point to the specific node of the book we want to remove
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${titleId}`);
    // using the Firebase method remove(), we remove the node specific to the book ID
    remove(dbRef);
  };

  return (
    <div className="wrapper">
      <div className="posts">
        {posts.map((post) => {
          return (
            <div key={post.key}>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
             <button onClick={() => handleRemoveTitle(post.key)}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
