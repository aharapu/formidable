/*eslint-env node, mocha */

const firebse = require('@firebase/testing');
const PROJECT_ID = 'valle-formidable-forms';

const getDb = (auth) => {
    return firebse.initializeTestApp({ projectId: PROJECT_ID, auth }).firestore();
};

const GOOD_UID = 'user-uid-123-abc';
const EVIL_UID = 'hacker-uid-666-omg';

const COLLECTION = {
    users: 'users',
};

describe('Security Rules', () => {
    beforeEach(async () => {
        await firebse.clearFirestoreData({ projectId: PROJECT_ID });
    });

    describe('for the "users" collection', () => {
        const timestamp = firebse.firestore.FieldValue.serverTimestamp();

        it(
            'allow document creation when all fields are set with correct values' +
                ' and UID corresponds to document id',
            async () => {
                const db = getDb({ uid: GOOD_UID });
                const testDoc = db.collection(COLLECTION.users).doc(GOOD_UID);

                await firebse.assertSucceeds(
                    testDoc.set({
                        createdAt: timestamp,
                        displayName: 'User Name',
                        email: 'user@email.com',
                        updatedAt: timestamp,
                    }),
                );
            },
        );

        describe('do NOT allow document creation when', () => {
            it('"createdAt" is missing', async () => {
                const db = getDb({ uid: GOOD_UID });
                const testDoc = db.collection(COLLECTION.users).doc(GOOD_UID);

                await firebse.assertFails(
                    testDoc.set({
                        displayName: 13,
                        email: 'user@email.com',
                        updatedAt: timestamp,
                    }),
                );
            });

            it('"displayName" is missing', async () => {
                const db = getDb({ uid: GOOD_UID });
                const testDoc = db.collection(COLLECTION.users).doc(GOOD_UID);

                await firebse.assertFails(
                    testDoc.set({
                        createdAt: timestamp,
                        email: 'user@email.com',
                        updatedAt: timestamp,
                    }),
                );
            });

            it('"email" is missing', async () => {
                const db = getDb({ uid: GOOD_UID });
                const testDoc = db.collection(COLLECTION.users).doc(GOOD_UID);

                await firebse.assertFails(
                    testDoc.set({
                        createdAt: timestamp,
                        displayName: 'User Name',
                        updatedAt: timestamp,
                    }),
                );
            });

            it('"updatedAt" is missing', async () => {
                const db = getDb({ uid: GOOD_UID });
                const testDoc = db.collection(COLLECTION.users).doc(GOOD_UID);

                await firebse.assertFails(
                    testDoc.set({
                        createdAt: timestamp,
                        displayName: 'User Name',
                        email: 'user@email.com',
                    }),
                );
            });

            it('"createdAt" has wrong value', async () => {
                const db = getDb({ uid: GOOD_UID });
                const testDoc = db.collection(COLLECTION.users).doc(GOOD_UID);

                await firebse.assertFails(
                    testDoc.set({
                        createdAt: '25 dec 1989',
                        displayName: 'john doe',
                        email: 'user@email.com',
                        updatedAt: timestamp,
                    }),
                );
            });

            it('"displayName" has wrong value', async () => {
                const db = getDb({ uid: GOOD_UID });
                const testDoc = db.collection(COLLECTION.users).doc(GOOD_UID);

                await firebse.assertFails(
                    testDoc.set({
                        createdAt: timestamp,
                        displayName: 13,
                        email: 'user@email.com',
                        updatedAt: timestamp,
                    }),
                );
            });

            it('"email" has wrong value', async () => {
                const db = getDb({ uid: GOOD_UID });
                const testDoc = db.collection(COLLECTION.users).doc(GOOD_UID);

                await firebse.assertFails(
                    testDoc.set({
                        createdAt: timestamp,
                        displayName: 'john doe',
                        email: timestamp,
                        updatedAt: timestamp,
                    }),
                );
            });

            it('"updatedAt" has wrong value', async () => {
                const db = getDb({ uid: GOOD_UID });
                const testDoc = db.collection(COLLECTION.users).doc(GOOD_UID);

                await firebse.assertFails(
                    testDoc.set({
                        createdAt: timestamp,
                        displayName: 'john doe',
                        email: 'user@email.com',
                        updatedAt: 12345678,
                    }),
                );
            });

            it('unknown keys are used', async () => {
                const db = getDb({ uid: GOOD_UID });
                const testDoc = db.collection(COLLECTION.users).doc(GOOD_UID);

                await firebse.assertFails(
                    testDoc.set({
                        createdAt: timestamp,
                        displayName: 'john doe',
                        email: 'user@email.com',
                        updatedAt: timestamp,
                        unknownKey: 'unknown value',
                    }),
                );
            });

            it('UID does not correspond to document id', async () => {
                const db = getDb({ uid: GOOD_UID });
                const testDoc = db.collection(COLLECTION.users).doc(EVIL_UID);

                await firebse.assertFails(
                    testDoc.set({
                        createdAt: timestamp,
                        displayName: 'john doe',
                        email: 'eviluser@haha.com',
                        updatedAt: timestamp,
                    }),
                );
            });
        });
    });
});
