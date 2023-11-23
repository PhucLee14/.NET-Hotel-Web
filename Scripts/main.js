
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
const submitBtn = $('.submit-form-btn');
const closeEvents = $$('.close-btn, .room-form');

var dateBook1 = $("#checkin_booking");
var dateBook2 = $("#checkout_booking");

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

console.log(checkList);

if (arrowLeftBtn) {
    window.onload = () => {
        arrowLeftBtn.onclick = () => {
            counter--;
            if (counter < 1) {
                counter = 7;
            }
            document.getElementById('slide-radio' + counter).checked = true;
            console.log(counter);
        }

        arrowRightBtn.onclick = () => {
            counter++;
            if (counter > 7) {
                counter = 1;
            }
            document.getElementById('slide-radio' + counter).checked = true;
            console.log(counter);
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
        console.log(checkList);
    }
}

if (bookingRoomForm) {
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
                type: 'Single Room',
                price: 100,
                bedQuantity: 1,
                bathQuantity: 1,
                img: '../Images/img_1.jpg',
            },
            {
                type: 'Family Room',
                price: 200,
                bedQuantity: 2,
                bathQuantity: 2,
                img: '../Images/img_2.jpg',
            },
            {
                type: 'President Room',
                price: 500,
                bedQuantity: 4,
                bathQuantity: 2,
                img: '../Images/img_3.jpg',
            },
            {
                type: 'Single Room',
                price: 100,
                bedQuantity: 1,
                bathQuantity: 1,
                img: '../Images/img_1.jpg',
            },
            {
                type: 'Family Room',
                price: 200,
                bedQuantity: 2,
                bathQuantity: 2,
                img: '../Images/img_2.jpg',
            },
            {
                type: 'President Room',
                price: 500,
                bedQuantity: 4,
                bathQuantity: 2,
                img: '../Images/img_3.jpg',
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
                                    ${room.bedQuantity + " Bed"}
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
                            <div class="book-room">
                                <p class="room-price">${"$" + room.price + "/Night"}</p>
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

    //check booking date
    dateBook1.addEventListener("change", () => {
        var date1Value = new Date(dateBook1.value);
        dateBook2.min = dateBook1.value;
    });
    dateBook2.addEventListener("change", () => {
        var date2Value = new Date(dateBook2.value);
        dateBook1.max = dateBook2.value;
    });

    for (const bookBtn of bookBtns) {
        const clientInfo = [];
        bookBtn.onclick = (e) => {
            roomForm.style.display = "flex";
            const roomNode = e.target.closest('.room');
            if (roomNode) {

                const typeOfRoom = roomNode.querySelector('.room-type');
                const imgPath = roomNode.querySelector('.img-fluid');

                const formTitle = roomForm.querySelector('h2')
                const formImage = roomForm.querySelector('.room-thumb');
                const clientName = roomForm.querySelector('.client-name');
                const clientPhoneNumber = roomForm.querySelector('.client-phone-number');
                const clientEmail = roomForm.querySelector('.client-email');
                const clientCheckIn = roomForm.querySelector('#checkin_booking');
                const clientCheckOut = roomForm.querySelector('#checkout_booking');
                const clientAdults = roomForm.querySelector('.adults-number');
                const clientChildren = roomForm.querySelector('.children-number');

                clientName.value = null;
                clientPhoneNumber.value = null;
                clientEmail.value = null;
                clientCheckIn.value = null;
                clientCheckOut.value = null;
                clientAdults.value = null;
                clientChildren.value = null;

                formImage.style.background = `url('${imgPath.src.slice(23)}') top center / cover no-repeat`;

                submitBtn.onclick = () => {

                    while (clientInfo.length > 0) {
                        clientInfo.pop();
                    }
                    clientInfo.push(
                        clientName.value,
                        clientPhoneNumber.value,
                        clientEmail.value,
                        clientCheckIn.value,
                        clientCheckOut.value,
                        clientAdults.value,
                        clientChildren.value
                    );
                    var isNull = clientInfo.every((clientValue, index) => {
                        return clientValue != "";
                    });
                    if (isNull) {
                        hideForm();
                    }
                }

                formTitle.textContent = typeOfRoom.textContent;
                closeEvents.forEach(closeEvent => {
                    closeEvent.addEventListener('click', () => {
                        clientInfo.push(
                            clientName.value,
                            clientPhoneNumber.value,
                            clientEmail.value,
                            clientCheckIn.value,
                            clientCheckOut.value,
                            clientAdults.value,
                            clientChildren.value
                        );
                        while (clientInfo.length > 0) {
                            clientInfo.pop();
                        }
                        hideForm();
                        const formGroups = bookingForm.querySelectorAll(".form-group");
                        const formMessages = bookingForm.querySelectorAll(".form-message");

                        if (formGroups.length > 0) {
                            formGroups.forEach(formGroup => {
                                formGroup.classList.remove('invalid');
                            })
                            formMessages.forEach(formMessage => {
                                formMessage.innerText = "";
                            })
                        }
                    })
                })
                roomContainer.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
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