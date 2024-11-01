import axios from 'axios';
const BASE_URL ='https://luckymozzi.store';


export const postApplyMento = async (token,data) => {
    console.log("전송 데이터",token,data);
    try {
        const response = await axios.post(`${BASE_URL}/chatrooms/apply-mentoring`,data,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }); 
          console.log(response.data);
            return response.data;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        console.error('Error response:', status, data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      throw error;
    }
  };
  