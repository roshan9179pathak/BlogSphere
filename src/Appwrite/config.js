import conf from '../conf/conf'
import {Client,Account,ID,Databases,Storage, Query} from 'appwrite'

export class Configure{
    client = new Client()
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title,slug,featuredImage,content, status,userId}){
        try {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                featuredImage,
                content,
                status,
                userId
            }

         )
            
        } catch (error) {
            console.log(`Error occured in config:: createPost`,error.message);
            throw error.message;
        }
    }

    async updatePost(slug,{title,featuredImage,status,content}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    status,
                    content
                }
            )
        } catch (error) {
            console.log(`Error occured in :: appwrite : config :: updatePost`,error);
        }
    }

        async deletePost(slug){
            try {
                 await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug
                )
                return true
            } catch (error) {
                console.log(`Error occured in :: deletepost`);
                return false
            }
        }

      async getPost(slug){
        try {
           return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
           ) 
        } catch (error) {
            console.log(`Error occured in :: appwrite :: config :: getPost`,error);
            return false
        }
      }  

      async getAllposts(query){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [query]
            )
            
        } catch (error) {
            console.log(`Error occured in :: appwrite :: getAllposts`,error);
            return false
        }
      }

      //---------------- File Upload Services---------------------

      async uploadFile(file){
        try {
           return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log(error.message);
            return false
           
        }
      }

      async updateFile(fileId){
        try {
            await this.storage.updateFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log(`Error occured in :: appwrite :: config :: updateFile`);
            return false
        }
      }

      async deleFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(`Error occured in appwrite :: deleteFile`);
        }
      }

       getFilePreview(fileId){
        try {
             return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            throw error
        }
      }
}

const services = new Configure()

export default services;