document.addEventListener('DOMContentLoaded', function () {

    // Definir las reglas de validación para ambos formularios
    var constraints_contacto = {
        nombre: {
            presence: true
        },
        telefono: {
            presence: true
        },
        email: {
            presence: true,
            email: true
        },
        detalles: {
            presence: true
        }
    };

    var constraints_cotiza = {
        nombre: {
            presence: true
        },
        telefono: {
            presence: true
        },
        email: {
            presence: true,
            email: true
        },
        detalles: {
            presence: true
        }
    };

    // Función para inicializar la validación de un formulario
    function initFormValidation(formId, constraints) {
        var form = document.getElementById(formId);
        if (form) {
            form.addEventListener("submit", function (ev) {
                ev.preventDefault();
                handleFormSubmit(form, constraints);
            });
            var inputs = form.querySelectorAll("input, textarea, select");
            validateInputOnTheFly(inputs, form, constraints);
        }
    }

    // Inicializa la validación para ambos formularios
    initFormValidation("contact_form", constraints_contacto);
    initFormValidation("cotiza", constraints_cotiza);

    // Validación en tiempo real
    function validateInputOnTheFly(inputs, form, constraints_selected) {
        for (var i = 0; i < inputs.length; ++i) {
            inputs.item(i).addEventListener("change", function () {
                var errors = validate(form, constraints_selected) || {};
                showErrorsForInput(this, errors[this.name]);
            });
        }
    }

    // Enviar el formulario
    function handleFormSubmit(form, constraints_selected) {
        var errors = validate(form, constraints_selected);
        showErrors(form, errors || {});
        if (!errors) {
            form.classList.add('loading');
            const formData = new FormData(form);
            fetch(window.base_url + "assets/library/contacto.php", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        PNotify.success({
                            title: 'Solicitud enviada',
                            text: 'En breve nos comunicaremos contigo'
                        });
                        form.reset();
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
        }
    }

    // Mostrar errores en los inputs
    function showErrors(form, errors) {
        var inputs = form.querySelectorAll("input[name], select[name], textarea[name]");
        inputs.forEach(function (input) {
            showErrorsForInput(input, errors && errors[input.name]);
        });
    }

    function showErrorsForInput(input, errors) {
        var inputGroup = closestParent(input.parentNode, "parent_form");
        var errorFeedback = inputGroup.querySelector(".invalid-feedback");
        resetInputGroup(inputGroup, input, errorFeedback);
        if (errors) {
            inputGroup.classList.add("is-invalid");
            input.classList.add("is-invalid");
            errors.forEach(function (error) {
                addError(errorFeedback, error);
            });
        } else {
            inputGroup.classList.add("is-valid");
            input.classList.add("is-valid");
        }
    }

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

    function resetInputGroup(inputGroup, input, errorFeedback) {
        inputGroup.classList.remove("is-invalid");
        inputGroup.classList.remove("is-valid");
        input.classList.remove("is-invalid");
        input.classList.remove("is-valid");
        errorFeedback.textContent = '';
    }

    function addError(errorFeedback, error) {
        var block = document.createElement("span");
        block.classList.add("block_ctrl");
        block.classList.add("error");
        block.innerText = error;
        errorFeedback.appendChild(block);
    }

});
