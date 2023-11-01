const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const serviceList = $(".services-list");
const app = {
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
app.start();