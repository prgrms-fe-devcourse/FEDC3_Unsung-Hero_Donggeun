import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Logout } from '../auth';
import { useUserId } from '../contexts/TokenProvider';
import NotificationStatus from '../notification/NotificationStatus';
import { IUserId } from '../types/useId';

const Header = () => {
  const userLogin = localStorage.getItem('token');
  const userIdContext: IUserId | null = useUserId();
  const id = userIdContext?.userId;
  const navigate = useNavigate();
  const handleMovePage = (page: string, id?: string | null) => {
    id ? navigate(`/${page}/${id}`) : navigate(`/${page}`);
  };

  return (
    <>
      <HeaderWrapper>
        <div>언성 히어로(로고)</div>
        <div>검색창</div>
        <ButtonWrapper>
          {userLogin ? (
            <>
              <NotificationStatus />
              <button onClick={() => handleMovePage('notifications')}>알림</button>
              <Logout />

              <button onClick={() => handleMovePage('user', id)}>사용자</button>
            </>
          ) : (
            <>
              <button onClick={() => handleMovePage('signup')}>회원가입</button>
              <button onClick={() => handleMovePage('login')}>로그인</button>
            </>
          )}
        </ButtonWrapper>
      </HeaderWrapper>
    </>
  );
};
export default Header;

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1a237e;
  height: 64px;
`;

export const ButtonWrapper = styled.div``;
