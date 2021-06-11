const Server = require('../index.js');
const request = require('supertest');
const chai = require('chai');
const { assert } = require('chai');
const { expect } = chai;


describe('addProduct', () => {
    Server.set('port', 3001)

    it('Register a book', (done) => {
        request(Server)
        .post('/add_product')
        .send(
            {
                titulo: "La metamorfosis",
                autor: "Franz Kafka",
                precio: 90.00,
                cantidad: 2,
                idEditorial: 31
            }
        )
        .then(r => {
            expect(r.body)
                .to.be.an.an('Object')
                .that.has.property('message');
            assert(r.body.code, 200)
        done();
        });
    })



    //     it('it should fail to set a product', async () => {
    //         await request(Server)
    //         .post('/add_product')
    //         .send(
    //             {
    //                 name: 'productoprueba2',
    //                 description: 'desc_prueba',
    //                 price: 10.50,
    //                 photo: 'prueba.png',
    //                 owner_id: '6'
                    
    //             }
    //         )
    //         .then(r => {
    //             console.log(r.body.code)
               
                
    //             is_code_ret = r.body.code == 200
                
    //             assert.isTrue(is_code_ret)
    //         });
    // })

//     it('it should fail to set an undefined product name', async () => {
//         await request(Server)
//         .post('/add_product')
//         .send(
//             {
//                 name: undefined,
//                 description: 'desc_prueba',
//                 price: 10.50,
//                 photo: 'prueba.png',
//                 owner_id: 6
                
//             }
//         )
//         .then(r => {
//             console.log(r.body.code)
           
            
//             is_code_ret = r.body.code == 200
            
//             assert.isTrue(is_code_ret)
//         });
// })

    
});
