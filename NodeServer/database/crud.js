//Create, read, update and delete functions for MongoDB

/**
 * Creates one document to db.
 * @param {client} client - The client used to connect to database
 * @param {string} db - The name of the database in MongoDB
 * @param {string} collection - The name of the collection in MongoDB
 * @param {Object} newObj - The document that will be created
 * */
async function createOne(client, db, collection, newObj) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collection).insertOne(newObj);
        if (result) {
            console.log("New document created");
            return result.ops;
        }
    }
    catch (e) {
        console.log("Something went wrong while creating a new document");
    }
    finally {
        await client.close();
    }
}

/**
 * Creates several documents to db.
 * @param {client} client - The client used to connect to database
 * @param {string} db - The name of the database in MongoDB
 * @param {string} collection - The name of the collection in MongoDB
 * @param {Object} newObj - The documents that will be created
 * */
async function createMany(client, db, collection, newObj) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collection).insertMany(newObj);
        if (result) {
            console.log("New documents created");
            return result.ops;
        }
    }
    catch (e) {
        console.log("Something went wrong while creating new documents");
    }
    finally {
        await client.close();
    }
}

/**
 * Finds the first document that matches the given query.
 * @param {client} client - The client used to connect to database
 * @param {string} db - The name of the database in MongoDB
 * @param {string} collection - The name of the collection in MongoDB
 * @param {Object} params - The search parameters
 * */
async function findOne(client, db, collection, params) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collection).findOne(params);
        if (result) {
            console.log("Found a document");
            return result;
        }
        else
            console.log("No documents found");
    }
    catch (e) {
        console.log("Something went wrong while searching for a document");
    }
    finally {
        await client.close();
    }
}

/**
 * Finds the documents that matches the given query.
 * @param {client} client - The client used to connect to database
 * @param {string} db - The name of the database in MongoDB
 * @param {string} collection - The name of the collection in MongoDB
 * @param {Object} params - Search parameters
 * @param {Object} sort - Sorting parameters
 * @param {Object} limit - Limiting parameters
 * */
async function findMany(client, db, collection, params, sort, limit) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collection).find(params).toArray();
        if (limit) {
            result.limit(limit);
        }
        if (sort) {
            result.sort(sort);
        }
        if (result.length > 0) {
            console.log("Found documents");
            return result;
        }
        else
            console.log("No documents found");
    }
    catch (e) {
        console.log("Something went wrong while searching for documents");
    }
    finally {
        await client.close();
    }
}

/**
 * Updates one document that matches the given identifier.
 * @param {client} client - The client used to connect to database
 * @param {string} db - The name of the database in MongoDB
 * @param {string} collection - The name of the collection in MongoDB
 * @param {Object} id - Identifier of the document (id, name etc.)
 * @param {Object} newValue - Values that are updated
 */
async function updateOne(client, db, collection, id, newValue) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collection).updateOne(id, { $set: newValue });
        if (result.modifiedCount > 0)
            console.log("Updated document");
        else
            console.log("No documents were updated");
        return (result.modifiedCount);
    }
    catch (e) {
        console.log("Something went wrong while updating a document");
    }
    finally {
        await client.close();
    }
}

/**
 * Updates documents that match the given identifier.
 * @param {client} client - The client used to connect to database
 * @param {string} db - The name of the database in MongoDB
 * @param {string} collection - The name of the collection in MongoDB
 * @param {Object} id - Identifier of the documents (id, name etc.)
 * @param {Object} newValue - Values that are updated
 */
async function updateMany(client, db, collection, id, newValue) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collection).updateMany(id, { $set: newValue });
        if (result.modifiedCount > 0)
            console.log("Updated documents");
        else
            console.log("No documents were updated");
        return result.modifiedCount;
    }
    catch (e) {
        console.log("Something went wrong while updating documents");
    }
    finally {
        await client.close();
    }
}

/**
 * Deletes one document that matches the given identifier.
 * @param {client} client - The client used to connect to database
 * @param {string} db - The name of the database in MongoDB
 * @param {string} collection - The name of the collection in MongoDB
 * @param {Object} id - Identifier of the document (id, name etc.)
 */
async function deleteOne(client, db, collection, id) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collection).deleteOne(id);
        if (result.deletedCount > 0)
            console.log("Deleted document");
        else
            console.log("No documents were deleted");
        return result.deletedCount;
    }
    catch (e) {
        console.log("Something went wrong while deleting a document");
    }
    finally {
        await client.close();
    }
}

/**
 * Deletes several documents that match the given identifier.
 * @param {client} client - The client used to connect to database
 * @param {string} db - The name of the database in MongoDB
 * @param {string} collection - The name of the collection in MongoDB
 * @param {Object} id - Identifier of the document (id, name etc.)
 */
async function deleteMany(client, db, collection, id) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collection).deleteMany(id);
        if (result.deletedCount > 0)
            console.log("Deleted documents");
        else
            console.log("No documents were deleted");
        return result.deletedCount;
    }
    catch (e) {
        console.log("Something went wrong while deleting documents");
    }
    finally {
        await client.close();
    }
}

module.exports = {
    createOne: createOne,
    createMany: createMany,

    findOne: findOne,
    findMany: findMany,

    updateOne: updateOne,
    updateMany: updateMany,

    deleteOne: deleteOne,
    deleteMany: deleteMany,
}