

 class Auth {
    constructor() {

        this.authenticated = false;

    }


    //cb is a callback to the server to check the token status
    login(cb){
        this.authenticated = true;
        console.log("logged inn");
        cb();

    }

    logout (cb){
        this.authenticated = false;
       
        cb();
    }

    isAuthenticated (){
        return this.authenticated;
    }
}

export default new Auth();