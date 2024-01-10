// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
//var ctx = document.getElementById("myPieChart");
//var myPieChart = new Chart(ctx, {
//  type: 'doughnut',
//  data: {
//    labels: ["Direct", "Referral", "Social"],
//    datasets: [{
//      data: [55, 30, 15],
//      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
//      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
//      hoverBorderColor: "rgba(234, 236, 244, 1)",
//    }],
//  },
//  options: {
//    maintainAspectRatio: false,
//    tooltips: {
//      backgroundColor: "rgb(255,255,255)",
//      bodyFontColor: "#858796",
//      borderColor: '#dddfeb',
//      borderWidth: 1,
//      xPadding: 15,
//      yPadding: 15,
//      displayColors: false,
//      caretPadding: 10,
//    },
//    legend: {
//      display: false
//    },
//    cutoutPercentage: 80,
//  },
//});

// Khai báo biến để lưu biểu đồ
var myPieChart;

// Hàm để tạo biểu đồ
function createChart() {
    var ctx = document.getElementById("myPieChart").getContext('2d');
    myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [], // Mảng chứa các nhãn (ví dụ: MaLoaiPhong)
            datasets: [{
                data: [], // Mảng chứa dữ liệu doanh thu
                backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#ffa726', '#f44336', '#8e24aa'],
                hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#ff7043', '#e53935', '#6a1b9a'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutPercentage: 80,
        },
    });

    // Gọi AJAX để lấy dữ liệu từ controller
    jQuery.ajax({
        url: 'Home/GetTypeRoomDensity', // Đường dẫn đến action trong controller
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Dữ liệu đã được nhận về từ action
            // Cập nhật dữ liệu cho biểu đồ
            var tenLoaiPhong = [];
            var totalDensity = [];

            // Xử lý dữ liệu nhận được từ action
            data.forEach(function (item) {
                tenLoaiPhong.push(item.TenLoaiPhong);
                totalDensity.push(item.MatDoThue);
            });
            // Cập nhật dữ liệu cho biểu đồ
            myPieChart.data.labels = tenLoaiPhong;
            myPieChart.data.datasets[0].data = totalDensity;

            // Cập nhật biểu đồ
            myPieChart.update();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// Gọi hàm để tạo biểu đồ khi trang được tải
$(document).ready(function () {
    createChart();
});
