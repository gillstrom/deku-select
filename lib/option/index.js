/** @jsx dom */
import dom from 'magic-virtual-element';

const propTypes = {
	active: {
		type: 'boolean'
	},
	data: {
		type: 'object'
	},
	onClick: {
		type: 'function'
	}
};

const render = ({props}) => {
	const {active, data, onClick} = props;
	const {disabled, label} = data;
	const classes = {
		'Option': true,
		'Option--active': active,
		'Option--disabled': disabled
	};

	return (
		<div class={[classes, data.class]} onClick={disabled ? () => {} : onClick}>
			{label}
		</div>
	);
};

export default {propTypes, render};
