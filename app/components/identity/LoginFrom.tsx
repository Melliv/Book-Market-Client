"use client";
import { User } from '@/app/dto/User';
import { UserService } from '@/app/services/UserService';
import { TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserId } from '@/app/store/reducers/user';
import Error from '../common/Error';

const validationTemplate = {
  username: "",
  password: "",
}

export default function LoginFrom() {
  const [user, setUser] = useState(new User);
  const [errorMessage, setErrorMessage] = useState("");

  const [alertMessage, setAlertMessage] = useState(validationTemplate);
  const dispatch = useDispatch();

  const handleValidation = () => {
    let formIsValid = true;

    setAlertMessage(validationTemplate);

    if (!user.username) {
      setAlertMessage(prevState => ({
        ...prevState,
        username: "Username field can not be empty!"
      }));
      formIsValid = false;
    }
    if (!user.username) {
      setAlertMessage(prevState => ({
        ...prevState,
        password: "Password field can not be empty!"
      }));
      formIsValid = false;
    }

    return formIsValid;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const valid = handleValidation()

    if (valid) {
      setErrorMessage("")
      let res = await UserService.login(user);
      if (!res.error) {
        dispatch(setUserId(res.user.id))
        window.location.href = "/"
      } else {
        setErrorMessage("Username or password is wrong!")
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='grid gap-4 mt-8'>
      {errorMessage ? <Error message={errorMessage} /> : <></>}
      <TextField id="user-username" label="Username" name='username' variant="outlined" error={alertMessage.username != ""} helperText={alertMessage.username} value={user.username} onChange={handleInputChange} />
      <TextField id="user-password" label="Passwrod" name='password' variant="outlined" type='password' error={alertMessage.password != ""} helperText={alertMessage.password} value={user.password} onChange={handleInputChange} />

      <button type="submit"  className="default-button">Login</button>
    </form>
  )
}
