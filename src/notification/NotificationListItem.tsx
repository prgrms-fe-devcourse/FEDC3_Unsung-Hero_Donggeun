import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar } from '../common';
import { INotification } from '../types/notification';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { SlUserFollow } from 'react-icons/sl';
import { ImCancelCircle } from 'react-icons/im';

const NotificationListItem = ({ _id, seen, comment, like, follow, author, post: postId }: INotification) => {
  const navigate = useNavigate();

  const commentLikeFollowCheeck = like ?? comment ?? follow;

  const renderText = (author: string | undefined) => {
    if (!commentLikeFollowCheeck) return '유효하지 않은 알람입니다.';
    if (comment) return author + '님이 댓글을 남기셨습니다.';
    if (like) return author + '님이 공감을 하셨습니다.';
    if (follow) return author + '님이 팔로우 하셨습니다.';
  };

  const renderTitle = () => {
    if (!commentLikeFollowCheeck) return;

    if (comment) {
      return JSON.parse(comment?.post.title).title;
    }

    if (like) {
      return JSON.parse(like?.post.title as string).title;
    }
  };

  const renderIcon = () => {
    if (!commentLikeFollowCheeck) return <ImCancelCircle className='logo' />;
    if (comment) return <BiComment className='logo' />;
    if (like) return <AiOutlineHeart className='logo' />;
    if (follow) return <SlUserFollow className='logo' />;
  };

  const navigatePage = () => {
    if (!commentLikeFollowCheeck) return;

    if (comment || like) {
      navigate(`/post/${postId}`);
      return;
    }

    navigate(`/user/${author?._id}`);
  };

  return (
    <NotificationItem onClick={navigatePage} seen={seen} key={_id}>
      <NotificationIntroduceContainer>
        <Avatar src={'https://ifh.cc/g/35RDD6.png'} width={60} height={60} />
        <NotificationIntroduce>
          {<NotificationText>{renderText(author?.fullName)}</NotificationText>}
          {<NotificationTitle>{renderTitle()}</NotificationTitle>}
        </NotificationIntroduce>
      </NotificationIntroduceContainer>
      {renderIcon()}
    </NotificationItem>
  );
};

export default NotificationListItem;

const NotificationItem = styled.div<{ seen: boolean | undefined }>`
  width: 100%;
  padding: 1rem 1.25rem 3.5em 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.seen ? props.theme.colors.shadow : props.theme.colors.white)};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: background-color 0.5s ease;
  cursor: pointer;

  & .logo {
    font-size: 1.75rem;
  }

  &:first-child {
    padding-top: 3rem;
    border-top-left-radius: 1.875rem;
    border-top-right-radius: 1.875rem;
  }

  &:last-child {
    border-bottom: none;
    margin-bottom: 2rem;
    border-bottom-left-radius: 1.875rem;
    border-bottom-right-radius: 1.875rem;
  }

  &:hover {
    background-color: ${(props) => !props.seen && props.theme.colors.shadow};
  }
`;

const NotificationIntroduceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NotificationIntroduce = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.3125rem;
`;

const NotificationText = styled.div`
  font-weight: bold;
  margin-bottom: 0.625rem;
`;

const NotificationTitle = styled.div`
  font-size: 0.875rem;
  opacity: 0.5;
`;
