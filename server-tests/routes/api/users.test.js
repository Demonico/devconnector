/* eslint no-undef: "off" */
// packages
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const Mockgoose = require('mockgoose').Mockgoose
const mockgoose = new Mockgoose(mongoose)

// project files
// const User = require('../../../routes/api/users')
const server = require('../../../server')

// mockgoose config
before(done => {
  mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://localhost/TestingDB', function(err) {
      done(err)
    })
  })
})
after(() => {
  mongoose.models = {}
  mongoose.modelSchemas = {}

  return mongoose.connection.close()
})

// chai config
const expect = chai.expect
chai.use(chaiHttp)

describe('User Routes', () => {
  describe('/test', () => {
    it('expect call the /test route', done => {
      chai
        .request(server)
        .get('/api/users/test')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body).to.exist
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('object')
          expect(res.body.msg).to.equal('Users Works')
          done()
        })
    })
  })
})
