
import './index.css';
import React from "react";
import LoginBox from './LoginBox';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Chat from './Chat';
import NoMatch from './NoMatch';
import Register from './Register';
import Rooms from './Rooms';
import MakeRoom from './MakeRoom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginBox />}/>
      <Route path="/Login" element={<LoginBox/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="Chat/:roomName" element={<Chat/>}/>
      <Route path="/Rooms" element={<Rooms/>}/>
      <Route path="/MakeRoom" element={<MakeRoom/>}/>
      <Route path="*" element={<NoMatch />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
