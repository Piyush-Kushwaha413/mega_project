import React from 'react'
import AuthService  from '../appwrite/confiDatabase';
import { Link } from 'react-router-dom';


function PostCard({$id ,featuredImage,title}) {

  return <Link to={`/post/${$id}`}>
  <div className='w-full bg-gray-100 rounded-xl flex flex-col items-center px-3 py-2'>
      <div className='w-full  mb-4'>
          <img src={AuthService.getFilePreview(featuredImage)} alt={title}
          className='rounded-xl h-60 w-56 object-cover m-auto my-2' />

      </div>
      <h2
      className='text-xl font-bold capitalize underline'
      >{title}</h2>
  </div>
</Link>
}

export default PostCard