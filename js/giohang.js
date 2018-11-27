var currentuser; // user hiện tại, biến toàn cục
window.onload = function() {
	// check Localstorage
	checkLocalStorage();

	// Cài đặt event cho phần tài khoản
    setupEventTaiKhoan();	
	
	currentuser = getCurrentUser();
	addProductToTable(currentuser);
}

function addProductToTable(user) {
	var table = document.getElementsByClassName('listSanPham')[0];;

	table.innerHTML = `
		<tbody>
			<tr>
				<th>STT</th>
				<th>Sản phẩm</th>
				<th>Giá</th>
				<th>Thời gian</th>
				<th>Xóa / Sửa</th>
			</tr>`;

	if(!user) {
		table.innerHTML += `
			<tr>
				<td colspan="5"> 
					<h1 style="color:red; font-weight:bold; text-align:center">
						Bạn chưa đăng nhập !!
					</h1> 
				</td>
			</tr>
		`;
		return;
	}  else if(user.products.length == 0) {
		table.innerHTML += `
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
		table.innerHTML += `
			<tr>
				<td>`+(i+1)+`</td>
				<td>`+p.name+`</td>
				<td>`+p.price+` ₫</td>
				<td>`+user.products[i].date+`</td>
				<td> <button onclick="xoaSanPhamTrongGioHang(`+ i +`)">Xóa</button> </td>
			</tr>
		`;
		totalPrice += stringToNum(p.price);
	}

	table.innerHTML += `
			<tr style="font-weight:bold; text-align:center">
				<td colspan="2">THÀNH TIỀN: </td>
				<td>` + numToString(totalPrice) + ` ₫</td>
				<td colspan="2"></td>
			</tr>
		</tbody>
	`;
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