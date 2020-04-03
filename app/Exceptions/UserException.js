'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UserException extends LogicalException {
    handle (error, { response }) {
        response
          .status(500)
          .send(error)
      }

      constructor(){
          const message = 'User already exists'
          const status = 400
          const code = 'BadRequestException'
          super(message, status, code)
      } 
}

module.exports = UserException
