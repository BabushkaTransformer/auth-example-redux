import {useState} from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "./firebase";
import Profile from "./components/Profile";
import './App.css';


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");


  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  const signUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div className="App">
      {!user ? (
          <form className="from">
            <span style={{color: 'red', marginBottom: '10px'}}>{errorMessage}</span>
            <div className="input">
              <label htmlFor='login'>Email</label>
              <input type='email'
                     id='login'
                     placeholder='email'
                     onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input">
              <label htmlFor='password'>Пароль</label>
              <input type='password'
                     id='password'
                     placeholder='password'
                     onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button onClick={signUp}>Регистрация</button>
            <button onClick={signIn}>Войти</button>
          </form>
        ) :
        <Profile user={user}/>
      }
    </div>
  );
}

export default App;
