var nameProduct; // Tên sản phẩm trong trang này, 
// là biến toàn cục để có thể dùng ở bát cứ đâu trong trang
// không cần tính toán lấy tên từ url nhiều lần

window.onload = function () {
    // thêm tags (từ khóa) vào khung tìm kiếm
    var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
    for (var t of tags) addTags(t, "index.html?search=" + t, true);

    phanTich_URL_chiTietSanPham();

    // autocomplete cho khung tim kiem
    autocomplete(document.getElementById('search-box'), list_products);

    // Cài đặt event cho phần tài khoản
    setupEventTaiKhoan();

    // check LocalStorage
    checkLocalStorage();
}

function themVaoGioHang(tenSanPham) {
    tenSanPham = tenSanPham || nameProduct;
    var user = getCurrentUser();
    if(!user) {
        alert('Bạn cần đăng nhập để mua hàng !');
        showTaiKhoan(true);
        return;
    }
    var t = getTimeNow();
    var daCoSanPham = false;;

    for(var i = 0; i < user.products.length; i++) { // check trùng sản phẩm
        if(user.products[i].name == tenSanPham) {
            user.products[i].soluong++;
            daCoSanPham = true;
            break;
        }
    }
    
    if(!daCoSanPham){ // nếu không trùng thì mới thêm sản phẩm vào user.products
        user.products.push({
            "name": tenSanPham,
            "soluong": 1,
            "date": t
        });
    }

    animateCartNumber();
    
    setCurrentUser(user); // cập nhật giỏ hàng cho user hiện tại
    updateListUser(user); // cập nhật list user
    capNhatGioHang(); // cập nhật giỏ hàng

    // alert('Sản phẩm đã được thêm vào giỏ hàng của bạn (' + user.username +')');
}

function phanTich_URL_chiTietSanPham() {
    nameProduct = window.location.href.split('?')[1]; // lấy tên
    if (!nameProduct) return; // nếu không tìm thấy tên thì thoát hàm

    // tách theo dấu '-' vào gắn lại bằng dấu ' ', code này giúp bỏ hết dấu '-' thay vào bằng khoảng trắng.
    // code này làm ngược lại so với lúc tạo href cho sản phẩm trong file classes.js
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
    if (sanPham.promo.name != 'giareonline') {
        price.innerHTML = `<strong>` + sanPham.price + `₫</strong>`;
        price.innerHTML += new Promo(sanPham.promo.name, sanPham.promo.value).toWeb();
    } else {
        document.getElementsByClassName('ship')[0].style.display = ''; // hiển thị 'giao hàng trong 1 giờ'
        price.innerHTML = `<strong>` + sanPham.promo.value + `&#8363;</strong>
					        <span>` + sanPham.price + `&#8363;</span>`;
    }

    // Cập nhật chi tiết khuyến mãi
    document.getElementById('detailPromo').innerHTML = getDetailPromo(sanPham);

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

    // Cập nhật hình
    var hinh = divChiTiet.getElementsByClassName('picture')[0];
    hinh = hinh.getElementsByTagName('img')[0];
    hinh.src = sanPham.img;
    document.getElementById('bigimg').src = sanPham.img;

    // Hình nhỏ
    addSmallImg("img/products/huawei-mate-20-pro-green-600x600.jpg");
    addSmallImg("img/chitietsanpham/oppo-f9-mau-do-1-org.jpg");
    addSmallImg("img/chitietsanpham/oppo-f9-mau-do-2-org.jpg");
    addSmallImg("img/chitietsanpham/oppo-f9-mau-do-3-org.jpg");
    addSmallImg("img/products/huawei-mate-20-pro-green-600x600.jpg");
    addSmallImg("img/chitietsanpham/oppo-f9-mau-do-3-org.jpg");
    addSmallImg("img/products/huawei-mate-20-pro-green-600x600.jpg");

    // Khởi động thư viện hỗ trợ banner - chỉ chạy sau khi tạo xong hình nhỏ
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items: 5,
        center: true,
        smartSpeed: 450,
    });
}

// Chi tiết khuyến mãi
function getDetailPromo(sp) {
    switch (sp.promo.name) {
        case 'tragop':
            var span = `<span style="font-weight: bold"> lãi suất ` + sp.promo.value + `% </span>`;
            return `Khách hàng có thể mua trả góp sản phẩm với ` + span + `với thời hạn 6 tháng kể từ khi mua hàng.`;

        case 'giamgia':
            var span = `<span style="font-weight: bold">` + sp.promo.value + `</span>`;
            return `Khách hàng sẽ được giảm ` + span + `₫ khi tới mua trực tiếp tại cửa hàng`;

        case 'moiramat':
            return `Khách hàng sẽ được thử máy miễn phí tại cửa hàng. Có thể đổi trả lỗi trong vòng 2 tháng.`;

        case 'giareonline':
            var del = stringToNum(sp.price) - stringToNum(sp.promo.value);
            var span = `<span style="font-weight: bold">` + numToString(del) + `</span>`;
            return `Sản phẩm sẽ được giảm ` + span + `₫ khi mua hàng online bằng thẻ VPBank hoặc tin nhắn SMS`;

        default:
            var span = `<span style="font-weight: bold">61 xe Wave Alpha</span>`;
            return `Cơ hội trúng ` + span + ` khi trả góp Home Credit`;
    }
}

function addThongSo(ten, giatri) {
    return `<li>
                <p>` + ten + `</p>
                <div>` + giatri + `</div>
            </li>`;
}

// add hình
function addSmallImg(img) {
    var newDiv = `<div class='item'>
                        <a>
                            <img src=` + img + ` onclick="changepic(this.src)">
                        </a>
                    </div>`;
    var banner = document.getElementsByClassName('owl-carousel')[0];
    banner.innerHTML += newDiv;
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