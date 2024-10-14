import React, { useState } from "react";
import './Login_Mento5.css';  // CSS 파일을 import

function Login_Mento5() {
    const [nickname, setNickname] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [age, setAge] = useState('');
    const [nationality, setNationality] = useState('');

    const handleNicknameChange = (e) => setNickname(e.target.value);
    const handleIntroductionChange = (e) => setIntroduction(e.target.value);
    const handleAgeChange = (e) => setAge(e.target.value);
    const handleNationalityChange = (e) => setNationality(e.target.value);

    return (
        <div className="profile-container">
            <h2>프로필 완성!</h2>

            <div className="profile-image">
                <div className="circle-image">프로필 변경</div>
            </div>

            <div className="button-group">
                <button>선택</button>
                <button>삭제</button>
            </div>

            <div className="input-group">
                <label>닉네임</label>
                <input 
                    type="text" 
                    value={nickname} 
                    onChange={handleNicknameChange} 
                    placeholder="닉네임을 입력하세요." 
                />

                <label>나이</label>
                <select value={age} onChange={handleAgeChange}>
                    <option value="">나이를 선택하세요.</option>
                </select>

                <label>국적</label>
                <select value={nationality} onChange={handleNationalityChange}>
                    <option value="">국적을 선택하세요.</option>
                
                </select>

                <label>한줄소개</label>
                <textarea 
                    value={introduction} 
                    onChange={handleIntroductionChange} 
                    placeholder="멘토님을 소개할 수 있는 한줄 소개를 작성해주세요.
                    
                    멘토링을 진행할 때, 중요하게 여기는 부분이나 가치관 등 수업 특성이 잘 드러나도록 적으시면 좋아요
               " />
            </div>
        </div>
    );
}

export default Login_Mento5;
