process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");

let items = require("./fakeDb");
let carrots = { "name": "carrots", "price": 2.99 }

beforeEach(() => {
    items.push(carrots);
});

afterEach(() => {
    items.length = 0;
});

describe("GET /items", () => {
    test("Gets a list of all items", async function(){
        const resp = await request(app).get(`/items`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([{"name": "popsicle", "price": 1.45}, carrots]);
    });
});

describe("POST /items", () => {
    test("Creates a new item", async function(){
        const resp = await request(app)
            .post('/items')
            .send({"name": "Ice Cream", "price": 3.49});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"added": {"item": {"name": "Ice Cream", "price": 3.49}}});
    });
});

describe("GET /items/:name", () => {
    test("Gets a single item.", async function(){
        const resp = await request(app).get(`/items/${carrots.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"name": "carrots", "price": 2.99});
    });
});

describe("PATCH /items/:name", () => {
    test("Updates an item", async function(){
        const resp = await request(app).patch(`/items/${carrots.name}`).send({ "name":"zucchinni", "price": 2.99});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"updated": {"item": {"name": "zucchinni", "price": 2.99}}});
    });
});

describe("DELETE /items/:name", () => {
    test("Desletes an item", async function(){
        const resp = await request(app).delete(`/items/${carrots.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ "message": "Deleted"});
    })
})