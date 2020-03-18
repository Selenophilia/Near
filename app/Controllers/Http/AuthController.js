'use strict'

const User = use('App/Models/User');

class AuthController {
    async login ({ auth, request }) {
         const data = request.only(['username', 'email', 'password'])
         const user = await User.findBy('email', data.email)
        
         if(!user){
             return 'user not found!!'
         }
         
        //generate refresher token
         return await auth
                        .withRefreshToken()
                        .attempt(data.email, data.password)

        //generate token for user
        // return await auth.generate(user)
      }
    show({auth, params}){
       
        if(auth.user.id !== Number(params.id)){
            return 'you cannot see some else profile'
        }
         return auth.user
    }
}

module.exports = AuthController
