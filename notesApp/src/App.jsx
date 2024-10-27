import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'

import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if user is logged in
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const routes=(
  <Router>
    <Routes>
      <Route path="/dashboard" exact element={<ProtectedRoute element={<Home />} />}/>
      <Route path="/login" exact element={<Login/>}/>
      <Route path="/signUp" exact element={<SignUp/>}/>
      {/* added default path */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
)

function App() {
  return <div>{routes}</div>
}

export default App
