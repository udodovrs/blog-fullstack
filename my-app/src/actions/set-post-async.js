import { request } from '../utils/request';
import { ACTION_TYPE } from './action-type';

export const setPostAsync = (postId) => (dispatch) => {
	request(`/posts/${postId}`).then(({ data }) => {
		dispatch({
			type: ACTION_TYPE.SET_POST,
			payload: data,
		});
	});
};
