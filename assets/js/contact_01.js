		document.addEventListener('DOMContentLoaded', function () {

      		var constraints_contacto = {
      		  nombres: {
      		    presence: true
      		  },
      		  telefono: {
      		    presence: true
      		  },
      		  email: {
      		    presence: true,
      		    email: true
      		  },
      		  comentario: {
      		    presence: true
      		  }
      		};

      		/*<----------CONTACTO*/
    		// Hook up the form so we can prevent it from being posted
    		var form_two = document.querySelector("form#contacto");
    		form_two.addEventListener("submit", function(ev) {
    		  	ev.preventDefault();
    		  	handleFormSubmit(form_two,'contacto',constraints_contacto);
    		});
    		// Hook up the inputs to validate on the fly
    		var inputs_two = form_two.querySelectorAll("input, textarea, select")
    		validateInputOnTheFly(inputs_two, form_two, constraints_contacto);
			/*CONTACTO------------>*/

    		function validateInputOnTheFly(inputs, form, constraints_selected){
    			for (var i = 0; i < inputs.length; ++i) {
    			  	inputs.item(i).addEventListener("change", function(ev) {
    			  	  	var errors = validate(form, constraints_selected) || {};
    			  	  	showErrorsForInput(this, errors[this.name])
    			  	});
    			}
    		}

      		function handleFormSubmit(form,type,constraints_selected) {
      			// validate the form against the constraints
      			var errors = validate(form, constraints_selected);
      			// then we update the form to reflect the results
      			showErrors(form, errors || {});
      			if (!errors) {
      				form.classList.add('loading');
    				const formData = new FormData(form);
    				// Enviar el formulario con AJAX
    				fetch("{{ const.BASE_URL }}assets/library/contacto.php", {
    				  	method: "POST",
    				  	body: formData,
    				})
      				.then((response) => response.json())
      				.then((data) => {
      				  	if (data.success) {
							PNotify.success({
							  title: type==='reservaciones' ? 'Solcitud enviada' : 'Correcto',
							  text: type==='reservaciones' ? 'En breve te confirmaremos tu reservación' : 'Tu mensaje ha sido enviado'
							});
      				  	} else {
							PNotify.error({
							  title: 'Error',
							  text: 'Inténtalo más tarde'
							});
      				  	}
      				  	form.classList.remove('loading');
      				})
      				.catch((error) => {
      				  	console.error("Error en la solicitud:", error);
      				  	form.classList.remove('loading');
						PNotify.error({
						  title: 'Error',
						  text: 'Inténtalo más tarde'
						});
      				});
      			}else{

      			}
      		}

      		// Updates the inputs with the validation errors
      		function showErrors(form, errors) {
				var inputs = form.querySelectorAll("input[name], select[name], textarea[name]")
				inputs.forEach(function(input) {
				  	showErrorsForInput(input, errors && errors[input.name]);
				});
      		}

      		// Shows the errors for a specific input
      		function showErrorsForInput(input, errors) {
        		// This is the root of the input
        		var inputGroup = closestParent(input.parentNode, "input-group");
        		var formFloating = inputGroup.querySelector(".form-floating");
        		var input = inputGroup.querySelector(".form-control");
        		var errorFeedback = inputGroup.querySelector(".invalid-feedback");
        		// First we remove any old messages and resets the classes
        		resetInputGroup(formFloating,input,errorFeedback);
        		// If we have errors
        		if (errors) {
        			// we first mark the group has having errors
        			formFloating.classList.add("is-invalid");
        			input.classList.add("is-invalid");
        			// then we append all the errors
					errors.forEach(function(error) {
					  addError(errorFeedback, error);
					});
        		} else {
        		  // otherwise we simply mark it as success
        		  formFloating.classList.add("is-valid");
        		  input.classList.add("is-valid");
        		}
      		}

      		// Recusively finds the closest parent that has the specified class
      		function closestParent(child, className) {
      		  	if (!child || child == document) {
      		  	  	return null;
      		  	}
      		  	if (child.classList.contains(className)) {
      		  	  	return child;
      		  	} else {
      		  	  	return closestParent(child.parentNode, className);
      		  	}
      		}

      		function resetInputGroup(formFloating,input,errorFeedback) {
      		  	// Remove the success and error classes
      		  	formFloating.classList.remove("is-invalid");
      		  	formFloating.classList.remove("is-valid");
      		  	input.classList.remove("is-invalid");
      		  	input.classList.remove("is-valid");
      		  	errorFeedback.textContent = '';
      		}

      		// Adds the specified error with the following markup
      		// <p class="help-block error">[message]</p>
      		function addError(errorFeedback, error) {
      		  	var block = document.createElement("span");
      		  	block.classList.add("block_ctrl");
      		  	block.classList.add("error");
      		  	block.innerText = error;
      		  	errorFeedback.appendChild(block);
      		}

		});