export default (function () {

	function form() {
		//----//
		if(!(document.forms.modalForm)) return;

		var modalForm = document.forms.modalForm;

		modalForm.addEventListener("submit", function(e) {
			e.preventDefault();

			var xhr = new XMLHttpRequest();
			xhr.open("POST", "message", true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onload = function(e) {
				var result;

				try {
					result = JSON.parse(xhr.responseText);
				} catch(e) {
					cb("Извините, в данных ошибка")
				}

				console.log(result.status);
				console.log(result.items);
			}

			var data = {
				name: modalForm.names.value,
				surname: modalForm.surname.value,
				message: modalForm.message.value
			}

			xhr.send(JSON.stringify(data));

		});




		//----//
	}

	




	return {
		init: form
	}

}())