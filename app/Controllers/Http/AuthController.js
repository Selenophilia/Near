'use strict'

const User = use('App/Models/User');

class AuthController {
    async login ({ auth, request }) {
       //  const { email, password } = request.all()
         const data = request.only(['username', 'email', 'password'])
         const user = await User.findBy('email', data.email)
        //const user = await User.find(4)
        
        //generate token
        //  return await auth
        //                 .withRefreshToken()
        //                 .attempt(email, password)

        return await auth.generate(user)
      }
    show({auth, params}){
       
        if(auth.user.id !== Number(params.id)){
            return 'you cannot see some else profile'
        }
         return auth.user
    }
}

module.exports = AuthController
