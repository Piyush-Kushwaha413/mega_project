import React from 'react'
import { useEffect,useState } from 'react'
import { Container, PostCard } from "../Componentes/import";
import appwriteService from "../appwrite/confiDatabase";

function AllPostCard() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
       appwriteService.getPosts([]).then((respons) => {
            if (respons) {
                setPosts(respons.documents)
            }
          
        })
    }, [])
 
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPostCard