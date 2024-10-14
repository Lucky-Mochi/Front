import React from "react";
import './Login_Mento4.css';  // CSS 파일을 import

function Login_Mento4() {
    return (
        <div className="Login_Mento4-container">
            <h1 className="title">학력 인증</h1>
            <h2 className="subtitle">
                학적상태를 확인할 수 있는
                학생증, 재학/휴학/재적/졸업
                증명서 등을 준비해주세요.
            </h2>
            <div>
                여기는 신분증을 들이댈 곳이 될것입니다. 
            </div>


            <div>-빨간 사각형 안에 신분증을 맞춰주세요.</div>
            <button>학력 인증 진행하기</button>
            
        </div>
    );
}

export default Login_Mento4;
