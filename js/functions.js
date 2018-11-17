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
	var k = removeOldFilter(window.location.href, 'page');
	if(k.indexOf('?') > 0) k+='&';

	divPhanTrang.innerHTML = '';

	if (trangHienTai > 1) // Nút về phân trang trước
		divPhanTrang.innerHTML = `<a href="` + k + `page=` + (trangHienTai - 1) + `"><i class="fa fa-angle-left"></i></a>`;

	if (soTrang > 1) // Chỉ hiện nút phân trang nếu số trang > 1
		for (var i = 1; i <= soTrang; i++) {
			if (i == trangHienTai) {
				divPhanTrang.innerHTML += `<a href="javascript:;" class="current">` + i + `</a>`

			} else {
				divPhanTrang.innerHTML += `<a href="` + k + `page=` + (i) + `">` + i + `</a>`
			}
		}

	if (trangHienTai < soTrang) { // Nút tới phân trang sau
		divPhanTrang.innerHTML += `<a href="` + k + `page=` + (trangHienTai + 1) + `"><i class="fa fa-angle-right"></i></a>`
	}
}

// function loaiBoFilterCu(type) {
// 	var url = window.location.href;
// 	var vitri = url.indexOf('page');

// 	if (vitri < 0) {
// 		if (url.indexOf('?') < 0) return url + '?';
// 		return url + '&';
// 	}

// 	return url.slice(0, vitri);
// }

function tinhToanPhanTrang(list, vitriTrang) {
	var sanPhamDu = list.length % soLuongSanPhamMaxTrongMotTrang;
	var soTrang = parseInt(list.length / soLuongSanPhamMaxTrongMotTrang) + (sanPhamDu ? 1 : 0);
	var trangHienTai = parseInt(vitriTrang < soTrang ? vitriTrang : soTrang);

	themNutPhanTrang(soTrang, trangHienTai);
	var start = soLuongSanPhamMaxTrongMotTrang * (trangHienTai - 1);

	var temp = list.slice();

	return temp.splice(start, soLuongSanPhamMaxTrongMotTrang);
}

// ======== TÌM KIẾM (Từ mảng list truyền vào, trả về 1 mảng kết quả) ============
function timKiemTheoTen(list, ten, soluong) {
	var count, result = [];
	if (soluong < list.length) count = soluong;
	else count = list.length;

	ten = ten.replace('+', ' ');
	ten = ten.replace('%20', ' ');
	ten = ten.split(' ');

	for (var i = 0; i < list.length; i++) {
		var correct = false, countCorrect = 0;
		var listName = list[i].name.toUpperCase();

		for (var j = 0; j < ten.length; j++) {
			if (listName.indexOf(ten[j].toUpperCase()) >= 0) {
				countCorrect++;
				if(countCorrect == ten.length) {
					correct = true;
					break;
				}
			}
		}

		if (correct) {
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
// Thêm choosed filter
function addChoosedFilter(type, name) {
	var link = removeOldFilter(window.location.href, type);
	link = removeOldFilter(link, 'page');
	var tag_a = `<a href="` + link + `"><h3>` + name + ` <i class="fa fa-close"></i> </h3></a>`;

	var divChoosedFilter = document.getElementsByClassName('choosedFilter')[0];
	divChoosedFilter.innerHTML += tag_a;
}

function cutOffString(url, start, end) {
	return url.substring(0, start) + url.substring(end+1);
}

function removeOldFilter(url, type) {
	// var url = window.location.href;
	var co = url.indexOf(type);

	// Nếu đã có thì xóa
	if(co > 0) {
		var laDau = (url[co-1] == '?'); // filter này ở đầu url..
		var vtVa = url.indexOf('&', co);

		if(laDau) {
			var conNua = vtVa>0; // co & sau filter này.. 
			if(conNua) {
				return cutOffString(url, co, vtVa);
			} else {
				return cutOffString(url, co-1, url.length);
			}
			
		} else {
			var vaTiepTheo = (vtVa>0?vtVa:url.length);
			return cutOffString(url, co-1, vaTiepTheo-1);
		}
	}

	return url;
}

function addFilterToUrl(url, name, value) {
	var urlRemoved = removeOldFilter(url, 'page'); // Xóa phân trang
	var vtDauHoi = urlRemoved.indexOf('?');

	if(vtDauHoi > 0) {
		return urlRemoved + '&' + name +'='+value;
	}

	return urlRemoved + '?'+name+'='+value;
}

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

// Lấy mảng sản phẩm trong trang hiện tại (ở dạng tag html)
function getLiArray() {
	var ul = document.getElementById('products');
	var listLi = ul.getElementsByTagName('li');
	return listLi;
}

// Tìm kiếm (lọc) theo tên
function getNameFromLi(li) {
	var a = li.getElementsByTagName('a')[0];
	var h3 = a.getElementsByTagName('h3')[0];
	var name = h3.innerHTML;
	return name;
}

function filterProductsName(ele) {
	var filter = ele.value.toUpperCase();
	var listLi = getLiArray();
	var coSanPham = false;

	var soLuong = 0;

	for (var i = 0; i < listLi.length; i++) {
		if (getNameFromLi(listLi[i]).toUpperCase().indexOf(filter) > -1 &&
			soLuong < soLuongSanPhamMaxTrongMotTrang) {
			showLi(listLi[i]);
			coSanPham = true;
			soLuong++;

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

// Thêm hãng sản xuất
function addCompany(img, nameCompany) {
	var link = removeOldFilter(window.location.href, 'company');
	link = addFilterToUrl(link, 'company', nameCompany);

	var new_tag = `<a href=` + link + `><img src=` + img + `></a>`;

	var khung_hangSanXuat = document.getElementsByClassName('companyMenu')[0];
	khung_hangSanXuat.innerHTML += new_tag;
}

// Thêm chọn mức giá
function addPricesRange(min, max) {
	var text = priceToString(min, max);
	var link = removeOldFilter(window.location.href, 'price');
	link = addFilterToUrl(link, 'price', (min +'-'+ max));

	var mucgia = `<a href="`+link+`">`+ text +`</a>`
	document.getElementsByClassName('pricesRangeFilter')[0].innerHTML += mucgia;
}

// Thêm chọn khuyến mãi
function addPromotion(name) {
	var link = removeOldFilter(window.location.href, 'promo');
	link = addFilterToUrl(link, 'promo', name);

	var text = promoToString(name);
	var promo = `<a href="`+link+`">`+ text +`</a>`;
	document.getElementsByClassName('promosFilter')[0].innerHTML += promo;
}

// Thêm chọn số lượng sao
function addStarFilter(value) {
	var link = removeOldFilter(window.location.href, 'star');
	link = addFilterToUrl(link, 'star', value);

	var text = starToString(value);
	var star = `<a href="`+link+`">`+ text +`</a>`;
	document.getElementsByClassName('starFilter')[0].innerHTML += star;
}

// Chuyển mức giá về dạng chuỗi tiếng việt
function priceToString(min, max) {
	if(min == 0) return 'Dưới ' + max/1E6 + ' triệu';
	if(max == 0) return 'Trên ' + min/1E6 + ' triệu';
	return 'Từ ' + min/1E6 + ' - ' + max/1E6 + ' triệu';
}

// Chuyển khuyến mãi vễ dạng chuỗi tiếng việt
function promoToString(name) {
	switch(name) {
		case 'tragop' : return 'Trả góp';
		case 'giamgia' : return 'Giảm giá';
		case 'giareonline' : return 'Giá rẻ online';
		case 'moiramat' : return 'Mới ra mắt';
	}
}

// Chuyển số sao về dạng chuỗi tiếng việt
function starToString(star) {
	return 'Trên ' + (star-1) + ' sao';
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