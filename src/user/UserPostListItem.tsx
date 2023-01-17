import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IPost } from '../types/post';

interface IProps {
  post: Pick<IPost, 'title' | '_id' | 'likes' | 'comments'>;
}
const LIKE_IMG_URL = 'https://ifh.cc/g/sq1joM.png';
const COMMENT_IMG_URL = 'https://ifh.cc/g/Y0gGms.png';

const UserPostListItem = ({ post }: IProps) => {
  const navigate = useNavigate();

  const handleClickPost = (id: string) => {
    navigate(`/post/${id}`);
  };
  return (
    <Wrapper onClick={() => handleClickPost(post._id)}>
      <Title>{JSON.parse(post.title).title}</Title>
      <Content>{JSON.parse(post.title).content}</Content>
      <Reaction>
        <Likes>
          <img src={LIKE_IMG_URL} />
          {post.likes.length}
        </Likes>
        <Comment>
          <img src={COMMENT_IMG_URL} width='21px' height='21px' />
          {post.comments.length}
        </Comment>
      </Reaction>
    </Wrapper>
  );
};

export default UserPostListItem;

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
  padding: 0 0.5rem 0 1.25rem;
  display: flex;
  flex-direction: column;
  height: 5.625rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: large;
  font-weight: bold;
  padding-top: 0.625rem;
`;

const Content = styled.div`
  font-size: medium;
  padding-top: 0.3125rem;
`;

const Reaction = styled.div`
  padding-top: 0.625rem;
  margin-left: auto;
  display: flex;
  align-items: center;
  & img {
    padding-right: 0.3125rem;
  }
`;

const Likes = styled.div`
  width: 3.125rem;
  padding-right: 0.3125rem;
  display: flex;
  align-items: center;
`;

const Comment = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
`;
