const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatorRegisterInput(data) {
  let errors = {}

  // empty checks
  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  // name validations
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters.'
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required.'
  }

  // email validations
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required.'
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.'
  }

  // password validations
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required.'
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password should be between 6 and 30 characters.'
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required.'
  } else if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}