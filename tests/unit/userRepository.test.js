const debug = require("debug")("app:debug");
const userRepository = require('../../app/v1/user/UserRepository')
const request  = require("supertest");
let user;
/**
 * @jest-environment node
 */
describe("User Repository test", () => {
    beforeEach(() => {

    })
    afterEach(() => {
        // userRepository.truncate()
        // .then()
        // .catch();
    })

    it("search by email should return a valid user", () => {
        let email = "admin@trove.co";
        userRepository.findOne({email})
        .then(u =>{
            console.log(u)
            console.log(email)
            expect(u.email).toBe("");
            expect(u.name).toBe(user.name);
            expect(u.phone).toBe(user.phone);
            done()
        })
        .catch(err => {
            debug(err);
            done();
        })
    })
})