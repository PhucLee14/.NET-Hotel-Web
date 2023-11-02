
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
                        <td>${index}</td>
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
                        <td>${index}</td>
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