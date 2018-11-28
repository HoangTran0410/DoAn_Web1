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
				<th>Thời gian</th>
				<th>Số lượng</th>
				<th>Xóa</th>
			</tr>`;

	if (!user) {
		s += `
			<tr>
				<td colspan="6"> 
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
				<td colspan="6"> 
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

		s += `
			<tr>
				<td>` + (i + 1) + `</td>
				<td class="noPadding"><a target="_blank" href="chitietsanpham.html?` + p.name.split(' ').join('-') + `">` + p.name + `</a></td>
				<td class="alignRight">` + p.price + ` ₫</td>
				<td style="text-align: center" >` + user.products[i].date + `</td>
				<td class="soluong" >
					<button class="boxShadow" onclick="giamSoLuong('` + nameSp + `')">-</button>
					<input size="1" onchange="capNhatSoLuongFromInput(this, '`+nameSp+`')" value=` + soluongSp + `>
					<button class="boxShadow" onclick="tangSoLuong('` + nameSp + `')">+</button>
				</td>
				<td class="noPadding"> <i class="fa fa-trash" onclick="xoaSanPhamTrongGioHang(` + i + `)"></i> </td>
			</tr>
		`;
		// Chú ý nháy cho đúng ở giamsoluong, tangsoluong
		totalPrice += stringToNum(p.price) * soluongSp;
	}

	s += `
			<tr style="font-weight:bold; text-align:center">
				<td colspan="2">THÀNH TIỀN: </td>
				<td>` + numToString(totalPrice) + ` ₫</td>
				<td colspan="3"> <button class="thanhtoan boxShadow" onclick="thanhToan()">Thanh Toán</button> </td>
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
		alert('Có hàng đâu mà thanh toán cha !!');
		return;
	}
	alert('Nhớ trả tiền đừng xù hàng nha thầy !!');
	currentuser.products = [];
	capNhatMoiThu();
}

function capNhatSoLuongFromInput(inp, tenSanPham) {
	var soLuongMoi = inp.value;
	for(var p of currentuser.products) {
		if(p.name == tenSanPham) {
			p.soluong = Number(soLuongMoi) || 1;
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
	capNhatGioHang();
}