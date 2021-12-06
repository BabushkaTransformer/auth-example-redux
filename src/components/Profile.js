import React, {useEffect, useState} from 'react';
import {signOut, updateProfile} from "firebase/auth";
import {auth, storage} from "../firebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import Dropdown from "./Dropdown";
import './Profile.css';


const Profile = ({user}) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [name, setName] = useState(user.displayName || '');
  const [imageLoading, setImageLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(user.photoURL || '');

  const avatar = ref(storage, `avatar/${user?.uid}/avatar.jpg`);


  useEffect(() => {
    getImage();
  });

  const logOut = async () => {
    await signOut(auth);
  }

  const handleFileSelected = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const putImage = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    try {
      await uploadBytes(avatar, file);
      await getImage();
    } catch (e) {
      console.log(e);
    }
  }

  const getImage = async () => {
    try {
      const url = await getDownloadURL(ref(storage, `avatar/${user?.uid}/avatar.jpg`));
      setUrl(url);
      setImageLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  const update = async () => {
    setProfileLoading(true);
    try {
      await updateProfile(auth.currentUser, {displayName: name, photoURL: dropdownValue});
      setProfileLoading(false);
    } catch (e) {
      setProfileLoading(false);
    }
  }

  return (
    <div className='profile'>

      <div className="email">
        <span>{user.email}</span>
      </div>

      <div className="avatar">

        <div className="avatar-image">
          <img
            src={url || 'data:image/png;base64,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'}
            alt='avatar'/>
        </div>
        <input type='file' onChange={handleFileSelected}/>
        <button onClick={putImage} disabled={!file}>{imageLoading ? "Загружается" : "Загрузить картинку"}</button>
      </div>

      <React.Fragment>
        <div className="input">
          <label>Ваша страна: </label>
          <Dropdown inputValue={dropdownValue}
                    setInputValue={setDropdownValue}/>
        </div>
        <div className="input">
          <label>Ваше имя: </label>
          <input value={name}
                 placeholder='Имя'
                 onChange={(e) => setName(e.target.value)}/>
        </div>
      </React.Fragment>

      <button onClick={update}>{profileLoading ? 'Сохраняем' : 'Сохранить изменения'}</button>
      <button onClick={logOut}>Выйти</button>
    </div>
  );
};

export default Profile;