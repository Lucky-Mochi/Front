import React, { useState, useEffect} from "react";
import Tabs from "./Tabs";
import "./Chat.css";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import {getChatRooms} from '../../api/chatroomApi/getChatrooms'

import { getingChatRooms } from "../../api/chatroomApi/getingChatrooms";



function Chat() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null)
    const navigate = useNavigate(); 
    const [token, setToken] = useState('');
    const [chatRooms, setChatRooms] = useState([]);
    const [ingchatRooms, setingChatRooms] = useState([]);
    const [userType, setUserType] = useState('');
    const [chatroomid,setChatroomid]=useState(0);

    useEffect(() => {
        // 로컬 스토리지에서 토큰 읽어오기
        const storedToken = localStorage.getItem('accessToken');
        const storedUserType = localStorage.getItem('isMento')
        console.log(storedToken);
        if (storedToken) {
            setToken(storedToken);
        } 
        if(storedUserType === true){
            setUserType('mento')
        }else setUserType('mentee')
        
    }, []);

    const ChatList=({chatList})=>{
        const options = { month: 'long', day: 'numeric' };
        return(
            <div className="Chat">
                
                {chatList.map((data, index)=>(
                    <button id="chatCont" onClick={() => openModal(data)} key={`${data.id}-${index}`}>
                    <div id="profile"></div>
                    <div id="main_cont">
                        <div id="name">{data.mentoNick}</div>
                        <div id="ment">{data.lastChatMessage }</div>
                    </div>
                    <div id="ect">
                        <div id="time">{new Date(data.lastChatMessageDate).toLocaleDateString('ko-KR', options)}</div>
                        <div id="num">{data.noReads}</div>
                    </div> 
                    </button>
                ))}
               
            </div>
        );
    };

    const openModal = (data) => {
     
        setSelectedData(data)
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
        
    };
    const handleJoinChat = async () => {
        
        if (selectedData) {
            try {
                setChatroomid(selectedData.idChatRoom);
                navigate('/chatroom',{ state: { chatRoomId:selectedData.idChatRoom, userNick:selectedData.mentoNick } })
            } catch (error) {
                console.error('Error fetching mypage data:', error);
            }
           
        } else {
            console.error("No selected data to join the chat");
        }
    };
    useEffect(() => {
        if (!token) return; // 토큰이 없으면 데이터를 가져오지 않음

        // 마이페이지 정보를 가져오는 함수 호출
        const fetchChatListData = async () => {
            try {
                const ChatListData = await getChatRooms(token);

                setChatRooms(ChatListData.chatRooms);
                
            } catch (error) {
                console.error('Error fetching mypage data:', error);
            }
        };
        const fetchingChatListData = async () => {
            try {
                const ingChatListData = await getingChatRooms(token);
                setingChatRooms(ingChatListData.chatRooms);

                
            } catch (error) {
                console.error('Error fetching mypage data:', error);
            }
        };

        fetchChatListData();
        fetchingChatListData();


    }, [token]);

    return (
        
           
            <div className="chat">
               
                <div id="tabCont">
                    <Tabs>
                        <div label="전체 |">

                        {chatRooms ? (
                        <ChatList chatList={chatRooms} />

                    ) : (
                        <div>Loading...</div> // Optionally show a loading state
                    )}
                        </div>
                        
                            
                        <div label="| 멘토링 중" > 

                        {chatRooms ? (
                        <ChatList chatList={ingchatRooms} />

                    ) : (
                        <div>Loading...</div> // Optionally show a loading state
                    )}
                         </div>
                    </Tabs>
                </div>
             
                <div id="navi-con">
                    <div id="navi">
                        <button id="home" onClick={()=> navigate('/home')}></button>
                        <button id="chat" onClick={()=> navigate('/chat')}></button>
                        <button id="search" onClick={()=> navigate('/search')}></button>
                        <button id="mypage" onClick={()=> navigate(`/mypage_${userType}`)}></button>
                    </div>
                </div>

                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Pop up Message"
                ariaHideApp={false}
                className="modal"
                overlayClassName="overlay"
            >
                {selectedData ? (
                <div id="modal_profile">
                   <div id="modal_top"> 
                    <button id="modal_close" onClick={closeModal}>x</button>
                    </div>
                    <div id="modal_cont">
                    <div id="modal_img"></div>
                    <div id="modal_ect">
                        <div id="modal_name">{selectedData?.mentoNick}</div>
                        <div id="modal_tag">{selectedData?.tag}</div>
                    </div>
                    </div>
                    <div id="modal_intro">{selectedData?.intro}</div>
                    <button id="goChat" onClick={()=> handleJoinChat(selectedData)}>채팅하기</button>
                </div>
                 ) : null} 
            </Modal>

            </div>
       
    )
}

export default Chat;