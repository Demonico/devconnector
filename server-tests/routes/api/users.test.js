/* eslint no-undef: "off" */
// packages
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const Mockgoose = require('mockgoose').Mockgoose
const mockgoose = new Mockgoose(mongoose)

// project files
const User = require('../../../routes/api/users')
const server = require('../../../server')

// mockgoose config
before(done => {
  mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://localhost/TestingDB', function(err) {
      done(err)
    })
  })
})
beforeEach(done => {
  mockgoose.helper.reset().then(() => {
    done()
  })
})
after(() => {
  mongoose.models = {}
  mongoose.modelSchemas = {}

  return mongoose.connection.close()
})

//  Test user Preset
const baseData = {
  name: 'Sam',
  email: 'sam@emailtest.com',
  password: 'blah123',
  // avatar: '',
  date: Date.now
}

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

  describe('/register', () => {
    it('expect register a user', done => {
      let data = {
        ...baseData,
        password2: 'blah123'
      }
      chai
        .request(server)
        .post('/api/users/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(data)
        .end((err, res) => {
          if (err) {
            throw err
          }
          console.log('res.body', res.body)
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('object')
          expect(res.body.name).to.equal('Sam')
          expect(res.body.email).to.equal('sam@emailtest.com')
          expect(res.body.password).to.exist
          done()
        })
    })
  })
  // test /register
  // test email exists response

  // ------------------------------------------------
  // test /login
  // successful login
  // --------------------------
  // unsuccessful login
})
