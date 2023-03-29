const Client = require("../models/clientSchema");
const app = require("../temp");

describe("Client Schema validation", () => {

    const obj1 = {name:"test",email:"test@example4.com"};

    afterAll(async () => {
        await Client.deleteOne({email:obj1.email});
    })

    test("Inserting a document in client collection" ,async () => {
        const obj = await Client.create(obj1);
        expect(obj.name).toBe(obj1.name);
        expect(obj.email).toBe(obj1.email);
        expect(obj.id).toBeDefined();


    },10000)
})