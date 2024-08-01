import conf from "../conf/conf";
import {Client,Account,ID} from "appwrite"
export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account=new Account(this.client)
    }
    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                // Proceed to Login
                return this.login({email,password})
            }
            else return userAccount
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.error("Login error:", error);
            throw error
        }
    }

    async getCurrentUser(){
        try {
            const user=await this.account.get();
            return user;
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error",error)
            return null;
        }
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error)
        }

    }
}

const authService= new AuthService();

export default authService;