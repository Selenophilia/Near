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
                return user            
            } catch (error) {
                return response
                    .status(error.status)
                    .send(error)
            }        
    }

    async updateUser({request, response}){
            try {
                const user = await User.findBy('id',request.params.userid)            
                            user.username = request.body.username
                            user.email    = request.body.email
                        
                            await user.save()  
                            return  response.send(user)                 
            } catch (error) {
                return response
                        .status(400)
                        .send(error)
            }
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

    //added auth on UserController 
   async logIn({request,auth,response}){
            try {
                const {email, password} = request.all()
                const data              = request.only(['username', 'email', 'password']);
                const user              = await User.findBy('email', data.email);
                const token             = await auth.generate(user)
               
               
                await auth
                    .withRefreshToken()    
                    .attempt(email, password)
                            
                return response.send(token) 
            } catch (error) {
                  response.send('Missing or invalid jwt token')
            }
         
    } 

   async showProfile({auth,request}){    
        if(auth.user.id  !== Number(request.params.userid)){
             return 'You cannot see this profile'
        }

         return auth.user
   }
}
module.exports = UserController
