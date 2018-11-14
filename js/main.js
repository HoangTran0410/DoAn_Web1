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
		autoplayTimeout: 3500,
		autoplayHoverPause: true
	});

	// thêm tags (từ khóa) vào khung tìm kiếm
	var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "LG"];
	for (var t of tags)
		addTags(t, "");

	// Thêm sản phẩm từ list_products trong file products.js
	addProductsFrom(list_products);
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