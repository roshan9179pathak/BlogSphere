import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (user) {
        return this.authLogin({ email, password });
      } else {
      }
      return true;
    } catch (error) {
      throw error.message;
    }
  }

  async authLogin({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async authLogout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(`Error occured in :: auth :: authLogout`, error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async getSession({sessionId}){
    try {
        await this.account.getSession(sessionId)
    } catch (error) {
        
    }
  }
}

const authservices = new AuthServices();

export default authservices;
