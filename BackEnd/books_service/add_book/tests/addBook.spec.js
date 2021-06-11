const Server = require('../index.js');
const request = require('supertest');
const chai = require('chai');
const { assert } = require('chai');
const { expect } = chai;


describe('addBook', () => {
    Server.set('port', 3001)

    it('Register a book', (done) => {
        request(Server)
        .post('/add_book')
        .send(
            {
                titulo: "La metamorfosis",
                autor: "Franz Kafka",
                precio: 90.00,
                cantidad: 2,
                id_editorial: 31
            }
        )
        .then(r => {
            expect(r.body)
                .to.be.an.an('Object')
                .that.has.property('message');
            assert(r.status, 200);
            done(); 
        });
    })



    it('it should fail to set a product because id_editorial is missing', (done) => {
            request(Server)
            .post('/add_book')
            .send(
                {
                    titulo: "La metamorfosis",
                    autor: "Franz Kafka",
                    precio: 90.00,
                    cantidad: 2
                }
            )
            .then(r => {
                is_code_ret = r.status !== 200
                assert.isTrue(is_code_ret)
                done();
            });
    })    
});
