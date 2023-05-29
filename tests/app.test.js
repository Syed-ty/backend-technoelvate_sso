const app = require('../app');
const request = require('supertest')

describe('auth controller',()=>{
    it('Register',async ()=>{
    // let data=  await request(app).get('/')
    // expect(data.statusCode).toEqual(200);

    let data =await request(app).post('/auth/add-register').send({
            fullName:'Akhil',
            email:'mahmmadakhil.m@testyantra.in',
            employeeId:'TYC012346',
            role:"Admin",
         });
        // .end((res)=>{
        //     console.log("res",res);
        // })
        expect(data.status).toEqual(400);
       
        // expect(data.status).toBe(200);
    })

    it('Login',async ()=>{
        let data =await request(app).post('/auth/login').send({
            email:'mahmmadakhil1.m@testyantra.in',
             });
            expect(data.status).toEqual(404);
        })

        it('valid verify-otp',async ()=>{
            let data =await request(app).post('/auth/verify-otp').send({
                email:'mahmmadakhil.m@testyantra.in',
                otp:686225 
                 });
                expect(data.status).toEqual(200);
            })
            it(' invalid verify-otp',async ()=>{
                let data =await request(app).post('/auth/verify-otp').send({
                    email:'mahmmadakhil.m@testyantra.in',
                    otp:606619 
                     });
                    expect(data.status).toEqual(404);
                })
})

