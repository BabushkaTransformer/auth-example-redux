import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {updateProfile} from 'firebase/auth';
import {auth, storage} from "../../../firebase";
import {setAvatar} from "../auth";

//initialState:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const initialState = {
  file: null,
  loading: false,
  imageLoading: false,
  profileLoading: false,
  errorMessage: '',
}

//async functions:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
export const putImage = createAsyncThunk(
  'profile/putImage',
  async ({user, file}, {dispatch}) => {
    dispatch(setImageLoading(true));
    const avatar = ref(storage, `avatar/${user?.uid}/avatar.jpg`);
    try {
      await uploadBytes(avatar, file);
      dispatch(getImage(user));
    } catch (e) {
      dispatch(setErrorMessage(e.message));
    }
  }
)
export const getImage = createAsyncThunk(
  'profile/getImage',
  async (user, {dispatch}) => {
    try {
      const url = await getDownloadURL(ref(storage, `avatar/${user?.uid}/avatar.jpg`));
      dispatch(setAvatar(url));
      dispatch(setImageLoading(false));
    } catch (e) {
      dispatch(setErrorMessage(e.message));
    }
  }
)
export const update = createAsyncThunk(
  'profile/update',
  async ({name, dropdownValue}, {dispatch}) => {
    dispatch(setProfileLoading(true));
    try {
      await updateProfile(auth.currentUser, {displayName: name, photoURL: dropdownValue});
      dispatch(setProfileLoading(false));
    } catch (e) {
      dispatch(setErrorMessage(e.message()));
    }
  }
)

//slice:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileLoading(state, action) {
      state.profileLoading = action.payload;
    },
    setImageLoading(state, action) {
      state.imageLoading = action.payload;
    },
    setErrorMessage(state, action) {
      state.imageLoading = false;
      state.profileLoading = false;
      state.errorMessage = action.payload;
    }
  },
})

export default profileSlice.reducer;
export const {setProfileLoading, setImageLoading, setErrorMessage} = profileSlice.actions;