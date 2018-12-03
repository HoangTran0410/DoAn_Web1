var currentUser;
var tongTienTatCaDonHang = 0; // lưu tổng tiền từ tất cả các đơn hàng đã mua

window.onload = function () {
    // autocomplete cho khung tim kiem
    autocomplete(document.getElementById('search-box'), list_products);

    // thêm tags (từ khóa) vào khung tìm kiếm
    var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
    for (var t of tags) addTags(t, "index.html?search=" + t);

    // Cài đặt event cho phần tài khoản
    setupEventTaiKhoan();

    currentUser = getCurrentUser();
    addTatCaDonHang(currentUser); // hàm này cần chạy trước để tính được tổng tiền tất cả đơn hàng 
    addInfoUser(currentUser);
}

function addInfoUser(user) {
    if(!user) return;
    document.getElementsByClassName('infoUser')[0].innerHTML = `
    <hr>
    <table>
        <tr>
            <th colspan="3">THÔNG TIN KHÁCH HÀNG</th>
        </tr>
        <tr>
            <td>Tài khoản: </td>
            <td> <input type="text" value="`+user.username+`"  onchange="changeInfo(this, 'username')" readonly> </td>
            <td> <i class="fa fa-pencil" onclick='showInput(this)'></i> </td>
        </tr>
        <tr>
            <td>Mật khẩu: </td>
            <td style="text-align: center;"> 
                <i class="fa fa-pencil" id="butDoiMatKhau" onclick="openChangePass()"> Đổi mật khẩu</i> 
            </td>
            <td></td>
        </tr>
        <tr>
            <td colspan="3" id="khungDoiMatKhau">
                <table>
                    <tr>
                        <td> <div>Mật khẩu cũ:</div> </td>
                        <td> <div><input type="password"></div> </td>
                    </tr>
                    <tr>
                        <td> <div>Mật khẩu mới:</div> </td>
                        <td> <div><input type="password"></div> </td>
                    </tr>
                    <tr>
                        <td> <div>Xác nhận mật khẩu:</div> </td>
                        <td> <div><input type="password"></div> </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td> 
                            <div><button onclick="changePass()">Đồng ý</button></div> 
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>Họ: </td>
            <td> <input type="text" value="`+user.ho+`"  onchange="changeInfo(this, 'ho')" readonly> </td>
            <td> <i class="fa fa-pencil" onclick='showInput(this)'></i> </td>
        </tr>
        <tr>
            <td>Tên: </td>
            <td> <input type="text" value="`+user.ten+`"  onchange="changeInfo(this, 'ten')" readonly> </td>
            <td> <i class="fa fa-pencil" onclick='showInput(this)'></i> </td>
        </tr>
        <tr>
            <td>Email: </td>
            <td> <input type="text" value="`+user.email+`"  onchange="changeInfo(this, 'email')" readonly> </td>
            <td> <i class="fa fa-pencil" onclick='showInput(this)'></i> </td>
        </tr>
        <tr>
            <td>Tổng tiền đã mua: </td>
            <td> <input type="text" value="`+numToString(tongTienTatCaDonHang)+` ₫" readonly> </td>
            <td></td>
        </tr>
    </table>`;
}

function openChangePass() {
    var khungChangePass = document.getElementById('khungDoiMatKhau');
    var actived = khungChangePass.classList.contains('active');
    if(actived) khungChangePass.classList.remove('active');
    else khungChangePass.classList.add('active');
}

function changePass() {
    var khungChangePass = document.getElementById('khungDoiMatKhau');
    var inps = khungChangePass.getElementsByTagName('input');
    if(inps[0].value != currentUser.pass) {
        alert('Sai mật khẩu !!');
        inps[0].focus();
        return;
    }
    if(inps[1] == '') {
        inps[1].focus();
        alert('Chưa nhập mật khẩu mới !');
    }
    if(inps[1].value != inps[2].value) {
        alert('Mật khẩu không khớp');
        inps[2].focus();
        return;
    }

    var temp = copyObject(currentUser);
    currentUser.pass = inps[1].value;
        
    // cập nhật danh sách sản phẩm trong localstorage
    setCurrentUser(currentUser);
    updateListUser(temp, currentUser);

    // Cập nhật trên header
    capNhat_ThongTin_CurrentUser();

    // thông báo
    addAlertBox('Thay đổi mật khẩu thành công.', '#5f5', '#000', 4000);
    openChangePass();
}

function showInput(iTag, inp, action) {
    if(!inp) {
        inp = iTag.parentElement.previousElementSibling.getElementsByTagName('input')[0];
    }
    if(!action) {
        inp.readOnly = !inp.readOnly;
    } else {
        inp.readOnly = (action=='hide');
    }

    if(!inp.readOnly) {
        inp.focus(); // focus
        // go to end of input
        var val = inp.value;
        inp.value = ''; 
        inp.value = val;

        if(iTag) iTag.innerHTML = 'Đồng ý';

    } else {
        // blur
        inp.blur();

        if(iTag) iTag.innerHTML = '';
    }
}

function changeInfo(inp, info) {
    if(inp.value != '') {

        if(info == 'username') {
            var users = getListUser();
            for(var u of users) {
                if(u.username == inp.value) {
                    alert('Tên đã có người sử dụng !!');
                    inp.value = currentUser.username; 
                    return;
                }
            }

        } else if(info == 'email') {
            var users = getListUser();
            for(var u of users) {
                if(u.email == inp.value) {
                    alert('Email đã có người sử dụng !!');
                    inp.value = currentUser.email;
                    return;
                }
            }
        } 

        var temp = copyObject(currentUser);
        currentUser[info] = inp.value;
    
        // cập nhật danh sách sản phẩm trong localstorage
        setCurrentUser(currentUser);
        updateListUser(temp, currentUser);
    
        // Cập nhật trên header
        capNhat_ThongTin_CurrentUser();
    }
    
    // Ẩn input
    inp.readOnly = true;
    var itag = inp.parentElement.nextElementSibling.getElementsByTagName('i')[0].innerHTML = '';
}

function addTatCaDonHang(user) {
    if(!user) {
        document.getElementsByClassName('listDonHang')[0].innerHTML = `
            <h3 style="width=100%; padding: 50px; color: red; font-size: 2em; text-align: center"> 
                Bạn chưa đăng nhập !!
            </h3>`;
        return;
    }
    if(!user.donhang.length) {
        document.getElementsByClassName('listDonHang')[0].innerHTML = `
            <h3 style="width=100%; padding: 50px; color: green; font-size: 2em; text-align: center"> 
                Xin chào `+currentUser.username+`. Bạn chưa có đơn hàng nào.
            </h3>`;
        return;
    }
    for(var dh of user.donhang) {
        addDonHang(dh);
    }
}

function addDonHang(dh) {
    var div = document.getElementsByClassName('listDonHang')[0];

    var s = `
            <table class="listSanPham">
                <tr> 
                    <th colspan="6">
                        <h3 style="text-align:center;"> Đơn hàng ngày: `+new Date(dh.ngaymua).toLocaleString()+`</h3> 
                    </th>
                </tr>
                <tr>
                    <th>STT</th>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Thời gian thêm vào giỏ</th> 
                </tr>`;

    var totalPrice = 0;
    for (var i = 0; i < dh.sp.length; i++) {
        var nameSp = dh.sp[i].name;
        var soluongSp = dh.sp[i].soluong;
        var p = timKiemTheoTen(list_products, nameSp)[0];
        var price = (p.promo.name == 'giareonline' ? p.promo.value : p.price);
        var thoigian = new Date(dh.sp[i].date).toLocaleString();
        var thanhtien = stringToNum(price) * soluongSp;

        s += `
                <tr>
                    <td>` + (i + 1) + `</td>
                    <td class="noPadding imgHide">
                        <a target="_blank" href="chitietsanpham.html?` + p.name.split(' ').join('-') + `" title="Xem chi tiết">
                            ` + p.name + `
                            <img src="` + p.img + `">
                        </a>
                    </td>
                    <td class="alignRight">` + price + ` ₫</td>
                    <td class="soluong" >
                         `+ soluongSp + `
                    </td>
                    <td class="alignRight">` + numToString(thanhtien) + ` ₫</td>
                    <td style="text-align: center" >` + thoigian + `</td>
                </tr>
            `;
        totalPrice += thanhtien;
    }
    tongTienTatCaDonHang += totalPrice;

    s += `
                <tr style="font-weight:bold; text-align:center; height: 4em;">
                    <td colspan="4">TỔNG TIỀN: </td>
                    <td class="alignRight">` + numToString(totalPrice) + ` ₫</td>
                    <td title="Sản phẩm đang được chúng tôi xử lý"> Đang chờ xử lý </td>
                </tr>
            </table>
            <hr>
        `;

    div.innerHTML += s;
}