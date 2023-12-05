
'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const navHeight = $('.site-header');
const upBtn = $('#up-btn');
const arrowLeftBtn = $('.arrow-left');
const arrowRightBtn = $('.arrow-right');

//room
const checkAvailableBtn = $('.avl-btn');
var dateCheckIn = $("#checkin_date");
var dateCheckOut = $("#checkout_date");
const adultsQuantity = $('#adults');
const childrenQuantity = $('#children');
const bookBtn = $('.js-book-btn');

const roomContainer = $('.room-container');
const roomList = $('.room-list');
const roomForm = $('.room-form');
const closeBtn = $('.close-btn');
const submitBtn = $('.submit-btn');
const closeEvents = $$('.close-btn, .room-form');

const serviceList = $(".services-list");

const bookingForm = $("#booking-form");

const bookingRoomForm = $(".booking-room-form");
var counter = 1;
const checkList = {
    checkin: '',
    checkout: '',
    adult: 1,
    children: 1,
};
var checkinForForm = '';
var checkoutForForm = '';

if (roomList) {
    const roomApp = {
        rooms: [
            {
                type: 'Family Room',
                price: 750,
                bedQuantity: 2,
                bedType: 'Twin',
                bathQuantity: 1,
                img: '../Images/family.jpg',
            },
            {
                type: 'Standard Room',
                price: 750,
                bedQuantity: 1,
                bedType: 'Twin',
                bathQuantity: 2,
                img: '../Images/standard.jpg',
            },
            {
                type: 'Superior Room',
                price: 900,
                bedQuantity: 2,
                bedType: 'Single',
                bathQuantity: 2,
                img: '../Images/superior.jpg',
            },
            {
                type: 'Deluxe Room',
                price: 900,
                bedQuantity: 1,
                bedType: 'Twin',
                bathQuantity: 1,
                img: '../Images/deluxe.jpg',
            },
            {
                type: 'Suite Room',
                price: 1250,
                bedQuantity: 1,
                bedType: 'Big-Twin',
                bathQuantity: 2,
                img: '../Images/suite.jpg',
            },
            {
                type: 'Family Suite Room',
                price: 1500,
                bedQuantity: 2,
                bedType: 'Twin',
                bathQuantity: 2,
                img: '../Images/family-suite.jpg',
            }
        ],
        roomRender: function () {
            const roomslist = this.rooms.map((room, index) => {
                return `
                <div class="col-md-6 col-lg-4 mb-5" data-aos="fade-up">
                    <div class="room">
                        <figure class="img-wrap">
                            <img src="${room.img}" alt="Free website template" class="img-fluid mb-3">
                        </figure>
                        <div class="p-3 text-center room-info">
                            <div class="book-room">
                                <h2 class="room-type" id="room-type-${index + 1}">${room.type}</h2>
                                <p class="room-price"><span class="price" id="price-${index + 1}">${room.price}</span>K/Night</p>
                            </div>
                            <div class="interior">
                                <p class="bed" id="bed-${index + 1}">
                                    <i class="fa-solid fa-bed"></i>
                                    ${room.bedQuantity + " " + room.bedType + " Bed"}
                                </p>
                                <p class="bath" id="bath-${index + 1}">
                                    <i class="fa-solid fa-bath"></i>
                                    ${room.bathQuantity + " Bath"}
                                </p>
                                <p class="wifi">
                                    <i class="fa-solid fa-wifi"></i>
                                    Wifi
                                </p>
                            </div>
                            <div class="book-room-title">
                                <span>
                                    <i class="fa-regular fa-house-user"></i>
                                    Room quantity
                                </span>
                                <div style="position: relative; width: 100px; height: 100%;">
                                    <select name="" id="quan-${index + 1}" class="room-quantity inactive">
                                        <option value="0">0 room</option>
                                        <option value="1">1 room</option>
                                        <option value="2">2 rooms</option>
                                        <option value="3">3 rooms</option>
                                        <option value="4">4 rooms</option>
                                        <option value="5">5 rooms</option>
                                        <option value="6">6 rooms</option>
                                    </select>
                                    <div class="block-inactive""></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            })
            roomList.innerHTML = roomslist.join("");
        },

        start: function () {
            this.roomRender();
        }
    }
    roomApp.start();

    //for (const bookBtn of bookBtns) {
    //    const clientInfo = [];
    //    bookBtn.onclick = (e) => {
    //        //roomForm.style.display = "flex";
    //        //const roomNode = e.target.closest('.room');
    //        //if (roomNode) {

    //        //    const typeOfRoom = roomNode.querySelector('.room-type');
    //        //    const imgPath = roomNode.querySelector('.img-fluid');

    //        //    const formTitle = roomForm.querySelector('h2')
    //        //    const formImage = roomForm.querySelector('.room-thumb');
    //        //    const clientName = roomForm.querySelector('.client-name');
    //        //    const clientPhoneNumber = roomForm.querySelector('.client-phone-number');
    //        //    const clientEmail = roomForm.querySelector('.client-email');
    //        //    const clientCheckIn = roomForm.querySelector('#checkin_booking');
    //        //    const clientCheckOut = roomForm.querySelector('#checkout_booking');
    //        //    const clientAdults = roomForm.querySelector('.adults-number');
    //        //    const clientChildren = roomForm.querySelector('.children-number');

    //        //    clientName.value = null;
    //        //    clientPhoneNumber.value = null;
    //        //    clientEmail.value = null;
    //        //    clientCheckIn.value = null;
    //        //    clientCheckOut.value = null;
    //        //    clientAdults.value = null;
    //        //    clientChildren.value = null;

    //        //    formImage.style.background = `url('${imgPath.src.slice(23)}') top center / cover no-repeat`;

    //        //    submitBtn.onclick = () => {

    //        //        while (clientInfo.length > 0) {
    //        //            clientInfo.pop();
    //        //        }
    //        //        clientInfo.push(
    //        //            clientName.value,
    //        //            clientPhoneNumber.value,
    //        //            clientEmail.value,
    //        //            clientCheckIn.value,
    //        //            clientCheckOut.value,
    //        //            clientAdults.value,
    //        //            clientChildren.value
    //        //        );
    //        //        var isNull = clientInfo.every((clientValue, index) => {
    //        //            return clientValue != "";
    //        //        });
    //        //        if (isNull) {
    //        //            hideForm();
    //        //        }
    //        //    }

    //        //    formTitle.textContent = typeOfRoom.textContent;
    //        //    closeEvents.forEach(closeEvent => {
    //        //        closeEvent.addEventListener('click', () => {
    //        //            clientInfo.push(
    //        //                clientName.value,
    //        //                clientPhoneNumber.value,
    //        //                clientEmail.value,
    //        //                clientCheckIn.value,
    //        //                clientCheckOut.value,
    //        //                clientAdults.value,
    //        //                clientChildren.value
    //        //            );
    //        //            while (clientInfo.length > 0) {
    //        //                clientInfo.pop();
    //        //            }
    //        //            hideForm();
    //        //            const formGroups = bookingForm.querySelectorAll(".form-group");
    //        //            const formMessages = bookingForm.querySelectorAll(".form-message");

    //        //            if (formGroups.length > 0) {
    //        //                formGroups.forEach(formGroup => {
    //        //                    formGroup.classList.remove('invalid');
    //        //                })
    //        //                formMessages.forEach(formMessage => {
    //        //                    formMessage.innerText = "";
    //        //                })
    //        //            }
    //        //        })
    //        //    })
    //        //    roomContainer.addEventListener('click', (e) => {
    //        //        e.stopPropagation();
    //        //    });
    //        //}
    //        const roomNode = e.target.closest('.room');
    //        const roomQuantity = roomNode.querySelector('#room-quantity').value;
    //        const typeOfRoom = roomNode.querySelector('.room-type').innerText;
    //        const roomPrice = roomNode.querySelector('.price').innerText * roomQuantity;
    //        const detail = roomNode.querySelector('.bed').innerText;
    //        const checkIn = checkinForForm;
    //        const checkOut = checkoutForForm;

    //        localStorage.setItem('type', JSON.stringify({ data: typeOfRoom }));
    //        localStorage.setItem('price', JSON.stringify({ data: roomPrice }));
    //        localStorage.setItem('detail', JSON.stringify({ data: detail }));
    //        localStorage.setItem('checkin', JSON.stringify({ data: checkIn }));
    //        localStorage.setItem('checkout', JSON.stringify({ data: checkOut }));
    //        localStorage.setItem('quantity', JSON.stringify({ data: roomQuantity }));


    //        function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    //            const main = document.getElementById("toast");
    //            if (main) {
    //                const toast = document.createElement("div");

    //                // Auto remove toast
    //                const autoRemoveId = setTimeout(function () {
    //                    main.removeChild(toast);
    //                }, duration + 1000);

    //                // Remove toast when clicked
    //                toast.onclick = function (e) {
    //                    if (e.target.closest(".toast__close")) {
    //                        main.removeChild(toast);
    //                        clearTimeout(autoRemoveId);
    //                    }
    //                };

    //                const icons = {
    //                    success: "fas fa-check-circle",
    //                    info: "fas fa-info-circle",
    //                    warning: "fas fa-exclamation-circle",
    //                    error: "fas fa-exclamation-circle"
    //                };
    //                const icon = icons[type];
    //                const delay = (duration / 1000).toFixed(2);

    //                toast.classList.add("toast", `toast--${type}`);
    //                toast.style.animation = `slideInLeft ease .3s, fadeOut linear 10s ${delay}s forwards`;
    //                toast.style.display = 'flex';

    //                toast.innerHTML = `
    //                <div class="toast__icon">
    //                    <i class="${icon}"></i>
    //                </div>
    //                <div class="toast__body">
    //                    <h3 class="toast__title">${title}</h3>
    //                    <p class="toast__msg">${message}</p>
    //                </div>
    //                <div class="toast__close">
    //                    <i class="fas fa-times"></i>
    //                </div>
    //            `;
    //                main.appendChild(toast);
    //            }
    //        }

    //        if (checkIn == "" || checkOut == "") {
    //            toast({
    //                title: "Error!",
    //                message: "Please choose your check-in and check-out date.",
    //                type: "error",
    //                duration: 5000
    //            });
    //        }
    //        else {
    //            toast({
    //                title: "Sucess!",
    //                message: "Waiting for reservation form...",
    //                type: "success",
    //                duration: 5000
    //            });
    //            setTimeout(() => {
    //                window.location.href = 'bookingroom';
    //            }, 1500)
    //        }
    //    }
    //}
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

    var roomQuantities = $$('.room-quantity');


    for (const roomQuantity of roomQuantities) {
        if (roomQuantity.classList.contains("inactive")) {
            roomQuantity.onclick = (e) => {
                e.preventDefault();
            }
        }
        roomQuantity.onchange = () => {
            if (roomQuantity.value > 0) {
                bookBtn.classList.remove("inactive");
            }
            else {
                bookBtn.classList.add("inactive");
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
                window.location.href = 'bookingroom';

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
            //else {
            //    toast({
            //        title: "Sucess!",
            //        message: "Waiting for reservation form...",
            //        type: "success",
            //        duration: 5000
            //    });
            //    setTimeout(() => {
            //        window.location.href = 'bookingroom';
            //    }, 1500)
            //}
        }
    }

    //else {
    //    bookBtn.addEventListener('click', function () {
    //}

}

const blockInactive = $$('.block-inactive');


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

if (checkAvailableBtn) {

    dateCheckIn.addEventListener("change", () => {
        var date = new Date(dateCheckIn.value);
        date.setDate(date.getDate() + 1);
        var formatDate = date.toISOString().split('T')[0];
        dateCheckOut.min = formatDate;

        var checkInValue = dateCheckIn.value;

        // Nếu date1 có giá trị
        if (checkInValue) {
            // Tạo đối tượng Date từ giá trị ngày của date1
            var date1 = new Date(checkInValue);

            // Tăng ngày lên 1
            date1.setDate(date1.getDate() + 1);

            // Format ngày thành chuỗi 'YYYY-MM-DD' cho date2
            var formattedDate = date1.toISOString().split('T')[0];

            // Gán giá trị cho date2
            dateCheckOut.value = formattedDate;
        } else {
            // Nếu date1 không có giá trị, đặt giá trị của date2 thành rỗng
            dateCheckOut.value = '';
        }
    });
    checkAvailableBtn.onclick = (e) => {
        e.preventDefault();
        checkList.checkin = dateCheckIn.value;
        checkList.checkout = dateCheckOut.value;

        checkinForForm = dateCheckIn.value;
        checkoutForForm = dateCheckOut.value;
        if (checkinForForm != "" && checkoutForForm != "") {
            //bookBtn.onclick = (e) => {
            //    e.preventDefault();
            //}
            for (const block of blockInactive) {
                block.style.display = "none";
            }
            for (const roomQuantity of roomQuantities) {
                roomQuantity.style.opacity = "1";
            }
        }
        else if (checkinForForm == "" || checkoutForForm == "") {
                //bookBtn.onclick = (e) => {
                //    e.preventDefault();
                //}
                for (const block of blockInactive) {
                    block.style.display = "block";
                    if (block.style.display == "block") {
                        bookBtn.classList.add("inactive");
                    }
                }
                for (const roomQuantity of roomQuantities) {
                    roomQuantity.style.opacity = ".3";
                }
            }
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