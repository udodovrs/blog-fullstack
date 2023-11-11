import { store } from '../store';

export const setUserSessionStorage = () => {
	const user = JSON.stringify(store.getState().user);
	sessionStorage.setItem('wduser', user);
};
