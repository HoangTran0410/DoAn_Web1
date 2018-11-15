// Thêm - Xóa sản phẩm
	function addProduct(p, id) {
		promo = new Promo(p.promo.name, p.promo.value);
		product = new Product(p.img, p.name, p.price, p.star, p.rateCount, promo);
		product.addToWeb(id);
	}
	function addProductsFrom(list, vitri, soluong) {
		var start = vitri || 0;
		var end = (soluong ? start+soluong : list.length);
		for(var i = start; i < end; i++) {
			addProduct(list[i]);
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

		for(var i = 0; i < listLi.length; i++) {
			if(getNameFromLi(listLi[i]).indexOf(filter) > -1) {
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
		if(!divRate) return 0;

		divRate = divRate[0];
		var starCount = divRate.getElementsByClassName('fa-star').length;

		return starCount;
	}

	function filterProductsStar(num) {
		var listLi = getLiArray();

		var coSanPham = false;

		for(var i = 0; i < listLi.length; i++) {
			if(getStarFromLi(listLi) >= num) {
				showLi(listLi[i]);
				coSanPham = true;

			} else {
				hideLi(listLi[i]);
			}
		}

		// Thông báo nếu không có sản phẩm
		alertNotHaveProduct(coSanPham);
	}
