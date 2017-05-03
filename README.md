# backstage-dropdown

Backstage React dropdown component

[![Build Status](https://travis-ci.org/backstage-ui/backstage-dropdown.png?branch=master)](https://travis-ci.org/backstage-ui/backstage-dropdown)

## Installing

```bash
$ npm install backstage-dropdown --save
```

### Required Props

* `options`: all the options of the dropdown;
* `selectedOption`: current selected option;

### Props
* `onSelectOption`: callback called when the user select any option;
* `onOpen`: callback called when the user open the dropdown;
* `onClose`: callback called when the user close the dropdown:
    * by selecting an option,
    * by clicking in any other place.
* `className`: custom CSS class to the component;
* `disabled`: disable the component;
* `small`: shows the component in a small size;
* `openUp`: opens the dropdown up;

## Example

```js
import React from 'react';
import { render } from 'react-dom';
import Dropdown from 'backstage-dropdown';


const OPTIONS = [
  {value: "grape", label: "Grape"},
  {value: "apple", label: "Apple"},
  {value: "mango", label: "Mango"},
  {value: "tangerine", label: "Tangerine"},
];

render(<Dropdown options={OPTIONS} selectedOption='grape' />, document.getElementById('container'));
```
