import propTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '../../../components/icon/icon';
import { ROLE } from '../../../constants/role';
import { checkAccess } from '../../../utils/check-access';
import { userSelector } from '../../../selectors';
import { request } from '../../../utils/request';
import styled from 'styled-components';


const NewCommentContainer = ({ className, postId, setIsUpdate, isUpdate }) => {
	const [valueComment, setValueComment] = useState('');
	const user = useSelector(userSelector);

	const access = checkAccess(user.roleId, [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]);

	const handleClick = () => {
		if (valueComment === '') {
			return;
		}
		request(`/posts/${postId}/comments`, "POST", {content:valueComment, author: user.id})
			.then((data) => {

				setIsUpdate(!isUpdate);
				setValueComment('');
			});
	};

	return (
		<div className={className}>
			{access && (
				<>
					<textarea
						className="textarea"
						value={valueComment}
						placeholder="Комментировать..."
						onChange={({ target }) => setValueComment(target.value)}
					/>
					<Icon
						id={'fa-paper-plane-o'}
						size={'30px'}
						onClick={handleClick}
						color={valueComment === '' ? '#ccc' : 'orange'}
					/>
				</>
			)}
		</div>
	);
};

export const NewComment = styled(NewCommentContainer)`
	display: flex;
	justify-content: center;
	margin-top: 30px;
	margin-bottom: 30px;
	& .textarea {
		width: 650px;
		height: 100px;
		font-size: 1.3em;
	}
`;

NewComment.propTypes = {
	postId: propTypes.string,
	setIsUpdate: propTypes.func,
	isUpdate: propTypes.bool,
};
