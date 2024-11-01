import React, { useState } from "react";

import "./Main.css";

import { useNavigate } from "react-router-dom";

import CountryQuizGame from "./CountryQuizGame";


import FindIncorrectWordGame from "./FindIncorrectWordGame"; // 새 게임 컴포넌트 가져오기

  

function Main() {

const navigate = useNavigate();

const [showPopup, setShowPopup] = useState(false);

const [currentGame, setCurrentGame] = useState(null); // 초기 상태 null로 설정하여 선택 화면 표시

  

const handleNotificationClick = () => {

setShowPopup(true);

};

  

const closePopup = () => {

setShowPopup(false);

};

  

// 게임이 종료될 때 실행될 함수

const handleGameEnd = () => {

setCurrentGame(null); // 게임 종료 시 선택 화면으로 돌아가기 위해 null로 설정

};

  

const selectGame = (game) => {

console.log("Game selected:", game); // 상태 변경 확인을 위한 로그

setCurrentGame(game); // 선택한 게임으로 전환

};

  

return (

<div className="Main">

<div className="content-wrapper">

<div className="header">

<div className="main-logo"></div>

<div className="notification" onClick={handleNotificationClick}></div>

</div>

  

{/* Game Section */}

<div className="game-section">

{currentGame === "CountryQuizGame" && (

<CountryQuizGame onGameEnd={handleGameEnd} /> // CountryQuizGame에 게임 종료 핸들러 전달

)}

{currentGame === "FindIncorrectWordGame" && (

<FindIncorrectWordGame onGameEnd={handleGameEnd} /> // FindIncorrectWordGame에 게임 종료 핸들러 전달

)}

{currentGame === null && (

<div className="game-selection">

<p id = "gamename">게임을 선택하세요!</p>

<button id = "game" onClick={() => selectGame("CountryQuizGame")}>나라 인사말 맞추기</button>

<button id = "game" onClick={() => selectGame("FindIncorrectWordGame")}>틀린 나라 이름 찾기</button>

</div>

)}

</div>

  

{/* Feature Section */}

<div className="feature-section">

<button id="mentoring-image" className="feature" onClick={() => navigate('/chat')}></button>

<button id="find-image" className="feature" onClick={() => navigate('/search')}></button>

</div>

  

<div>

{/* QnA Section */}

<button id="qna-image" className="qna-section" onClick={() => window.location.href = "https://open.kakao.com/o/sqsPzJXg"}></button>

</div>

  

{/* Navigation Bar */}

<div id="navi-con">

<div id="navi">

<button id="home" onClick={() => navigate('/home')}></button>

<button id="chat" onClick={() => navigate('/chat')}></button>

<button id="search" onClick={() => navigate('/search')}></button>

<button id="mypage" onClick={() => navigate('/mypage')}></button>

</div>

</div>

  

{/* Popup Modal */}

{showPopup && (

<div className="popup-overlay">

<div className="popup-content">

<div id="notice">알림</div>

<p>알림이 없습니다.</p>

<button onClick={closePopup} className="close-button">닫기</button>

</div>

</div>

)}

</div>

</div>

);

}

  

export default Main;