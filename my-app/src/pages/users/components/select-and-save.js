import propTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '../../../components/icon/icon';
import { request } from '../../../utils/request';
import styled from 'styled-components';

const SelectAndSaveContainer = ({
	className,
	roles,
	userRoleId,
	userId,
	isUpdate,
	setIsUpdate,
}) => {
	const [value, setValue] = useState(userRoleId);

	const handleClick = () => {
		if (Number(value) === userRoleId) {
			return;
		}

		request(`/users/${userId}`, "PATCH", { roleId: Number(value) }).then(() => {
			setIsUpdate(!isUpdate);
		});
	};

	return (
		<div className={className}>
			<select value={value} onChange={({ target }) => setValue(target.value)}>
				{roles.map(({ id, name }) => (
					<option key={id} value={id}>
						{name}
					</option>
				))}
			</select>
			<Icon
				id={'fa-floppy-o'}
				size={'25px'}
				onClick={handleClick}
				color={Number(value) === Number(userRoleId) ? '#ccc' : 'black'}
			/>
		</div>
	);
};

export const SelectAndSave = styled(SelectAndSaveContainer)`
	display: flex;
`;

SelectAndSave.propTypes = {
	roles: propTypes.array,
	userRoleId: propTypes.string,
	userId: propTypes.string,
	userSession: propTypes.string,
	isUpdate: propTypes.bool,
	setIsUpdate: propTypes.func,
};
