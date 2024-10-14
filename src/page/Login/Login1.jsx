import React from "react";
import './Login1.css';  // CSS 파일을 import

function Login1() {
    return (
        <div className="login-container">
            <div className="logo"></div>
            <div>

            <button className="button">
            <img src={`${process.env.PUBLIC_URL}/image/google.png`} />
             
                </button>
                <button className="button">
                <img src={`${process.env.PUBLIC_URL}/image/kakao.png`} />
              
                </button>
                <button className="button">
                <img src={`${process.env.PUBLIC_URL}/image/naver.png`} />
        
                </button>

            </div>
        </div>
    );
}

export default Login1;
