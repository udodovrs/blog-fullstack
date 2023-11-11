import { PostControlPanel } from './post-conrol-panel';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { postSelector } from '../../../selectors';
import { setPostAsync } from '../../../actions/set-post-async';
import { useEffect, useState } from 'react';
import { Comments } from './comments';

const ArticleContainer = ({ className, postId }) => {
	const [isUpdate, setIsUpdate] = useState(null);
	const article = useSelector(postSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPostAsync(postId));
	}, [dispatch, postId, isUpdate]);

	return (
		<>
			{article.id ? (
				<div className={className}>
					<h2 className="title">{article.title}</h2>
					<img className="img" src={article.imageUrl} alt="img" />
					<PostControlPanel
						publishedAt={article.publishedAt
							.substring(0, 16)
							.replace('T', ' ')}
						postId={postId}
					/>
					<div className="content">{article.content}</div>
					<Comments
						comments={article.comments}
						postId={postId}
						isUpdate={isUpdate}
						setIsUpdate={setIsUpdate}
					/>
				</div>
			) : (
				<h3>Такой статьи не существует</h3>
			)}
		</>
	);
};

export const Article = styled(ArticleContainer)`
	position: relative;
	& .data-post {
		display: flex;
	}

	& .title {
		text-align: center;
	}

	& .img {
		width: 300px;
		float: left;
		margin-right: 50px;
		margin-bottom: 20px;
	}

	& .content {
		font-size: 1.2em;
		word-break: break-all;
		white-space: pre-line;
	}
`;
