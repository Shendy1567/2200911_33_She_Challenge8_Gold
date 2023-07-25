import React, { useRef } from "react";
import axios from "../lib/axios";
import { Container, Button, Form } from 'react-bootstrap';

function CreatePlayer({ onRefresh }) {

  const refUsername = useRef();
  const refEmail = useRef();
  const refPassword = useRef();
  const refExperience = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const PlayerData = {
      username: refUsername.current.value,
      email: refEmail.current.value,
      password: refPassword.current.value,
      experience: refExperience.current.value,
    }

    const CreateNewPlayer = async () => {
      try {
        const CreatePlayer = await axios.post("api/v1/players", PlayerData)
        if (CreatePlayer.status != 201) {
          alert("Save data has failed");
        }

        onRefresh();
      }
      catch (err) {
        alert(err.message);
      };
    }

    CreateNewPlayer();
  }


  return (
    <>
      <h1>Create New Player </h1>
      <Container className="mt-5 mb-4">
        <Form className="" onSubmit={onSubmit}>
          <div className="row justify-content-around">
            <div className="col-4">
              <h3>Username</h3>
              <input className="search form-control mt-3" ref={refUsername} type="text" placeholder="Search..." />
            </div>
            <div className="col-4">
              <h3>Email</h3>
              <input className="search form-control mt-3" ref={refEmail} type="email" placeholder="Search..." />
            </div>
          </div>
          <div className="row justify-content-around mt-5">
            <div className="col-4">
              <h3>Password</h3>
              <input className="search form-control mt-3" ref={refPassword} type="password" placeholder="Search..." />
            </div>
            <div className="col-4">
              <h3>Experience</h3>
              <input className="search form-control mt-3" ref={refExperience} type="integer" placeholder="Search..." />
            </div>
          </div>

          <div className="d-flex justify-content-end mt-5">
            <Button type="submit">
              Save Data
            </Button>
            <Button className="ms-4" type="reset">
              Reset
            </Button>
          </div>

        </Form>



      </Container>
      {/* <Form className="container-fluid " onSubmit={onSubmit}>
        <h1>Create Player</h1>

        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control style={{ width: '18rem' }} ref={refUsername} type="text" placeholder="Type Your Username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control style={{ width: '18rem' }} ref={refEmail} type="email" placeholder="Type Your email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control style={{ width: '18rem' }} ref={refPassword} type="password" placeholder="Type Your Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formExperience">
          <Form.Label>Experience</Form.Label>
          <Form.Control style={{ width: '18rem' }} ref={refExperience} type="integer" placeholder="Type Your Experience" />
          <Form.Text>Example: 60000</Form.Text>
        </Form.Group>
        <Button type="submit">
          Save Data
        </Button>
        <Button className="ms-4" type="reset">
          Reset
        </Button>
      </Form> */}
    </>

  );
}

export default CreatePlayer;