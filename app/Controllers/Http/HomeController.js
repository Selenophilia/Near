'use strict'

const Config = use('Config')

class HomeController {
  async index () {
    return {
      name: Config.get('app.name'),
      version: Config.get('app.version')
    }
  }
}

module.exports = HomeController