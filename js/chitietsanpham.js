window.onload = function () {
    // thêm tags (từ khóa) vào khung tìm kiếm
    var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
    for (var t of tags)
        addTags(t, "index.html?search=" + t, true);

    // autocomplete cho khung tim kiem
    autocomplete(document.getElementById('search-box'), list_products);

    getProductFromUrl();

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

    // Cập nhật giá
    var price = divChiTiet.getElementsByClassName('area_price')[0];
    price.innerHTML = `<strong>` + sanPham.price + `₫</strong>`;
    price.innerHTML += new Promo(sanPham.promo.name, sanPham.promo.value).toWeb();

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
    document.getElementById("overlaycertainimg").style.display = "block";
}

function closecertain() {
    document.getElementById("overlaycertainimg").style.display = "none";
}

// đổi hình trong chế độ xem hình
function changepic(src) {
    document.getElementById("bigimg").src = src;
}