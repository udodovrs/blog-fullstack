import { request } from '../utils/request';
import { ACTION_TYPE } from './action-type';

export const savePostAsync =
	(url, isNewPost, newTitile, newImgUrl, newContent, moveTo) => (dispatch) => {
		request(url, isNewPost ? 'POST' : 'PATCH', {
			title: newTitile,
			content: newContent,
			imageUrl: newImgUrl
		}).then(({ data }) => {
			console.log(data)
			dispatch({
				type: ACTION_TYPE.SET_POST,
				payload: data,
			});
			if (isNewPost) {
				moveTo(data.id);
			}
		});
	};
