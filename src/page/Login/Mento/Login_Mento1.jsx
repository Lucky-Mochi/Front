import React from "react";
import './Login_Mento1.css';  // CSS 파일을 import

function Login_Mento1() {
    return (
        <div className="Login_Mento1-container">
            <h2 className="subtitle">안녕하세요, 멘토님!</h2>
            <h1 className="title">본인은 어떤 멘토인가요?</h1>
            <button>문화 멘토</button>
            <button>한국어 멘토</button>
            <button>교과목 멘토</button>
            <button>기타 멘토</button>
        </div>
    );
}

export default Login_Mento1;
