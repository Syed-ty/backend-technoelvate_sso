const app = require('../app');
const request = require('supertest')

describe('user controller',()=>{
    it('get user',async ()=>{
    let data=  await request(app).get('/user/get-alluser')
    expect(data.statusCode).toEqual(200);
    })

    it('update register',async ()=>{
        let id = '638895a673e4f846e4031240';
        let data =await request(app).put('/user/update-user/'+ id).send({
                fullName:'Akhil',
                email:'mahmmadakhil.m@testyantra.in',
                employeeId:'TYC0621222',
                role:"Admin",
             });
            // .end((res)=>{
            //     console.log("res",res);
            // })
            expect(data.status).toEqual(200);
           
            // expect(data.status).toBe(200);
        })

        it('update invalid register',async ()=>{
            let id = '638895a673e4f846e4031241gh';
            let data =await request(app).put('/user/update-user/'+ id).send({
                    fullName:'Akhil',
                    email:'mahmmadakhil.m@testyantra.in',
                    employeeId:'TYC0621222',
                    role:"Admin",
                 });
                // .end((res)=>{
                //     console.log("res",res);
                // })
                expect(data.status).toEqual(500);
               
                // expect(data.status).toBe(200);
            })
    
})

