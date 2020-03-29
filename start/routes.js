'use strict'

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


/* user routes*/
//GET 
Route.get('/users','UserController.getUser')
    
//POST
Route.post('/users','UserController.createUser');
//SHOW
Route.get('/users/:userid', 'UserController.showUser')   
      .middleware('auth')
//PUT
Route.put('/users/:userid', 'UserController.updateUser')
//DELETE
Route.delete('/users/:userid', 'UserController.deleteUser')

//POST login
Route.post('/users/login', 'UserController.logIn')      

