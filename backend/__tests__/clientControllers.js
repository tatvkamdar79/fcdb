const app = require("../temp");
const supertest = require("supertest");
const api = supertest(app);
const Client = require("../models/clientSchema");
const { connectToDatabase } = require("../config/mongoose");
const jsonWebToken = require("jsonwebtoken");
const utils = require("../utils/response");

describe("Testing /api/client", () => {
  const url = "/api/client/";
  const validClient = {
    email: "test@gmail.com",
    password: "12345",
    name: "test",
  };
  const invalidClient = {
    email: "teeadt",
    password: "12345",
    name: "test",
  };
  let clientJWT;

  beforeAll(async () => {
    await connectToDatabase();
  });

  describe("Testing /signup", () => {
    test("should return 200", async () => {
      const obj = await api
        .post("/api/client/signup")
        .send(validClient)
        .set("Content-Type", "application/x-www-form-urlencoded");
      expect(obj.status).toEqual(200);
    }, 10000);

    test("should return 400", async () => {
      const obj = await api
        .post("/api/client/signup")
        .send(invalidClient)
        .set("Content-Type", "application/x-www-form-urlencoded");
      expect(obj.status).toEqual(400);
    }, 10000);

    test("should return 400", async () => {
      const obj = await api
        .post("/api/client/signup")
        .send(validClient)
        .set("Content-Type", "application/x-www-form-urlencoded");
      const response = JSON.parse(obj.text);
      expect(obj.status).toEqual(400);
      expect(response.message).toEqual("Failed to create, User already exists");
    }, 10000);

    afterAll(async () => {
      await Client.deleteOne({ email: validClient.email });
    });
  });

  describe("Testing /signin", () => {
    test("should return 200", async () => {
      const obj = await api.post(process.env.CLIENT_SIGNIN_URL).send({
        email: process.env.TEST_CLIENT_EMAIL,
        password: process.env.TEST_CLIENT_PASSWORD,
      });
      const response = JSON.parse(obj.text);
      expect(obj.statusCode).toBe(200);
      expect(response.success).toBe(true);
      expect(response.message).toBe("User logged in successfully");
      clientJWT = response.data.token;
    }, 10000);

    test("should return 400", async () => {
      const obj = await api.post(process.env.CLIENT_SIGNIN_URL).send({
        email: process.env.TEST_CLIENT_EMAIL,
        password: "somerandompasswordwhichissurelyincorrect",
      });
      const response = JSON.parse(obj.text);
      expect(obj.statusCode).toBe(400);
      expect(response.success).toBe(false);
      expect(response.message).toBe("Invalid credentials");
    }, 10000);

    test("should return 401, user not found", async () => {
      const obj = await api.post(process.env.CLIENT_SIGNIN_URL).send({
        email: "somerandomemailwhichdoesntexist@gmail.com",
        password: "somerandompasswordwhichissurelyincorrect",
      });
      const response = JSON.parse(obj.text);
      expect(obj.statusCode).toBe(401);
      expect(response.success).toBe(false);
      expect(response.message).toBe("User not found");
    }, 10000);
  });

  describe("Testing /getActiveAds", () => {
    test("should return 200", async () => {
      const obj = await api
        .get(url + "getActiveAds")
        .set("Authorization", `Bearer ${clientJWT}`);
      const response = JSON.parse(obj.text);
      expect(obj.statusCode).toBe(200);
      expect(response.message).toBe("Ads fetched successfully");
    });

    test("should return 400", async () => {
      const obj = await api.get(url + "getActiveAds");
      const response = JSON.parse(obj.text);
      expect(obj.statusCode).toBe(400);
      expect(response.message).toBe("Please login first");
    });
  });

  describe("Testing /getPreviousAds", () => {
    test("should return 200", async () => {
      const obj = await api
        .get(url + "getPreviousAds")
        .set("Authorization", `Bearer ${clientJWT}`);
      const response = JSON.parse(obj.text);
      expect(obj.statusCode).toBe(200);
      expect(response.message).toBe("Ads fetched successfully");
    });

    test("should return 400", async () => {
      const obj = await api.get(url + "getPreviousAds");
      const response = JSON.parse(obj.text);
      expect(obj.statusCode).toBe(400);
      expect(response.message).toBe("Please login first");
    });
  });

  describe("Testing /getClient/:clientId", () => {
    test("should return 200", async () => {
      const clientId = jsonWebToken.verify(
        clientJWT,
        process.env.SECRET_KEY
      ).id;
      const obj = await api
        .get(url + `getClient/${clientId}`)
        .set("Authorization", `Bearer ${clientJWT}`);
      const response = JSON.parse(obj.text);
      expect(obj.statusCode).toBe(200);
    });

    test("should return 400", async () => {
      const invalidClientId =
        "a" +
        jsonWebToken.verify(clientJWT, process.env.SECRET_KEY).id.slice(1);
      const obj = await api
        .get(url + `getClient/${invalidClientId}`)
        .set("Authorization", `Bearer ${clientJWT}`);
      const response = JSON.parse(obj.text);
      expect(obj.statusCode).toBe(400);
      expect(response.message).toBe("No such Client found");
    }, 10000);
  });
});
