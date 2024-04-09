import  conf  from "../config/config";
import {Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

   
    constructor (){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }



    // content
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            console.log(title,
                content,
                featuredImage,
                status,
                userId,);
            return await this.databases.createDocument(
                "65fbf9394ac3719ea1d1",
                "65fbf9808b32a407c917",
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }

           
        
    }
    
    // create documention data ==>> artical post

    // update post 
    async updatePost(slug,{title, content, featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                 slug,
                 {
                    title,
                    content,
                    featuredImage,
                    status,
                 }
            )
            
        } catch (error) {
            console.log("appwirte server :: updatePost :: error",error);
            
        }
    }

    // deletPost ()

    async deletePost (slug){
        try {
             return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
             ) 
             return true           
        } catch (error) {

            console.log("appwirte server :: deletePost :: error",error);
            return false
        }

    }
    async getPost(slug){
        try {
            await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            
        } catch (error) {
            console.log();
            
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
            
        } catch (error) {
            console.log("Appwrite server :: getPsots :: error", error);
            return false
            
        }
    }

    // file upload service 
    
    async uploadFile(file ){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log("Appwrite server :: uploadfile :: error", error);
            
        }
        return false
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )

    }
}

// console.log(conf.appwriteBucketId);

const databases = new Service();
export default databases
