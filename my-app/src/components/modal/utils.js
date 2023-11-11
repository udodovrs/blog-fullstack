import { modalOpen, modalClose } from '../../actions';
import { request } from '../../utils/request';

export const onDelete = (url, text, dispatch, utils) => {
	dispatch(
		modalOpen({
			isOpen: true,
			content: text,
			onConfirm: () => {
				request(url, "DELETE").then(({ error }) => {
					if (error) {
						console.error(error);
					} else {
						utils();
						dispatch(modalClose);
					}
				});
			},
			onCancel: () => dispatch(modalClose),
		}),
	);
};
