
// Thêm sản phẩm vào trang
function addProduct(p, id) {
	promo = new Promo(p.promo.name, p.promo.value);
	product = new Product(p.img, p.name, p.price, p.star, p.rateCount, promo);
	product.addToWeb(id);
}

function addProductsFrom(list, vitri, soluong) {
	var start = vitri || 0;
	var end = (soluong ? start + soluong : list.length);
	for (var i = start; i < end; i++) {
		addProduct(list[i]);
	}
}

function clearAllProducts() {
	document.getElementById('products').innerHTML = "";
}

// Nút phân trang
function themNutPhanTrang(soTrang, trangHienTai) {
	var divPhanTrang = document.getElementsByClassName('pagination')[0];
	var k = loaiBoPageCu(window.location.href);

	divPhanTrang.innerHTML = '';

	if(trangHienTai > 1) // Nút về phân trang trước
		divPhanTrang.innerHTML = `<a href="`+k+`page=`+(trangHienTai-1)+`"><i class="fa fa-angle-left"></i></a>`;

	if(soTrang > 1) // Chỉ hiện nút phân trang nếu số trang > 1
	for(var i = 1; i <= soTrang; i++) {
		if(i == trangHienTai) {
			divPhanTrang.innerHTML += `<a href="" class="current">` + i + `</a>`
		
		} else {
			divPhanTrang.innerHTML += `<a href="`+k+`page=`+(i)+`">` + i + `</a>`
		}
	}

	if(trangHienTai < soTrang) { // Nút tới phân trang sau
		divPhanTrang.innerHTML += `<a href="`+k+`page=`+(trangHienTai+1)+`"><i class="fa fa-angle-right"></i></a>`
	}
}

function loaiBoPageCu(link) {
	var vitri = link.indexOf('page');
	if(vitri < 0) {
		if(link.indexOf('?') < 0) return link+'?';
		return link+'&';
	}

	var coDauHoiCham = (link[vitri-1] == '?');
	var coDauVa = (link[vitri-1] == '&');

	var dauTruocPage = '';
	if(!coDauHoiCham && !coDauVa) {
		dauTruocPage = '?';
	}
	
	var result = link.slice(0, vitri) + dauTruocPage;

	return result;
}

function tinhToanPhanTrang(list, vitriTrang) {
	var sanPhamDu = list.length % soLuongSanPhamMaxTrongMotTrang;
	var soTrang = parseInt(list.length / soLuongSanPhamMaxTrongMotTrang) + (sanPhamDu?1:0);
	var trangHienTai = parseInt(vitriTrang<soTrang?vitriTrang:soTrang);

	themNutPhanTrang(soTrang, trangHienTai);
	var start = soLuongSanPhamMaxTrongMotTrang*(trangHienTai-1);

	var temp = list.slice();

	return temp.splice(start, soLuongSanPhamMaxTrongMotTrang);
}

// ======== TÌM KIẾM ============

function timKiemTheoTen(list, ten, soluong) {
	var count, result = [];
	if (soluong < list.length) count = soluong;
	else count = list.length;

	for (var i = 0; i < list.length; i++) {
		if (list[i].name.toUpperCase().indexOf(ten.toUpperCase()) >= 0) {
			result.push(list[i]);
			count--;
			if (count <= 0) break;
		}
	}

	return result;
}

function timKiemTheoCongTySanXuat(list, tenCongTy, soluong) {
	var count, result = [];
	if (soluong < list.length) count = soluong;
	else count = list.length;

	for (var i = 0; i < list.length; i++) {
		if (list[i].company.toUpperCase().indexOf(tenCongTy.toUpperCase()) >= 0) {
			result.push(list[i]);
			count--;
			if (count <= 0) break;
		}
	}

	return result;
}

function timKiemTheoSoLuongSao(list, soLuongSaoToiThieu, soluong) {
	var count, result = [];
	if (soluong < list.length) count = soluong;
	else count = list.length;

	for (var i = 0; i < list.length; i++) {
		if (list[i].star >= soLuongSaoToiThieu) {
			result.push(list[i]);
			count--;
			if (count <= 0) break;
		}
	}

	return result;
}

function timKiemTheoGiaTien(list, giaMin, giaMax, soluong) {
	var count, result = [];
	if (soluong < list.length) count = soluong;
	else count = list.length;

	for (var i = 0; i < list.length; i++) {
		var gia = parseInt(list[i].price.split('.').join(''));
		if (gia >= giaMin && gia <= giaMax) {
			result.push(list[i]);
			count--;
			if (count <= 0) break;
		}
	}

	return result;
}

function timKiemTheoKhuyenMai(list, tenKhuyenMai, soluong) {
	var count, result = [];
	if (soluong < list.length) count = soluong;
	else count = list.length;

	for (var i = 0; i < list.length; i++) {
		if (list[i].promo.name == tenKhuyenMai) {
			result.push(list[i]);
			count--;
			if (count <= 0) break;
		}
	}

	return result;
}

// ========== LỌC ===============

// Thông báo nếu không có sản phẩm
function alertNotHaveProduct(coSanPham) {
	var thongbao = document.getElementById('khongCoSanPham');
	if (!coSanPham) {
		thongbao.style.width = "auto";
		thongbao.style.opacity = "1";
		thongbao.style.margin = "auto"; // Căn giữa
		thongbao.style.transitionDuration = "1s"; // hiện ra từ từ

	} else {
		thongbao.style.width = "0";
		thongbao.style.opacity = "0";
		thongbao.style.margin = "0";
		thongbao.style.transitionDuration = "0s"; // Ngay lâp tức biến mất
	}
}

// Hiển thị, Ẩn  - Sản phẩm (<li>)
function showLi(li) {
	li.style.opacity = 1;
	li.style.width = "239px";
	li.style.borderWidth = "1px";
}

function hideLi(li) {
	li.style.width = 0;
	li.style.opacity = 0;
	li.style.borderWidth = "0";
}

// Lấy mảng sản phẩm trong trang hiện tại
function getLiArray() {
	var ul = document.getElementById('products');
	var listLi = ul.getElementsByTagName('li');
	return listLi;
}

// Tìm kiếm (lọc) theo tên
function getNameFromLi(li) {
	var a = li.getElementsByTagName('a')[0];
	var h3 = a.getElementsByTagName('h3')[0];
	var name = h3.innerHTML.toUpperCase();
	return name;
}

function filterProductsName(ele) {
	var filter = ele.value.toUpperCase();
	var listLi = getLiArray();
	var coSanPham = false;

	for (var i = 0; i < listLi.length; i++) {
		if (getNameFromLi(listLi[i]).indexOf(filter) > -1) {
			showLi(listLi[i]);
			coSanPham = true;

		} else {
			hideLi(listLi[i]);
		}
	}

	// Thông báo nếu không có sản phẩm
	alertNotHaveProduct(coSanPham);
}

// Tìm kiếm (lọc) theo số lượng sao
function getStarFromLi(li) {
	var a = li.getElementsByTagName('a')[0];
	var divRate = a.getElementsByClassName('ratingresult');
	if (!divRate) return 0;

	divRate = divRate[0];
	var starCount = divRate.getElementsByClassName('fa-star').length;

	return starCount;
}

function filterProductsStar(num) {
	var listLi = getLiArray();
	var coSanPham = false;

	for (var i = 0; i < listLi.length; i++) {
		if (getStarFromLi(listLi) >= num) {
			showLi(listLi[i]);
			coSanPham = true;

		} else {
			hideLi(listLi[i]);
		}
	}

	// Thông báo nếu không có sản phẩm
	alertNotHaveProduct(coSanPham);
}

// ================= Hàm khác ==================

// Thêm banner
function addBanner(img, link) {
	var newDiv = `<div class='item'>
						<a target='_blank' href=` + link + `>
							<img src=` + img + `>
						</a>
					</div>`;
	var banner = document.getElementsByClassName('owl-carousel')[0];
	banner.innerHTML += newDiv;
}

// Thêm từ khóa tìm kiếm
function addTags(nameTag, link) {
	var new_tag = `<a href=` + link + `>` + nameTag + `</a>`;

	// Thêm <a> vừa tạo vào khung tìm kiếm
	var khung_tags = document.getElementsByClassName('tags')[0];
	khung_tags.innerHTML += new_tag;
}

// Di chuyển lên đầu trang
function gotoTop() {
	jQuery('html,body').animate({
		scrollTop: 0
	}, 300);
	// document.getElementsByClassName('top-nav')[0].scrollIntoView({
	// 	behavior: 'smooth',
	// 	block: 'start'
	// });
	// document.body.scrollTop = 0; // For Safari
	// document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Test, not finished
function auto_Get_Database() {
	var ul = document.getElementsByClassName('homeproduct')[0];
	var li = ul.getElementsByTagName('li');
	for (var l of li) {
		var a = l.getElementsByTagName('a')[0];
		// name
		var name = a.getElementsByTagName('h3')[0].innerHTML;

		// price
		var price = a.getElementsByClassName('price')[0]
		price = price.getElementsByTagName('strong')[0].innerHTML;

		// img
		var img = a.getElementsByTagName('img')[0].src;
		console.log(img);

		// // rating
		// var rating = a.getElementsByClassName('ratingresult')[0];
		// var star = rating.getElementsByClassName('icontgdd-ystar').length;
		// var rateCount = parseInt(rating.getElementsByTagName('span')[0].innerHTML);

		// // promo
		// var tragop = a.getElementsByClassName('installment');
		// if(tragop.length) {

		// }

		// var giamgia = a.getElementsByClassName('discount').length;
		// var giareonline = a.getElementsByClassName('shockprice').length;
	}
}