import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import {Form, Alert, Col, Row, Button, ListGroup} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  useHistory
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <div class="center-screen">
          <h1><Link to="/login">Log In</Link></h1>
          <h1><Link to="/signup">Sign Up</Link></h1>
        </div>
        <hr />
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function SignUp() {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [school, setSchool] = useState('');
  const [rank, setRank] = useState('');

  const [findID, setFindID] = useState('');
  const [findEmail, setFindEmail] = useState('');
  const [findPass, setFindPass] = useState('');

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

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
    Axios.post('http://localhost:3000/api/createUser', {
      ID: username,
      pass: pass,
      school: school,
      rank: rank
    });
  }

  const findUser = (e) => {
    // Axios.post('http://localhost:3306/api/getUser', {
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
    // })44

    let uData = getUserData(findID);
    console.log(uData);
  }

  return (
    <div>
      <h1 className="App">Create an Account</h1>
        <Col xs={6}>
            <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageUploader}
            style={{
              display: "none"
            }}
          />
          <div
            style={{
              height: "60px",
              width: "60px",
              border: "1px dashed black"
            }}
            onClick={() => imageUploader.current.click()}
          >
            <img
              ref={uploadedImage}
              style={{
                width: "100%",
                height: "100%",
                position: "acsolute"
              }}
            />
          </div>
          Click to upload Image
        </div>
          <Form>
            <Form.Group controlId="formRank">
              <Form.Label>Are you a Teacher or a Student?</Form.Label>
              <Form.Control placeholder="Teacher/Student" onChange={(e)=>{setRank(e.target.value)}}/>
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Enter Username" onChange={(e)=>{setUsername(e.target.value)}}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPass(e.target.value)}} />
            </Form.Group>
            <Form.Group controlId="formSchool">
              <Form.Label>School</Form.Label>
              <Form.Control placeholder="Purdue" onChange={(e)=>{setSchool(e.target.value)}} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={addUser}>
              Submit
            </Button>
          </Form>
{/* 
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
*/}
        </Col>
    </div>
  );
}

export default App;
