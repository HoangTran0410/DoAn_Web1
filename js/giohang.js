var currentuser; // user hiện tại, biến toàn cục
window.onload = function () {
	// check Localstorage
	checkLocalStorage();

	// autocomplete cho khung tim kiem
	autocomplete(document.getElementById('search-box'), list_products);

	// thêm tags (từ khóa) vào khung tìm kiếm
	var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
	for (var t of tags) addTags(t, "index.html?search=" + t)

	// Cài đặt event cho phần tài khoản
	setupEventTaiKhoan();

	currentuser = getCurrentUser();
	addProductToTable(currentuser);
}

function addProductToTable(user) {
	var table = document.getElementsByClassName('listSanPham')[0];;

	var s = `
		<tbody>
			<tr>
				<th>STT</th>
				<th>Sản phẩm</th>
				<th>Giá</th>
				<th>Số lượng</th>
				<th>Thành tiền</th>
				<th>Thời gian</th>
				<th>Xóa</th>
			</tr>`;

	if (!user) {
		s += `
			<tr>
				<td colspan="7"> 
					<h1 style="color:red; font-weight:bold; text-align:center">
						Bạn chưa đăng nhập !!
					</h1> 
				</td>
			</tr>
		`;
		table.innerHTML = s;
		return;
	} else if (user.products.length == 0) {
		s += `
			<tr>
				<td colspan="7"> 
					<h1 style="color:green; font-weight:bold; text-align:center">
						Giỏ hàng trống !!
					</h1> 
				</td>
			</tr>
		`;
	}

	var totalPrice = 0;
	for (var i = 0; i < user.products.length; i++) {
		var nameSp = user.products[i].name;
		var soluongSp = getSoLuongSanPhamTrongUser(nameSp, user);
		var p = timKiemTheoTen(list_products, nameSp)[0];
		var price = (p.promo.name=='giareonline'?p.promo.value:p.price);
		var thoigian = new Date(user.products[i].date).toLocaleString();
		var thanhtien = stringToNum(price) * soluongSp;

		s += `
			<tr>
				<td>` + (i + 1) + `</td>
				<td class="noPadding imgHide">
					<a target="_blank" href="chitietsanpham.html?` + p.name.split(' ').join('-') + `" title="Xem chi tiết">
						` + p.name + `
						<img src="`+p.img+`">
					</a>
				</td>
				<td class="alignRight">` + price + ` ₫</td>
				<td class="soluong" >
					<button class="boxShadow" onclick="giamSoLuong('` + nameSp + `')">-</button>
					<input size="1" onchange="capNhatSoLuongFromInput(this, '`+nameSp+`')" value=` + soluongSp + `>
					<button class="boxShadow" onclick="tangSoLuong('` + nameSp + `')">+</button>
				</td>
				<td class="alignRight">`+numToString(thanhtien)+` ₫</td>
				<td style="text-align: center" >` + thoigian + `</td>
				<td class="noPadding"> <i class="fa fa-trash" onclick="xoaSanPhamTrongGioHang(` + i + `)"></i> </td>
			</tr>
		`;
		// Chú ý nháy cho đúng ở giamsoluong, tangsoluong
		totalPrice += thanhtien;
	}

	s += `
			<tr style="font-weight:bold; text-align:center">
				<td colspan="4">TỔNG TIỀN: </td>
				<td class="alignRight">` + numToString(totalPrice) + ` ₫</td>
				<td> 
					<button class="thanhtoan boxShadow" onclick="thanhToan()">Thanh Toán</button>
				</td>
				<td> <button class="xoaHet" onclick="xoaHet()"> Xóa hết </button> </td>
			</tr>
		</tbody>
	`;

	table.innerHTML = s;
}

function xoaSanPhamTrongGioHang(i) {
	if (window.confirm('Xác nhận hủy mua ' + currentuser.products[i].name.toUpperCase())) {

		currentuser.products.splice(i, 1);

		capNhatMoiThu();
	}
}

function thanhToan() {
	if(!currentuser.products.length) {
		window.confirm('Có hàng đâu mà thanh toán cha !!');
		return;
	}
	if(window.confirm('Thanh toán giỏ hàng ?')) {
		currentuser.products = [];
		capNhatMoiThu();
		addAlertBox('Các sản phẩm đã được gửi vào đơn hàng và chờ xử lý.', '#4a5', '#fff', 4000);
	}
}

function xoaHet() {
	if(currentuser.products.length) {
		if(window.confirm('Bạn có chắc chắn muốn xóa hết sản phẩm trong giỏ !!')){
			currentuser.products = [];
			capNhatMoiThu();
		}
	}
}

// Cập nhật số lượng lúc nhập số lượng vào input
function capNhatSoLuongFromInput(inp, tenSanPham) {
	var soLuongMoi = Number(inp.value);
	if(!soLuongMoi || soLuongMoi <= 0) soLuongMoi = 1;
	
	for(var p of currentuser.products) {
		if(p.name == tenSanPham) {
			p.soluong = soLuongMoi;
		}
	}

	capNhatMoiThu();
}

function tangSoLuong(tenSanPham) {
	for(var p of currentuser.products) {
		if(p.name == tenSanPham) {
			p.soluong++;
		}
	}

	capNhatMoiThu();
}

function giamSoLuong(tenSanPham) {
	for(var p of currentuser.products) {
		if(p.name == tenSanPham) {
			if(p.soluong > 1) {
				p.soluong--;
			} else {
				return ;
			}
		}
	}

	capNhatMoiThu();
}

function capNhatMoiThu() { // Mọi thứ
	animateCartNumber();
	
	// cập nhật danh sách sản phẩm trong localstorage
	setCurrentUser(currentuser);
	updateListUser(currentuser);

	// cập nhật danh sách sản phẩm ở table
	addProductToTable(currentuser);

	// Cập nhật trên header
	capNhat_ThongTin_CurrentUser();
}