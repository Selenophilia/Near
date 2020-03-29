'use strict'

const User = use('App/Models/User');

class AuthController {
   
        //added auth on UserController 
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

    async showProfile({ auth,params }){    
        const userid = params.userid
        if(auth.user.id  !== Number(userid)){
            return 'You cannot see this profile'
        }
        return auth.user
    }
}

module.exports = AuthController
