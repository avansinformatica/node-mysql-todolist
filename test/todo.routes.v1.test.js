//
// Tests voor ToDo routes van de API.
// Deze test is nog niet af. Probleem is namelijk dat 
//
process.env.NODE_ENV = 'test';
process.env.APP_USERNAME = 'username';
process.env.APP_PASSWORD = 'password';

var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var server = require('../server');
var chould = chai.should();
var token;

chai.use(chaiHttp);

//
// Helper om token op te halen.
//
var getToken = function() {
    var user = {
        username: "username",
        password: "password"
    }
    chai.request(server)
        .post('/api/v1/login')
        .send(user)
        .end(function(err, res) {
            res.body.should.be.an('object');
            res.body.should.have.property('token');
            token = res.body.token;
        });
}


describe('GET /api/v1/todos', function() {

    // Zorg dat we een token hebben zodat we de tests kunnen uitvoeren.
    before(function() {
        if (!this.token) {
            getToken();
        }
    });

    //
    beforeEach(function() {
        // set things we changed for testing
    });

    //
    afterEach(function() {
        // reset things we changed for testing
    });

    // 
    //
    it('should return all ToDos when logged in', function(done) {
        chai.request(server)
            .get('/api/v1/todos')
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
                // console.dir(err);
                // res.should.have.status(200);
                // res.should.be.json;
                // res.body.should.be.a('object');
                // res.body.should.have.property('result').that.is.an('array');
                // mock.verify();
                done();
            });
    });

    // 
    //

});

describe('GET /api/v1/todo/:id', function() {

    // Zorg dat we een token hebben zodat we de tests kunnen uitvoeren.
    before(function() {
        if (!this.token) {
            getToken();
        }
    });

    //
    beforeEach(function() {
        // set things we changed for testing
    });

    //
    afterEach(function() {
        // reset things we changed for testing
    });

    // 
    //
    it('should return a single ToDo', function(done) {
        var todoID = 1;
        chai.request(server)
            .get('/api/v1/todos/' + todoID)
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
                // expect(err).to.be.a('null');
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('array');
                res.body.result.should.have.lengthOf(1);
                res.body.result.should.have.property('ID');
                res.body.result.should.have.property('Titel').that.is.a('string');
                res.body.result.should.have.property('Beschrijving').that.is.a('string');
                res.body.result.should.have.property('Status').that.is.a('string');
                res.body.result.should.have.property('LaatstGewijzigdOp').that.is.a('date');

                done();
            });
    });

    // 
    //

});

describe('POST /api/v1/todos', function() {

    // Zorg dat we een token hebben zodat we de tests kunnen uitvoeren.
    before(function() {
        if (!this.token) {
            getToken();
        }
    });

    //
    beforeEach(function() {
        // set things we need for testing
    });

    //
    afterEach(function() {
        // reset things we changed for testing
    });

    // 
    //
    it('should save a new ToDo', function(done) {
        var todo = {
            Titel: "Nieuwe ToDo",
            Beschrijving: "Hier staat tekst"
        }
        chai.request(server)
            .post('/api/v1/todos')
            .send(todo)
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('object');
                res.body.result.should.have.property('affectedRows').equal(1);
                res.body.result.should.have.property('changedRows').equal(0);
                res.body.result.should.have.property('warningCount').equal(0);
                res.body.result.should.have.property('message').equal('');
                done();
            });
    });

});