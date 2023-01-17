import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IPost } from '../types/post';

interface IProps {
  post: Pick<IPost, 'title' | '_id' | 'likes'>;
}
const LIKE_IMG_URL = 'https://ifh.cc/g/vmscWK.png';

const UserPostListItem = ({ post }: IProps) => {
  const navigate = useNavigate();

  const handleClickPost = (id: string) => {
    navigate(`/post/${id}`);
  };

  return (
    <Wrapper onClick={() => handleClickPost(post._id)}>
      <div>{JSON.parse(post.title).title}</div>
      <div>{JSON.parse(post.title).content}</div>
      <div>
        <img src={LIKE_IMG_URL} />
        {post.likes.length}
      </div>
    </Wrapper>
  );
};

export default UserPostListItem;

const Wrapper = styled.div`
  width: 500px;
  border: 1px solid black;
`;
