'use strict'

const User = use('App/Models/User');

class UserController {   
    async  getUser(){
        return await User.all();
    }
    async createUser({request, response}){
        try {
            const data      = request.only(['username', 'email', 'password']);
            const userExist = await User.findBy('email', data.email);
                    if(userExist){
                        return response
                                .status(400)
                                .send({message: {error: 'User already exists'} })
                    }
                const user = await User.create(data)
                return user
        } catch (error) {
                return response
                    .status(error.status)
                    .send(error)    
        }
    }
}
module.exports = UserController
