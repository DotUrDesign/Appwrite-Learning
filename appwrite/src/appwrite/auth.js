const conf = require('../conf.js');
const { Client, Account, ID } = require("appwrite");

export class AuthService {
    // data members 
    // don't write the whole code of creation of client and account here, as we have minimize memory wastage.
    client = new Client();
    account;

    constructor() {
        const client = new Client()
            .setEndpoint('conf.appwriteUrl') // Your API Endpoint
            .setProject('conf.appwriteProjectId');  // Your project ID

       this.account = new Account(this.client);
    }

    // create Acccount
    async createAccount({ email, password, name}){
        try {
            let userAccount = await this.account.create(ID.unique(), email,password, name);

            if(userAccount){
                // call the login function by passing the email and password as parameters.
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // login 
    async login({ email, password}) {
        try {
            let promise = await this.account.createEmailSession(email, password);
            if(promise)
                return promise;
            else    
                return null;
        } catch (error) {
            throw error;
        }
    }

    // get Current user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    // logout
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;
