import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import {Form, Alert, Col, Row, Button, ListGroup} from 'react-bootstrap';

function App() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [findID, setFindID] = useState('');
  const [findEmail, setFindEmail] = useState('');
  const [findPass, setFindPass] = useState('');

  const GET = {
    credentials: "include",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const getUserData = (user) => {
    return new Promise(async (resolve, reject) => {
      const path = "/api/getUser/" + user;
  
      await fetch(path, GET)
        .then(async response => {
          const res = await response.json();
          resolve(res);
        })
        .catch(error => {
          console.error("Error: ", error);
          reject(error);
        });
    });
  };

  const addUser = (e) => {
    Axios.post('http://localhost:3002/api/createUser', {
      ID: email,
      pass: pass
    });
  }

  const findUser = (e) => {
    // Axios.post('http://localhost:3002/api/getUser', {
    //   params: {
    //     ID: findID
    //   }
    // }).then((response) => {
    //   console.log(response);
    //   window.localStorage.setItem('res', JSON.stringify(response));

    //   // setFindID(response.data.UserID);
    //   // setFindEmail(response.data);
    //   // setFindPass(response.data.Password);
    //   // // response.data
    // })

    let uData = getUserData(findID);
    console.log(uData);
  }

  return (
    <div>
      <h1 className="App">Title Here</h1>
      <h2 className="App">Users</h2>
        <Col xs={6}>
          <Alert variant='primary'>Create Account</Alert>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPass(e.target.value)}} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={addUser}>
              Submit
            </Button>
          </Form>

          <Alert variant='light' />

          <Alert variant='primary'>Login</Alert>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPass(e.target.value)}} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={addUser}>
              Submit
            </Button>
          </Form>

          <Alert variant='light' />
        </Col>
    </div>
  );
}

export default App;
