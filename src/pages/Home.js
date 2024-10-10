import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/post'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'


function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector(state => state.auth.status);
    useEffect(() => {
        authStatus && appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [authStatus])
    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hove:text-gray-500">
                                {authStatus ? `Welcome to myBlog` : "Login to read posts"}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) =>{
                       return <div key ={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    })}
                </div>
            </Container>
        </div>
    )
}

export default Home
