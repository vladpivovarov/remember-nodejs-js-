export default (function () {

	function modal() {
		//----//
		if(!(document.querySelector(".modal-btn"))) return;

		var modalBtnOpen = document.querySelector(".modal-btn");
		var modal = document.querySelector(".modal");
		var modalBtnClose = document.querySelector(".form__close-btn");
		var modalForm = document.querySelector(".form");

		modalBtnOpen.addEventListener("click", function(e) {
			modal.classList.add("modal_active");
		});

		modalBtnClose.addEventListener("click", function(e) {
			this.closest(".modal_active").classList.remove("modal_active");
		});

		document.addEventListener("click", function (e) {

			if(document.querySelector(".modal_active") && e.target != modalBtnOpen) {
				var sizes = modalForm.getBoundingClientRect();
				var elTop = sizes.top;
				var elLeft = sizes.left;
				var elRight = sizes.right;
				var elBottom = sizes.bottom;
				var clickPosition;

	      if( (e.clientX < elLeft || e.clientX > elRight) || (e.clientY < elTop || e.clientY > elBottom)) {
	        modal.classList.remove("modal_active");
	      }

			}
			
		});

		//----//
}

	




	return {
		init: modal
	}

}())