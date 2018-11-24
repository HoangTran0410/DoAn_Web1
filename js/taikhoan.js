function showTaiKhoan(show) {
    var value = (show ? "scale(1, 1)" : "scale(0, 0)");
    var div = document.getElementsByClassName('containTaikhoan')[0];
    div.style.transform = value;
}

function setupEventTaiKhoan() {
    var taikhoan = document.getElementsByClassName('taikhoan')[0];
    var list = taikhoan.getElementsByTagName('input');

    // Tạo event listener cho input để tạo hiệu ứng label
    ['keyup', 'blur', 'focus'].forEach(function (evt) {
        for (var l of list) {
            l.addEventListener(evt, function (e) {
                var label = this.previousElementSibling;
                if (e.type === 'keyup') {
                    if (this.value === '') {
                        label.classList.remove('active');
                        label.classList.remove('highlight');
                    } else {
                        label.classList.add('active');
                        label.classList.add('highlight');
                    }
                } else if (e.type === 'blur') {
                    if (this.value === '') {
                        label.classList.remove('active');
                        label.classList.remove('highlight');
                    } else {
                        label.classList.remove('highlight');
                    }
                } else if (e.type === 'focus') {

                    if (this.value === '') {
                        label.classList.remove('highlight');
                    } else if (this.value !== '') {
                        label.classList.add('highlight');
                    }
                }
            });
        }
    })

    // Event chuyển tab login signup
    var tab = document.getElementsByClassName('tab');
    for(var t of tab) {
        var a = t.getElementsByTagName('a')[0];
        a.addEventListener('click', function(e) {
            e.preventDefault(); // tắt event mặc định
            this.parentElement.classList.add('active');
            if(this.parentElement.nextElementSibling) {
                this.parentElement.nextElementSibling.classList.remove('active');
            }
            if(this.parentElement.previousElementSibling) {
                this.parentElement.previousElementSibling.classList.remove('active');
            }

            var target = this.href.split('#')[1];
            document.getElementById(target).style.display = 'block';

            var hide = (target=='login'?'signup':'login');
            document.getElementById(hide).style.display = 'none';
        })
    }

    // $('.taikhoan').find('input').on('keyup blur focus', function (e) {

    //     var $this = $(this),
    //         label = $this.prev('label');

    //     if (e.type === 'keyup') {
    //         if ($this.val() === '') {
    //             label.removeClass('active highlight');
    //         } else {
    //             label.addClass('active highlight');
    //         }
    //     } else if (e.type === 'blur') {
    //         if ($this.val() === '') {
    //             label.removeClass('active highlight');
    //         } else {
    //             label.removeClass('highlight');
    //         }
    //     } else if (e.type === 'focus') {

    //         if ($this.val() === '') {
    //             label.removeClass('highlight');
    //         } else if ($this.val() !== '') {
    //             label.addClass('highlight');
    //         }
    //     }

    // });

    // $('.tab a').on('click', function (e) {

    //     e.preventDefault();

    //     $(this).parent().addClass('active');
    //     $(this).parent().siblings().removeClass('active');

    //     target = $(this).attr('href');

    //     $('.tab-content > div').not(target).hide();

    //     $(target).fadeIn(600);

    // });
}

function logIn() {
    return true;
}

function signUp() {
    return true;
}