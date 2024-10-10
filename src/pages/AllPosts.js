import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/post';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userData = useSelector((state) => state.auth.userData);
    const userId = userData?.userData?.$id;
    useEffect(() => {
        const fetchPosts = async () => {
            if (userId) {
                try {
                    const response = await appwriteService.getPosts();
                    if (response?.documents) {
                        if (response.documents.length > 0) {
                            const userPosts = response.documents.filter(post => post.userID === userId);
                            setPosts(userPosts);
                        }
                    } else {
                        setError('Unexpected response format');
                        console.log("Unexpected response format");
                    }
                } catch (err) {
                    setError('Failed to fetch posts');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            } else {
                setPosts([]); // Reset posts if userId is null
                setLoading(false);
            }
        };
        fetchPosts();
    }, [userId]);

    if (loading) return <h1>Loading posts...</h1>;

    if (error) return <h1>{error}</h1>;

    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-wrap">
                    {posts.length === 0 ? (
                        <h1>No posts available. <Link to="/add-post" className='italic font-bold underline hover:text-blue-500'>Add a post</Link> to see them here.</h1>
                    ) : (
                        posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
