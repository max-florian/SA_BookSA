const Server = require('../index.js');
const request = require('supertest');
const chai = require('chai');
const { assert } = require('chai');
const { expect } = chai;


describe('View books', () => {
    Server.set('port', 3001)

    it('View editorial books', (done) => {
        request(Server)
        .get('/books/')
        .send(
            {
                idEditorial: 31,
            }
        )
        .then(r => {
            expect(r.body)
                .to.be.an.an('Object')
                .that.has.property('data');
            assert(r.status, 200);
            done(); 
        });
    })

   it('View book data', (done) => {
        request(Server)
        .get('/books/9')
        .send()
        .then(r => {
            expect(r.body)
                .to.be.an.an('Object')
                .that.has.property('data');
            assert(r.status, 200);
            done(); 
        });
    })

   it('Delete book', (done) => {
        request(Server)
        .delete('/books/9')
        .send()
        .then(r => {
            expect(r.body)
                .to.be.an.an('Object');
            assert(r.status, 200);
            done(); 
        });
    })
});
