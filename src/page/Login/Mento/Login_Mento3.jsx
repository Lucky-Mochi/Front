import React from "react";
import './Login_Mento3.css';  // CSS 파일을 import

function Login_Mento3() {
    return (
        <div className="Login_Mento3-container">
            <h1 className="title">본인은 어떤 멘토인가요?</h1>
            <h2 className="subtitle">
                학적상태를 확인할 수 있는
                학생증, 재학/휴학/재적/졸업
                증명서 등을 준비해주세요.
            </h2>
            
            <button>학력 인증 진행하기</button>
            
        </div>
    );
}

export default Login_Mento3;
