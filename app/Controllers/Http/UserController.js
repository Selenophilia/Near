'use strict'

const User              = use('App/Models/User');
const UserException   = use('App/Exceptions/UserException')

class UserController {   
        async  index(){
                return await User.all();
        }
        
        async createUser({ request }){
                try {
                        const data      = request.only(['username', 'email', 'password']);
                        const userExist = await User.findBy('email', data.email);
                        if(userExist){
                                throw new UserException
                        }
                        const newUser = await User.create(data)
                        return newUser
                
                } catch (error) {
                        throw new UserException(error)
                }     

        }
        async showUser({ params }){
                const userid = params.userid
                const user      = await User.findByOrFail('id', userid);
                
                return user.toJSON()             
                
        }

        async updateUser({ request }){
                const userid = request.params.userid
                const user   = await User.findByOrFail('id',userid)                                  
                                user.merge({
                                                username:   request.body.username,
                                                email:      request.body.email,
                                                password:   request.body.password
                                        })   
                                await user.save()
                                return user                                 
        }  
    
        async deleteUser({ params }){
                const userid = params.userid;
                const user = await User.findByOrFail('id', userid)           
                user.delete(user)
                return 'Deleted user'
        }

        async logIn({request,auth,response}){
                try {
                const {email, password} = request.all()
                const token = await auth
                                        .withRefreshToken()
                                        .attempt(email, password)
                return  response.status(200).json(token)
                                
                } catch (error) {
                response.send('Missing or invalid jwt token')
                }
        
        } 

}
module.exports = UserController
