import { useState, useEffect } from "react";
import firebase from "../firebase";
import { getDatabase, ref, onValue, remove } from "firebase/database";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      // here we're creating a variable to store the new state we want to introduce to our app
      const newState = [];
      // here we store the response from our query to Firebase inside of a variable called data.
      const data = response.val();
      for (let key in data) {
        newState.push({
          key: key,
          title: data[key].titleText,
          description: data[key].postText,
        });
      }
      setPosts(newState);
    });
  }, []);

  const handleRemoveTitle = (titleId) => {
    // here we create a reference to the database
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${titleId}`);
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
