var request = require('request')

describe('calc', () => {
    it('should multiple 2 and 2', () => {
        expect(2*2).toBe(4)
    })
})

describe('get messages', () => {
    it("should return 200 ok", (done)=> {
        request.get('http://127.0.0.1:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('should return a list, thats not empty', (done) => {
        request.get('http://127.0.0.1:3000/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})

describe("get messages from user", () => {
    it("should return 200 ok", (done)=> {
        request.get('http://127.0.0.1:3000/messages/may', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('name should be may', (done) => {
        request.get('http://127.0.0.1:3000/messages/may', (err, res) => {
            expect(JSON.parse(res.body)[0].name).toEqual('may')
            done()
    })
    })
    
})