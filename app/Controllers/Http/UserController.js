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
    async showUser({request, response}){
        try {
            const user      = await User.findBy('id', request.params.userid);
                if(!user){
                    return response
                            .status(400)
                            .send({message: {error: 'User does not exist'} })
                }
                return user;            
        } catch (error) {
            return response
                   .status(error.status)
                   .send(error)
        }        
    }

    async updateUser({request, response}){
        const user    = await User.findBy('id', request.params.userid)
     
    }  

  async deleteUser({request, response}){
      try {
        const user = await User.findBy('id', request.params.userid)
             await user.delete()  
         return response.send({message: 'User deleted'})              
      } catch (error) {
          return response
                .status(400)
                .send(error)
      }
    }


}
module.exports = UserController
