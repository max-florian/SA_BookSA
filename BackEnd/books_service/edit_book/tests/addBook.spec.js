const Server = require('../index.js');
const request = require('supertest');
const chai = require('chai');
const { assert } = require('chai');
const { expect } = chai;


describe('edit book', () => {
    Server.set('port', 3001)

    it('Update a book', (done) => {
        request(Server)
        .post('/books/8')
        .send(
            {
                autor: "Jostein Gaarder",
                precio: 90.00,
                cantidad: 10,
                generos: [35]
            }
        )
        .then(r => {
            assert(r.status, 200);
            done(); 
        });
    })



    it('it should fail to update a book because autor is missing', (done) => {
            request(Server)
            .post('/add_book')
            .send(
                {
                    precio: 90.00,
                    cantidad: 2,
                    generos: [12]
                }
            )
            .then(r => {
                is_code_ret = r.status !== 200
                assert.isTrue(is_code_ret)
                done();
            });
    })    
});
