/** @jsx dom */
import arrayUniq from 'array-uniq';
import clickOutside from 'click-outside';
import dom from 'magic-virtual-element';
import Option from './option';

const propTypes = {
	class: {
		type: 'string'
	},
	id: {
		type: 'string'
	},
	multi: {
		type: 'boolean'
	},
	name: {
		type: 'string'
	},
	onChange: {
		type: 'function'
	},
	options: {
		type: 'array'
	},
	placeholder: {
		type: 'string'
	}
};

const initialState = () => {
	return {
		active: []
	};
};

const afterMount = ({state}, el, setState) => {
	clickOutside(el, () => setState({open: false}));
};

const onRemove = (val, props, state, setState) => {
	const {name, onChange} = props;
	const {active} = state;
	const arr = active.map(x => x.value);

	active.splice(arr.indexOf(val), 1);

	setState({active: arrayUniq(active)});

	if (onChange) {
		onChange({[name]: arrayUniq(active.map(x => x.value))});
	}

	return;
};

const getText = (props, state, setState) => {
	const {multi, placeholder} = props;
	const {active} = state;

	if (active.length && multi) {
		return active.map(x => {
			return (
				<div class='Select-multiple'>
					<div class='Select-remove' onClick={() => onRemove(x.value, props, state, setState)}>
						&#10799;
					</div>
					{x.label}
				</div>
			);
		});
	}

	if (active.length && !multi) {
		return <div class='Select-text'>{active[0].label}</div>;
	}

	return <div class='Select-placeholder'>{placeholder}</div>;
};

const onClick = (option, props, state, setState) => {
	const {multi, name, onChange} = props;
	const {active} = state;
	const arr = active.map(x => x.value);
	let ret = [option];

	if (arr.indexOf(option.value) !== -1) {
		active.splice(arr.indexOf(option.value), 1);

		setState({active: arrayUniq(active)});

		if (onChange) {
			onChange({[name]: arrayUniq(active.map(x => x.value))});
		}

		return;
	}

	if (multi) {
		ret = active.filter(x => x.value).concat(ret);
	}

	setState({active: arrayUniq(ret)});

	if (onChange) {
		onChange({[name]: arrayUniq(ret.map(x => x.value))});
	}
};

const getOptions = (props, state, setState) => {
	const {options} = props;
	const {active} = state;
	const arr = active.filter(x => x.value).map(x => x.value);

	return options.map(x => {
		return <Option active={arr.indexOf(x.value) !== -1} data={x} onClick={() => onClick(x, props, state, setState)}/>;
	});
};

const render = ({props, state}, setState) => {
	const {id} = props;
	const {open} = state;

	return (
		<div class={['Select', props.class]} id={id}>
			<div class='Select-input' onClick={() => setState({open: true})}>
				{getText(props, state, setState)}
			</div>
			<div class={['Select-options', {'Select-options--open': open}]}>
				{getOptions(props, state, setState)}
			</div>
		</div>
	);
};

export default {afterMount, initialState, propTypes, render};
