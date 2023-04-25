import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Add from './pages/Add'

function App() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            {/* <Route path="/" element={<Home />}  />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> */}
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}  />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/add" element={user ? <Add /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
