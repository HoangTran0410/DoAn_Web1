var soLuongSanPhamMaxTrongMotTrang = 8;

$(document).ready(function() {

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
		// ,autoplayHoverPause: true
	});

	// thêm tags (từ khóa) vào khung tìm kiếm
	var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
	for (var t of tags)
		addTags(t, "?search=" + t);

	var sanPhamPhanTich = phanTich_Location();
	var sanPhamPhanTrang = tinhToanPhanTrang(sanPhamPhanTich, phanTrang);

	addProductsFrom(sanPhamPhanTrang);
});


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
function phanTich_Location() {
	var fullLocation = window.location.href;
	var dauHoi = fullLocation.split('?');

	var result = list_products;
	var daPhanTrang = false;

	if (dauHoi[1]) {
		var dauVa = dauHoi[1].split('&');

		for (var i = 0; i < dauVa.length; i++) {
			var dauBang = dauVa[i].split('=');

			switch (dauBang[0]) {
				case 'search':
					result = timKiemTheoTen(result, dauBang[1]);
					break;

				case 'price':
					var prices = dauBang[1].split('+');
					result = timKiemTheoGiaTien(result, prices[0], prices[1]);
					break;

				case 'company':
					result = timKiemTheoCongTySanXuat(result, dauBang[1]);
					break;

				case 'star':
					result = timKiemTheoSoLuongSao(result, dauBang[1]);
					break;

				case 'promo':
					result = timKiemTheoKhuyenMai(result, dauBang[1]);
					break;

				case 'page': // page phải ở cuối đường link
					// result = tinhToanPhanTrang(result, dauBang[1]);
					phanTrang = dauBang[1];
					break;

				case 'sort':
					var s = dauBang[1].split('+');
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
	}

	return result;
}