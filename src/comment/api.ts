import { request } from '../api/request';
import useMutation from '../api/useMutation';
import { tempData } from './tempData';

export const getPost = <T>(postId: string) => {
  return request<T>(`${tempData.baseUrl}/posts/${postId}`);
};

const { mutate } = useMutation();

export const createComment = async (value: string, postId: string) => {
  await mutate({
    url: `${tempData.baseUrl}/comments/create`,
    method: 'post',
    data: {
      comment: value,
      postId: postId,
    },
  });
};

export const deleteComment = async (id: string) => {
  try {
    await mutate({
      url: `${tempData.baseUrl}/comments/delete`,
      method: 'delete',
      data: {
        id,
      },
    });
  } catch {
    alert('본인의 댓글이 아니므로 삭제할 수 없습니다.');
  }
};
