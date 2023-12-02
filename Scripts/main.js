
'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const navHeight = $('.site-header');
const upBtn = $('#up-btn');
const arrowLeftBtn = $('.arrow-left');
const arrowRightBtn = $('.arrow-right');

//room
const checkAvailableBtn = $('.avl-btn');
var dateCheck1 = $("#checkin_date");
var dateCheck2 = $("#checkout_date");
const adultsQuantity = $('#adults');
const childrenQuantity = $('#children');

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

    dateCheck1.addEventListener("change", () => {
        var date1Value = new Date(dateCheck1.value);
        dateCheck2.min = dateCheck1.value;
    });
    dateCheck2.addEventListener("change", () => {
        var date2Value = new Date(dateCheck2.value);
        dateCheck1.max = dateCheck2.value;
    });
    checkAvailableBtn.onclick = (e) => {
        e.preventDefault();
        checkList.checkin = dateCheck1.value;
        checkList.checkout = dateCheck2.value;
        checkList.adult = adultsQuantity.value;
        checkList.children = childrenQuantity.value;
    }
    console.log(checkList);
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
                            <h2 class="room-type">${room.type}</h2>
                            <div class="interior">
                                <p class="bed">
                                    <i class="fa-solid fa-bed"></i>
                                    ${room.bedQuantity + " " + room.bedType + " Bed" }
                                </p>
                                <p class="bath">
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
                                <select name="" id="room-quantity">
                                    <option value="1">1 room</option>
                                    <option value="2">2 rooms</option>
                                    <option value="3">3 rooms</option>
                                    <option value="4">4 rooms</option>
                                    <option value="5">5 rooms</option>
                                    <option value="6">6 rooms</option>
                                    <option value="7">7 rooms</option>
                                    <option value="8">8 rooms</option>
                                    <option value="9">9 rooms</option>
                                    <option value="10">10 rooms</option>
                                    <option value="11">11 rooms</option>
                                    <option value="12">12 rooms</option>
                                    <option value="13">13 rooms</option>
                                    <option value="14">14 rooms</option>
                                    <option value="15">15 rooms</option>
                                    <option value="16">16 rooms</option>
                                    <option value="17">17 rooms</option>
                                    <option value="18">18 rooms</option>
                                    <option value="19">19 rooms</option>
                                    <option value="20">20 rooms</option>
                                </select>
                            </div>
                            <div class="book-room">
                                <p class="room-price"><span class="price">${room.price}</span>K/Night</p>
                                <p class="book-btn js-book-btn">Book Now</p>
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

    const bookBtns = $$('.js-book-btn');

    for (const bookBtn of bookBtns) {
        const clientInfo = [];
        bookBtn.onclick = (e) => {
            //roomForm.style.display = "flex";
            //const roomNode = e.target.closest('.room');
            //if (roomNode) {

            //    const typeOfRoom = roomNode.querySelector('.room-type');
            //    const imgPath = roomNode.querySelector('.img-fluid');

            //    const formTitle = roomForm.querySelector('h2')
            //    const formImage = roomForm.querySelector('.room-thumb');
            //    const clientName = roomForm.querySelector('.client-name');
            //    const clientPhoneNumber = roomForm.querySelector('.client-phone-number');
            //    const clientEmail = roomForm.querySelector('.client-email');
            //    const clientCheckIn = roomForm.querySelector('#checkin_booking');
            //    const clientCheckOut = roomForm.querySelector('#checkout_booking');
            //    const clientAdults = roomForm.querySelector('.adults-number');
            //    const clientChildren = roomForm.querySelector('.children-number');

            //    clientName.value = null;
            //    clientPhoneNumber.value = null;
            //    clientEmail.value = null;
            //    clientCheckIn.value = null;
            //    clientCheckOut.value = null;
            //    clientAdults.value = null;
            //    clientChildren.value = null;

            //    formImage.style.background = `url('${imgPath.src.slice(23)}') top center / cover no-repeat`;

            //    submitBtn.onclick = () => {

            //        while (clientInfo.length > 0) {
            //            clientInfo.pop();
            //        }
            //        clientInfo.push(
            //            clientName.value,
            //            clientPhoneNumber.value,
            //            clientEmail.value,
            //            clientCheckIn.value,
            //            clientCheckOut.value,
            //            clientAdults.value,
            //            clientChildren.value
            //        );
            //        var isNull = clientInfo.every((clientValue, index) => {
            //            return clientValue != "";
            //        });
            //        if (isNull) {
            //            hideForm();
            //        }
            //    }

            //    formTitle.textContent = typeOfRoom.textContent;
            //    closeEvents.forEach(closeEvent => {
            //        closeEvent.addEventListener('click', () => {
            //            clientInfo.push(
            //                clientName.value,
            //                clientPhoneNumber.value,
            //                clientEmail.value,
            //                clientCheckIn.value,
            //                clientCheckOut.value,
            //                clientAdults.value,
            //                clientChildren.value
            //            );
            //            while (clientInfo.length > 0) {
            //                clientInfo.pop();
            //            }
            //            hideForm();
            //            const formGroups = bookingForm.querySelectorAll(".form-group");
            //            const formMessages = bookingForm.querySelectorAll(".form-message");

            //            if (formGroups.length > 0) {
            //                formGroups.forEach(formGroup => {
            //                    formGroup.classList.remove('invalid');
            //                })
            //                formMessages.forEach(formMessage => {
            //                    formMessage.innerText = "";
            //                })
            //            }
            //        })
            //    })
            //    roomContainer.addEventListener('click', (e) => {
            //        e.stopPropagation();
            //    });
            //}
            const roomNode = e.target.closest('.room');
            const roomQuantity = roomNode.querySelector('#room-quantity').value;
            const typeOfRoom = roomNode.querySelector('.room-type').innerText;
            const roomPrice = roomNode.querySelector('.price').innerText * roomQuantity;
            const detail = roomNode.querySelector('.bed').innerText;
            const checkIn = dateCheck1.value;
            const checkOut = dateCheck2.value;

            localStorage.setItem('type', JSON.stringify({ data: typeOfRoom }));
            localStorage.setItem('price', JSON.stringify({ data: roomPrice }));
            localStorage.setItem('detail', JSON.stringify({ data: detail }));
            localStorage.setItem('checkin', JSON.stringify({ data: checkIn }));
            localStorage.setItem('checkout', JSON.stringify({ data: checkOut }));
            localStorage.setItem('quantity', JSON.stringify({ data: roomQuantity }));


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

            if (checkIn == "" || checkOut == "") {
                toast({
                    title: "Error!",
                    message: "Please choose your check-in and check-out date.",
                    type: "error",
                    duration: 5000
                });
            }
            else {
                toast({
                    title: "Sucess!",
                    message: "Waiting for reservation form...",
                    type: "success",
                    duration: 5000
                });
                setTimeout(() => {
                    window.location.href = 'bookingroom';
                }, 1500)
            }
        }
    }
}

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
        const serviceContainer = serviceList.querySelector(".container");
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

const clientTemp = [];

function hideForm() {
    roomForm.style.display = "none";
}