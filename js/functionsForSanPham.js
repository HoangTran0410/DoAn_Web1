// Thêm - Xóa sản phẩm
	function addProduct(p, id) {
		promo = new Promo(p.promo.name, p.promo.value);
		product = new Product(p.img, p.name, p.price, p.star, p.rateCount, promo);
		product.addToWeb(id);
	}
	function addProductsFrom(list) {
		var product, promo;
		for(var p of list) {
			addProduct(p);
		}
	}

	function clearAllProducts() {
		document.getElementById('products').innerHTML = "";
	}

// Thông báo nếu không có sản phẩm
	function alertNotHaveProduct(coSanPham) {
		var thongbao = document.getElementById('khongCoSanPham');
		if(!coSanPham) {
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

// Tìm kiếm (lọc) tên (Filter <li>)
	function filterProductsName(ele) {
		var filter = ele.value.toUpperCase();
		var ul = document.getElementById('products');
		var li = ul.getElementsByTagName('li');
		var coSanPham = false;
		// var order = 1;

		for(var i = 0; i < li.length; i++) {
			var a = li[i].getElementsByTagName('a')[0];
			var h3 = a.getElementsByTagName('h3')[0];

			if(h3.innerHTML.toUpperCase().indexOf(filter) > -1) {
				showLi(li[i]);
				coSanPham = true;

			} else {
				hideLi(li[i]);
			}
		}

		// Thông báo nếu không có sản phẩm
		alertNotHaveProduct(coSanPham);
	}

// Tìm kiếm (lọc) theo số lượng sao
	function filterProductsStar(num) {
		var ul = document.getElementById('products');
		var li = ul.getElementsByTagName('li');

		var coSanPham = false;

		for(var i = 0; i < li.length; i++) {
			var a = li[i].getElementsByTagName('a')[0];
			var divRate = a.getElementsByClassName('ratingresult');

			if(!divRate) return;
			divRate = divRate[0];

			var starCount = divRate.getElementsByClassName('fa-star').length;

			if(starCount >= num) {
				showLi(li[i]);
				coSanPham = true;

			} else {
				hideLi(li[i]);
			}
		}

		// Thông báo nếu không có sản phẩm
		alertNotHaveProduct(coSanPham);
	}
