'use strict';

const guestTable = document.querySelector('.guest-table');
const staffTable = document.querySelector('.staff-table');
const addRoomBtn = document.querySelector('#add-room-btn');
const addServiceBtn = document.querySelector('#add-service-btn');
const addRoomForm = document.querySelector('.add-room-form');
const addServiceForm = document.querySelector('.add-service-form');
const submitBtn = document.querySelector('.submit-form-btn');
const submitRoom = document.querySelector('.submit-room');
const submitService = document.querySelector('.submit-service');
const closeEvents = document.querySelectorAll('.close-btn, .room-form');
const roomContainer = document.querySelector('.room-container');
const serviceContainer = document.querySelector('.service-container');
const roomChosen = document.querySelector('.room-chosen');
const serviceChosen = document.querySelector('.service-chosen');

const registrationPhoneNumber = document.getElementById("phone-number");
var registraionDateCheckIn = document.getElementById("checkIn");
var registraionDateCheckOut = document.getElementById("checkOut");

//Responsive
const searchDropDown = document.querySelector("#searchDropdown");
const searchForm = document.querySelector(".search-form");

console.log(addRoomBtn);

function hideForm() {
    quantityFlag++;
    if (addRoomForm)
        addRoomForm.style.display = "none";
    if (addServiceForm)
        addServiceForm.style.display = "none";
}

var quantityFlag = 0;
if (addRoomForm) {
    const roomInfor = [];
    if (!registrationPhoneNumber.value || !registraionDateCheckIn.value) {
        addRoomBtn.style.opacity = "0.3";
        addRoomBtn.style.cursor = "default";
    }
    registrationPhoneNumber.onchange = () => {
        if (registrationPhoneNumber.value != "" && registraionDateCheckIn.value != "") {
            addRoomBtn.style.opacity = "1";
            addRoomBtn.style.cursor = "pointer";
        }
        else if (registrationPhoneNumber.value == "") {
            addRoomBtn.style.opacity = "0.3";
            addRoomBtn.style.cursor = "default";
        }
    }
    addRoomBtn.onclick = (e) => {
        if (!registrationPhoneNumber.value || !registraionDateCheckIn.value) {
            e.preventDefault();
            console.log("Please enter phone number and check-in date before adding room.");
        }
        else {
            console.log(addRoomForm);
            addRoomForm.style.display = "flex";

            const roomID = addRoomForm.querySelector('.room-id')
            const roomNumber = addRoomForm.querySelector('.room-number');
            const clienQuantity = addRoomForm.querySelector('.clien-quantity');

            roomID.value = null;
            roomNumber.value = null;
            clienQuantity.value = 0;

            var blockIndexes = [];
            submitRoom.onclick = () => {
                while (roomInfor.length > 0) {
                    roomInfor.pop();
                }
                roomInfor.push(
                    roomID.value,
                    roomNumber.value,
                    clienQuantity.value
                );
                var isNull = roomInfor.every((clientValue, index) => {
                    return clientValue != "";
                });
                if (isNull) {
                    $.ajax({
                        url: 'AddBookRoom',
                        type: 'POST',
                        data: {
                            maPhong: roomNumber.value,
                            soNguoiO: clienQuantity.value
                        },
                    });
                    var newBlock = document.createElement('tr');

                    var roomIDValue = document.createElement('td');
                    var roomNumberValue = document.createElement('td');
                    var clientQuantityValue = document.createElement('td');

                    roomIDValue.innerHTML = roomID.value.trim();
                    roomNumberValue.innerHTML = roomNumber.value.trim();
                    clientQuantityValue.innerHTML = clienQuantity.value.trim();

                    newBlock.className = 'roomBlock';
                    var deleteBtn = document.createElement('td');
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.innerHTML = 'Delete';

                    var newBlockIndex = blockIndexes.length;
                    blockIndexes.push(newBlockIndex);

                    newBlock.appendChild(roomIDValue);
                    newBlock.appendChild(roomNumberValue);
                    newBlock.appendChild(clientQuantityValue);
                    newBlock.appendChild(deleteBtn);

                    deleteBtn.onclick = () => {
                        quantityFlag--;
                        var i = blockIndexes.indexOf(newBlockIndex);
                        if (i !== -1) {
                            blockIndexes.splice(i, 1);
                        }
                        roomChosen.removeChild(newBlock);
                        $.ajax({
                            url: 'GetMaPhongByIndex',
                            type: 'GET',
                            data: { index: i },
                            success: function (MaPhong) {
                                if (MaPhong) {
                                    $.ajax({
                                        url: 'DeleteBookRoom',
                                        type: 'POST',
                                        data: { maPhong: MaPhong.maPhong },
                                        success: function (response) {
                                            if (response.success) {
                                                console.log('Phòng đã được xóa thành công.');
                                            } else {
                                                console.log('Không thể xóa phòng.');
                                            }
                                        },
                                        error: function () {
                                            console.log('Lỗi khi gửi yêu cầu xóa phòng.');
                                        }
                                    });
                                }
                                else {
                                    console.log('Mã phòng không hợp lệ.');
                                }
                            },
                            error: function () {
                                console.log('Lỗi khi gửi yêu cầu lấy mã phòng.');
                            }
                        });
                        console.log(blockIndexes.length + "check" + quantityFlag);
                        if (quantityFlag == 0) {
                            registraionDateCheckIn.style.opacity = "1";
                            registraionDateCheckOut.style.opacity = "1";
                        }
                        registraionDateCheckIn.onclick = (e) => {
                            if (quantityFlag == 0) {
                                e.preventDefault = false;
                            }
                            else {
                                e.preventDefault();
                            }
                        }
                    }

                    hideForm();

                    roomChosen.appendChild(newBlock);
                    var checkChildBlock = roomChosen.classList.contains("roomBlock");
                    if (checkChildBlock) {
                        console.log("Ton tai")
                    }
                    else {
                        console.log(checkChildBlock)
                    }
                }
                registraionDateCheckIn.style.opacity = "0.3";
                registraionDateCheckOut.style.opacity = "0.3";
                registraionDateCheckIn.onclick = (e) => {
                        e.preventDefault(); 
                }
                registraionDateCheckOut.onclick = (e) => {
                    if (blockIndexes.length > 0) {
                        registraionDateCheckOut.style.opacity = "0.3";
                        e.preventDefault();
                    }
                    else {
                        registraionDateCheckOut.style.opacity = "1";
                    }
                }
            }
            var roomBlockQuantity = document.querySelectorAll(".roomBlock");

            closeEvents.forEach(closeEvent => {
                closeEvent.addEventListener('click', () => {
                    roomInfor.push(
                        roomID.value,
                        roomNumber.value,
                        clienQuantity.value
                    );
                    hideForm();
                })
            })
            roomContainer.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        //}
    }
}
function addServiceBlock(serviceInfo) {
    const newBlock = document.createElement('tr');
    newBlock.className = 'serviceBlock';

    var serviceNameValue = document.createElement('td');
    var serviceQuantityValue = document.createElement('td');

    serviceNameValue.innerHTML = serviceInfo.value;
    serviceQuantityValue.innerHTML = serviceInfo.count;

    newBlock.setAttribute('data-index', serviceInfo.index);

    const deleteBtn = document.createElement('td');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = 'Delete';

    newBlock.appendChild(serviceNameValue);
    newBlock.appendChild(serviceQuantityValue);
    newBlock.appendChild(deleteBtn);

    serviceChosen.appendChild(newBlock);

    deleteBtn.onclick = () => {
        const indexToDelete = parseInt(newBlock.getAttribute('data-index'));

        if (!isNaN(indexToDelete)) {
            serviceChosen.removeChild(newBlock);
            serviceInfor.splice(indexToDelete, 1);

            $.ajax({
                url: '/RegistrationForm/GetMaDichVuByIndex',
                type: 'GET',
                data: { index: indexToDelete },
                success: function (DichVu) {
                    if (DichVu) {
                        $.ajax({
                            url: '/RegistrationForm/DeleteService',
                            type: 'POST',
                            data: { maDichVu: DichVu.maDichVu },
                            success: function (data) {
                                if (data.success) {
                                    console.log('Dịch vụ đã được xóa thành công.');
                                } else {
                                    console.log('Không thể xóa dịch vụ.');
                                }
                            },
                            error: function () {
                                console.log('Lỗi khi gửi yêu cầu xóa dịch vụ.');
                            }
                        });
                    }
                    else {
                        console.log('Mã dịch vụ không hợp lệ.');
                    }
                },
                error: function () {
                    console.log('Lỗi khi gửi yêu cầu lấy mã dịch vụ.');
                }
            });
        }
    };
}

function resetView(serviceInfor) {
    serviceChosen.innerHTML = `
        <tr>
                    <th class="col-md-5">
                        Service Name
                    </th>
                    <th class="col-md-5">
                        Service Quantity
                    </th>
                    <th class="col-md-2">

                    </th>
                </tr>
    `;

    for (let i = 0; i < serviceInfor.length; i++) {
        const newBlock = document.createElement('tr');
        newBlock.className = 'serviceBlock';

        var serviceNameValue = document.createElement('td');
        var serviceQuantityValue = document.createElement('td');

        serviceNameValue.innerHTML = serviceInfor[i].value;
        serviceQuantityValue.innerHTML = serviceInfor[i].count;

        newBlock.setAttribute('data-index', i);

        const deleteBtn = document.createElement('td');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = 'Delete';

        newBlock.appendChild(serviceNameValue);
        newBlock.appendChild(serviceQuantityValue);
        newBlock.appendChild(deleteBtn);

        serviceChosen.appendChild(newBlock);

        hideForm();

        deleteBtn.onclick = () => {
            const indexToDelete = parseInt(newBlock.getAttribute('data-index'));

            if (!isNaN(indexToDelete)) {
                serviceChosen.removeChild(newBlock);
                serviceInfor.splice(indexToDelete, 1);
                $.ajax({
                    url: '/RegistrationForm/GetMaDichVuByIndex',
                    type: 'GET',
                    data: { index: indexToDelete },
                    success: function (DichVu) {
                        if (DichVu) {
                            $.ajax({
                                url: '/RegistrationForm/DeleteService',
                                type: 'POST',
                                data: { maDichVu: DichVu.maDichVu },
                                success: function (data) {
                                    if (data.success) {
                                        console.log('Dịch vụ đã được xóa thành công.');
                                        resetView(serviceInfor);
                                    } else {
                                        console.log('Không thể xóa dịch vụ.');
                                    }
                                },
                                error: function () {
                                    console.log('Lỗi khi gửi yêu cầu xóa dịch vụ.');
                                }
                            });
                        }
                        else {
                            console.log('Mã dịch vụ không hợp lệ.');
                        }
                    },
                    error: function () {
                        console.log('Lỗi khi gửi yêu cầu lấy mã dịch vụ.');
                    }
                });
            }
        }
    }
}

if (addServiceForm) {
    const serviceInfor = [];

    addServiceBtn.onclick = () => {
        addServiceForm.style.display = "flex";

        const serviceName = addServiceForm.querySelector('.service-name')
        const serviceQuantity = addServiceForm.querySelector('.service-quantity');

        serviceName.value = null;
        serviceQuantity.value = null;

        submitService.onclick = () => {
            $.ajax({
                url: '/RegistrationForm/AddService',
                type: 'POST',
                data: {
                    maDichVu: serviceName.value,
                    soLuong: serviceQuantity.value
                },
                success: function (data) {
                    if (data) {
                        console.log("list service: ", data);
                    }
                }
            });

            var existingService = serviceInfor.find((service) => service.value === serviceName.value.trim());

            if (existingService) {
                existingService.count += parseInt(serviceQuantity.value.trim()) || 0;
            } else {
                serviceInfor.push({
                    value: serviceName.value.trim(),
                    count: parseInt(serviceQuantity.value.trim()) || 0,
                });
            }
            resetView(serviceInfor);
        };


        closeEvents.forEach(closeEvent => {
            closeEvent.addEventListener('click', () => {
                hideForm();
            });
        });

        serviceContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}


//------------
if (searchDropDown) {
    searchDropDown.onclick = () => {
        searchDropDown.classList.toggle("show-searchbox");
        if (searchDropDown.classList.contains("show-searchbox")) {
            searchForm.style.display = "block";
        }
        else {
            searchForm.style.display = "none";
        }
    }
}
