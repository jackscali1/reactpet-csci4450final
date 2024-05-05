import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your custom components

import DeleteDogForm from './components/DeleteDog';
import ListDogs from './components/ListDogs';
import MDataGrid from './components/Posts';
import InsertDogForm from './components/InsertDog';
import UpdateDogForm from './components/UpdateDog';
import SearchDogForm from './components/SearchDog';
import Navbar from './components/Navbar';

const App = () => {
  return (


    <Router>
      <Navbar />

      <Routes>
        <Route path="/DataGrid" element={<MDataGrid />} />
        <Route path="/InsertDog" element={<InsertDogForm />} />
        <Route path="/ListDogs" element={<ListDogs />} />
        <Route path="/DeleteDog" element={<DeleteDogForm />} />
        <Route path="/UpdateDog" element={<UpdateDogForm />} />
        <Route path="/SearchDog" element={<SearchDogForm />} />
        
      </Routes>

    </Router>

  );
};

export default App;