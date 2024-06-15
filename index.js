function Validator(options) {



    var selectorRules = {};


    // Hàm kiểm tra và hiển thị lỗi
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorselector);
        var errorMessage;

        //Lấy ra các rules của selector
        var rules = selectorRules[rule.selector]

        //Lặp qua từng rule và kiểm tra,nếu lỗi ở rule nào thì dừng
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage)
                break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
        return !errorMessage;
    }

    var formElement = document.querySelector(options.form);

    if (formElement) {

        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isSuccess = true;

            options.rules.forEach(function (rule) {
                var inputElement = document.querySelector(rule.selector);
                validate(inputElement, rule);
                var isvalid = validate(inputElement, rule);
                if (!isvalid)
                    isSuccess = false;
            })



            if (isSuccess)
                if (typeof options.onSubmit === 'function') {
                    var formInputs = formElement.querySelectorAll('[name]');
                    var inputArray = Array.from(formInputs).reduce(function (values, input) {
                        values[input.name] = input.value;
                        return values;
                    }, {});

                    options.onSubmit(inputArray);
                }

        }

        options.rules.forEach(function (rule) {

            //Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test]
            }

            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                };
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorselector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });

    }
}

// Định nghĩa các quy tắc kiểm tra
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        }
    };
};

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là email';
        }
    };
};

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
};

Validator.isPhoneNumber = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\d{10}$/;
            return regex.test(value) ? undefined : 'Số điện thoại phải chứa 10 chữ số';
        }
    };
};
Validator.isConfrimed = function (selector, getConfrimValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfrimValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
        }
    }
}


// Get the modal element and overlay
const loginModal = document.querySelector('.login-form');
const overlay = document.querySelector('.overlay');
const registerLink = document.querySelector('.register-link');
const registerForm = document.querySelector('.register-form');

// Function to show the login modal and overlay
function showLoginForm() {
    loginModal.classList.add('show');
    overlay.classList.add('show');
    document.body.classList.add('modal-open');
}

// Function to close the login modal and overlay
function closeLoginForm() {
    loginModal.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Function to show the register form
function showRegisterForm() {
    registerForm.classList.add('show');
    loginModal.classList.remove('show');
}

// Function to close the register form
function closeRegisterForm() {
    registerForm.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Add event listener to the userButton
const userButton = document.querySelector('.user-icon');
if (userButton) {
    userButton.addEventListener('click', showLoginForm);
}

// Add event listener to the registerLink
if (registerLink) {
    registerLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor behavior
        showRegisterForm();
    });
}

// Add event listener to the overlay to close modals
if (overlay) {
    overlay.addEventListener('click', function () {
        closeLoginForm();
        closeRegisterForm();
    });
}


