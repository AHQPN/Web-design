const charts = document.querySelectorAll(".chart");
const chart2s = document.querySelectorAll(".chart2");

charts.forEach(function (chart) {
  var ctx = chart.getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Áo Hoddie", "Áo Khoác", "Áo Sơ-Mi", "Áo Polo", ],
      datasets: [
        {
          label: "Doanh số",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});



chart2s.forEach(function (chart) {
  var ctx = chart.getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Quần Âu", "Quần Kaki", "Quần Jogger", "Quần Short", ],
      datasets: [
        {
          label: "Doanh số ",
          data: [8, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

$(document).ready(function () {
  $("#Employee_table").each(function (_, table) {
    $(table).DataTable();
  });
});
$('#Employee_table').DataTable({
  paging: false, // Mặc định là true, set false để tắt chức năng phân trang
  language: {
      
      search: "Tìm kiếm",
      lengthMenu: "Điều chỉnh số lượng bản ghi trên 1 trang _MENU_ ",
      info: "Bản ghi từ _START_ đến _END_ Tổng cộng _TOTAL_ bản ghi",
      
      
  }
});

$(document).ready(function() {
  var table = $('#Order_table').DataTable({
      
      language: {
          processing: "Đang xử lý...",
          search: "Tìm kiếm:",
          lengthMenu: "Hiển thị _MENU_ bản ghi",
          info: "Hiển thị từ _START_ đến _END_ trong tổng số _TOTAL_ bản ghi",
          infoEmpty: "Không có dữ liệu",
          infoFiltered: "(lọc từ tổng số _MAX_ bản ghi)",
          infoPostFix: "",
          loadingRecords: "Đang tải...",
          zeroRecords: "Không tìm thấy bản ghi phù hợp",
          emptyTable: "Không có dữ liệu",
          paginate: {
              first: "Trang đầu",
              previous: "Trang trước",
              next: "Trang sau",
              last: "Trang cuối"
          }
      },
      columnDefs: [{
          targets: -1, // Cột cuối cùng cho các hành động
          data: null,
          defaultContent: '<button class="editRow">Sửa</button> <button class="deleteRow">Xóa</button>'
      }]
  });

  // Hàm tạo dữ liệu mẫu
  function generateData() {
      var data = [];
      for (var i = 1; i <= 1000; i++) {
          var orderID = 'DH' + i.toString().padStart(4, '0');
          var customerName = 'Khách Hàng ' + i;
          var product = 'Sản Phẩm ' + (i % 10 + 1);
          var quantity = Math.floor(Math.random() * 100) + 1;
          var orderDate = '2023-' + (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0') + '-' + (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');
          var status = Math.random() > 0.5 ? 'Đã giao' : 'Chưa giao';
          data.push([orderID, customerName, product, quantity, orderDate, status, null]);
      }
      return data;
  }

  // Thêm dữ liệu mẫu vào bảng
  table.rows.add(generateData()).draw();


// Sửa hàng
$('#Order_table tbody').on('click', '.editRow', function() {
    var row = table.row($(this).parents('tr'));
    var rowData = row.data();
    var newName = prompt("Sửa tên khách hàng:", rowData[1]);
    if (newName !== null) {
        rowData[1] = newName;
        row.data(rowData).draw();
    }
});

// Xóa hàng
$('#Order_table tbody').on('click', '.deleteRow', function() {
    table.row($(this).parents('tr')).remove().draw();
});
});



//Bảng khách hàng

$(document).ready(function() {
  // Kiểm tra xem DataTable đã được khởi tạo chưa
  if ($.fn.dataTable.isDataTable('#Customer_table')) {
      // Nếu đã khởi tạo, phá hủy DataTable trước đó
      $('#Customer_table').DataTable().destroy();
  }

  // Khởi tạo lại DataTable
  var table = $('#Customer_table').DataTable({

      language: {
          processing: "Đang xử lý...",
          search: "Tìm kiếm:",
          lengthMenu: "Hiển thị _MENU_ bản ghi",
          info: "Hiển thị từ _START_ đến _END_ trong tổng số _TOTAL_ bản ghi",
          infoEmpty: "Không có dữ liệu",
          infoFiltered: "(lọc từ tổng số _MAX_ bản ghi)",
          infoPostFix: "",
          loadingRecords: "Đang tải...",
          zeroRecords: "Không tìm thấy bản ghi phù hợp",
          emptyTable: "Không có dữ liệu",
          paginate: {
              first: "Trang đầu",
              previous: "Trang trước",
              next: "Trang sau",
              last: "Trang cuối"
          }
      },
      columnDefs: [{
          targets: -1, // Cột cuối cùng cho các hành động
          data: null,
          defaultContent: '<button class="editRow">Sửa</button> <button class="deleteRow">Xóa</button>'
      }]
  });

  // Hàm tạo dữ liệu mẫu
  function generateCustomerData() {
      var data = [];
      for (var i = 1; i <= 150; i++) {
          var customerID = 'KH' + i.toString().padStart(4, '0');
          var customerName = 'Khách Hàng ' + i;
          var email = 'khachhang' + i + '@example.com';
          var phone = '090123456' + (i % 10);
          var address = 'Địa chỉ ' + i;
          data.push([customerID, customerName, email, phone, address, null]);
      }
      return data;
  }

  // Thêm dữ liệu mẫu vào bảng
  table.rows.add(generateCustomerData()).draw();


  // Sửa khách hàng
  $('#Customer_table tbody').on('click', '.editRow', function() {
      var row = table.row($(this).parents('tr'));
      var rowData = row.data();
      var newName = prompt("Sửa tên khách hàng:", rowData[1]);
      if (newName !== null) {
          rowData[1] = newName;
          row.data(rowData).draw();
      }
  });

  // Xóa khách hàng
  $('#Customer_table tbody').on('click', '.deleteRow', function() {
      table.row($(this).parents('tr')).remove().draw();
  });
});
