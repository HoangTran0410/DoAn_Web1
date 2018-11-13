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
	function addTags(nameTag, link) { // Từ khóa tìm kiếm
		var new_tag = `<a href=` + link + `>` + nameTag + `</a>`;

		// Thêm <a> vừa tạo vào khung tìm kiếm
		var khung_tags = document.getElementsByClassName('tags')[0];
		khung_tags.innerHTML += new_tag;
	}

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

// Tìm kiếm (Filter <li>)
	function filterProductsName() {
		var inp = document.getElementById('search-box');
		var filter = inp.value.toUpperCase();
		var ul = document.getElementById('products');
		var li = ul.getElementsByTagName('li');

		for(var i = 0; i < li.length; i++) {
			var a = li[i].getElementsByTagName('a')[0];
			var h3 = a.getElementsByTagName('h3')[0];

			if(h3.innerHTML.toUpperCase().indexOf(filter) > -1) {
				li[i].style.opacity = 1;
				li[i].style.width = "19.9%";
			} else {
				li[i].style.opacity = 0;
				li[i].style.width = 0;
			}
		}
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
	for(var l of li) {
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
