(function () {
    'use strict';

    // Fetch all the forms to apply custom Bootstrap validation styles
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over each form and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
})();