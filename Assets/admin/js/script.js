
'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const guestTable = $('.guest-table');
const staffTable = $('.staff-table');

if (guestTable) {
    const guestApp = {
        guests: [
            {
                name: 'Nguyen Van A',
                room: 'Room name',
                phoneNumber: '0987654321',
                age: 40,
                checkIn: '01/01/2023',
                checkOut: '02/01/2023',
            },
            {
                name: 'Nguyen Van A',
                room: 'Room name',
                phoneNumber: '0987654321',
                age: 40,
                checkIn: '01/01/2023',
                checkOut: '02/01/2023',
            },
            {
                name: 'Nguyen Van A',
                room: 'Room name',
                phoneNumber: '0987654321',
                age: 40,
                checkIn: '01/01/2023',
                checkOut: '02/01/2023',
            },
            {
                name: 'Nguyen Van A',
                room: 'Room name',
                phoneNumber: '0987654321',
                age: 40,
                checkIn: '01/01/2023',
                checkOut: '02/01/2023',
            },
            {
                name: 'Nguyen Van A',
                room: 'Room name',
                phoneNumber: '0987654321',
                age: 40,
                checkIn: '01/01/2023',
                checkOut: '02/01/2023',
            },
            {
                name: 'Nguyen Van A',
                room: 'Room name',
                phoneNumber: '0987654321',
                age: 40,
                checkIn: '01/01/2023',
                checkOut: '02/01/2023',
            },
            {
                name: 'Nguyen Van A',
                room: 'Room name',
                phoneNumber: '0987654321',
                age: 40,
                checkIn: '01/01/2023',
                checkOut: '02/01/2023',
            },
            {
                name: 'Nguyen Van A',
                room: 'Room name',
                phoneNumber: '0987654321',
                age: 40,
                checkIn: '01/01/2023',
                checkOut: '02/01/2023',
            },
            {
                name: 'Nguyen Van A',
                room: 'Room name',
                phoneNumber: '0987654321',
                age: 40,
                checkIn: '01/01/2023',
                checkOut: '02/01/2023',
            },
            {
                name: 'Nguyen Van A',
                room: 'Room name',
                phoneNumber: '0987654321',
                age: 40,
                checkIn: '01/01/2023',
                checkOut: '02/01/2023',
            },
            {
                name: 'Nguyen Van A',
                room: 'Room name',
                phoneNumber: '0987654321',
                age: 40,
                checkIn: '01/01/2023',
                checkOut: '02/01/2023',
            },
            {
                name: 'Nguyen Van A',
                room: 'Room name',
                phoneNumber: '0987654321',
                age: 40,
                checkIn: '01/01/2023',
                checkOut: '02/01/2023',
            },
            {
                name: 'Nguyen Van A',
                room: 'Room name',
                phoneNumber: '0987654321',
                age: 40,
                checkIn: '01/01/2023',
                checkOut: '02/01/2023',
            },
        ],
        guestRender: function () {
            const guestslist = this.guests.map((guest, index) => {
                return `
                    <tr>
                        <td>${index+1}</td>
                        <td>${guest.name}</td>
                        <td>${guest.room}</td>
                        <td>${guest.phoneNumber}</td>
                        <td>${guest.age}</td>
                        <td>${guest.checkIn}</td>
                        <td>${guest.checkOut}</td>
                    </tr>
                `
            })
            guestTable.innerHTML = guestslist.join("");
        },

        start: function () {
            this.guestRender();
        }
    }
    guestApp.start();
}

if (staffTable) {
    const staffApp = {
        staffs: [
            {
                name: 'Nguyen Van B',
                indentification: '123456789012',
                phoneNumber: '0987654321',
                birthday: '01/01/2023',
                role: 'Staff'
            },
            {
                name: 'Nguyen Van B',
                indentification: '123456789012',
                phoneNumber: '0987654321',
                birthday: '01/01/2023',
                role: 'Staff'
            },
            {
                name: 'Nguyen Van B',
                indentification: '123456789012',
                phoneNumber: '0987654321',
                birthday: '01/01/2023',
                role: 'Staff'
            },
            {
                name: 'Nguyen Van B',
                indentification: '123456789012',
                phoneNumber: '0987654321',
                birthday: '01/01/2023',
                role: 'Staff'
            },
            {
                name: 'Nguyen Van B',
                indentification: '123456789012',
                phoneNumber: '0987654321',
                birthday: '01/01/2023',
                role: 'Staff'
            },
            {
                name: 'Nguyen Van B',
                indentification: '123456789012',
                phoneNumber: '0987654321',
                birthday: '01/01/2023',
                role: 'Staff'
            },
            {
                name: 'Nguyen Van B',
                indentification: '123456789012',
                phoneNumber: '0987654321',
                birthday: '01/01/2023',
                role: 'Staff'
            },
            {
                name: 'Nguyen Van B',
                indentification: '123456789012',
                phoneNumber: '0987654321',
                birthday: '01/01/2023',
                role: 'Staff'
            },
        ],
        staffRender: function () {
            const staffslist = this.staffs.map((staff, index) => {
                return `
                    <tr>
                        <td>${index+1}</td>
                        <td>${staff.name}</td>
                        <td>${staff.indentification}</td>
                        <td>${staff.phoneNumber}</td>
                        <td>${staff.birthday}</td>
                        <td>${staff.role}</td>
                    </tr>
                `
            })
            staffTable.innerHTML = staffslist.join("");
        },

        start: function () {
            this.staffRender();
        }
    }
    staffApp.start();
}

const familyRoomList = $('.family-room-list');
if (familyRoomList) {
    //const roomApp = {
    //    rooms: [
    //        {
    //            roomStatus: 1,
    //        },
    //        {
    //            roomStatus: 2,
    //        },
    //        {
    //            roomStatus: 3,
    //        },
    //        {
    //            roomStatus: 4,
    //        },
    //        {
    //            roomStatus: 1,
    //        },
    //        {
    //            roomStatus: 2,
    //        },
    //        {
    //            roomStatus: 3,
    //        },
    //        {
    //            roomStatus: 4,
    //        },
    //        {
    //            roomStatus: 1,
    //        },
    //        {
    //            roomStatus: 2,
    //        },
    //        {
    //            roomStatus: 3,
    //        },
    //        {
    //            roomStatus: 4,
    //        },
    //        {
    //            roomStatus: 1,
    //        },
    //        {
    //            roomStatus: 2,
    //        },
    //        {
    //            roomStatus: 3,
    //        },
    //        {
    //            roomStatus: 4,
    //        },
    //    ],

    //    roomRender: function () {
    //        const roomslist = this.rooms.map((room, index) => {
    //            var status = "";
    //            var icon = "";
    //            var statusName = "";
    //            if (room.roomStatus == 1) {
    //                status = "primary";
    //                icon = "minus";
    //                statusName = "OCCUPIED ROOM";
    //            } else if (room.roomStatus == 2) {
    //                status = "success";
    //                icon = "check";
    //                statusName = "AVAILABLE ROOM";
    //            } else if (room.roomStatus == 3) {
    //                status = "danger";
    //                icon = "xmark";
    //                statusName = "ROOM OFF";
    //            } else {
    //                status = "warning";
    //                icon = "exclamation";
    //                statusName = "BOOK IN ADVANCE";
    //            }
    //            return `
    //                    <div class="card border-left-${status} shadow h-100 py-2">
    //                        <div class="room-body">
    //                            <div class="row no-gutters align-items-center">
    //                                <div class="col mr-2">
    //                                    <div class="text-xs font-weight-bold text-${status} text-uppercase mb-1">
    //                                        ${statusName}
    //                                    </div>
    //                                    <div class="h5 mb-0 font-weight-bold text-gray-800">P1${String(index).padStart(2, '0')} </div>
    //                                </div>
    //                                <div class="col-auto">
    //                                    <i class="fa-solid fa-circle-${icon} fa-2x text-gray-300"></i>
    //                                </div>
    //                            </div>
    //                        </div>
    //                    </div>
    //            `
    //        })
    //        familyRoomList.innerHTML = roomslist.join("");
    //    },

    //    start: function () {
    //        this.roomRender();
    //    }
    //}
    //roomApp.start();
    var status = "";
    var icon = "";
    var statusName = "";
    if (room.roomStatus == 1) {
        status = "primary";
        icon = "minus";
        statusName = "OCCUPIED ROOM";
    } else if (room.roomStatus == 2) {
        status = "success";
        icon = "check";
        statusName = "AVAILABLE ROOM";
    } else if (room.roomStatus == 3) {
        status = "danger";
        icon = "xmark";
        statusName = "ROOM OFF";
    }
    const roomBox = `
        <div class="col-xl-3 col-md-6 mb-4 ">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="room-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-${status} text-uppercase mb-1">
                                @Html.DisplayFor(modelItem => item.HienTrang)
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">@Html.DisplayFor(modelItem => item.MaPhong)</div>
                        </div>
                        <div class="col-auto">
                            <i class="fa-solid fa-circle-${icon} fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}