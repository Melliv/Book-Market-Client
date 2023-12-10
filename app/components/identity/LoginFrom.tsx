"use client";
import { User } from '@/app/dto/User';
import { UserService } from '@/app/services/UserService';
import { TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';

const validationTemplate = {
  username: "",
  password: "",
}

export default function LoginFrom() {
  const [user, setUser] = useState(new User);
  const [alertMessage, setAlertMessage] = useState(validationTemplate);

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
      let res = await UserService.login(user);
      if (!res.error) {
        window.location.href = "/"
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='grid gap-4 mt-8'>

      <TextField id="user-username" label="Username" name='username' variant="outlined" error={alertMessage.username != ""} helperText={alertMessage.username} value={user.username} onChange={handleInputChange} />
      <TextField id="user-password" label="Passwrod" name='password' variant="outlined" type='password' error={alertMessage.password != ""} helperText={alertMessage.password} value={user.password} onChange={handleInputChange} />

      <button type="submit" className="default-button">Login</button>
    </form>
  )
}
