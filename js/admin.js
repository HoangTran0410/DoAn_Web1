window.onload = function () {
    // get data từ localstorage
    list_products = getListProducts() || list_products;
    adminInfo = getListAdmin() || adminInfo;

    if (window.localStorage.getItem('admin')) {
        addTableProducts();
    } else {
        document.body.innerHTML = `<h1 style="color:red; with:100%; text-align:center;"> Truy cập bị từ chối.. </h1>`;
    }
}

function logOutAdmin() {
    window.localStorage.removeItem('admin');
}

// ========================== Sản Phẩm ========================
// Tìm kiếm - Lọc
function locTableTheoTenSanPham(ten) {
    var listTr_table = document.getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var tensp_tr = tr.getElementsByTagName('a')[0].innerHTML.toLowerCase();
        if (tensp_tr.indexOf(ten.toLowerCase()) < 0) {
            tr.style.display = 'none';
        } else {
            tr.style.display = '';
        }
    }
}

function locTableTheoMaSanPham(ma) {
    var listTr_table = document.getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var tensp_tr = tr.getElementsByTagName('td')[1].innerHTML.toLowerCase();
        if (tensp_tr.indexOf(ma.toLowerCase()) < 0) {
            tr.style.display = 'none';
        } else {
            tr.style.display = '';
        }
    }
}

function timKiem(inp) {
    var kieuTim = document.getElementsByName('kieuTim')[0].value;
    var text = inp.value;
    if (kieuTim == 'ten') {
        locTableTheoTenSanPham(text);
    } else {
        locTableTheoMaSanPham(text);
    }
}

// Thêm
function openThemSanPham() {

}

function themSanPham(sp) { // sp ở dạng object
    // check trùng ở list_products
    for (var l of list_products) {
        if (l.name == sp.name) {
            alert('Sản phẩm đã có trong danh sách sản phẩm. Vui lòng chọn tên khác hoặc chọn sửa ' + sp.name);
            return;
        }
    }

    // Them san pham vao listSpLocal
    list_products.push(sp);

    // Lưu vào localstorage
    setListProducts(list_products);

    // Vẽ lại table
    addTableProducts();
}

// Xóa
function xoaSanPham(masp, tensp) {
    if (window.confirm('Bạn có chắc muốn xóa ' + tensp)) {
        // Xóa
        for(var i = 0; i < list_products.length; i++) {
            if(list_products[i].masp == masp) {
                list_products.splice(i, 1);
            }
        }

        // Lưu vào localstorage
        setListProducts(list_products);

        // Vẽ lại table 
        addTableProducts();
    }
}

// Sửa
function suaSanPham(masp) {
    // Sửa

    // Lưu vào localstorage
    setListProducts(list_products);

    // Vẽ lại table
    addTableProducts();
}

// ================== Sort ====================
// https://github.com/HoangTran0410/First_html_css_js/blob/master/sketch.js
var decrease = true; // Sắp xếp giảm dần

function sortProductsTable(loai) {
    var list = document.getElementsByClassName("table-content")[0];
    var tr = list.getElementsByTagName('tr');

    quickSort(tr, 0, tr.length-1, loai); // type cho phép lựa chọn sort theo mã hoặc tên hoặc giá ... 
    decrease = !decrease;
}

function quickSort(arr, left, right, loai) {
    var pivot,
        partitionIndex;

    if (left < right) {
        pivot = right;
        partitionIndex = partition(arr, pivot, left, right, loai);

        //sort left and right
        quickSort(arr, left, partitionIndex - 1, loai);
        quickSort(arr, partitionIndex + 1, right, loai);
    }
    return arr;
}

function partition(arr, pivot, left, right, loai) {
    var pivotValue =  getValueOfTypeInTable(arr[pivot], loai),
        partitionIndex = left;
    
    for (var i = left; i < right; i++) {
        if (decrease && getValueOfTypeInTable(arr[i], loai) > pivotValue
        || !decrease && getValueOfTypeInTable(arr[i], loai) < pivotValue) {
            swap(arr, i, partitionIndex);
            partitionIndex++;
        }
    }
    swap(arr, right, partitionIndex);
    return partitionIndex;
}

function swap(arr, i, j) {
    var tempi = arr[i].cloneNode(true);
    var tempj = arr[j].cloneNode(true);
    arr[i].parentNode.replaceChild(tempj, arr[i]);
    arr[j].parentNode.replaceChild(tempi, arr[j]);
}

function getValueOfTypeInTable(tr, loai) {
    var td = tr.getElementsByTagName('td');
    switch(loai) {
        case 'stt' : return Number(td[0].innerHTML);
        case 'masp' : return td[1].innerHTML.toLowerCase();
        case 'ten' : return td[2].innerHTML.toLowerCase();
        case 'gia' : return stringToNum(td[3].innerHTML);
        case 'khuyenmai' : return td[4].innerHTML.toLowerCase();
    }
    return false;
}

// ======================= Hiển thị ==============================
function addTableProducts() {
    var tp = document.getElementsByClassName('table-content')[0];
    var s = `<table class="table-outline">`;

    for (var i = 0; i < list_products.length; i++) {
        var p = list_products[i];
        s += `<tr>
            <td style="width: 5%">` + i + `</td>
            <td style="width: 10%">` + p.masp + `</td>
            <td style="width: 40%">
                <a title="Xem chi tiết" target="_blank" href="chitietsanpham.html?` + p.name.split(' ').join('-') + `">` + p.name + `</a>
                <img src="` + p.img + `"></img>
            </td>
            <td style="width: 15%">` + p.price + `</td>
            <td style="width: 15%">` + promoToStringValue(p.promo) + `</td>
            <td style="width: 15%">
                <div class="tooltip">
                    <i class="fa fa-wrench" onclick="suaSanPham('` + p.masp + `')"></i>
                    <span class="tooltiptext">Sửa</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-trash" onclick="xoaSanPham('` + p.masp + `', '`+p.name+`')"></i>
                    <span class="tooltiptext">Xóa</span>
                </div>
                
            </td>
        </tr>`;
    }

    s += `</table>`;

    tp.innerHTML = s;
}

// Chuyển khuyến mãi vễ dạng chuỗi tiếng việt
function promoToStringValue(pr) {
    switch (pr.name) {
        case 'tragop':
            return 'Góp ' + pr.value + '%';
        case 'giamgia':
            return 'Giảm ' + pr.value;
        case 'giareonline':
            return 'Online (' + pr.value + ')';
        case 'moiramat':
            return 'Mới';
    }
    return '';
}

// ================= các hàm thêm ====================
function progress(percent, bg, width, height) {

    return `<div class="progress" style="width: ` + width + `; height:` + height + `">
                <div class="progress-bar bg-info" style="width: ` + percent + `%; background-color:` + bg + `"></div>
            </div>`
}

function vitriCompany(product, vt) {
    var index = 0;
    for (var i = 0; i < vt; i++) {
        if (list_products[i].company == product.company) {
            index++;
        }
    }
    return index;
}

// for(var i = 0; i < list_products.length; i++) {
//     list_products[i].masp = list_products[i].company.substring(0, 3) + vitriCompany(list_products[i], i);
// }

// console.log(JSON.stringify(list_products));