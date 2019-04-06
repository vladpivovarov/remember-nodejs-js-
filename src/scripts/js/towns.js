

var searchInput = document.querySelector(".search__input");
var searchStatus = document.querySelector(".search__status");
var searchList = document.querySelector(".search__list");
var citiesArray = [];
var resultArray = [];

function createList() {
	searchList.innerHTML = "";
	resultArray.forEach(function(item, idx) {
		var li = document.createElement("li");
		li.classList.add("search__item");
		li.textContent = item;

		searchList.appendChild(li);
	})
}

function loadTowns() {
	return new Promise(function(resolve, reject) {
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
			searchStatus.textContent = "";
			resolve(newArrObj);
		}

		xhr.send();

	})
}

function isMatching(full, chunk) {
	if( full.includes(chunk) ) {
		return true;
	}
	return false;
}

function startSearchCities() {
	loadTowns()
		.then(function(citiesArr) {
			citiesArray = citiesArr;

			searchInput.addEventListener("keyup", (e) => {
				searchList.innerHTML = "";
				var value = e.target.value;
				if(value.length > 1) {
					resultArray.length = 0;
					citiesArray.forEach(function(item, idx) {
						if( isMatching(item.name.toUpperCase(), value.toUpperCase()) ) {
							resultArray.push(item.name)
						}
					})
					createList();
				}
			})
			searchList.addEventListener("click", function(e) {
				if (!(e.target.tagName === "LI")) return;
				searchList.innerHTML = "";
				searchInput.value = e.target.textContent;
			})
		});
}

export {
		startSearchCities
};
