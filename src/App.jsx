import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Main from './page/Main/Main';
import Login1 from './page/Login/Login1';
import Login2 from './page/Login/Login2';
import Login_Mentee1 from './page/Login/Mentee/Login_Mentee1';
import Login_Mentee2 from './page/Login/Mentee/Login_Mentee2';
import Login_Mentee3 from './page/Login/Mentee/Login_Mentee3';
import Login_Mento1 from './page/Login/Mento/Login_Mento1';
import Login_Mento2 from './page/Login/Mento/Login_Mento2';
import Login_Mento3 from './page/Login/Mento/Login_Mento3';
import Login_Mento4 from './page/Login/Mento/Login_Mento4';
import Login_Mento5 from './page/Login/Mento/Login_Mento5';

function App() {
  
  return (
    <Router>
    <Routes>

      <Route path="/" element={<Login1 />} />
      <Route path="/login2" element={<Login2 />} />
      <Route path="/login_mento1" element={<Login_Mento1 />} />
      <Route path="/login_mento2" element={<Login_Mento2 />} />
      <Route path="/login_mento3" element={<Login_Mento3 />} />
      <Route path="/login_mento4" element={<Login_Mento4 />} />
      <Route path="/login_mento5" element={<Login_Mento5 />} />
      <Route path="/login_mentee1" element={<Login_Mentee1 />} />
      <Route path="/login_mentee2" element={<Login_Mentee2 />} />
      <Route path="/login_mentee3" element={<Login_Mentee3 />} />
    </Routes>
    </Router>
  );
}

export default App;
