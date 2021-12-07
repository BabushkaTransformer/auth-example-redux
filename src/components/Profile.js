import React, {useState} from 'react';
import Dropdown from "./Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../store/slices/auth";
import {putImage, update} from "../store/slices/profile";
import './Profile.css';


const Profile = () => {
  const user = useSelector(({auth: {user}}) => user);
  const imageLoading = useSelector(({profile: {imageLoading}}) => imageLoading);
  const profileLoading = useSelector(({profile: {profileLoading}}) => profileLoading);
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [name, setName] = useState(user.displayName || '');
  const [dropdownValue, setDropdownValue] = useState(user.photoURL || '');


  const handleFileSelected = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
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
            src={user.url || 'https://cdn.pixabay.com/photo/2021/11/01/08/39/petit-minou-lighthouse-6759731_960_720.jpg'}
            alt='avatar'/>
        </div>
        <input type='file' onChange={handleFileSelected}/>
        <button onClick={() => dispatch(putImage({user, file}))}
                disabled={!file}>{imageLoading ? "Загружается" : "Загрузить картинку"}</button>
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

      <button
        onClick={(e) => dispatch(update({name, dropdownValue}))}>
        {profileLoading ? 'Сохраняем' : 'Сохранить изменения'}
      </button>
      <button onClick={() => dispatch(logOut())}>Выйти</button>
    </div>
  );
};

export default Profile;