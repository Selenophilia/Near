'use strict'

const User = use('App/Models/User');

class UserController {   
    async  getUser(){
            return await User.all();
    }
    
    async createUser({request, response}){
                    const data      = request.only(['username', 'email', 'password']);
                    const userExist = await User.findBy('email', data.email);
                            if(userExist){
                                return response.send({message: {error: 'User already exists'} })
                            }

                    const newUser = await User.create(data)
                    return newUser

            // try {
            //     const data      = request.only(['username', 'email', 'password']);
            //     const userExist = await User.findBy('email', data.email);
            //             if(userExist){
            //                 return response
            //                         .status(400)
            //                         .send({message: {error: 'User already exists'} })
            //             }
            //     const user = await User.create(data)
            //     return user
            // } catch (error) {
            //         return response
            //                   .status(error.status)
            //                   .send(error)    
            // }
    }
    async showUser({ params }){
            const userid = params.userid
            const user      = await User.findByOrFail('id', userid);
            const showUser = user.toJSON() 

            return showUser            
     
            // try {
            //     const user      = await User.findBy('id', request.params.userid);
            //         if(!user){
            //             return response
            //                     .status(400)
            //                     .send({message: {error: 'User does not exist'} })
            //         }
            //     return user            
            // } catch (error) {
            //     return response
            //         .status(error.status)
            //         .send(error)
            // }        
    }

    async updateUser({ request }){
            const userid = request.params.userid
            const user   = await User.findBy('id',userid)                                   
                            user.merge({
                                        username:   request.body.username,
                                        email:      request.body.email,
                                        password:   request.body.password
                                    })   
                            await user.save()             
                                
            // try {
            //     const user = await User.findBy('id',request.params.userid)            
                       
            //                 user.merge({
            //                             username: request.body.username,
            //                             email: request.body.email
            //                         })   
            //                 await user.save()  
            //                 return  response.send(user)                 
            // } catch (error) {
            //     return response
            //             .status(400)
            //             .send(error)
            // }
    }  
  async deleteUser({ params }){
            const userid = params.userid;
            const user = await User.findByOrFail('id', userid)           
            user.delete(user)

            // try {
            //     //  const user = await User.findBy('id', request.params.userid)
            //                  await user.delete(userid)  
            //  //   return response.send({message: 'User deleted'})              
            // } catch (error) {
            //    throw error("Error Found")
            // }
    }


}
module.exports = UserController
