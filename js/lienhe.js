window.onload = function () {
    khoiTao();

    // thêm tags (từ khóa) vào khung tìm kiếm
    var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
    for (var t of tags) addTags(t, "index.html?search=" + t);
}

function nguoidung() {
    //kiem tra ho ten
    var hoten = document.formlh.ht.value;
    //kiem tra so dien thoai
    var dienthoai = document.formlh.sdt.value;

    //kiểm tra họ tên
    if (!checkName(hoten)) {
        addAlertBox('Họ tên không phù hợp.', '#f55', '#000', 3000);
        formlh.ht.focus();
        return false;
    }
    //-------
    else if (!checkPhone(dienthoai)) {
        addAlertBox('Số điện thoại không phù hợp.', '#f55', '#000', 3000);
        return false;
    }

    addAlertBox('Gửi thành công. Chúng tôi chân thành cám ơn những góp ý từ bạn.', '#5f5', '#000', 5000); // cám ơn
    // document.formlh.reset(); // làm sạch
    return false; // thoát
}

function checkName(str) {
    var special = '~!@#$%^&*()_+=-`./*{}[]|\'<>?;"';

    for (var i = 0; i < str.length; i++) {
        if (Number(str[i])) return false;
        for(var j = 0; j < special.length; j++)
            if (str[i] == special[j]) return false;
    }
    return true;
}

function checkPhone(phone) {
    for(var i =0 ; i< phone.length ;i++)
    {
        if(phone.charAt(i)<"0" || phone.charAt(i)>"9")
            return false;
    }
    return true;
}

function checkPhone2(phone) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.match(phoneno)) return true;

    return false;
}