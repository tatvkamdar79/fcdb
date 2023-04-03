const app = require("../temp");
const supertest = require("supertest");
const api = supertest(app);
const Ads = require("../models/adSchema");
const validateAdSchema = require("../validators/adSchema");
const joi = require("joi");
const { connectToDatabase } = require("../config/mongoose");

const mockRequest = () => {
  return {
    email: "test@gmail.com",
    password: "12345",
    name: "test",
  };
};

describe("Testing /api/client", () => {
  let clientJWT;
  let freelancerJWT;

  beforeAll(async () => {
    await connectToDatabase();

    let obj = await api.post(process.env.CLIENT_SIGNIN_URL).send({
      email: process.env.TEST_CLIENT_EMAIL,
      password: process.env.TEST_CLIENT_PASSWORD,
    });
    let response = JSON.parse(obj.text);
    expect(obj.statusCode).toBe(200);
    clientJWT = response.data.token;

    obj = await api.post(process.env.FREELANCER_SIGNIN_URL).send({
      email: process.env.TEST_FREELANCER_EMAIL,
      password: process.env.TEST_FREELANCER_PASSWORD,
    });
    response = JSON.parse(obj.text);
    expect(obj.statusCode).toBe(200);
    freelancerJWT = response.data.token;
  });

  test("should return 200", async () => {
    // const req = mockRequest();
    // const obj = await api
    //   .post("/api/client/signup")
    //   .send(req)
    //   .set("Content-Type", "application/x-www-form-urlencoded");
    // expect(obj.status).toEqual(200);
  }, 10000);

  test("should return 400", async () => {
    const req = mockRequest();
    const obj = await api
      .post("/api/client/signup")
      .send({ email: "test@99" })
      .set("Content-Type", "application/x-www-form-urlencoded");
    expect(obj.status).toEqual(400);
  }, 10000);

  // test("should return 500" , async () => {

  //   const req = mockRequest();
  //   const obj = await api.post('/api/client/signup').send({email:"test@example3.com"}).set('Content-Type', "application/x-www-form-urlencoded");
  //   expect(obj.status).toEqual(500);

  // },10000);
});
