import React, { useState } from 'react';
import TableView from './components/Table'
import EditPlayer from './components/Edit';
import SearchPlayer from './components/Search';
import CreatePlayer from './components/Create'
import { Container } from 'react-bootstrap';
import {BrowserRouter, Route, Routes} from 'react-router-dom'



function App() {
  const [refresh, setRefresh] = useState(0);

  const handleOnRefresh = () => {
    setRefresh(refresh + 1);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Container className=' pt-5'>
            <CreatePlayer onRefresh={handleOnRefresh} />
            <TableView refresh={refresh} />
          </Container>
        }/>
        <Route path='edit/:id' element={
          <Container className='pt-5'>
            <EditPlayer />
          </Container>
        }/>
        <Route path='/search' element={
          <Container className='pt-5'>
            <SearchPlayer />
          </Container>
        }/>


      </Routes>
    </BrowserRouter>

    
  )
}




export default App
