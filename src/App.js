import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { getPoems, postPoem } from './ApiCalls';
import Poems from './Poems';
import Form from './Form/Form';
import SinglePoem from './singlePoem/SinglePoem';
import {Routes, Route, Link, useParams} from "react-router-dom";
import Loading from './Loading';

function App() {
  const [poems, setPoems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  // const params = useParams()

  useEffect(() => {
    setLoading(true)
    getPoems()
    .then(data => {
      setPoems(data.poems)
      setLoading(false)
    })
    .catch(err => setError(err.message))
  }, [])


  function handleFormClick(data) {
    const updatedPoems = poems && [...poems, data];
      setPoems(updatedPoems);
  }

  return (
    <div className="App">
       <nav className="nav">
        <h1 className="logo-title">Rhythm & Rizz</h1>
        <div className="nav-buttons">
          <Link to={"/"} className="nav-button">
          All Poems
          </Link>
          <Link to={"/form"} className="nav-button">
          Add New Poem
          </Link>
        </div>
      </nav>
      {loading && <Loading/>} 
    <Routes>
      <Route path="/" element={<Poems poems={poems} />}/>
      <Route path="/:id" element={<SinglePoem poems={poems} />}/>
      <Route path="/form" element={<Form handleFormClick={handleFormClick} setLoading={setLoading} />}/>
    </Routes>
    </div>
  );
}

export default App;
