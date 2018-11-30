window.onload = function () {
    // thêm tags (từ khóa) vào khung tìm kiếm
    var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
    for (var t of tags) addTags(t, "index.html?search=" + t);
    setupEventTaiKhoan();
}

function nguoidung() {
    //kiem tra ho ten
    var hoten = document.formlh.ht.value;
    var ktrahoten = isNaN(hoten);
    //kiem tra so dien thoai
    var dienthoai = document.formlh.sdt.value;
    var ktradienthoai = isNaN(dienthoai);

    //kiểm tra họ tên
    if (ktrahoten == false) {
        alert("Mời bạn nhập lại họ tên");
        formlh.ht.focus();
        return false;
    }
    //-------
    else if (ktradienthoai == true) {
        alert("Mời bạn nhập vào số");
        formlh.sdt.focus();
        return false;
    } else if (dienthoai.charAt(0) == 0) {
        if (dienthoai.length != 10) {
            alert("Số điện thoại phải gồm 10 số");
            formlh.sdt.focus();
            return false;
        }
        return true;
    } else if (dienthoai.charAt(0) == "+" && dienthoai.charAt(1) == 8 && dienthoai.charAt(2) == 4) {
        if (dienthoai.length != 12) {
            alert("Bạn phải nhập đúng số điện thoại quy định");
            formlh.sdt.focus();
            return false;
        }
        return true;
    }
    if (dienthoai.charAt(0) != 0 || dienthoai.charAt(0) != "+84" || dienthoai.charAt(1) == 0) {
        alert("Số điện thoại phải bắt đầu từ 0 hoặc +84");
        formlh.sdt.focus();
        return false;
    }
    return true; // nếu không có gì sai thì submit
}