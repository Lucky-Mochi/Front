import React, { useState, useEffect} from "react";
import "./Mypage.css";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { getUser } from "../../api/myPageApi/getUser";
import { putUser } from "../../api/myPageApi/putUser";
import { postRate } from "../../api/myPageApi/postRate";

function Mypage(){
    const [token, setToken] = useState('');
    const [rate,setRate] = useState({
        mentoId:0,
        temperature:0
    });
    const [score, setScore] = useState([false, false, false, false, false]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({

        userInfo: {
            age :0,
            etcTag:"",
            mentoType: "",
            myInfo:"",
            nickName:"",
            picture: "",
            subjectTag:"",
            temperature:0
        },
        Mentorings: [
        
        ]
    });
    useEffect(() => {
        // 로컬 스토리지에서 토큰 읽어오기
        const storedToken = localStorage.getItem('accessToken');
        console.log(storedToken);
        if (storedToken) {
            setToken(storedToken);
        } 
    }, []);
    const starScore = index => {
        let star = [...score];
        for (let i = 0; i < 5; i++) {
          star[i] = i <= index ? true : false;
        }
        setScore(star);
        setRate((prevRate) =>({
            ...prevRate,
            temperature:index}));
      };
    const [newUserData,setNewUserData]=useState({
        nickName: "",
        age: 0,
        mentoType: "", // 문화 | 한국어 | 교과목 | 기타
        subjectTag: "",
        etcTag: "",
        myInfo: ""
    })
    useEffect(() => {
        if (!token) return; // 토큰이 없으면 데이터를 가져오지 않음

        // 마이페이지 정보를 가져오는 함수 호출
        const fetchMypageData = async () => {
            try {
                const mypageData = await getUser(token);
                setUserData(mypageData);
                setNewUserData(mypageData.userInfo);
            } catch (error) {
                console.error('Error fetching mypage data:', error);
            }
        };

        fetchMypageData();
    }, [token]);
    const ingList = userData.Mentorings.filter(data => data.matchStatus === "accepted");
    const submitList = userData.Mentorings.filter(data => data.matchStatus === "unapplied" )

    const ChatList=({chatList})=>{
        return(
            <div className="Chat">
                
                {chatList.map((data, index)=>(
                    <button id="chatCont"  key={`${data.mentoringId}-${index}`}>
                        <div id="rowCont">
                    <div id="list_profile"></div>
                    <div id="main_cont">
                        <div id="list_name">{data.userNick}({data.userAge}세)</div>
                        <div id="list_tag">#{data.subjectTag}</div>
                       
                    </div>
                    <div id="ect">
                    <button id="review" onClick={()=>{openModal(data.mentoringId)}}>후기</button>
                    </div> 
                    </div>
                    {index < chatList.length - 1 && <div id="divider"></div>}
                    </button>
                ))}
               
            </div>
        );
    };
    const handleModify= async()=>{
        try {
           await putUser(token, newUserData);
        } catch (error) {
            console.error('Error modify mypage data:', error);
        }
    }
    const SubmitList=({submitList})=>{
        return(
            <div className="Chat">
                
                {submitList.map((data, index)=>(
                    <button id="chatCont"  key={`submit${data.mentoringId}-${index}`}>
                        <div id="rowCont">
                    <div id="list_profile"></div>
                    <div id="main_cont">
                        <div id="list_name">{data.userNick}({data.userAge}세)</div>
                        <div id="list_tag">#{data.subjectTag}</div>
                       
                    </div>
                    <div id="ect">
                       {data.status}
                    </div> 
                    </div>
                    {index < submitList.length - 1 && <div id="divider"></div>}
                    </button>
                ))}
               
            </div>
        );
    };
    const openModal = (id) => {
        setModalIsOpen(true);
        setRate((prevRate) => ({
            ...prevRate,
            mentoId: id 
        }));
    };
    const closeModal = () => {
        
        const fetchRateData = async () => {
            try {
                await postRate(token, rate);
            } catch (error) {
                console.error('Error fetching mypage data:', error);
            }
        };

        fetchRateData();
        setModalIsOpen(false);
        setRate({
            mentoId:0,
            temperature:0
        });
        setScore([false, false, false, false, false]);
      
    };
    const handleIntroduceChange = (event) => {
        const { value } = event.target;
        setNewUserData((prevData) => ({
          ...prevData,
          myInfo: value // 입력 필드의 name 속성에 따라 상태를 업데이트
        }));
      };

    return(
        <div className="Mypage">
            <div id="titleCont">
            <div id="title">프로필</div>
            </div>
            <div id="profile">
                <div id="profile_img" ></div>
                <div id="ect">
                    <div id="name">{userData.userInfo.nickName}({userData.userInfo.age}세)</div>
                    <div id="tag">#{userData.userInfo.subjectTag
                    }</div>
                </div>
                <div id="toggleCont">

                </div>
            </div>
            <div id="temp">
                <div id="temp_num" style={{marginLeft:`calc(46px + ${userData.userInfo.temperature} * 2.99px - 20px)`}}>{userData.userInfo.temperature}ºC</div>
            <div className="temp-bar">
          <div className="Temp" style={{ width: `${userData.userInfo.temperature}%` }}></div>
             </div>
            </div>
            <div id="intro">
                <div id="intro_title">한줄소개</div>
                <input id="intro_input"
                placeholder={userData.userInfo.myInfo}
                value={newUserData.myInfo}
                onChange={handleIntroduceChange}
                ></input>
                <button id="modify" onClick={()=>handleModify()}>프로필 수정</button>
            </div>
            <div id="ing">
                <div id="ing_title">현재 멘토링 현황</div>
                <ChatList chatList={ingList}/>

            </div>
            <div id="submit">
                <div id="submit_title">멘토링 신청 현황</div>
                <SubmitList submitList={submitList}/>
            </div>
            <div id="btnCon">
                <button id="logout">로그아웃</button>
                <button id="delete">계정 탈퇴</button>
            </div>
            <div id="navi-con">
                <div id="navi">
                    <button id="home" onClick={()=> navigate('/home')}></button>
                    <button id="chat" onClick={()=> navigate('/chat')}></button>
                    <button id="search" onClick={()=> navigate('/search')}></button>
                    <button id="mypage" onClick={()=> navigate('/mypage')}></button>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Pop up Message"
                ariaHideApp={false}
                className="review_popup"
                overlayClassName="popup-overlay"
            >
               
                <div id="submit_popup">
                  <div id="popup_ment"> 후기를 남겨주세요!</div>
                    <div id="star_cont">
                        {Array.from({ length: 5 }).map((_, index) => (

                        <div className={`${score[index] ? 'smile_active' : 'smile'}`} 
                             key={index} 
                             onClick={()=>starScore(index)}
                             >

                             </div>
                        ))}
                    </div>
                  <button id='review_submit'onClick={(id)=>closeModal(id)}>완료</button>
                 
                </div>
            </Modal>
        </div>
    );
}
export default Mypage