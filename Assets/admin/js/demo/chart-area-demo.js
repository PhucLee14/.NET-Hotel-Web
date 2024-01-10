// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Area Chart Example
var myLineChart;
// Thêm sự kiện khi chọn xem theo năm
$('#viewByYear').off('click').on('click', function (e) {
    e.preventDefault();
    fetchDataAndUpdateChart('year');
});

// Thêm sự kiện khi chọn xem theo tháng
$('#viewByMonth').off('click').on('click', function (e) {
    e.preventDefault();
    fetchDataAndUpdateChart('month');
});

// Hàm xử lý dữ liệu và cập nhật biểu đồ tương ứng
function fetchDataAndUpdateChart(option) {
    jQuery.ajax({
        url: option === 'year' ? 'Home/GetYearlyEarning' : 'Home/GetMonthlyEarning',
        method: 'GET',
        success: function (data) {
            if (myLineChart) {
                myLineChart.destroy();
            }
            updateChartWithData(data, option);
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

// Hàm cập nhật biểu đồ với dữ liệu mới
function updateChartWithData(data, option) {
    var chartData = [];
    var labels = [];
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var earnings = [];

    // Xử lý dữ liệu từ response trả về
    //data.forEach(function (item) {
    //    /*var label = option === 'year' ? item.Year.toString() : item.MonthYear;*/
    //    var monthIndex = parseInt(item.Month) - 1;
    //    var monthName = monthNames[monthIndex];
    //    var label;
    //    if (option == 'year') {
    //        label = item.Year;
    //    }
    //    else {
    //        label = monthName;
    //    }
    //    var value = item.TotalEarning;

    //    labels.push(label);
    //    earnings.push(value);

    //    chartData.push({
    //        label: label,
    //        value: value
    //    });
    //});
    if (option === 'year') {
        var yearsWithData = data.map(item => item.Year);
        var currentYear = new Date().getFullYear();

        for (var year = currentYear - 1; year <= currentYear; year++) {
            labels.push(year.toString());

            if (yearsWithData.includes(year)) {
                var yearData = data.find(item => item.Year === year);
                earnings.push(yearData.TotalEarning);
            } else {
                earnings.push(0);
            }
        }
    } else {
        // Xử lý khi chọn xem theo tháng
        var monthsWithData = data.map(item => parseInt(item.Month));
        for (var i = 1; i <= 12; i++) {
            var monthIndex = i - 1;
            var monthName = monthNames[monthIndex];
            labels.push(monthName);

            if (monthsWithData.includes(i)) {
                var monthData = data.find(item => parseInt(item.Month) === i);
                earnings.push(monthData.TotalEarning);
            } else {
                earnings.push(0);
            }
        }
    }

    // Lấy context của biểu đồ
    var ctx = document.getElementById('myAreaChart').getContext('2d');

    // Cập nhật biểu đồ
    myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Earning',
                lineTension: 0.3,
                backgroundColor: 'rgba(78, 115, 223, 0.05)',
                borderColor: 'rgba(78, 115, 223, 1)',
                pointRadius: 3,
                pointBackgroundColor: 'rgba(78, 115, 223, 1)',
                pointBorderColor: 'rgba(78, 115, 223, 1)',
                pointHoverRadius: 3,
                pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
                pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: earnings,
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 7
                    }
                }],
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 5,
                        padding: 10,
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return number_format(value) + " VNĐ";
                        }
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
                callbacks: {
                    label: function (tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
                    }
                }
            }
        }
    });
}
$(document).ready(function () {
    // Gọi hàm để lấy dữ liệu và cập nhật biểu đồ ngay khi trang được load
    fetchDataAndUpdateChart('month'); // Thay thế 'month' bằng option mặc định bạn muốn hiển thị khi trang được tải
});
