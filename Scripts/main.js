'use strict';

const navHeight = document.querySelector('.site-header');
const upBtn = document.querySelector('#up-btn');
const arrowLeftBtn = document.querySelector('.arrow-left');
const arrowRightBtn = document.querySelector('.arrow-right');

//room
const adultsQuantity = document.querySelector('#adults');
const childrenQuantity = document.querySelector('#children');
const bookBtn = document.querySelector('.js-book-btn');

const roomContainer = document.querySelector('.room-container');
const roomList = document.querySelector('.room-list');
const roomForm = document.querySelector('.room-form');
const closeBtn = document.querySelector('.close-btn');
const submitBtn = document.querySelector('.submit-btn');
const closeEvents = document.querySelectorAll('.close-btn, .room-form');

const serviceList = document.querySelector(".services-list");

const bookingForm = document.querySelector("#booking-form");

const bookingRoomForm = document.querySelector(".booking-room-form");
var counter = 1;
var checkinForForm = '';
var checkoutForForm = '';

if (roomList) {

    var checkIn = 'a';
    var checkOut = '';
    var i = 1;

    var roomSelected = {};
    const roomListItem = roomList.querySelectorAll('.room');

    function toast({ title = "", message = "", type = "info", duration = 3000 }) {
        const main = document.getElementById("toast");
        if (main) {
            const toast = document.createElement("div");

            // Auto remove toast
            const autoRemoveId = setTimeout(function () {
                main.removeChild(toast);
            }, duration + 1000);

            // Remove toast when clicked
            toast.onclick = function (e) {
                if (e.target.closest(".toast__close")) {
                    main.removeChild(toast);
                    clearTimeout(autoRemoveId);
                }
            };

            const icons = {
                success: "fas fa-check-circle",
                info: "fas fa-info-circle",
                warning: "fas fa-exclamation-circle",
                error: "fas fa-exclamation-circle"
            };
            const icon = icons[type];
            const delay = (duration / 1000).toFixed(2);

            toast.classList.add("toast", `toast--${type}`);
            toast.style.animation = `slideInLeft ease .3s, fadeOut linear 10s ${delay}s forwards`;
            toast.style.display = 'flex';

            toast.innerHTML = `
                <div class="toast__icon">
                    <i class="${icon}"></i>
                </div>
                <div class="toast__body">
                    <h3 class="toast__title">${title}</h3>
                    <p class="toast__msg">${message}</p>
                </div>
                <div class="toast__close">
                    <i class="fas fa-times"></i>
                </div>
            `;
            main.appendChild(toast);
        }
    }

    var roomQuantities = document.querySelectorAll('.room-quantity');


    for (const roomQuantity of roomQuantities) {
        if (roomQuantity.classList.contains("inactive")) {
            roomQuantity.onclick = (e) => {
                e.preventDefault();
            }
        }
        roomQuantity.onchange = () => {
            for (const roomQuan of roomQuantities) {
                if (roomQuan.value > 0) {
                    bookBtn.classList.remove("inactive");
                    break;
                }
                else {
                    bookBtn.classList.add("inactive");
                }
            }
        }
    }

    bookBtn.onclick = (e) => {
        if (bookBtn.classList.contains("inactive")) {
            e.preventDefault();
        }
        else {
            console.log(roomQuantities);
            checkIn = checkinForForm;
            checkOut = checkoutForForm;
            var selectedRooms = [];

            var dateCheckIn = document.querySelector("#checkin_date").value;
            var dateCheckOut = document.querySelector("#checkout_date").value;

            var startDate = new Date(dateCheckIn);
            var endDate = new Date(dateCheckOut);

            var distanceDate = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

            // Lặp qua tất cả các cấu trúc để kiểm tra giá trị
            for (var index = 1; index <= 6; index++) { // Đổi số này tùy thuộc vào số lượng cấu trúc
                var roomQuantitySelect = document.querySelector('#quan-' + index);
                var selectedQuantity = parseInt(roomQuantitySelect.value);

                if (selectedQuantity > 0) {
                    // Lấy thông tin cần lưu vào Local Storage từ các phần tử khác
                    var roomInfo = {
                        type: document.querySelector('#room-type-' + index).textContent,
                        bedInfo: document.querySelector('#bed-' + index).textContent,
                        bathInfo: document.querySelector('#bath-' + index).textContent,
                        price: document.querySelector('#price-' + index).textContent,
                        quantity: selectedQuantity
                    };

                    // Thêm thông tin phòng vào mảng
                    selectedRooms.push(roomInfo);
                }
            }

            if (selectedRooms.length > 0 && checkIn != "" && checkOut != "") {
                // Lưu vào Local Storage
                localStorage.setItem('selectedRooms', JSON.stringify(selectedRooms));
                localStorage.setItem('checkin', JSON.stringify({ data: checkIn }));
                localStorage.setItem('checkout', JSON.stringify({ data: checkOut }));
                localStorage.setItem('distance', JSON.stringify({ data: distanceDate }));
                window.location.href = '/Booking/BookingRoom';

                // Hiển thị thông báo hoặc chuyển hướng tới trang khác nếu cần
                alert('Rooms booked successfully!');
            } else if (selectedRooms.length <= 0) {
                toast({
                    title: "Error!",
                    message: "Please choose room quantity.",
                    type: "error",
                    duration: 5000
                });
            }

            else if (checkIn == "" || checkOut == "") {
                toast({
                    title: "Error!",
                    message: "Please choose your check-in and check-out date.",
                    type: "error",
                    duration: 5000
                });
            }
        }
    }
}

const blockInactive = document.querySelectorAll('.block-inactive');


if (arrowLeftBtn) {
    window.onload = () => {
        arrowLeftBtn.onclick = () => {
            counter--;
            if (counter < 1) {
                counter = 7;
            }
            document.getElementById('slide-radio' + counter).checked = true;
        }

        arrowRightBtn.onclick = () => {
            counter++;
            if (counter > 7) {
                counter = 1;
            }
            document.getElementById('slide-radio' + counter).checked = true;
        }
        setInterval(() => {
            document.getElementById('slide-radio' + counter).checked = true;
            counter++;
            if (counter > 7) {
                counter = 1;
            }
        }, 5000);
    }
}

const app = {
    handleEvent: function () {
        const _this = this;
        document.onscroll = function () {
            window.scrollY >= 180 ? navHeight.style.padding = "30px 0" : navHeight.style.padding = "60px 0";
            if (window.scrollY >= 180) {
                navHeight.style.backgroundColor = "rgba(0,0,0,0.5)";
                navHeight.style.backdropFilter = "blur(6px)";
            }
            else {
                navHeight.style.backgroundColor = "transparent";
                navHeight.style.backdropFilter = "blur(0)";
            }
            scrollY >= 620 ? upBtn.style.display = "block" : upBtn.style.display = "none";
        }

        upBtn.onclick = function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    },

    start: function () {
        this.handleEvent();
    }
}

app.start();

if (serviceList) {
    const serviceApp = {
        services: [
            {
                title: 'OUR RESTAURANT',
                name: 'Dining & Drinks',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
                img: '../Images/service1.png',
                order: 1
            },
            {
                title: 'OUR POOL',
                name: 'Swimming Pool',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud.',
                img: '../Images/service2.png',
                order: 2,
            },
        ],

        servicesRender: function () {
            const servicesList = this.services.map((service, index) => {
                const additionalClass = service.order === 2 ? "container-reverse" : "";
                return `
            <div class="container ${additionalClass}">
                <div class="service-img col-6 col-lg-6" style="background-image: url('${service.img}')"></div>
                <div class="service-info col-6 col-lg-6">
                    <div class="service-title">${service.title}</div>
                    <div class="service-name">${service.name}</div>
                    <div class="service-description">
                        ${service.description}
                    </div>
                    <div class="service-detail-btn">Learn more</div>
                </div>
            </div>
            `
            })
            serviceList.innerHTML = servicesList.join("");
        },

        start: function () {
            this.servicesRender();
        }
    }
    serviceApp.start();
}

const clientTemp = [];

function hideForm() {
    roomForm.style.display = "none";
}