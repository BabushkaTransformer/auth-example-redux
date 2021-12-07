import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../../../firebase";
import {getImage} from "../profile";

//initialState:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const initialState = {
  user: {},
  isAuth: false,
  errorMessage: '',
  loading: false
}

//helper::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const userCreator = (response) => ({
  displayName: response.displayName,
  photoURL: response.photoURL,
  email: response.email,
  url: '',
  uid: response.uid
})

//async functions:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({email, password}, {dispatch}) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginSuccess(userCreator(response.user)));
    } catch (error) {
      dispatch(loginFailed(error));
    }
  }
)
export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({email, password}, {dispatch}) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(loginSuccess(userCreator(response.user)));
    } catch (error) {
      dispatch(loginFailed(error));
    }
  }
)
export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, {dispatch}) => {
    await signOut(auth);
    dispatch(loginFailed(''));
  }
)
export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, {dispatch}) => {
    dispatch(loginPending());
    await onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) {
        dispatch(getImage(currentUser));
        dispatch(loginSuccess(userCreator(currentUser)));
      }else {
        dispatch(loginFailed(''));
      }
    })
  }
)

//slice:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
      loginPending(state) {
        state.loading = true;
      },
      loginSuccess(state, action) {
        state.loading = false;
        state.errorMessage = '';
        state.isAuth = true;
        state.user = action.payload;
      },
      loginFailed(state, action) {
        state.loading = false;
        state.isAuth = false;
        state.errorMessage = action.payload.message;
      },
      setAvatar(state, action) {
        state.user.url = action.payload;
      }
    },
  }
)

export default authSlice.reducer;
export const {loginPending, loginSuccess, loginFailed, setAvatar} = authSlice.actions;

