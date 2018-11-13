function User(name, pass) {	
	this.name = name;
	this.pass = pass;
	this.products = [];
}

function Promo(name, value) { // khuyen mai
	this.name = name; // giamGia, traGop, giaReOnline
	this.value = value;

	this.toWeb = function() {
		if(!this.name) return "";
		var contentLabel = "";
		switch(this.name) {
			case "giamgia" : 
				contentLabel = `<i class="fa fa-bolt"></i> Giảm `+ this.value + `&#8363;`;
				break;

			case "tragop" :
				contentLabel = `Trả góp ` + this.value + `%`;
				break;

			case "giareonline" :
				contentLabel = `Giá rẻ online`;
				break;

			case "moiramat" :
				contentLabel = "Mới ra mắt";
				break;
		}

		var label = 
		`<label class=`+ this.name +`>
			`+ contentLabel +`
		</label>`;

		return label;
	}
}

function Product(img, name, price, star, rateCount, promo) {
	this.img = img;
	this.name = name;
	this.price = price;
	this.star = star;
	this.rateCount = rateCount;
	this.promo = promo;

	this.addToWeb = function(id) {
		// Chuyển star sang dạng tag html
		var rating = "";
		if(this.rateCount > 0){
			for(var i = 1; i <= 5; i++) {
				if(i <= this.star) {
					rating += `<i class="fa fa-star"></i>`
				} else {
					rating += `<i class="fa fa-star-o"></i>`
				}
			}
			rating += `<span>`+ this.rateCount +` đánh giá</span>`;
		}

		// Chuyển giá tiền sang dạng tag html
		var price = `<strong>` + this.price + `&#8363;</strong>`;
		if(this.promo && this.promo.name == "giareonline") {
			// khuyến mãi 'Giá rẻ online' sẽ có giá thành mới
			price =`<strong>`+ this.promo.value +`&#8363;</strong>
					<span>`+ this.price +`&#8363;</span>`;
		}

		// Cho mọi thứ vào tag <li>... </li>
		var newLi = 
		`<li>
			<a href="">
				<img src=`+ this.img +` alt="">
				<h3>` + this.name + `</h3>
				<div class="price">
					`+ price +`
				</div>
				<div class="ratingresult">
					`+ rating +`
				</div>
				`+ (this.promo && this.promo.toWeb()) +`
			</a>
		</li>`;

		// Thêm tag <li> vừa tạo vào <ul> homeproduct
		var products = document.getElementById(id || 'products');
		products.innerHTML += newLi;
	}
}