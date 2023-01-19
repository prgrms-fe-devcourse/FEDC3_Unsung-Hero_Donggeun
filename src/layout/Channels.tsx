import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IChannel } from '../types/channel';
import { AiOutlineRight } from 'react-icons/ai';
import { END_POINT } from '../api/apiAddress';
import { MdOutlineFamilyRestroom, MdSportsTennis } from 'react-icons/md';
import { GiBatMask } from 'react-icons/gi';
import { BsFillChatDotsFill } from 'react-icons/bs';
interface Channel {
  _id: string;
  name: string;
}

const Channels = () => {
  const { data: channelData } = useQuery('channelData', async () => {
    return axios.get(`${END_POINT}/channels`).then(({ data }) => data);
  });
  const navigate = useNavigate();

  const handleClickMoveChannel = (id: string) => {
    navigate(`/channel/${id}`);
  };
  const hobbyChannel = channelData?.filter((channel: IChannel) => channel.description === '취미');
  const familyChannel = channelData?.filter((channel: IChannel) => channel.description === '가족');
  const etcChannel = channelData?.filter((channel: IChannel) => channel.description === '기타');
  return (
    <Wrapper>
      <EntireViewSidebar>
        <ChannelTitle>
          <GiBatMask className='icon' />
          Unsung Hero
        </ChannelTitle>
        <ChannelWrapper>
          <Channel
            onClick={() => {
              navigate('/');
            }}
          >
            전체 글
            <AiOutlineRight />
          </Channel>
        </ChannelWrapper>
      </EntireViewSidebar>
      <Sidebar>
        <ChannelTitle>
          <MdSportsTennis className='icon' />
          취미
        </ChannelTitle>
        <ChannelWrapper>
          {hobbyChannel?.map(({ _id, name }: Channel) => (
            <Channel key={_id} onClick={() => handleClickMoveChannel(_id)}>
              {name}
              <AiOutlineRight />
            </Channel>
          ))}
        </ChannelWrapper>
      </Sidebar>
      <Sidebar>
        <ChannelTitle>
          <MdOutlineFamilyRestroom className='icon' />
          가족
        </ChannelTitle>
        <ChannelWrapper>
          {familyChannel?.map(({ _id, name }: Channel) => (
            <Channel key={_id} onClick={() => handleClickMoveChannel(_id)}>
              {name}
              <AiOutlineRight />
            </Channel>
          ))}
        </ChannelWrapper>
      </Sidebar>
      <Sidebar>
        <ChannelTitle>
          <BsFillChatDotsFill className='icon' />
          기타
        </ChannelTitle>
        <ChannelWrapper>
          {etcChannel?.map(({ _id, name }: Channel) => (
            <Channel key={_id} onClick={() => handleClickMoveChannel(_id)}>
              {name}
              <AiOutlineRight />
            </Channel>
          ))}
        </ChannelWrapper>
      </Sidebar>
    </Wrapper>
  );
};

export default Channels;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 15rem;
  position: fixed;
  margin-top: 7.6875rem;
  gap: 2rem;
`;

const Sidebar = styled.nav`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 15rem;
  min-height: 90px;
  height: 18%;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
`;

const ChannelWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.625rem;
    height: 0.625rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #60606080;
    border-radius: 10px;
  }
`;

const EntireViewSidebar = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 15rem;
  min-height: 5.9375rem;
  height: 8%;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
`;

const ChannelTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 1rem 0.5rem 1rem;
  padding-bottom: 0.625rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
  & .icon {
    width: 1.125rem;
    height: 1.125rem;
    margin: 0 0.3125rem 0.3125rem 0;
  }
`;

const Channel = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.gray};
  &:hover {
    background-color: ${({ theme }) => theme.colors.grayHover};
  }
`;
