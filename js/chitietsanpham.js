window.onload = function () {
    // thêm tags (từ khóa) vào khung tìm kiếm
    var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
    for (var t of tags)
        addTags(t, "index.html?search=" + t, true);

    getProductFromUrl();

    // autocomplete cho khung tim kiem
    autocomplete(document.getElementById('search-box'), list_products);

    // Cài đặt event cho phần tài khoản
	setupEventTaiKhoan();
}

function getProductFromUrl() {
    var nameProduct = window.location.href.split('?')[1];
    if (!nameProduct) return;

    nameProduct = nameProduct.replace('-plus', '+');
    nameProduct = nameProduct.split('-').join(' ');

    var sanPham = timKiemTheoTen(list_products, nameProduct)[0];
    var divChiTiet = document.getElementsByClassName('chitietSanpham')[0];

    // Đổi title
    document.title = nameProduct + ' - Thế giới điện thoại';

    // Cập nhật tên h1
    var h1 = divChiTiet.getElementsByTagName('h1')[0];
    h1.innerHTML += nameProduct;

    // Cập nhật sao
    var rating = "";
    if (sanPham.rateCount > 0) {
        for (var i = 1; i <= 5; i++) {
            if (i <= sanPham.star) {
                rating += `<i class="fa fa-star"></i>`
            } else {
                rating += `<i class="fa fa-star-o"></i>`
            }
        }
        rating += `<span> ` + sanPham.rateCount + ` đánh giá</span>`;
    }
    divChiTiet.getElementsByClassName('rating')[0].innerHTML += rating;

    // Cập nhật giá + label khuyến mãi
    var price = divChiTiet.getElementsByClassName('area_price')[0];
    if(sanPham.promo.name != 'giareonline') {
        price.innerHTML = `<strong>` + sanPham.price + `₫</strong>`;
        price.innerHTML += new Promo(sanPham.promo.name, sanPham.promo.value).toWeb();
    } else {
        price.innerHTML = `<strong>` + sanPham.promo.value + `&#8363;</strong>
					        <span>` + sanPham.price + `&#8363;</span>`;
    }
    
    // Cập nhật chi tiết khuyến mãi
    document.getElementById('detailPromo').innerHTML =  getDetailPromo(sanPham);


    // Cập nhật hình
    var hinh = divChiTiet.getElementsByClassName('picture')[0];
        hinh = hinh.getElementsByTagName('img')[0];
        hinh.src = sanPham.img;
    document.getElementById('bigimg').src = sanPham.img;

    // Cập nhật thông số
    var info = document.getElementsByClassName('info')[0];
    var s = addThongSo('Màn hình', sanPham.detail.screen);
        s += addThongSo('Hệ điều hành', sanPham.detail.os);
        s += addThongSo('Camara sau', sanPham.detail.camara);
        s += addThongSo('Camara trước', sanPham.detail.camaraFront);
        s += addThongSo('CPU', sanPham.detail.cpu);
        s += addThongSo('RAM', sanPham.detail.ram);
        s += addThongSo('Bộ nhớ trong', sanPham.detail.rom);
        s += addThongSo('Thẻ nhớ', sanPham.detail.microUSB);
        s += addThongSo('Dung lượng pin', sanPham.detail.battery);
    info.innerHTML = s;


}

function getDetailPromo(sp) {
    switch(sp.promo.name) {
        case 'tragop': return `Khách hàng có thể mua trả góp sản phẩm với lãi suất `+sp.promo.value+`% với thời hạn 6 tháng kể từ khi mua hàng.`;
        case 'giamgia': return `Khách hàng sẽ được giảm `+sp.promo.value+`₫ khi tới mua trực tiếp tại cửa hàng`;
        case 'moiramat': return `Khách hàng sẽ được thử máy miễn phí tại cửa hàng. Có thể đổi trả lỗi trong vòng 2 tháng.`;
        case 'giareonline': return `Sản phẩm sẽ được giảm còn `+sp.promo.value+`₫ khi mua hàng online bằng thẻ VPBank hoặc tin nhắn SMS`;
        default : return `Cơ hội trúng 61 xe Wave Alpha khi trả góp Home Credit`;
    }
}

function addThongSo(ten, giatri) {
    return `<li>
                <p>`+ ten +`</p>
                <div>`+ giatri +`</div>
            </li>`;
}

function timKiem() { // hàm chạy khi submit form tìm kiếm
    var keysearch = document.getElementById('search-box').value;
        keysearch = keysearch.split('+').join('-');
        keysearch = keysearch.replace('+', '-plus');
    window.open('https://hoangtran0410.github.io/DoAn_Web1/index.html?search=' + keysearch);
    return true;
}

// đóng mở xem hình
function opencertain() {
    document.getElementById("overlaycertainimg").style.transform = "scale(1)";
}

function closecertain() {
    document.getElementById("overlaycertainimg").style.transform = "scale(0)";
}

// đổi hình trong chế độ xem hình
function changepic(src) {
    document.getElementById("bigimg").src = src;
}