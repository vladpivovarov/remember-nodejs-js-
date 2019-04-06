

// import 'bootstrap';

// Импорт стилей
// import 'bootstrap/dist/css/bootstrap.min.css';

import practics from "./js/practics.js";
import modal from "./js/modal.js";
import form from "./js/form.js";
import {
	returnFirstArgument,
	defaultParameterValue,
	returnArgumentsArray,
	returnFnResult,
	returnCounter,
	bindFunction,
	isAllTrue,
	isSomeTrue,
	returnBadArguments,
	calculator,
	forEach,
	map,
	reduce,
	upperProps,
	slice,
	createProxy,
	createDivWithText,
	createAWithHref,
	prepend,
	findAllPSiblings,
	findError,
	deleteTextNodes,
	deleteTextNodesRecursive,
	collectDOMStat,
	observeChildNodes,
	addListener,
	removeListener,
	skipDefault,
	emulateClick,
	delegate,
	once,
	createDiv,
	delayPromise,
	loadAndSortTowns
} from "./js/index.js";

import {
	startSearchCities
} from "./js/towns.js";


document.addEventListener("DOMContentLoaded", e => {
	practics.init();
	modal.init();
	form.init();

	startSearchCities();

})




