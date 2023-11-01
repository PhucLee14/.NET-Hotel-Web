const rooms = [
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
];

const roomRender = function () {
    const roomslist = rooms.map((room, index) => {
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
}

start = function () {
    roomRender();
}
start();