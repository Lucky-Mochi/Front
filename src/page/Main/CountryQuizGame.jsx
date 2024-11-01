import React, { useState, useEffect } from "react";

import "./CountryQuizGame.css";

  

const quizData = [

{ greeting: "こんにちは", options: ["일본", "한국", "중국", "태국"], answer: "일본" },

{ greeting: "안녕하세요", options: ["한국", "일본", "중국", "베트남"], answer: "한국" },

{ greeting: "Hello", options: ["미국", "프랑스", "독일", "스페인"], answer: "미국" },

{ greeting: "Hola", options: ["스페인", "멕시코", "아르헨티나", "브라질"], answer: "스페인" },

{ greeting: "你好", options: ["중국", "대만", "싱가포르", "홍콩"], answer: "중국" },

{ greeting: "Bonjour", options: ["프랑스", "이탈리아", "벨기에", "스위스"], answer: "프랑스" },

{ greeting: "Guten Tag", options: ["독일", "오스트리아", "스위스", "네덜란드"], answer: "독일" },

{ greeting: "Ciao", options: ["이탈리아", "스페인", "포르투갈", "그리스"], answer: "이탈리아" },

{ greeting: "Olá", options: ["포르투갈", "브라질", "모잠비크", "앙골라"], answer: "포르투갈" },

{ greeting: "Здравствуйте", options: ["러시아", "우크라이나", "카자흐스탄", "벨라루스"], answer: "러시아" },

{ greeting: "Merhaba", options: ["터키", "이란", "아제르바이잔", "시리아"], answer: "터키" },

{ greeting: "Aloha", options: ["하와이", "뉴질랜드", "필리핀", "몰디브"], answer: "하와이" },

{ greeting: "Sawubona", options: ["남아프리카 공화국", "케냐", "잠비아", "나미비아"], answer: "남아프리카 공화국" },

{ greeting: "Shalom", options: ["이스라엘", "레바논", "이집트", "요르단"], answer: "이스라엘" },

{ greeting: "Salam", options: ["이란", "아프가니스탄", "파키스탄", "이라크"], answer: "이란" },

{ greeting: "Kamusta", options: ["필리핀", "인도네시아", "말레이시아", "태국"], answer: "필리핀" },

{ greeting: "Hej", options: ["스웨덴", "덴마크", "노르웨이", "핀란드"], answer: "스웨덴" },

{ greeting: "Selamat pagi", options: ["인도네시아", "말레이시아", "싱가포르", "브루나이"], answer: "인도네시아" },

{ greeting: "Xin chào", options: ["베트남", "라오스", "태국", "캄보디아"], answer: "베트남" },

{ greeting: "Jambo", options: ["케냐", "탄자니아", "우간다", "르완다"], answer: "케냐" },

{ greeting: "Sawasdee", options: ["태국", "캄보디아", "라오스", "미얀마"], answer: "태국" },

{ greeting: "Hallo", options: ["네덜란드", "벨기에", "룩셈부르크", "독일"], answer: "네덜란드" },

{ greeting: "Privet", options: ["러시아", "우크라이나", "벨라루스", "카자흐스탄"], answer: "러시아" },

{ greeting: "Yassas", options: ["그리스", "알바니아", "불가리아", "터키"], answer: "그리스" },

{ greeting: "Mingalaba", options: ["미얀마", "태국", "라오스", "방글라데시"], answer: "미얀마" },

{ greeting: "Tere", options: ["에스토니아", "라트비아", "리투아니아", "핀란드"], answer: "에스토니아" },

{ greeting: "Konnichiwa", options: ["일본", "중국", "한국", "베트남"], answer: "일본" }

];

  

function CountryQuizGame({ onGameEnd }) {

const [questions, setQuestions] = useState([]);

const [currentQuestion, setCurrentQuestion] = useState(0);

const [score, setScore] = useState(0);

const [showFeedback, setShowFeedback] = useState(null);

const [isGameOver, setIsGameOver] = useState(false);

const [isOptionDisabled, setIsOptionDisabled] = useState(false);

  

useEffect(() => {

const shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5);

setQuestions(shuffledQuestions.slice(0, 5));

}, []);

  

const handleOptionClick = (selectedOption) => {

setIsOptionDisabled(true);

const isCorrect = selectedOption === questions[currentQuestion].answer;

if (isCorrect) {

setScore(score + 1);

setShowFeedback("정답입니다!");

} else {

setShowFeedback(`오답입니다. 정답은 ${questions[currentQuestion].answer}입니다.`);

}

};

  

const nextQuestion = () => {

setShowFeedback(null);

setIsOptionDisabled(false);

if (currentQuestion + 1 < questions.length) {

setCurrentQuestion(currentQuestion + 1);

} else {

setIsGameOver(true);

}

};

  

return (

<div className="quiz-container">

{isGameOver ? (

<div className="game-over">

<h2>퀴즈 종료!</h2>

<p className="greeting">점수: {score} / {questions.length}</p>

<button id="next-quiz-button" onClick={onGameEnd}>게임 선택 화면으로 돌아가기</button>

</div>

) : (

questions.length > 0 && (

<div className="question-container">

<h2 id="quiz-title">이 인사말은 어느 나라의 말일까요?</h2>

<p className="greeting">{questions[currentQuestion].greeting}</p>

<div className="options">

{questions[currentQuestion].options.map((option, index) => (

<button

className="options_button"

key={index}

onClick={() => handleOptionClick(option)}

disabled={isOptionDisabled}

>

{option}

</button>

))}

</div>

{showFeedback && (

<div className="feedback">

<p>{showFeedback}</p>

<button id="next-quiz-button" onClick={nextQuestion}>다음 문제로</button>

</div>

)}

</div>

)

)}

</div>

);

}

  

export default CountryQuizGame;