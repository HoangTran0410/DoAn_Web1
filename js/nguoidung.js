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
    document.getElementsByClassName('infoUser')[0].innerHTML = 
    `<table>
        <tr>
            <td colspan="2"> <h3>Thông tin người dùng</h3> </td>
        </tr>
        <tr>
            <td>Tài khoản:</td>
            <td>`+user.username+`</td>
            <td> 
                <button onclick="showInput(this)"> <i class="fa fa-pencil"></i> </button> 
                <input type="text" onchange="changeInfo(this, 'username')">
            </td>
        </tr>
        <tr>
            <td>Họ tên: </td>
            <td>`+(user.ho + ' ' + user.ten)+`</td>
            <td> 
                <button onclick="showInput(this)"> <i class="fa fa-pencil"></i> </button> 
                <input type="text" onchange="changeInfo(this, 'ten')">
            </td>
        </tr>
        <tr>
            <td>Email: </td>
            <td>`+user.email+`</td>
            <td> 
                <button onclick="showInput(this)"> <i class="fa fa-pencil"></i> </button> 
                <input type="text" onchange="changeInfo(this, 'email')">
            </td>
        </tr>
        <tr>
            <td>Số lượng đơn hàng: </td>
            <td>`+user.donhang.length+`</td>
        </tr>
        <tr>
            <td>Tổng tiền đã mua: </td>
            <td>`+numToString(tongTienTatCaDonHang)+`</td>
        </tr>
        <tr>
            <td> </td>
            <td>
                <button onclick="showInput(this)"> <i class="fa fa-pencil"></i> Đổi mật khẩu </button> 
                <input type="text" onchange="changeInfo(this, 'pass')">
            </td>
        </tr>
    </table>`
}

function showInput(but) {
    but.nextElementSibling.style.display = "inline";
    but.nextElementSibling.focus();
}

function changeInfo(inp, info) {
    var temp = copyObject(currentUser);

    if(info == 'name') {
        var s = inpt.value.split(' ');
        currentUser.ten = s[s.length-1];
        currentUser.ho = inp.value.replace(currentUser.ten, '').trim();
    }else 
        currentUser[info] = inp.value;

    // cập nhật danh sách sản phẩm trong localstorage
    setCurrentUser(currentUser);
    updateListUser(temp, currentUser);

    // Cập nhật trên header
    capNhat_ThongTin_CurrentUser();


    // Cập nhật lại bảng info
    addInfoUser(currentUser);

    // Ẩn input
    inp.style.display = "none";
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
                Xin chào. Bạn chưa có đơn hàng nào.
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

