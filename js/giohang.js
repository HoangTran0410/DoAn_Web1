var currentuser; // user hiện tại, biến toàn cục
window.onload = function() {
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
				<th>Xóa</th>
			</tr>`;

	if(!user) {
		s += `
			<tr>
				<td colspan="5"> 
					<h1 style="color:red; font-weight:bold; text-align:center">
						Bạn chưa đăng nhập !!
					</h1> 
				</td>
			</tr>
		`;
		table.innerHTML = s;
		return ;
	}  else if(user.products.length == 0) {
		s += `
			<tr>
				<td colspan="5"> 
					<h1 style="color:green; font-weight:bold; text-align:center">
						Giỏ hàng trống !!
					</h1> 
				</td>
			</tr>
		`;
	}

	var totalPrice = 0;
	for(var i = 0; i < user.products.length; i++) {
		var p = timKiemTheoTen(list_products, user.products[i].name)[0];
		s += `
			<tr>
				<td>`+(i+1)+`</td>
				<td><a target="_blank" href="chitietsanpham.html?`+p.name.split(' ').join('-')+`">`+p.name+`</a></td>
				<td>`+p.price+` ₫</td>
				<td>`+user.products[i].date+`</td>
				<td> <i class="fa fa-close" onclick="xoaSanPhamTrongGioHang(`+ i +`)"></i> </td>
			</tr>
		`;
		totalPrice += stringToNum(p.price);
	}

	s += `
			<tr style="font-weight:bold; text-align:center">
				<td colspan="2">THÀNH TIỀN: </td>
				<td>` + numToString(totalPrice) + ` ₫</td>
				<td colspan="2"> <button class="thanhtoan">Thanh Toán</button> </td>
			</tr>
		</tbody>
	`;

	table.innerHTML = s;
}

function xoaSanPhamTrongGioHang(i) {
	// cập nhật danh sách sản phẩm trong localstorage
	currentuser.products.splice(i, 1);
	setCurrentUser(currentuser);
	updateListUser(currentuser);

	// cập nhật danh sách sản phẩm ở table
	addProductToTable(currentuser);

	// Cập nhật trên header
	capNhatGioHang(); 
}