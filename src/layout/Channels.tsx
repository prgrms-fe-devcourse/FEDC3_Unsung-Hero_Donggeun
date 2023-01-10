import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

interface ChannelList {
  _id: string;
  name: string;
}

const Channels = () => {
  const [channelList, setChannelList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    requestChannelList();
  }, []);

  const requestChannelList = async () => {
    return await axios.get(`${API_URL}/channels`).then(({ data }) => setChannelList(data));
  };

  const moveChannel = (id: string) => {
    navigate(`/channel/${id}`);
  };

  return (
    <Sidebar>
      <ChannelTitle>채널목록</ChannelTitle>
      {channelList.map((e: ChannelList) => (
        <Channel key={e._id} onClick={() => moveChannel(e._id)}>
          {e.name}
        </Channel>
      ))}
    </Sidebar>
  );
};

export default Channels;

export const Sidebar = styled.nav`
  background-color: #e8eaf6;
  position: fixed;
  margin-top: 64px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 185px;
  height: 100%;
`;

export const ChannelTitle = styled.div`
  margin-bottom: 20px;
`;

export const Channel = styled.div`
  margin-bottom: 20px;
`;
