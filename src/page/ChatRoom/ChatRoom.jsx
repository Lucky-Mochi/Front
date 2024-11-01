import React, { useState, useEffect, useRef } from "react";
import './ChatRoom.css';
import { useNavigate, useLocation } from "react-router-dom";
import Modal from 'react-modal';
import { getChatData } from "../../api/chatDataApi/getChatData";
import { io } from "socket.io-client";

function ChatRoom() {
  const navigate = useNavigate(); 
  const [socket, setSocket] = useState(null);
  const [userType, setUserType] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); 
  const [token, setToken] = useState(null);
  const location = useLocation();
  const { state } = location;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUserType = localStorage.getItem('isMento');
    
    if (storedToken) {
        setToken(storedToken);
    } 
    if (storedUserType === 'true') {
        setUserType('mento');
    } else {
        setUserType('mentee');
    }
  }, []);
  
  useEffect(() => {
    if (!token) return;

    const newSocket = io("https://luckymozzi.store", {
      extraHeaders: {
        Authorization: token
      }
    });

    newSocket.on('connect', () => {
      console.log('소켓 연결됨:', newSocket.id);
      newSocket.emit("joinRoom", newSocket.id, (response) => {
        console.log('소켓 연결 완료', response);
      });
    });

    newSocket.on('connect_error', (error) => {
      console.error('소켓 연결 실패:', error);
    });

    setSocket(newSocket);

    const fetchChatData = async () => {
      try {
        const ChatData = await getChatData(token, state);
        setMessages(ChatData.chatMessages);
      } catch (error) {
        console.error('Error fetching mypage data:', error);
      }
    };

    fetchChatData();

    return () => {
      newSocket.disconnect();
    };
  }, [token, state]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const Message = ({ id, messageContent, me }) => {
    const messageClass = me ? 'message-right' : 'message-left';
    return (
      <div className={messageClass}>
        {me && <div className="modi" />}
        <div id={id} className={`message_${messageClass}`}>
          <div className="message-text">{messageContent}</div>
        </div>
      </div>
    );
  };

  const MessageList = ({ messages }) => {
    return (
      <div className='messages' style={{ overflowY: 'scroll', maxHeight: '660px' }}>
        {messages.map((message, i) => (
          <Message
            key={i}
            id={message.writerId}
            messageContent={message.messageContent}
            me={message.me} // `me` 값 전달
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const MessageForm = ({ onMessageSubmit }) => {
    const [messageContent, setMessageContent] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      const message = {
        messageContent: messageContent,
        me: true // 여기서 `me` 값을 true로 설정
      };
      onMessageSubmit(message);
      setMessageContent('');
    };

    return (
      <div className='message_form'>
        <form id='messageinput' onSubmit={(handleSubmit)}>
          <input
            placeholder='텍스트를 입력하세요'
            className='textinput'
            onChange={(e) => setMessageContent(e.target.value)}
            value={messageContent}
            autoFocus
          />
          <button id='submitbtn' type='submit'> 전송</button>
        </form>
      </div>
    );
  };

  const handleMessageSubmit = async (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    const data = {
      chatRoomId: state.chatRoomId,
      newChatMessage: {
        messageContent: message.messageContent
      }
    };
    if (socket) {
      socket.emit("sendChat", data);
      console.log(state, data);
    } else {
      console.log('소켓 설정이 안됨');
    } 
  };

  return (
    <div className="ChatRoom">
      <div id="secondBox">
        <button id="backbtn" onClick={() => navigate('/chat')}> {`<`} </button>
        <div id="profile_img"></div>
        <div id="name">{state.userNick}</div>
        <button id="mentoring" onClick={openModal}>멘토링 신청</button>
      </div>
      <div id="inputbox">
        <div id="chatbox">
          <MessageList messages={messages} />
        </div> 
        <MessageForm onMessageSubmit={handleMessageSubmit} />
      </div>
      <div id="navi-con">
        <div id="navi">
          <button id="home" onClick={() => navigate('/home')}></button>
          <button id="chat" onClick={() => navigate('/chat')}></button>
          <button id="search" onClick={() => navigate('/search')}></button>
          <button id="mypage" onClick={() => navigate(`/mypage_${userType}`)}></button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Pop up Message"
        ariaHideApp={false}
        className="popup"
        overlayClassName="popup-overlay"
      >
        <div id="submit_popup">
          <div id="popup_ment">멘토링 신청이 완료되었습니다!</div>
          <button id='popup_close' onClick={closeModal}>닫기</button>
        </div>
      </Modal>
    </div>
  );
}

export default ChatRoom;
