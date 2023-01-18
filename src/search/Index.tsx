import SearchBox from './SearchBox';
import PostListContainer from './PostListContainer';
import MostLikesPosts from './MostLikesPosts';
import { useState, useEffect } from 'react';
import ErrorBoundary from '../api/ErrorBoundary';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loading from '../api/Loading';
import { END_POINT } from '../api/apiAddress';

const Search = () => {
  const [postsInfo, setPostsInfo] = useState([]);
  const [selectedSearchOption, setSelectedSearchOption] = useState('');
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [currentChannelId, setCurrentChannelId] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { channelId } = useParams();

  const navigate = useNavigate();

  if (channelId !== currentChannelId) {
    setCurrentChannelId(channelId);
  }

  useEffect(() => {
    if (currentChannelId !== undefined) {
      getPostsList();
      setSelectedSearchOption('');
      setInputSearchValue('');
    } else {
      getEntirePostsList();
    }
  }, [currentChannelId]);

  const getPostsList = async () => {
    setIsLoading(true);
    axios.get(`${END_POINT}/posts/channel/${currentChannelId}`).then((response) => {
      const { data } = response;
      setPostsInfo(data);
      setIsLoading(false);
    });
  };

  const getEntirePostsList = async () => {
    setIsLoading(true);
    axios.get(`${END_POINT}/posts`).then((response) => {
      const { data } = response;
      setPostsInfo(data);
      setIsLoading(false);
    });
  };

  return (
    <ErrorBoundary>
      {isLoading ? <Loading /> : null}
      <MostLikesPosts postsInfo={postsInfo} currentChannelId={currentChannelId} />
      <SearchBox
        setSelectedSearchOption={setSelectedSearchOption}
        setInputSearchValue={setInputSearchValue}
        // getPostsList={getPostsList}
        // getEntirePostsList={getEntirePostsList}
        currentChannelId={currentChannelId}
      />
      <PostListContainer
        postsInfo={postsInfo}
        selectedSearchOption={selectedSearchOption}
        inputSearchValue={inputSearchValue}
        currentChannelId={currentChannelId}
      />
      <br />
    </ErrorBoundary>
  );
};
export default Search;
