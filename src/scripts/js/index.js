/* ДЗ 1 - Функции */


/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
function returnFirstArgument(arg) {
	return arg;
	
}

/*
 Задание 2:

 Функция должна принимать два аргумента и возвращать сумму переданных значений
 Значение по умолчанию второго аргумента должно быть 100
 */
function defaultParameterValue(a, b = 100) {
	return a+b;
}

/*
 Задание 3:

 Функция должна возвращать все переданные в нее аргументы в виде массива
 Количество переданных аргументов заранее неизвестно
 */
function returnArgumentsArray(...args) {
	return args;
}

/*
 Задание 4:

 Функция должна принимать другую функцию и возвращать результат вызова переданной функции
 */
function returnFnResult(fn) {
	return fn();
}

/*
 Задание 5:

 Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
 При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
 */
function returnCounter(n) {
	n = n || 0;
	return function F() {
		return ++n;
	}
}

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
 */
function bindFunction(F, ...args) {
	var fn = F.bind(null, ...args);
	return fn;
}


/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */


function isAllTrue(array, fn) {
	if(!array.length) {
		throw new Error("empty array");
	}
	if(!(typeof(fn) == 'function')) {
		throw new Error("fn is not a function");
	} 

	var trueElements = 0;

	for (var i = 0; i < array.length; i++) {
		if(fn(array[i])) {
			trueElements++;
		}
	};

	if(trueElements === array.length) {
		return true;
	} else {
		return false;
	}
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
	if(!(typeof(array) === "array")) throw new Error("empty array");
	if(!(typeof(fn) === "function")) throw new Error("fn is not a function");

	var num = 0;

	for(let i = 0; i < array.length; i++) {
		if(fn(array[i])) num++;
	}

	var result = num ? true : false;
	return result;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn, ...args) {
	if(!(typeof(fn) == "function")) {
		throw new Error("fn is not a function");
	}

	var badArray = [];
	
	for(let i = 0; i < args.length; i++) {
		try {
			fn(args[i]);
		} catch(e) {
			badArray.push(args[i]);
		}
	}

	return badArray;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number) {
	number = number || 0;

	if(isNaN(number)) {
		throw new Error("number is not a number");
	}

	return {
		sum: function() {
			for(let i = 0; i < arguments.length; i++) {
				number+= arguments[i]
			}
			return number;
		},
		dif: function() {
			for(let i = 0; i < arguments.length; i++) {
				number = number - arguments[i]
			}
			return number;
		},
		div: function() {
			var result = 0;

			for(let i = 0; i < arguments.length; i++) {

				if(arguments[i] == 0) {
					throw new Error("division by 0");
				}

				if(i == 0) {
					result = number / arguments[i]
				} else {
					result = result / arguments[i]
				}

			}
			return result;
		},
		mul: function() {
			var result;
			for(let i = 0; i < arguments.length; i++) {
				if(i == 0) {
					result = number * arguments[i]
				} else {
					result = result * arguments[i]
				}
			}
			return result;
		}
	}
}



/* ДЗ 3 - работа с массивами и объектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
	for(let i = 0; i < array.length; i++) {
		fn(array[i], i, array);
	}
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
	var newArray = [];

	for(let i = 0; i < array.length; i++) {
		newArray.push( fn(array[i], i, array) );
	}

	return newArray;
}

/*
 Задача 3:
 Напишите функцию-аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
	var hasInitial;
	var result;

	if(!initial) {
		hasInitial = false;
	}else {
		hasInitial = true;
	}

	for(let i = 0; i < array.length; i++) {
		if(hasInitial && i === 0) {
			result = fn(initial, array[0]);
		}else if(!hasInitial && i === 0){
			result = fn(array[0], array[1]);
		}else if(hasInitial && i > 0) {
			result = fn(result, array[i]);
		}else if(!hasInitial && i > 0 && (array[i+1] != undefined)){
			result = fn(result, array[i+1]);
		}
	}
	return result;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
	delete obj.prop
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
	return obj.hasOwnProperty(prop)
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
	return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
	var array = [];
	for(var key in obj) {
		array.push(obj.key.toUpperCase())
	}
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
	to = to || array.length;
	var newArray = []
	while(from<to) {
		newArray.push(array[from]);
		from++
	}
	return newArray;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
	var proxy = new Proxy(obj, {
		set(target, prop, value) {
	    target[prop] = value*value;
	    return true;
  	}
	})
	return proxy;
}






/* ДЗ 4 - работа с DOM */

/**
 * Функция должна создать элемент с тегом DIV, поместить в него текстовый узел и вернуть получившийся элемент
 *
 * @param {string} text - текст, который необходимо поместить в div
 * @return {Element}
 */
function createDivWithText(text) {
	var newElement = document.createElement("div");
	newElement.textContent = text;
	return newElement;
}

/**
 * Функция должна создать элемент с тегом A, установить значение для атрибута href и вернуть получившийся элемент
 *
 * @param {string} hrefValue - значение для атрибута href
 * @return {Element}
 */
function createAWithHref(hrefValue) {
	var newLink = document.createElement("a");
	newLink.setAttribute("href", hrefValue);
	return newLink;
}

/**
 * Функция должна вставлять элемент what в начало элемента where
 *
 * @param {Element} what - что вставлять
 * @param {Element} where - куда вставлять
 */
function prepend(what, where) {
	where.insertBefore(what, where.firstChild)
}

/**
 * Функция должна перебрать все дочерние элементы элемента where
 * и вернуть массив, состоящий из тех дочерних элементов
 * следующим соседом которых является элемент с тегом P
 * Рекурсия - по желанию
 *
 * @param {Element} where - где искать
 * @return {Array<Element>}
 *
 * @example
 * для html '<div></div><p></p><a></a><span></span><p></p>'
 * функция должна вернуть: [div, span]
 * т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
	var newArr = [];
	var whereChilds = where.children;

	for(let i = 0; i < whereChilds.length; i++) {
		if(whereChilds[i].nextElementSibling) {
			if (whereChilds[i].nextElementSibling.tagName === "P"){
				newArr.push(whereChilds[i])
			}
		}
	}

	return newArr;
}

/**
 * Функция должна перебрать все дочерние узлы типа "элемент" внутри where
 * и вернуть массив, состоящий из текстового содержимого перебираемых элементов
 * Но похоже, что в код закралась ошибка, которую нужно найти и исправить
 *
 * @param {Element} where - где искать
 * @return {Array<string>}
 */
function findError(where) {
    var result = [];

    for (var i = 0; i < where.children.length; i++) {
      result.push(where.children[i].textContent.trim());
    }

    return result;
}

/**
 * Функция должна перебрать все дочерние узлы элемента where
 * и удалить из него все текстовые узлы
 * Без рекурсии!
 * Будьте внимательны при удалении узлов,
 * можно получить неожиданное поведение при переборе узлов
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
 * должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
	var whereArray = where.childNodes;
	console.log("элементы до удаления текстовых узлов", whereArray);
	for(let i = 0; i < whereArray.length; i++) {
		if(whereArray[i].nodeType === 3) {
			whereArray[i].remove();
		}
	}
	console.log("элементы после удаления текстовых узлов", where.childNodes);
}

/**
 * Выполнить предудыщее задание с использование рекурсии
 * то есть необходимо заходить внутрь каждого дочернего элемента
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
 * должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
	var whereArray = where.childNodes;
	for(let i = 0; i < whereArray.length; i++) {
		if(whereArray[i].nodeType === 3) {
			whereArray[i].remove();
			continue;
		}
		deleteTextNodesRecursive(whereArray[i]);
	}
}

/**
 * *** Со звездочкой ***
 * Необходимо собрать статистику по всем узлам внутри элемента root и вернуть ее в виде объекта
 * Статистика должна содержать:
 * - количество текстовых узлов
 * - количество элементов каждого класса
 * - количество элементов каждого тега
 * Для работы с классами рекомендуется использовать свойство classList
 * Постарайтесь не создавать глобальных переменных
 *
 * @param {Element} root - где собирать статистику
 * @return {{tags: Object<string, number>, classes: Object<string, number>, texts: number}}
 *
 * @example
 * для html <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
 * должен быть возвращен такой объект:
 * {
 *   tags: { DIV: 1, B: 2},
 *   classes: { "some-class-1": 2, "some-class-2": 1 },
 *   texts: 3
 * }
 */
function collectDOMStat(root) {
	var statistics = {
		tags: {},
		classes: {},
		texts: 0
	}

	function innerCollect(root) {
		var elemAr = root.childNodes;
		for(let i = 0; i < elemAr.length; i++) {
			switch (elemAr[i].nodeType) {
				case 1:
					if(!(elemAr[i].tagName in statistics.tags)) {
						statistics.tags[elemAr[i].tagName] = 0;
					}
					statistics.tags[elemAr[i].tagName] += 1;

					if(elemAr[i].classList.length > 0) {
						for(let j = 0; j < elemAr[i].classList.length; j++) {
							if(!(elemAr[i].classList[j] in statistics.classes)) {
								statistics.classes[elemAr[i].classList[j]] = 0;
							}
							statistics.classes[elemAr[i].classList[j]] += 1;
						}
					}

					if(elemAr[i].childNodes.length > 0) {
						innerCollect(elemAr[i])
					}
					break;
				case 3:
					statistics.texts += 1;
					break;	
				default:
					break;
			}
		}
		return statistics;
	}

	return innerCollect(root);
}

/**
 * *** Со звездочкой ***
 * Функция должна отслеживать добавление и удаление элементов внутри элемента where
 * Как только в where добавляются или удаляются элемента,
 * необходимо сообщать об этом при помощи вызова функции fn со специальным аргументом
 * В качестве аргумента должен быть передан объект с двумя свойствами:
 * - type: типа события (insert или remove)
 * - nodes: массив из удаленных или добавленных элементов (а зависимости от события)
 * Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов
 * Рекомендуется использовать MutationObserver
 *
 * @param {Element} where - где отслеживать
 * @param {function(info: {type: string, nodes: Array<Element>})} fn - функция, которую необходимо вызвать
 *
 * @example
 * если в where или в одного из его детей добавляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'insert',
 *   nodes: [div]
 * }
 *
 * ------
 *
 * если из where или из одного из его детей удаляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'remove',
 *   nodes: [div]
 * }
 */
function observeChildNodes(where, fn) {

	var mutationParam = {
		type: "",
		nodes: []
	};

	// создаем экземпляр наблюдателя
	var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {

    	if(mutation.removedNodes.length) {
    		mutationParam.type = "remove";
    		mutationParam.nodes.length = 0;
    		for(let i = 0; i < mutation.removedNodes.length; i++) {
    			mutationParam.nodes.push(mutation.removedNodes[i]);
    		}
    		fn(mutationParam);
    	}else if(mutation.addedNodes.length) {
    		mutationParam.type = "added";
    		mutationParam.nodes.length = 0;
    		for(let i = 0; i < mutation.addedNodes.length; i++) {
    			mutationParam.nodes.push(mutation.addedNodes[i]);
    		}
    		fn(mutationParam);
    	}

    });    
	});
	// передаем элемент и настройки в наблюдатель
	observer.observe(where, {childList: true, subtree: true});
}



/* ДЗ 5 - DOM Events */

/**
 * Функция должна добавлять обработчик fn события eventName к элементу target
 *
 * @param {string} eventName - имя события, на которое нужно добавить обработчик
 * @param {Element} target - элемент, на который нужно добавить обработчик
 * @param {function} fn - обработчик
 */
function addListener(eventName, target, fn) {
	target.addEventListener(eventName, fn)
}

/**
 * Функция должна удалять обработчик fn события eventName у элемента target
 *
 * @param {string} eventName - имя события, для которого нужно удалить обработчик
 * @param {Element} target - элемент, у которого нужно удалить обработчик
 * @param {function} fn - обработчик
 */
function removeListener(eventName, target, fn) {
	target.removeEventListener(eventName, fn)
}

/**
 * Функция должна добавлять к target обработчик события eventName, который должен отменять действие по умолчанию
 *
 * @param {string} eventName - имя события, для которого нужно удалить обработчик
 * @param {Element} target - элемент, на который нужно добавить обработчик
 */
function skipDefault(eventName, target) {
	target.addEventListener(eventName, e => e.preventDefault())
}

/**
 * Функция должна эмулировать событие click для элемента target
 *
 * @param {Element} target - элемент, на который нужно добавить обработчик
 */
function emulateClick(target) {
	target.dispatchEvent(new Event("click"));
}

/**
 * Функция должна добавить такой обработчик кликов к элементу target
 * который реагирует (вызывает fn) только на клики по элементам BUTTON внутри target
 *
 * @param {Element} target - элемент, на который нужно добавить обработчик
 * @param {function} fn - функция, которую нужно вызвать при клике на элемент BUTTON внутри target
 */
function delegate(target, fn) {
	target.addEventListener("click", (e) => {
		if(e.target.tagName === "BUTTON") {
			fn(e)
		}
	})
}

/**
 * *** Со звездочкой ***
 * Функция должна добавить такой обработчик кликов к элементу target
 * который сработает только один раз и удалится
 * Постарайтесь не создавать глобальных переменных
 *
 * @param {Element} target - элемент, на который нужно добавить обработчик
 * @param {function} fn - обработчик
 */
function once(target, fn) {
	target.addEventListener("click", fn);
}


/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */



/*
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
 
function createDiv() {
	var homeworkContainer = document.getElementById('homework-container');
	var sizes = homeworkContainer.getBoundingClientRect();
	var elTop = sizes.top;
	var elLeft = sizes.left;
	var elRight = sizes.right;
	var elBottom = sizes.bottom;

	var elem = document.createElement("div");
	var wSize = getRandomNumber(200),
			hSize = getRandomNumber(200),
			rColor = getRandomNumber(256),
			gColor = getRandomNumber(256),
			bColor = getRandomNumber(256),
			xPos = getRandomNumber(elRight-elLeft-(wSize)),
			yPos = getRandomNumber(elBottom-elTop-(hSize));

	elem.setAttribute("class", "draggable-div");
	elem.setAttribute("draggable", "true");

	elem.style.cssText = `
		position: absolute;
		top: ${yPos}px;
		left: ${xPos}px;
		background: rgb(${rColor},${gColor},${bColor}); 
		width: ${wSize+20}px;
		height: ${hSize+20}px;
		cursor: move;
		`;

	function getRandomNumber(num) {
		num = num || 10;
		return Math.floor(Math.random()*num) + 1
	}

	return elem;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListenersDragDrop(target) {

	target.ondragstart = function() {
  	return false;
	};

	target.addEventListener("mousedown", (e) => {

		if(target.style.zIndex) {
			target.style.zIndex += 1;
		}else {
			target.style.zIndex = 1000;
		}
		
		function moveAt(e) {
    	target.style.left = e.pageX - target.offsetWidth / 2 + 'px';
    	target.style.top = e.pageY - target.offsetHeight / 2 + 'px';
  	}

  	document.addEventListener("mousemove", moveAt);

  	function mouseUpFunc() {
	    document.removeEventListener("mousemove", moveAt);
	    target.removeEventListener("mouseup", mouseUpFunc);
  	}

  	target.addEventListener("mouseup", mouseUpFunc); 
	})
}



function canvasPaint(canvasBlock) {
	var c = canvasBlock;
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	var ctx = c.getContext("2d");

	ctx.fillStyle = "red";

	c.addEventListener("mousedown", e => {
		ctx.beginPath();

		function mousemoveFunc(e) {
			ctx.lineTo(e.clientX, e.clientY);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(e.clientX, e.clientY);
		}

		function mouseupFunc(e) {
			c.removeEventListener("mousemove", mousemoveFunc);
			c.removeEventListener("mouseup", mouseupFunc);
		}

		c.addEventListener("mousemove", mousemoveFunc);
		c.addEventListener("mouseup", mouseupFunc);
	})
}




/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {

	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve();
		}, seconds)
	})
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
	return new Promise(function(resolve,reject) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json");
		xhr.onload = function() {
			var citiesArray = JSON.parse(xhr.responseText);
			
			var newArrStr = [];
			var newArrObj = [];

			citiesArray.forEach(function(item, idx) {
				newArrStr.push(item.name)
			})

			newArrStr = newArrStr.sort();

			newArrStr.forEach(function(item, idx) {
				var objOfCity = {};
				objOfCity.name = item;
				newArrObj.push(objOfCity)
			})
			resolve(newArrObj);
		}
		xhr.send();
	})
}




export {
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
}
