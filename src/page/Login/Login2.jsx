import React from "react";
import './Login2.css';  // CSS 파일을 import

function Login2() {
    return (
        <div className="login2-container">
            <h1 className="title">어떤 유형으로 가입하시겠어요?</h1>
            <button>멘토</button>
            <button>멘티</button>
            <button>학부모</button>
        </div>
    );
}

export default Login2;
