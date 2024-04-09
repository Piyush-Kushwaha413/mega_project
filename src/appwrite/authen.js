import  conf  from "../config/config";
import { Account, ID, Client } from "appwrite";


// export class AuthService{
//     client = new Client();
//     Account; 

//      Constructor () {
//         this.client
//             .setEndpoint(conf.appwriteUrl)
//             .projectId(conf.appwriteProjectId);
//         this.account = new Account(this.client);

//      }
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    //  sign up method // create method to create user account

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
                
            } else {
                return userAccount;
            }
        }
        catch(error){
            throw(error);
        }
    }
    // loged in method  
    async login ({email, password}){
        try {
            return await this.account.createEmailSession(email, password);    
        } catch (error) {
            throw(error)
            
        }
    }
    // getCurrentUser 
    async getCurrentUser(userId){
        try {
            return await this.account.get(userId);
            
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error" ,error);
            
        }
        return null;
    }
    // logOut method errorFound in hitesh sir github
    async logOut(userId){
        try {
           return await this.account.deleteSessions(userId);
        } catch (error) {
            console.log("Appwrite servive :: logout :: error",error);
            
        }
         

    }
}

const authService = new AuthService();

const data = {
    email:"vishes@one.gmail.com",
    password:"12345678",
    name:"one"
}

// console.log(conf);
// console.log(authService.createAccount(data));

export default authService;
