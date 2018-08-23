'use strict';

const { request } = require('../test');

describe('remediations', function () {
    describe('create', function () {
        test('creates a new remediation', async () => {
            const name = 'remediation';

            const r1 = await request
            .post('/v1/remediations')
            .send({name})
            .expect(201);

            r1.body.should.have.property('id');
            r1.body.should.have.property('name', name);

            const r2 = await request
            .get(`/v1/remediations/${r1.body.id}`)
            .expect(200);

            r2.body.should.have.property('id', r1.body.id);
            r2.body.should.have.property('name', name);
        });

        test('400s if unexpected property is provided', async () => {
            const {body} = await request
            .post('/v1/remediations')
            .send({foo: 'bar'})
            .expect(400);

            body.should.have.property('error', {
                code: 'OBJECT_ADDITIONAL_PROPERTIES',
                message: 'Additional properties not allowed: foo'
            });
        });
    });

    describe('get', function () {
        test('get remediation', async () => {
            const {body} = await request
            .get('/v1/remediations/66eec356-dd06-4c72-a3b6-ef27d1508a02')
            .expect(200);

            body.should.eql({
                id: '66eec356-dd06-4c72-a3b6-ef27d1508a02',
                name: 'remediation 1'
            });
        });

        test('get remediation (2)', async () => {
            const {body} = await request
            .get('/v1/remediations/e809526c-56f5-4cd8-a809-93328436ea23')
            .expect(200);

            body.should.eql({
                id: 'e809526c-56f5-4cd8-a809-93328436ea23',
                name: ''
            });
        });
    });

    describe('list', function () {
        test('list remediation', async () => {
            const {body} = await request
            .get('/v1/remediations')
            .expect(200);

            body.should.have.property('remediations');
            body.remediations.should.not.be.empty();
            body.remediations.map(r => r.id).should.containDeep([
                '66eec356-dd06-4c72-a3b6-ef27d1508a02',
                'cbc782e4-e8ae-4807-82ab-505387981d2e',
                'e809526c-56f5-4cd8-a809-93328436ea23'
            ]);
        });
    });

    describe('remove', function () {
        test('remove remediation', async () => {
            await request
            .delete('/v1/remediations/e67118cc-28ec-4b55-afe9-2b5cfab24f13')
            .expect(204);

            await request
            .delete('/v1/remediations/e67118cc-28ec-4b55-afe9-2b5cfab24f13')
            .expect(404);
        });
    });
});
