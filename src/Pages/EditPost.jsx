import React, { useEffect,useState } from 'react'
import appwriteService from "../appwrite/confiDatabase";
import { PostForm, Container } from "../Componentes/import";
import { useNavigate, useParams } from 'react-router-dom';
function EditPost() {
    const [post, setpost] = useState(null)
    const {slug} =  useParams()
    // const navigate =  useNavigate()
   const navigate =  useNavigate();

   useEffect(() => {
     if (slug) {
      console.log(slug)
        appwriteService.getPost(slug)
        .then((post)=>{
            if (post) setpost(post)
           })
        .catch((error)=>(console.log(error)))
     } else navigate("/ ")
   }, [slug,navigate]) 
   return  (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  )
}

export default EditPost