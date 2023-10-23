
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

var date1 = document.getElementById("checkin_date");
var date2 = document.getElementById("checkout_date");
var counter = 1;

document.onscroll = function () {
    window.scrollY >= 180 ? navHeight.style.padding = "30px 0" : navHeight.style.padding = "60px 0";
    /*window.scrollY >= 620 ? navHeight.style.backgroundColor = "rgba(0,0,0,0.76)" : navHeight.style.backgroundColor = "transparent";*/
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

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
upBtn.addEventListener("click", backToTop);

date1.addEventListener("change", function () {
    var date1Value = new Date(date1.value);

    date2.min = date1.value;
});

window.onload = function () {
    arrowLeftBtn.onclick = function () {
        counter--;
        if (counter < 1) {
            counter = 7;
        }
        document.getElementById('slide-radio' + counter).checked = true;
        console.log(counter);
    }

    arrowRightBtn.onclick = function () {
        counter++;
        if (counter > 7) {
            counter = 1;
        }
        document.getElementById('slide-radio' + counter).checked = true;
        console.log(counter);
    }
    setInterval(function () {
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
        const htmls = this.rooms.map(( room, index ) => {
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
        roomList.innerHTML = htmls.join("");
    },
    
    openForm: function () {
        roomForm.style.display = "block";
    },

    handleEvent: function () {
        const _this = this;
        
    },

    start: function () {
        this.handleEvent();
        this.render();
    }
}
app.start();


const bookBtns = document.querySelectorAll('.js-book-btn');
closeBtn.onclick = function () {
    roomForm.style.display = "none";
}

function showForm() {
    roomForm.style.display = "flex";
}

for (const bookBtn of bookBtns) {
    bookBtn.addEventListener('click', showForm);
}