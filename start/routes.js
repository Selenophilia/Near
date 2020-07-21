'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const User = use('App/Models/User')

/** Home */
Route.get('/', 'HomeController.index').middleware('guest')





// Route.resource('users', 'UserController')
/* CRUD routes*/
Route.group(() => {
      Route.get('/', 'UserController.index')
      Route.get('/:userid', 'UserController.showUser')
      //.middleware('auth')
      Route.post('/', 'UserController.createUser')
      Route.put('/:userid', 'UserController.updateUser')
      Route.delete('/:userid', 'UserController.deleteUser')
}).prefix('/users')


/* login routes*/
//POST
Route.post('/users/login', 'UserController.logIn')      

