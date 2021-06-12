const Server = require('../index.js');
const request = require('supertest');
const chai = require('chai');
const { assert } = require('chai');
const { expect } = chai;


describe('catalogo', () => {
    Server.set('port', 3001)

    it('Get all books', (done) => {
        request(Server)
        .get('/catalogo?genero=35&editorial=31')
        .then(r => {
            expect(r.body)
                .to.be.an.an('Object')
                .that.has.property('data');
            assert(r.status, 200);
            done(); 
        });
    })



    it('Get all book Generes', (done) => {
            request(Server)
            .get('/generos')
            .then(r => {
                expect(r.body)
                    .to.be.an.an('Object')
                    .that.has.property('data');
                assert(r.status, 200);
                done(); 
            });
    })    
});
