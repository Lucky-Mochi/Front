import React from "react";
import './Login_Mentee1.css';  // CSS 파일을 import

function Login_Mentee1() {
    return (
        <div className="Login_Mentee1-container">
            <h2 className="subtitle">안녕하세요, 멘토님!</h2>
            <h1 className="title">어떤 멘토를 찾고 있나요?</h1>
            <button>문화 멘토</button>
            <button>한국어 멘토</button>
            <button>교과목 멘토</button>
            <button>기타 멘토</button>
        </div>
    );
}

export default Login_Mentee1;
