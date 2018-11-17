var soLuongSanPhamMaxTrongMotTrang = 10;

// window.onbeforeunload = function (e) {
//   var confirmationMessage = "";

//   (e || window.event).returnValue = confirmationMessage; //Gecko + IE
//   return confirmationMessage;                            //Webkit, Safari, Chrome
// };

window.onload = function() {

	// Thêm hình vào banner
	var numBanner = 8; // Số lượng hình banner
	for (var i = 1; i <= numBanner; i++) {
		var linkimg = "img/banners/banner" + i + ".png";
		addBanner(linkimg, linkimg);
	}

	// Khởi động thư viện hỗ trợ banner
	var owl = $('.owl-carousel');
	owl.owlCarousel({
		items: 1.5,
		margin: 100,
		center: true,
		loop: true,
		smartSpeed: 450,

		autoplay: true,
		autoplayTimeout: 3500
	});

	// thêm tags (từ khóa) vào khung tìm kiếm
	var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
	for (var t of tags)
		addTags(t, "?search=" + t);

	// Thêm hãng điện thoại
	var company = ["Apple.jpg", "Samsung.jpg", "Oppo.jpg", "Nokia.jpg", "Huawei.jpg", "Xiaomi.png",
		"Realme.png", "Vivo.jpg", "Philips.jpg", "Mobell.jpg", "Mobiistar.jpg", "Itel.jpg",
		"Coolpad.png", "HTC.jpg", "Motorola.jpg"];
	for(var c of company) {
		addCompany("img/company/" + c, "?company=" + c.slice(0, c.length - 4));
	}

	// Thêm choosed filter
	// addChoosedFilter('company', 'Apple', '');
	// addChoosedFilter('promo', 'Trả góp 0%', '');
	// addChoosedFilter('promo', 'Mới ra mắt', '');

	// Thêm sản phẩm vào trang
	var sanPhamPhanTich = phanTich_URL();
	var sanPhamPhanTrang = tinhToanPhanTrang(sanPhamPhanTich, phanTrang);

	addProductsFrom(sanPhamPhanTrang);
	if(!sanPhamPhanTrang.length) alertNotHaveProduct(false);

	// hideSanPhamKhongThuoc(sanPhamPhanTrang);
};

// Dung mouse wheel de thay doi hinh banner
// owl.on('mousewheel', '.owl-stage', function(e) {
// 	var del = e.deltaY || e.originalEvent.deltaY;
// 	if (del > 0) {
// 		owl.trigger('next.owl');
// 	} else {
// 		owl.trigger('prev.owl');
// 	}
// 	e.preventDefault();
// });

// =========== Đọc dữ liệu từ window.location ============
var phanTrang = 1;

function filterConditionFromURL() {
	var fullLocation = window.location.href;
	var dauHoi = fullLocation.split('?');

	if(dauHoi[1]) {
		var dauVa = dauHoi[1].split('&');
		return dauVa;
	}

	return [];
}

function phanTich_URL() {
	var filters = filterConditionFromURL();
	var result = list_products.slice();

	for (var i = 0; i < filters.length; i++) {
		var dauBang = filters[i].split('=');

		switch (dauBang[0]) {
			case 'search':
				result = timKiemTheoTen(result, dauBang[1]);
				break;

			case 'price':
				var prices = dauBang[1].split('-');
				result = timKiemTheoGiaTien(result, prices[0], prices[1] || 1E10);

				var nameFilter;
				if(prices[0] == 0) nameFilter = 'Dưới ' + prices[1]/1E6 + ' triệu';
				else if(prices[1] == 0) nameFilter = 'Trên ' + prices[0]/1E6 + ' triệu';
				else nameFilter = prices[0]/1E6 + ' triệu - ' + prices[1]/1E6 + ' triệu';
				addChoosedFilter('star', nameFilter);
				break;

			case 'company':
				result = timKiemTheoCongTySanXuat(result, dauBang[1]);
				addChoosedFilter('company', dauBang[1]);
				break;

			case 'star':
				result = timKiemTheoSoLuongSao(result, dauBang[1]);
				addChoosedFilter('star', 'Trên '+(dauBang[1]-1)+' sao')
				break;

			case 'promo':
				result = timKiemTheoKhuyenMai(result, dauBang[1]);
				var nameFilter;
				switch(dauBang[1]) {
					case 'tragop' : nameFilter = 'Trả góp'; break;
					case 'giamgia' : nameFilter = 'Giảm giá'; break;
					case 'giareonline' : nameFilter = 'Giá rẻ online'; break;
					case 'moiramat' : nameFilter = 'Mới ra mắt'; break;
				}
				addChoosedFilter('promo', nameFilter);
				break;

			case 'page': // page phải ở cuối đường link
				// result = tinhToanPhanTrang(result, dauBang[1]);
				phanTrang = dauBang[1];
				break;

			case 'sort':
				var s = dauBang[1].split('-');
				var tenThanhPhanCanSort = s[0];

				switch (tenThanhPhanCanSort) {
					case 'price':
						result.sort(function(a, b) {
							var giaA = parseInt(a.price.split('.').join(''));
							var giaB = parseInt(b.price.split('.').join(''));
							return giaA - giaB;
						});
						break;

					case 'star':
						result.sort(function(a, b) {
							return a.star - b.star;
						});
						break;

					case 'rateCount':
						result.sort(function(a, b) {
							return a.rateCount - b.rateCount;
						});
						break;

					case 'name':
						result.sort(function(a, b) {
							return a.name.localeCompare(b.name);
						});
						break;
				}

				if(s[1] == 'decrease') 
					result.reverse();

				break;
		}
	}

	return result;
}

function hideSanPhamKhongThuoc(list) {
	var allLi = getLiArray();
	for(var i = 0; i < allLi.length; i++) {
		var hide = true;
		for(var j = 0; j < list.length; j++){
			if(getNameFromLi(allLi[i]) == list[j].name) {
				hide = false;
				break;
			}
		}
		if(hide) hideLi(allLi[i]);
	}
}