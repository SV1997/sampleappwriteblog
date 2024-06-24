import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
function PostCard(props) {
  console.log(props.post.featured_image);
  return (
    <Link to={`/post/${props.post.$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4 '>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(props.post.featured_image)} alt="" className='rounded-xl' />
            </div>
            <h2 className='text-xl font-bold'>{props.post.title}</h2>
        </div>
    </Link>
  )
}

export default PostCard