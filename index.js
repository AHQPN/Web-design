function Validator(options) {



    var selectorRules = {};


    // Hàm kiểm tra và hiển thị lỗi
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorselector);
        console.log(errorElement);
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
    console.log(formElement)

    if (formElement) {

        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isSuccess = true;

            options.rules.forEach(function (rule) {
                var inputElement = document.querySelector(rule.selector);

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



const userButton = document.querySelector('.user-icon');
let Islogined = JSON.parse(localStorage.getItem('logined')) || false;
console.log(Islogined);
if(Islogined)
    userButton.classList.add('logined')
else
    userButton.classList.remove('logined');





function showLoginForm() {
    loginModal.classList.add('show');
    overlay.classList.add('show');
    document.body.classList.add('modal-open');
}


function closeLoginForm() {
    loginModal.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.remove('modal-open');
}

// mở form đk
function showRegisterForm() {
    registerForm.classList.add('show');
    loginModal.classList.remove('show');
}

// đóng form đk 
function closeRegisterForm() {
    registerForm.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.remove('modal-open');
}





if (userButton && !Islogined) {
    userButton.addEventListener('click', showLoginForm);
}



if (registerLink) {
    registerLink.addEventListener('click', function (event) {
        event.preventDefault(); 
        showRegisterForm();
    });
}


if (overlay) {
    overlay.addEventListener('click', function () {
        closeLoginForm();
        closeRegisterForm();
        closeLogoutform()
        searchIcon.innerHTML = '<i class="bi bi-search"></i>'; // Khôi phục lại biểu tượng kính lúp

    });
    
}


Validator({
    form: '#register-form1',
    errorselector: '.form-message',
    rules: [
        Validator.isRequired('#email-register'),
        Validator.isEmail('#email-register'),
        Validator.isRequired('#Phone-number'),
        Validator.isPhoneNumber('#Phone-number'),

        Validator.isRequired('#Address'),
        Validator.isRequired('#Pw-register'),
        Validator.minLength('#Pw-register', 6),
        Validator.isRequired('#Pw-confrim'),
        Validator.isConfrimed('#Pw-confrim', function () {
            return document.querySelector('#register-form1 #Pw-register').value;
        }, 'Mật khẩu nhập lại không chính xác'),

    ],
    onSubmit: function (data) {
        // Kiểm tra xem email đã tồn tại trong localStorage hay chưa
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Lặp qua danh sách người dùng trong localStorage để kiểm tra email
        let emailExists = users.some(function (user) {
            return user.email === data.email;
        });

        // Nếu email đã tồn tại, hiển thị thông báo lỗi và ngăn người dùng đăng ký
        if (emailExists) {
            alert('Địa chỉ email đã được sử dụng. Vui lòng sử dụng địa chỉ email khác.');
            return;
        }

        // Nếu không có email nào trùng, lưu dữ liệu người dùng vào localStorage
        users.push(data);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Đăng ký thành công');
        

    }
});
Validator({
    form: '#login-form1',
    errorselector: '.form-message',
    rules: [
        Validator.isRequired('#Email-login'),
        Validator.isEmail('#Email-login'),
        Validator.isRequired('#Pw-login')
    ],
    onSubmit: function (data) {
        let email = document.getElementById('Email-login').value;
        let password = document.getElementById('Pw-login').value;
        let logined = false;
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (email === 'abc@gmail.com' && password === '123456') {
            window.location.href = 'admin.html';
        } else if (email === storedUser.email && password === storedUser.pw) {
            alert('Đăng nhập thành công')
            logined = true;
            localStorage.setItem('logined', JSON.stringify(logined));
            state = 'inline-block';
            closeLoginForm();
            location.reload();
        }

        else {
            alert('Email hoặc mật khẩu không đúng!');
            state = 'none';
        }
    }
});

//LogOut

function closeLogoutform() {
    let logoutform = document.querySelector('.logout.show');
    if (logoutform) {
        logoutform.remove();
    }
    overlay.classList.remove('show');
    
}
userButton.addEventListener("click",handleLogout);


function logout() {
    // Thêm logic đăng xuất ở đây
    Islogined = false;
    alert('Đã đăng xuất');
    closeLogoutform(); // Đóng form sau khi đăng xuất
    localStorage.removeItem('logined');
    state ='none';
    location.reload();
}
function handleLogout(){
    if (Islogined == true) {
        overlay.classList.add('show');
        

        // Kiểm tra và xóa form đăng xuất nếu đã tồn tại
        

        let logoutform = document.createElement('div');
        logoutform.innerHTML = `
            <form action="" class="logout show">
                <button type="button" class="close-form border-0 p-0" aria-label="Close" onclick="closeLogoutform()">
                    <span class="fs-2" aria-hidden="true">&times;</span>
                </button>
                <div class="text-center">
                    <p>Xác nhận đăng xuất</p>
                    <button type="button" class="btn btn-primary w-50 logout-btn" onclick="logout()" type="search" >Đăng xuất</button>
                </div>
            </form>
        `;
        document.body.appendChild(logoutform);
        console.log(logoutform)
    }
}






// Xử lý giỏ hàng



const addtoCart = document.querySelector('.add-to-cart');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

console.log(addtoCart);

if(addtoCart ){
    addtoCart.addEventListener('click', function () {
        const productName = document.querySelector('.product-name').textContent;
        const productID = document.querySelector('.product-id').textContent;
        const productColor = document.querySelector('.color-option-item.active_option').textContent;
        const productQTy = 1;
        const productPrice = document.querySelector('.product-price').firstChild.textContent;
        const productSize = document.querySelector('.size-option-item.active_option').textContent;
    
        const productInfo = {
            name: productName,
            id: productID,
            color: productColor,
            qty: productQTy,
            price: productPrice,
            size: productSize
        };
    
        const existingProductIndex = cart.findIndex(item =>
            item.id === productID && item.color === productColor && item.size === productSize
        );
    
        if (existingProductIndex >= 0) {
            alert('Sản phẩm đã được thêm trước đó')
        } else {
            cart.push(productInfo);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Đã thêm vào giỏ hàng!');
        }
    
    });
}


//
const logInLogOut = document.querySelector('.login-offcanvs a')
console.log(logInLogOut)
if(!Islogined){
    logInLogOut.innerText = 'Đăng nhập'
}
else
    logInLogOut.innerText = 'Đăng xuất';

logInLogOut.addEventListener("click",function(){
    if(Islogined)
        handleLogout();
    else
        showLoginForm();

})


// Xử lý mua hàng
const Buybutton = document.querySelector('.buy-now');
if(Buybutton){
    Buybutton.addEventListener("click",function(event){
        event.preventDefault();
        if(!Islogined)
            showLoginForm();
        else
            alert('Mua Thành công:');
    })
}


//Xử lý tìm kiếm trên mobile

const searchIcon = document.querySelector('.search-box');
searchIcon.addEventListener("click", function() {
    overlay.classList.add('show');
    searchIcon.innerHTML = `
        <div class="search-bar-container">
            <input type="text" name="search" class="search-bar form-control" placeholder="Tìm kiếm">
        </div>
    `;
    setTimeout(() => {
        const searchBar = document.querySelector('.search-bar');
        if (searchBar) {
            searchBar.focus();
        }
    }, 0);
});





