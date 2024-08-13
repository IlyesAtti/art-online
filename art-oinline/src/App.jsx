import { useState, useEffect } from 'react';
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Nav from './Components/Nav';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostForm from './Pages/PostForm';


function App() {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user', { 
          headers: { 'Content-Type': 'application/json' }, 
          credentials: 'include',
        });

        const content = await response.json();

        setName(content.name || ''); 
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []); 

  return (
    <div className="App">
      <BrowserRouter>
        <Nav name={name} setName={setName} />
        <main className="main-content">
          <Routes>
            <Route path="/" exact element={<Home name={name} />} />
            <Route path="/login" element={<Login setName={setName} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/posts/new" element={<PostForm />} />
            <Route path="/posts/edit/:id" element={<PostForm />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
