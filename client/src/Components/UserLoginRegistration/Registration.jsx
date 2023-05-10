import React, { useState } from 'react';
import classes from './LoginReg.module.css';
import { userRegistration } from '../ApiCalls/UserRegistration';
import { useDispatch, useSelector } from 'react-redux';
import DisplayErrorMsg from '../Utils/DisplayErrorMsg';
import { userAction } from '../../Store/Slices/user-slice';
import DisplaySuccessMsg from '../Utils/DisplaySuccessMsg';

function RegistrationForm(props) {
  const [userInputs, setUserInputs] = useState({
    name: '',
    email: '',
    password: '',
    photo: null,
    profilePic: null,
  });
  const ErrMsg = useSelector((state) => state.user.ErrMsg);
  const SuccessMsg = useSelector((state) => state.user.SuccessMsg);
  const dispatch = useDispatch();
  const onCloseHandler = (e, type) => {
    e.preventDefault();
    if (type === 'Error') {
      dispatch(userAction.setErrorMsg(null));
    }
    if (type === 'Success') {
      dispatch(userAction.setSuccessMsg(null));
      props.onSwap((old) => !old);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(userInputs).forEach(([key, value]) => {
      if (key !== 'photo') {
        formData.append(key, value);
      }
    });
    dispatch(userRegistration(formData));
  };
  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setUserInputs((old) => {
          return {
            ...old,
            photo: reader.result,
          };
        });
      };
      setUserInputs((old) => ({ ...old, profilePic: selectedFile }));
    }
  };
  const onUserInputHandler = (e) => {
    const { name, value } = e.target;
    setUserInputs((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

  return (
    <div>
      {ErrMsg && (
        <DisplayErrorMsg
          text={ErrMsg}
          onClose={(e) => onCloseHandler(e, 'Error')}
        />
      )}
      <form className={classes.registrationForm} onSubmit={handleSubmit}>
        <h2>Registration Form</h2>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            value={userInputs.name}
            onChange={onUserInputHandler}
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            value={userInputs.email}
            onChange={onUserInputHandler}
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            value={userInputs.password}
            onChange={onUserInputHandler}
          />
        </div>
        <div>
          <label htmlFor='photo'>Photo:</label>
          <div className={classes.inputDiv}>
            <label className={classes.fileLabel}>
              <span style={{ cursor: 'pointer' }}>📤Upload Picture</span>
              <input
                type='file'
                name='profilePic'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />
            </label>
          </div>
          {userInputs.photo && (
            <img
              src={userInputs.photo}
              alt='User photo'
              style={{ width: '100px', height: '100px' }}
            />
          )}
        </div>
        <button type='submit'>Register</button>
        <p
          onClick={() => props.onSwap((old) => !old)}
          style={{ cursor: 'pointer', color: 'blue' }}
        >
          Already Register?
        </p>
      </form>
      {SuccessMsg && (
        <DisplaySuccessMsg
          text={ErrMsg}
          onClose={(e) => onCloseHandler(e, 'Success')}
          redirectMsg={'Click To Login!'}
        />
      )}
    </div>
  );
}

export default RegistrationForm;
