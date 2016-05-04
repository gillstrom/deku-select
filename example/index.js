/** @jsx dom */
import dom from 'magic-virtual-element';
import {render as r, tree} from 'deku';
import Select from '../';

const onChange = val => {
	console.log(val);
};

const render = () => {
	const options = [{
		label: 'Denver',
		value: 'denver'
	}, {
		active: true,
		label: 'Manitowoc',
		value: 'manitowoc'
	}, {
		disabled: true,
		label: 'San Diego',
		value: 'san-diego'
	}, {
		active: true,
		label: 'Bishop',
		value: 'bishop'
	}];

	return (
		<div>
			<Select name='city_multiple' class='CustomClass' options={options} placeholder='Multiple: Pick a city' onChange={onChange} multiple/>
			<Select name='city_single' class='CustomClass' options={options} placeholder='Single: Pick a city' onChange={onChange} toggle/>
		</div>
	);
};

const App = {render};
const app = tree(<App/>);

r(app, document.body);
