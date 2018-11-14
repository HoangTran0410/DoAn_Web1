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
				// li[i].style.order = order++; // Test
				li[i].style.opacity = 1;
				li[i].style.width = "239px";
				li[i].style.borderWidth = "1px";

				coSanPham = true;

			} else {
				// li[i].style.order = li.length; // Test
				li[i].style.width = 0;
				li[i].style.opacity = 0;
				li[i].style.borderWidth = "0";
			}
		}

		// Thông báo nếu không có sản phẩm
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

// Tìm kiếm (lọc) theo số lượng sao
	function filterProductsStar(ele) {
		var filter = ele.value.toUpperCase();
		var ul = document.getElementById('products');
		var li = ul.getElementsByTagName('li');

		for(var i = 0; i < li.length; i++) {
			var a = li[i].getElementsByTagName('a')[0];
			var h3 = a.getElementsByTagName('h3')[0];

			if(h3.innerHTML.toUpperCase().indexOf(filter) > -1) {
				// li[i].style.order = order++; // Test
				li[i].style.opacity = 1;
				li[i].style.width = "239px";
			} else {
				// li[i].style.order = li.length; // Test
				li[i].style.opacity = 0;
				li[i].style.width = 0;
			}
		}
	}
