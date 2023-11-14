import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { getFormattedDate } from "../utils/util"
import PostList from "../components/PostList"
import Loader from "../components/Loader"
import "../styles/home.css"

function Home() {
    const [loading, setLoading] = useState(true)
    const posts = useLoaderData()

    useEffect(() => {
        setLoading(true)
        homeLoader().then(() => setLoading(false))
    }, [])
    
    return (
        <div id = "home">
            {   
                loading ? <Loader /> : <PostList posts = { posts } /> 
            }
        </div>
    )
}

export default Home

export const homeLoader = async () => {
    try {
        const response = await fetch(`http://localhost:4000/post`)
        const data = await response.json()
        const { posts, authors } = data

        posts.forEach((post) => {
            const authorID = post.author
            post.author = authors[authorID]
            post.createdAt = getFormattedDate(post.createdAt)
        })
        return posts
        
    } catch (err) {
        console.error(err);
        return null;
    }
}
