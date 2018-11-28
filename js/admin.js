// ========= Các hàm liên quan tới danh sách sản phẩm =========
// Localstorage cho dssp: 'ListProducts_Storage
function setListProducts(newList) {
    window.localStorage.setItem('ListProducts_Storage', newList);
}
function getListProducts() {
    return JSON.parse(window.localStorage.getItem('ListProducts_Storage'));
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

    // Xóa

    // Đổ ngược trở lại localstorage
    setListProducts(listSpLocal);
}