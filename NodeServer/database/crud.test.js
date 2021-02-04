const {createOne, createMany, findOne, findMany, updateOne, updateMany, deleteOne, deleteMany} = require('./crud');
const MongoClient = require('mongodb').MongoClient;

var user = "user_basic";
var pw = "kevat21basic";
var db = "testi";
var collection = "testicol";

const uri = "mongodb+srv://"+user+":"+pw+"@kielikanta.izgqz.mongodb.net/?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useUnifiedTopology: true });
const testObj = { name: "375627562Test", other: "Something"};

test('Testing createOne with one document not in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await createOne(client, db, collection, { name: testObj.name});
    expect(res[0].name).toBe(testObj.name);
    done(); 
});

test('Testing createOne with one document that is in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await createOne(client, db, collection, { name: testObj.name});
    expect(res[0].name).toBe(testObj.name);
    done();
});

test('Testing findOne with one document not in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await findOne(client, db, collection, { name: testObj.name + "asdasd"});
    expect(res).toBeUndefined();
    done(); 
});

test('Testing findOne with one document that is in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    //expect.assertions(1);
    const res = await findOne(client, db, collection, { name: testObj.name});
    expect(res.name).toBe(testObj.name);
    done(); 
});

test('Testing updateOne with one document not in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await updateOne(client, db, collection, { name: "375627562Testasdasd"}, { name: "New"});
    expect(res).toBe(0);
    done(); 
});

test('Testing updateOne with one document that is in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await updateOne(client, db, collection, { name: "375627562Test"}, { name: "New" });
    expect(res).toBe(1);
    done(); 
});

