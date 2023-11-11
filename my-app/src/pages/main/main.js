import { useEffect, useRef, useState } from 'react';
import { Search } from './components/search';
import { Post } from './components/post';
import { Pagination } from './components/pagination';
import styled from 'styled-components';
import { request } from '../../utils/request';

const MianContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [totalCountPage, setTotalCountPage] = useState(null);
	const [isUpdate, setIsUpdate] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const searchValue = useRef('');

	const updateSearch = (value) => (searchValue.current = value);

	useEffect(() => {
		setIsLoading(true);
		request(`/posts?search=${searchValue.current}&page=${page}&limit=${6}`).then(
			({ data: { count, posts } }) => {
				setPosts(posts);
				setTotalCountPage(Number(count));
				setIsLoading(false);
			},
		);
	}, [page, isUpdate]);

	return (
		<div className={className}>
			<Search
				updateSearch={updateSearch}
				setIsUpdate={setIsUpdate}
				isUpdate={isUpdate}
			/>
			{isLoading ? (
				<h5 className="posts-area">Загрузка...</h5>
			) : (
				<div className="posts-area">
					{posts.length === 0 && <h3>Статьи не найдены</h3>}
					{posts.map(({ id, title, imageUrl, publishedAt, comments }) => (
						<Post
							key={id}
							id={id}
							title={title}
							imageUrl={imageUrl}
							publishedAt={publishedAt.substring(0, 16).replace('T', ' ')}
							comments={comments.length}
						/>
					))}
				</div>
			)}

			{(posts.length >= 6 || totalCountPage >= 6) && (
				<Pagination
					page={page}
					setPage={setPage}
					totalCountPage={totalCountPage}
				/>
			)}
		</div>
	);
};

export const Main = styled(MianContainer)`
	display: flex;
	flex-direction: column;
	position: relative;

	& .posts-area {
		display: flex;
		flex-wrap: wrap;
		gap: 43px;
		margin: 0 auto;
		width: 1000px;
	}
`;
