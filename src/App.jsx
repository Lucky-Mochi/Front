import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Main from './page/Main/Main';
import Login1 from './page/Login/Login1';
import Login_new from './page/Login/Login_new';
import Login_login from './page/Login/Login_login';
import Login_choose from './page/Login/Login_choose';
import Login2 from './page/Login/Login2';
import Login_Mentee1 from './page/Login/Login_Mentee1';
import Login_Mentee2 from './page/Login/Login_Mentee2';
import Login_Mentee3 from './page/Login/Login_Mentee3';
import Login_Mento1 from './page/Login/Login_Mento1';
import Login_Mento2 from './page/Login/Login_Mento2';
import Login_Mento3 from './page/Login/Login_Mento3';
import Login_Mento4 from './page/Login/Login_Mento4';
import Chat from './page/Chat/Chat';
import ChatRoom from "./page/ChatRoom/ChatRoom";
import Search from "./page/Search/Search";
import Mypage from "./page/Mypage/Mypage";
import Mypage_mentee from "./page/Mypage/Mypage_mentee";
import { UserProvider } from "./context/UserContext";

function App() {
  
  return (
    <UserProvider>
    <Router>
    <Routes>

      <Route path="/home" element={<Main />} />
      <Route path="/login" element={<Login1 />} />
      <Route path="/" element={<Login_new />} />
      <Route path="/login_login" element={<Login_login />} />
      <Route path="/login_choose" element={<Login_choose />} />
      <Route path="/login2" element={<Login2 />} />
      <Route path="/login_mento1" element={<Login_Mento1 />} />
      <Route path="/login_mento2" element={<Login_Mento2 />} />
      <Route path="/login_mento3" element={<Login_Mento3 />} />
      <Route path="/login_mento4" element={<Login_Mento4 />} />
      <Route path="/login_mentee1" element={<Login_Mentee1 />} />
      <Route path="/login_mentee2" element={<Login_Mentee2 />} />
      <Route path="/login_mentee3" element={<Login_Mentee3 />} />
      <Route path="/chat" element={<Chat/>}/>
      <Route path="/chatroom" element={<ChatRoom/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/mypage_mento" element={<Mypage/>}/>
      <Route path="/mypage_mentee" element={<Mypage_mentee/>}/>

    </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
