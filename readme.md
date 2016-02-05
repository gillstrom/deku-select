# deku-select

> A Select componenent for Deku


## Install

```
$ npm install --save deku-select
```


## Usage

```js
import Select from 'deku-select';

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
			<Select name='city_single' class='CustomClass' options={options} placeholder='Single: Pick a city' onChange={onChange}/>
		</div>
	);
};

export default {render};
```


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
