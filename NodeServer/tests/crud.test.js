const {createOne, createMany, findOne, findMany, updateOne, updateMany, deleteOne, deleteMany} = require('../database/crud');
const MongoClient = require('mongodb').MongoClient;

var user = "user_basic";
var pw = "kevat21basic";
var db = "testi";
var collection = "testicol";

const uri = "mongodb+srv://"+user+":"+pw+"@kielikanta.izgqz.mongodb.net/?retryWrites=true&w=majority";

const testObj = { name: "375627562Test", other: "Something"};
const testMany = [{ name: "9988First" }, { name: "9988Second" }, { name: "9988Third" }];

// NOTE: These tests are designed to run on empty db collection

// "one" methods

test('Testing createOne with one document not in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await createOne(client, db, collection, { name: testObj.name});
    expect(res[0].name).toBe(testObj.name);
    done(); 
});

test('Testing createOne with one document already in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await createOne(client, db, collection, { name: testObj.name});
    expect(res[0].name).toBe(testObj.name);
    done();
});

test('Testing createOne with empty document:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await createOne(client, db, collection, {});
    expect(res.length).toBe(1);
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
    expect.assertions(1);
    const res = await findOne(client, db, collection, { name: testObj.name});
    expect(res.name).toBe(testObj.name);
    done(); 
});

test('Testing findOne with empty search parameter:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await findOne(client, db, collection, {});
    expect(res.name).toBe(testObj.name);
    done(); 
});

test('Testing findOne with $-sign in search parameter:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await findOne(client, db, collection, { name: {"$ne": 1}});
    expect(res).toBeUndefined();
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

test('Testing updateOne with empty parameters:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await updateOne(client, db, collection, {}, {});
    expect(res).toBeUndefined();
    done(); 
});

test('Testing deleteOne with one document not in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await deleteOne(client, db, collection, { name: "375627562Testasdasd"});
    expect(res).toBe(0);
    done(); 
});

test('Testing deleteOne with one document that is in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await deleteOne(client, db, collection, { name: "375627562Test"});
    expect(res).toBe(1);
    done(); 
});

test('Testing deleteOne with $ sign in query:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await deleteOne(client, db, collection, { $name: "375627562Test"});
    expect(res).toBeUndefined();
    done(); 
});

test('Testing deleteOne with empty parameters:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await deleteOne(client, db, collection, {});
    expect(res).toBe(1);
    done(); 
});

// "many" methods

test('Testing createMany with documents not in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(3);
    const res = await createMany(client, db, collection, testMany);
    expect(res[0].name).toBe(testMany[0].name);
    expect(res[1].name).toBe(testMany[1].name);
    expect(res[2].name).toBe(testMany[2].name);
    done(); 
});

test('Testing createMany with documents already in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await createMany(client, db, collection, testMany);
    expect(res).toBeUndefined();
    done(); 
});

test('Testing createMany with empty list:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await createMany(client, db, collection, []);
    expect(res).toBeUndefined();
    done(); 
});

test('Testing findMany with documents not in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await findMany(client, db, collection, { name: testObj.name + "asdasd"}, null, null);
    expect(res).toBeUndefined();
    done(); 
});

test('Testing findMany with documents found in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await findMany(client, db, collection, { name: /9/}, null, null);
    expect(res.length).toBe(3);
    done(); 
});

test('Testing updateMany with documents not in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await updateMany(client, db, collection, { name: "375627562Testasdasd"}, { name: "New"});
    expect(res).toBe(0);
    done(); 
});

test('Testing updateMany with documents in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await updateMany(client, db, collection, { name: /9/}, { name: "Allupdated" });
    expect(res).toBe(3);
    done(); 
});

test('Testing deleteMany with documents not in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await deleteMany(client, db, collection, { name: "375627562Testasdasd"});
    expect(res).toBe(0);
    done(); 
});

test('Testing deleteMany with one document that is in db:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await deleteMany(client, db, collection, { name: "Allupdated"});
    expect(res).toBe(3);
    done(); 
});

test('Testing deleteOne with empty parameters:', async (done) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    expect.assertions(1);
    const res = await deleteOne(client, db, collection, {});
    expect(res).toBe(1);
    done(); 
});
