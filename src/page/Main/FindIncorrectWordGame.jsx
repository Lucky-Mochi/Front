import React, { useState, useEffect } from "react";

import "./FindIncorrectWordGame.css";

  

function FindIncorrectWordGame({ onGameEnd }) {

const wordsData = [

{ correct: "대한민국", incorrect: "대한민귝" },

{ correct: "가나", incorrect: "가냐" },

{ correct: "일본", incorrect: "알본" },

{ correct: "포르투갈", incorrect: "포르투길" },

{ correct: "프랑스", incorrect: "프링스" },

];

  

const [level, setLevel] = useState(1);

const [gridSize, setGridSize] = useState(2);

const [buttons, setButtons] = useState([]);

const [timer, setTimer] = useState(4); // 초기 시간 제한

const [gameOver, setGameOver] = useState(false);

const [isGameStarted, setIsGameStarted] = useState(false);

const [message, setMessage] = useState("");

  

useEffect(() => {

if (isGameStarted) {

setupGame();

}

}, [level, isGameStarted]);

  

useEffect(() => {

if (timer > 0 && isGameStarted && !gameOver) {

const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);

return () => clearInterval(interval);

} else if (timer === 0 && isGameStarted) {

endGame(false); // 시간 초과 시 실패

}

}, [timer, gameOver, isGameStarted]);

  

const setupGame = () => {

const totalButtons = gridSize * gridSize;

const correctWordIndex = Math.floor(Math.random() * wordsData.length);

const { correct, incorrect } = wordsData[correctWordIndex];

  

const newButtons = Array(totalButtons).fill(correct);

const incorrectButtonIndex = Math.floor(Math.random() * totalButtons);

newButtons[incorrectButtonIndex] = incorrect;

  

setButtons(newButtons);

  

// 레벨에 따라 타이머 설정

const initialTimer = gridSize === 2 ? 4 : gridSize === 3 ? 3 : 2;

setTimer(initialTimer); // 타이머 초기화

setMessage(""); // 메시지 초기화

};

  

const handleButtonClick = (index) => {

if (buttons[index] !== buttons[0]) {

if (level < 3) {

setLevel(level + 1);

setGridSize(gridSize + 1);

setIsGameStarted(false); // 다음 라운드를 시작하기 전, 게임을 멈춤

setMessage("성공! 다음 라운드를 시작하세요.");

} else {

endGame(true); // 모든 레벨 완료 시 성공

}

} else {

endGame(false); // 틀린 단어가 아닌 경우 실패

}

};

  

const endGame = (isWin) => {

setGameOver(true);

setIsGameStarted(false);

setMessage(isWin ? "축하합니다! 게임을 완료했습니다." : "실패했습니다.");

if (!isWin) {

setTimeout(() => onGameEnd(), 2000); // 실패 시 게임 선택 화면으로 돌아가기

}

};

  

const startGame = () => {

setIsGameStarted(true);

setGameOver(false);

setMessage("");

// 레벨에 따라 타이머 초기화

const initialTimer = gridSize === 2 ? 4 : gridSize === 3 ? 3 : 2;

setTimer(initialTimer);

};

  

return (

<div className="find-incorrect-word-game">

<h2>틀린 단어를 찾으세요!</h2>

{!isGameStarted && !gameOver && (

<button onClick={startGame} className="start-button">게임 시작</button>

)}

<p className ="gamesucess">{message}</p>

{isGameStarted && !gameOver && (

<>

<p>남은 시간: {timer}초</p>

<div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>

{buttons.map((text, index) => (

<button

key={index}

className="grid-button"

onClick={() => handleButtonClick(index)}

>

{text}

</button>

))}

</div>

</>

)}

{gameOver && <button onClick={onGameEnd} className="end-button">게임 선택 화면으로 돌아가기</button>}

</div>

);

}

  

export default FindIncorrectWordGame;