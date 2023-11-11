import { useSelector } from 'react-redux';
import { Icon } from '../../components/icon/icon';
import { SelectAndSave } from './components/select-and-save';
import { userSessionSelector } from '../../selectors';
import { useEffect, useState } from 'react';
import { ROLE } from '../../constants/role';
import { request } from '../../utils/request';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
	const userSession = useSelector(userSessionSelector);
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [isUpdate, setIsUpdate] = useState(false);


	useEffect(() => {
		Promise.all([request('/users'), request('/users/roles')]).then(
			([resUsers, resRoles]) => {
				setRoles(resRoles.data);
				setUsers(resUsers.data);
			},
		);
	}, [userSession, isUpdate,]);

	const handleDelete = (userId) => {
		request(`/users/${userId}`, "DELETE").then(({ error}) => {
			if (error) {
				console.error(error);
			}
			setIsUpdate(!isUpdate);
		});
	};

	const filterRoles = roles.filter(({ id }) => id !== ROLE.GUEST);

	return (
		<div className={className}>
			<h3>Пользователи</h3>
			<div>
				<div className="titleTable">
					<div>Логин</div>
					<div>Дата регистрации</div>
					<div>Роль</div>
				</div>
				{users.map(({ id, login, registredAt, roleId }) => (
					<div key={id} className="titleRow">
						<div className="userData">
							<div className="rowLogin">{login}</div>
							<div className="rowData">{registredAt}</div>
							<SelectAndSave
								roles={filterRoles}
								userRoleId={roleId}
								userId={id}
								userSession={userSession}
								isUpdate={isUpdate}
								setIsUpdate={setIsUpdate}
							/>
						</div>
						<Icon
							id={'fa-trash'}
							size={'25px'}
							onClick={() => handleDelete(id)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
export const Users = styled(UsersContainer)`
	width: 800px;
	margin: 0 auto;
	text-align: center;

	& .titleTable {
		display: flex;
		justify-content: space-around;
		font-weight: 700;
		border-bottom: 2px solid black;
		padding: 10px;
	}
	& .titleRow {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid black;
		padding: 5px;
	}

	& .userData {
		display: flex;
		width: 750px;
		justify-content: space-between;
	}

 	& .rowData{
		width: 250px;
    margin-right: 40px;
	}

	& .rowLogin{
		width: 250px;
	}
	}
`;
