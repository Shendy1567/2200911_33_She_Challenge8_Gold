import React, { useEffect, useState } from "react";
import axios from "../lib/axios"
import { Container, Form } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

function SearchPlayer({ refresh }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [level, setLevel] = useState("");

  const getPlayersFromBe =
    async () => {
      try {
        const allPlayersData = await axios.get("/api/v1/players")
        setPlayers(allPlayersData.data.data)
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

  const [players, setPlayers] = useState([]);
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const playersData = await axios.get(`/api/v1/players/?username=${username}&lvl=${level}&email=${email}&experience=${experience}`)
      if (playersData.data.data.length != 1) {
        setPlayers([])
      } else {
        setPlayers([])
        setPlayers(playersData.data.data)
      }

    }
    catch (err) {
      alert("something went wrong");
    };
  };

  return (
    <>
      <Link className="btn btn-secondary text-white" to="/">
        Back
      </Link>
      <div>

        <Container className="pt-5">
          <h1>Search Players</h1>
          <Container className="mt-5 mb-4">
            <Form className="container" onSubmit={onSubmitForm}>
              <div className="row justify-content-around">
                <div className="col-4">
                  <h3>Based on username</h3>
                  <input className="search form-control mt-3" type="text" name="username" value={username} placeholder="Search..." onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="col-4">
                  <h3>Based on email</h3>
                  <input className="search form-control mt-3" type="text" name="email" value={email} placeholder="Search..." onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="row justify-content-around mt-5">
                <div className="col-4">
                  <h3>Based on experience</h3>
                  <input className="search form-control mt-3" type="integer" name="experience" value={experience} placeholder="Search..." onChange={e => setExperience(e.target.value)} />
                </div>
                <div className="col-4">
                  <h3>Based on level</h3>
                  <input className="search form-control mt-3" type="integer" name="level" value={level} placeholder="Search..." onChange={e => setLevel(e.target.value)} />
                </div>
              </div>

              <div className="d-flex justify-content-end mt-5">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>

            </Form>

            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-secondary text-white"
                onClick={() => getPlayersFromBe()}
              >Load All Data</button>
            </div>


          </Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Experience</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {players &&
                players.map((player, key) => (
                  <tr key={key}>
                    <td>{player.id}</td>
                    <td>{player.username}</td>
                    <td>{player.email}</td>
                    <td>{player.experience}</td>
                    <td>{player.lvl}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          {players.length === 0 &&
            <div>
              <p className="text-center">No Result Found</p>
              <p className="text-center">Enter your search base exact value</p>
              <p className="text-center">Example: username : HardcoreLevellingWarrior</p>
            </div>
          }


        </Container>
      </div>

    </>
  );
}



export default SearchPlayer;

