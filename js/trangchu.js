window.onload = function () {

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

	// autocomplete cho khung tim kiem
	autocomplete(document.getElementById('search-box'), list_products);

	// thêm tags (từ khóa) vào khung tìm kiếm
	var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
	for (var t of tags)
		addTags(t, "?search=" + t);

	// Thêm danh sách hãng điện thoại
	var company = ["Apple.jpg", "Samsung.jpg", "Oppo.jpg", "Nokia.jpg", "Huawei.jpg", "Xiaomi.png",
		"Realme.png", "Vivo.jpg", "Philips.jpg", "Mobell.jpg", "Mobiistar.jpg", "Itel.jpg",
		"Coolpad.png", "HTC.jpg", "Motorola.jpg"
	];
	for (var c of company) {
		addCompany("img/company/" + c, c.slice(0, c.length - 4));
	}

	// Thêm sản phẩm vào trang
	var sanPhamPhanTich = phanTich_URL();
	var sanPhamPhanTrang = tinhToanPhanTrang(sanPhamPhanTich, filtersFromUrl.page || 1);

	addProductsFrom(sanPhamPhanTrang);
	if (!sanPhamPhanTrang.length) alertNotHaveProduct(false);

	/* Thêm choosed filter
		 Được thêm trong hàm phanTich_URL() */

	// Thêm chọn mức giá
	addPricesRange(0, 2000000);
	addPricesRange(2000000, 4000000);
	addPricesRange(4000000, 7000000);
	addPricesRange(7000000, 13000000);
	addPricesRange(13000000, 0);

	// Thêm chọn khuyến mãi
	addPromotion('giamgia');
	addPromotion('tragop');
	addPromotion('moiramat');
	addPromotion('giareonline');

	// Thêm chọn số sao
	addStarFilter(3);
	addStarFilter(4);
	addStarFilter(5);

	// Thêm chọn sắp xếp
	addSortFilter('ascending', 'price', 'Giá tăng dần');
	addSortFilter('decrease', 'price', 'Giá giảm dần');
	addSortFilter('ascending', 'star', 'Sao tăng dần');
	addSortFilter('decrease', 'star', 'Sao giảm dần');
	addSortFilter('ascending', 'rateCount', 'Đánh giá tăng dần');
	addSortFilter('decrease', 'rateCount', 'Đánh giá giảm dần');
	addSortFilter('ascending', 'name', 'Tên A-Z');
	addSortFilter('decrease', 'name', 'Tên Z-A');

	// Thêm filter đã chọn
	addAllChoosedFilter();
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

// Hàm Test, chưa sử dụng
function hideSanPhamKhongThuoc(list) {
	var allLi = getLiArray();
	for (var i = 0; i < allLi.length; i++) {
		var hide = true;
		for (var j = 0; j < list.length; j++) {
			if (getNameFromLi(allLi[i]) == list[j].name) {
				hide = false;
				break;
			}
		}
		if (hide) hideLi(allLi[i]);
	}
}