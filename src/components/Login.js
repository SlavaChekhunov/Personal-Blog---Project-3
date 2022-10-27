import {auth, provider} from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserAuth }) => {
    let navigate = useNavigate();
    const signInWithGoogle = () => {
       signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result.data)
            localStorage.setItem('userAuth', true)
            setUserAuth(true);
            navigate("/");
        })
    }
    return (
      <div className="loginPage">
        <p className="loginTag">Sign In with Google to create and edit your own Posts</p>
        <button className="google-btn" onClick={signInWithGoogle}>
        Sign In with Google
        </button>
      </div>
    );
}

export default Login;