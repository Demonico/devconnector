/* eslint no-undef: "off" */
// packages
const chai = require('chai')
// const moment = require('moment')
const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose
const mockgoose = new Mockgoose(mongoose)

// project files
// const server = require('../../server')
// const User = require('../../routes/api/users')
const validatorRegisterInput = require('../../validation/register')

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
/* beforeEach(done => {
  User.remove({}, err => {
    if (err) {
      throw err
    }
    done()
  })
}) */

// chai config
const expect = chai.expect

//  Object Preset
const baseData = {
  name: 'Sam',
  email: 'sam@emailtest.com',
  password: 'blah123',
  avatar: 'Avatar Kora',
  date: Date.now
}

describe('Validation Tests', () => {
  describe('Name', () => {
    it('Should indicate name is required', done => {
      let data = {
        ...baseData,
        name: ''
      }
      let errObj = validatorRegisterInput(data)
      expect(errObj.errors.name).to.equal('Name field is required.')
      done()
    })
    it('Should require a 30 character max', done => {
      let data = {
        ...baseData,
        name: 't'
      }
      let errObj = validatorRegisterInput(data)
      expect(errObj.errors.name).to.equal(
        'Name must be between 2 and 30 characters.'
      )
      done()
    })
    it('Should require a 30 character max', done => {
      let data = {
        ...baseData,
        name: 'Lorem ipsum dolor sit amet consectetur'
      }
      let errObj = validatorRegisterInput(data)
      expect(errObj.errors.name).to.equal(
        'Name must be between 2 and 30 characters.'
      )
      done()
    })
  })

  describe('Email', () => {
    it('Should indicate email is required', done => {
      let data = {
        ...baseData,
        email: ''
      }
      let errObj = validatorRegisterInput(data)
      expect(errObj.errors.email).to.equal('Email field is required.')
      done()
    })
  })

  describe('Password', () => {
    it('Should indicate password is required', done => {
      let data = {
        ...baseData,
        password: ''
      }
      let errObj = validatorRegisterInput(data)
      expect(errObj.errors.password).to.equal('Password field is required.')
      done()
    })
    it('Should indicate password length requirements', done => {
      let data = {
        ...baseData,
        password: '123'
      }
      let errObj = validatorRegisterInput(data)
      expect(errObj.errors.password).to.equal(
        'Password should be between 6 and 30 characters.'
      )
      done()
    })
    it('Should indicate password length requirements', done => {
      let data = {
        ...baseData,
        password: '123456789qwertyuioplkjhgfdsazxcvbnm'
      }
      let errObj = validatorRegisterInput(data)
      expect(errObj.errors.password).to.equal(
        'Password should be between 6 and 30 characters.'
      )
      done()
    })
    it('Should indicate confirm password is required', done => {
      let data = {
        ...baseData,
        password2: ''
      }
      let errObj = validatorRegisterInput(data)
      expect(errObj.errors.password2).to.equal(
        'Confirm password field is required.'
      )
      done()
    })
    it('Should indicate password mismatch', done => {
      let data = {
        ...baseData,
        password2: '654wer'
      }
      let errObj = validatorRegisterInput(data)
      expect(errObj.errors.password2).to.equal('Passwords must match.')
      done()
    })
  })
})
