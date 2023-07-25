import React, { useEffect, useRef, useState } from "react";
import axios from "../lib/axios";
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

function EditPlayer() {
  const {id} = useParams();
  const [player, setPlayer] = useState({}); 


  const refUsername = useRef();
  const refEmail = useRef();
  const refPassword = useRef();

  useEffect(() => {
    playerDetails();
  }, [])

  const playerDetails = (e) => {
    const getPlayer = async() => {
      try {
        const GetPlayerRoute = await axios.get('api/v1/players/' + id)
        
        setPlayer(GetPlayerRoute.data.data)
      }
      catch(err) {
        alert("something went wrong");
      };
    }
    getPlayer()
  }

  const onSubmit =(e) => {
    e.preventDefault();

    const PlayerData = {
      username : refUsername.current.value,
      email : refEmail.current.value,
      password : refPassword.current.value,
    }

    const EditPlayer = async() => {
      try {
        const EditPlayerRouter = await axios.put('api/v1/players/' + id, PlayerData)
        if(EditPlayerRouter.status != 200){
          alert("Save data has failed");
        }
        alert("Save data has success");
      }
      catch(err) {
        alert("something went wrong");
      };
    }
    EditPlayer();
  }



  return (
    <>
      <h1>Edit Player - {id}</h1>
      
        <Form className="" onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control style={{ width: '18rem' }} ref={refUsername} type="text" placeholder="Type Your Username" />
            <Form.Text>Last changes : {player.username}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control style={{ width: '18rem' }} ref={refEmail} type="email" placeholder="Type Your email" />
            <Form.Text>Last changes : {player.email}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control style={{ width: '18rem' }} ref={refPassword} type="text" placeholder="Type Your Password" />
            <Form.Text>Last changes : {player.password}</Form.Text>
          </Form.Group>
          <Button type="submit">
            Update Data
          </Button>
          <Button className="ms-4" type="reset">
            Reset
          </Button>
          <Link className="btn btn-secondary ms-4" to="/">
            Back to menu
          </Link>
        </Form>



    </>

  );
}

export default EditPlayer;