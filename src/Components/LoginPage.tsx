import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: darkblue !important;;
`;

const LoginBox = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;

  &::placeholder {
    color: #bbb;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: darkblue !important;;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #003366;
  }
`;

type User = {
  id?: number;
  username?: string;
  email?: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
};


const LoginPage = () => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [password, setPassword] = useState(localStorage.getItem("password") || "");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [saveApiLoginInfo, setsaveApiLoginInfo] = useState<{
    id?: number | undefined,
    username?: string | undefined,
    email?: string | undefined,
    firstName: string,
    lastName: string,
    gender: string,
    image: string,
    token: string,
    refreshToken: string,
  } | undefined>()



  const navigate = useNavigate();

  const validate = () => {
    const errors: { username?: string; password?: string } = {};
    if (!username) {
      errors.username = 'Username is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 5) {
      errors.password = 'Minimum 6 Characters are required';
    }
    return errors;
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    loginApi()
    // try {
    //   // login(username, password);
    //   navigate('/dashboard');
    // } catch (error) {
    // }
  };


  useEffect(() => {
    localStorage.setItem("username", username)
    localStorage.setItem("password", password)
  }, [password, username])



  const loginApi = () => {
    let obj = {
      username: username,
      password: password,
      expiresInMins: 60,
    }
    fetch(('https://dummyjson.com/user/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify(obj)
    })
      .then(async res => {
        if (!res.ok) {
        }
        const data = await res.json();
        console.log(data, 'datadatadata')
        localStorage.setItem("logindetails", JSON.stringify(data));
        navigate('/dashboard');
        // getAuthenticatedUser(data);
      })
  }

  const getAuthenticatedUser = (data: User) => {
    fetch('http://dummyjson.com/user/me', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${data.token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 401) {
            window.location.reload();
          } else {

          }
        }
      }
      )
  }

  return (
    <LoginContainer>
      <LoginBox>
        <Title>Login</Title>
        <form
          onSubmit={onSubmit}
        >
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="text"
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
              placeholder="Enter Username"
            />
            {errors.username && <Error>{errors.username}</Error>}
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
            {errors.password && <Error>{errors.password}</Error>}
          </FormGroup>
          <LoginButton type="submit">Login</LoginButton>
        </form>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginPage;
