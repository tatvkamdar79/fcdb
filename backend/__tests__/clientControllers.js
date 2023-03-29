const app = require("../temp");
const signup = require("../controllers/client_controller")
const supertest = require('supertest')
const api = supertest(app);
const Client = require("../models/clientSchema");

const mockRequest = () => {
  return {
    email:"test@999",password:"12345",name:"test"
  };
};


describe("Testing api/client/signup", () => {
  
  test("should return 200" , async () => {

    const req = mockRequest();
    const obj = await api.post('/api/client/signup').send(req).set('Content-Type', "application/x-www-form-urlencoded");
    expect(obj.status).toEqual(200);

  },10000);

  test("should return 400" , async () => {

    const req = mockRequest();
    const obj = await api.post('/api/client/signup').send({email:"test@99"}).set('Content-Type', "application/x-www-form-urlencoded");
    expect(obj.status).toEqual(400);

  },10000);

  test("should return 500" , async () => {

    const req = mockRequest();
    const obj = await api.post('/api/client/signup').send({email:"test@example3.com"}).set('Content-Type', "application/x-www-form-urlencoded");
    expect(obj.status).toEqual(500);

  },10000);


  afterAll(async () => {
    await Client.deleteOne({email:mockRequest().email});
  })


})
