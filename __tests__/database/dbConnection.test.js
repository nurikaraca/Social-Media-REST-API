const mongoose= require('mongoose')
const db = require('../../config/db')

describe('Database Connection Test', () => {
    beforeAll(async () =>{
        await db();
        await new Promise((resolve)=>mongoose.connection.once('open', resolve));
    });

    afterAll (async ()=>{
        await mongoose.disconnect();
    });

    test('Should connect to the database', () =>{
       expect(mongoose.connection.readyState).toBe(1);
    });
});
