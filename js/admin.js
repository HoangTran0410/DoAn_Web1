
window.onload = function() {
    // get data từ localstorage
    list_products = getListProducts() || list_products;
    adminInfo = getListAdmin() || adminInfo;

    if(window.localStorage.getItem('admin')) {

    } else {
        document.body.innerHTML = `<h1 style="color:red; with:100%; text-align:center;"> Truy cập bị từ chối.. </h1>`;
    }
}

function logOutAdmin() {
    window.localStorage.removeItem('admin');
}

function themSanPham(sp) { // sp ở dạng object
    // Lấy dữ liệu ra đổ vào listSpLocal 
    var listSpLocal =  getListProducts();

    // check trùng ở list_products
    for(var l of list_products) {
        if(l.name == sp.name) {
            alert('Sản phẩm đã có trong danh sách sản phẩm. Vui lòng chọn tên khác hoặc chọn sửa '+sp.name);
            return ;
        }
    }

    // Them san pham vao listSpLocal
    listSpLocal.push(sp);

    // Đổ ngược trở lại localstorage
    setListProducts(listSpLocal);
}

function xoaSanPham(tensp) {
    // Lấy dữ liệu ra đổ vào listSpLocal 
    var listSpLocal =  getListProducts();

    // Xóa

    // Đổ ngược trở lại localstorage
    setListProducts(listSpLocal);
}

function suaSanPham(sp) {
    // Lấy dữ liệu ra đổ vào listSpLocal 
    var listSpLocal =  getListProducts();

    // Sửa

    // Đổ ngược trở lại localstorage
    setListProducts(listSpLocal);
}
