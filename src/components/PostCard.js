import React from 'react'
import appwriteService from "../appwrite/post"
import { Link } from "react-router-dom"
function PostCard({ $id, title, image }) {
    const filePreviewUrl = image ? appwriteService.getFilePreview(image) : "/placeholder.png"; // Use a placeholder image if image is missing
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={filePreviewUrl} alt={title} className="w-full object-cover h-60" />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
