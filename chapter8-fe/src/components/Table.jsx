import React, { useEffect, useState } from "react";
import axios from "../lib/axios"
import { Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import editLogo from '../assets/edit.svg'

function TableView({ refresh }) {

  const [players, setPlayers] = useState([]);
  const getPlayersFromBe =
    async () => {
      try {
        const playersData = await axios.get("/api/v1/players")
        setPlayers(playersData.data.data)
      }
      // axios
      // .get("/api/v1/players")
      // .then(() => {
      //   setPlayers(data.data)
      // })
      catch (err) {
        alert("something went wrong");
      };
    };

  useEffect(() => {
    getPlayersFromBe();
  }, [refresh]);

  return (
    <>
      {/* <button
      className="btn btn-info btn-sm"
      onClick={() => getPlayersFromBe()}
    >
      Load
    </button>
    <button className="btn btn-danger btn-sm" onClick={() => setPlayers([])}>
      Clear
    </button> */}

      <Container className="pt-5">
        <Container className="d-flex justify-content-center mb-5">
          <Link to={"/Search"} className="btn btn-primary">
            Search Player
          </Link>
        </Container>
        <Container className="d-flex justify-content-center mb-5">
          <Table style={{ width: '80%' }} striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Experience</th>
                <th>Level</th>
                <th>Created At</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {players &&
                players.map((player, key) => (
                  <tr key={key}>
                    <td className="align-middle">{player.id}</td>
                    <td className="align-middle">{player.username}</td>
                    <td className="align-middle">{player.email}</td>
                    <td className="align-middle">{player.password}</td>
                    <td className="align-middle">{player.experience}</td>
                    <td className="align-middle">{player.lvl}</td>
                    <td className="align-middle">{player.createdAt}</td>
                    <td className="align-middle">{player.updatedAt}</td>
                    <td className="align-middle">
                      <Link to={"/Edit/" + player.id} className="text-decoration-none">
                        <Container className="d-flex border border-primary rounded">
                        <img className="me-2" src={editLogo} alt="Edit logo" />
                        <div>Edit</div>
                        </Container>
                        
                        
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>

      </Container>


    </>
  );
}


export default TableView;
