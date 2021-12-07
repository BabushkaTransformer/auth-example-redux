import Profile from "./components/Profile";
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {checkUserAuth, signIn, signUp} from "./store/slices/auth";
import {useEffect, useState} from "react";


function App() {
  const {isAuth, errorMessage, loading} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);
  const signUpHandler = (e) => {
    e.preventDefault();
    dispatch(signUp({email, password}));
  }
  const signInHandler = (e) => {
    e.preventDefault();
    dispatch(signIn({email, password}));
  }

  return (
    <div className="App">
      {loading ? <div>asdfdsaf</div>
        : <div>{!isAuth ? (
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
                       autoComplete="on"
                       onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button onClick={(e) => signUpHandler(e)}>Регистрация</button>
              <button onClick={(e) => signInHandler(e)}>Войти</button>
            </form>
          ) :
          <Profile/>
        }</div>
      }

    </div>
  );
}

export default App;
