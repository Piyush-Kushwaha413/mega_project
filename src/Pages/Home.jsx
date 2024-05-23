import React, { useEffect } from 'react'
import appwriteService from "../appwrite/confiDatabase";
import { PostCard, Container } from "../Componentes/import";
import { useState } from 'react';
import {useSelector} from 'react-redux'
import imgUrl from "../assets/appwriteBlog logo.png"

function Home() {
    const[post,setpost] = useState([])
    const authStatus = useSelector(state => state.status)
    useEffect(()=>{
        console.log(authStatus);
        appwriteService.getPosts().then((post)=>{
            if (post){
                console.log(post);} 
                setpost(post.documents)
        })
    .catch((error)=>(
        console.log(error)
    ))
    },[])
    return authStatus? (
                    <div className='w-full py-8'>
                        <Container>
                            <div className='flex flex-wrap'>
                                {post.map((post) => (
                                    <div key={post.$id} className='p-2 w-1/4'>
                                        <PostCard {...post} />
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </div>
                ):
                (
                    <div className="w-full py-8 mt-4 text-center">
                        <Container>
                            <div className="flex flex-wrap">
                                <div className="p-2 w-full h-44">
                                    <h1 className="text-2xl font-bold hover:text-gray-500">
                                        Login to read posts
                                    </h1>
                                </div>
                            </div>
                        </Container>
                    </div>
                )

    
//     authStatus {
//     return 

    
//  }return
}

export default Home