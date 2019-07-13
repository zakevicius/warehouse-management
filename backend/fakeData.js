const faker = require('faker');

class Order {
    constructor(id, date, sender, receiver, truck, trailer, qnt, bruto, description, declarations) {
        this.id = id;
        this.date = date;
        this.sender = sender;
        this.receiver = receiver
        this.truck = truck;
        this.trailer = trailer;
        this.qnt = qnt;
        this.bruto = bruto;
        this.description = description;
        this.declarations = declarations;
    }
}

const orders = [];

for (let i = 0; i < 10; i++) {
    let id = i;
    let randomDate = faker.date.past(1, '2019-07-13');
    let month = randomDate.getMonth() + 1;
    let day = randomDate.getDate();
    let date = `${randomDate.getFullYear()}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
    let sender = faker.company.companyName();
    let receiver = faker.company.companyName();
    let truck = `ABC ${i}${i}${i}`;
    let trailer = `DE ${i} ${i} `;
    let qnt = faker.random.number({ min: 1, max: 33 });
    let bruto = faker.random.number({ min: 10, max: 20000, precision: 1 });
    let description = faker.lorem.sentence();
    let declarations = "EX";

    orders.push(new Order(id, date, sender, receiver, truck, trailer, qnt, bruto, description, declarations));
}

class Client {
    constructor(id, firstName, lastName, phone, email) {
        this.id = id;
        this.firstName = firstName
        this.lastName = lastName
        this.phone = phone;
        this.email = email;
    }
}

const clients = [];

for (let i = 0; i < 5; i++) {
    let id = i;
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let phone = faker.phone.phoneNumber();
    let email = faker.internet.email();

    clients.push(new Client(id, firstName, lastName, phone, email));
}

module.exports = [orders, clients];