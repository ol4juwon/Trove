const debug = require("debug")("app:debug");
const portfolio = require('../../app/v1/portfolio/PortfolioService')
const request  = require("supertest");
let portf;
/**
 * @jest-environment node
 */
describe("User Portfolio test", () => {
    beforeEach(() => {

    })
    afterEach(() => {
        // userRepository.truncate()
        // .then()
        // .catch();
    })

    it("search by userId should return a valid portfolio", () => {
        let userId = "616f529c1a6efa33b41697ab";
        portfolio.getPortfolio({userId})
        .then(u =>{
            console.log(u)
            console.log(userId)
            expect(u.symbol).toBe();
            expect(u.equityValue).toBe(portf.equityValue);
            
            done()
        })
        .catch(err => {
            debug(err);
            done();
        })
    })
})