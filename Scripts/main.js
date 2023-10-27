
'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const navHeight = $('.site-header');
const upBtn = $('#up-btn');
const arrowLeftBtn = $('.arrow-left');
const arrowRightBtn = $('.arrow-right');

//room
const roomList = $('.room-list');
const roomForm = $('.room-form');
const closeBtn = $('.close-btn');
const submitBtn = $('.submit-form-btn');

var dateCheck1 = $("#checkin_date");
var dateCheck2 = $("#checkout_date");
var dateBook1 = $("#checkin_booking");
var dateBook2 = $("#checkout_booking");

const bookingForm = $("#booking-form");
var counter = 1;

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

const app = {
    rooms: [
        {
            type: 'Single Room',
            price: 100,
            bedQuantity: 1,
            bathQuantity: 1,
            img:'../Images/img_1.jpg',
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
    render: function () {
        const roomslist = this.rooms.map(( room, index ) => {
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
        this.render();
    }
}
app.start();

const bookBtns = $$('.js-book-btn');
const clientTemp = [];

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
                    roomForm.style.display = "none";
                }
            }

            formTitle.textContent = typeOfRoom.textContent;
            closeBtn.onclick = () => {
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
                roomForm.style.display = "none";
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
            }
        }
    }
}
//check available room
dateCheck1.addEventListener("change", () => {
    var date1Value = new Date(dateCheck1.value);
    dateCheck2.min = dateCheck1.value;
});
dateCheck2.addEventListener("change", () => {
    var date2Value = new Date(dateCheck2.value);
    dateCheck1.max = dateCheck2.value;
});

//check booking date
dateBook1.addEventListener("change", () => {
    var date1Value = new Date(dateBook1.value);
    dateBook2.min = dateBook1.value;
});
dateBook2.addEventListener("change", () => {
    var date2Value = new Date(dateBook2.value);
    dateBook1.max = dateBook2.value;
});


