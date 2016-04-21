/** @jsx dom */
import clickOutside from 'click-outside';
import deepEqual from 'deep-equal';
import dom from 'magic-virtual-element';
import findIndex from 'lodash.findindex';
import uniq from 'uniq';
import Option from './option';

const propTypes = {
	class: {
		type: 'string'
	},
	forceClose: {
		type: 'boolean'
	},
	id: {
		type: 'string'
	},
	multiple: {
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
	},
	symbol: {
		type: 'string'
	},
	showValue: {
		type: 'boolean'
	}
};

const defaultProps = {
	showValue: true,
	symbol: '\u2a2f'
};

const initialState = () => {
	return {
		active: []
	};
};

const afterMount = ({props, state}, el, setState) => {
	const {multiple, options} = props;
	const {active} = state;

	options.forEach(x => x.active && active.push(x));
	setState({active: multiple || !active.length ? active : [active[active.length - 1]]});

	clickOutside(el, () => setState({open: false}));
};

const onRemove = (val, props, state, setState) => {
	const {name, onChange} = props;
	const {active} = state;
	const arr = active.map(x => x.value);

	active.splice(findIndex(arr, x => deepEqual(x, val)), 1);

	setState({active});

	if (onChange) {
		onChange({[name]: uniq(active.map(x => x.value), (a, b) => !deepEqual(a, b))});
	}

	return;
};

const getText = (props, state, setState) => {
	const {multiple, placeholder, showValue, symbol} = props;
	const {active} = state;

	if (active.length && multiple && showValue) {
		return active.map(x => {
			return (
				<div class='Select-multiple'>
					<div class='Select-remove' onClick={() => onRemove(x.value, props, state, setState)}>
						{symbol}
					</div>
					{x.label}
				</div>
			);
		});
	}

	if (active.length && !multiple && showValue) {
		return <div class='Select-text'>{active[0].label}</div>;
	}

	return <div class='Select-placeholder'>{placeholder}</div>;
};

const onClick = (option, props, state, setState) => {
	const {forceClose, multiple, name, onChange} = props;
	const {active, open} = state;
	const arr = active.map(x => x.value);
	let ret = [option];

	if (arr.some(x => deepEqual(x, option.value))) {
		active.splice(findIndex(arr, x => deepEqual(x, option.value)), 1);

		const obj = {active};

		if (forceClose) {
			obj.open = false;
		}

		setState(obj);

		if (onChange) {
			onChange({[name]: uniq(active.map(x => x.value), (a, b) => !deepEqual(a, b))});
		}

		return;
	}

	if (multiple) {
		ret = active.filter(x => x.value).concat(ret);
	}

	setState({active: uniq(ret, (a, b) => !deepEqual(a, b)), open: multiple && !forceClose ? open : false});

	if (onChange) {
		onChange({[name]: uniq(ret.map(x => x.value), (a, b) => !deepEqual(a, b))});
	}
};

const getOptions = (props, state, setState) => {
	const {options} = props;
	const {active} = state;
	const arr = active.filter(x => x.value).map(x => x.value);

	return options.map(x => {
		return <Option active={arr.some(y => deepEqual(y, x.value))} data={x} onClick={() => onClick(x, props, state, setState)}/>;
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

export default {afterMount, defaultProps, initialState, propTypes, render};
