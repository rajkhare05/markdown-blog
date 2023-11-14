import { useLoaderData } from "react-router-dom"
import { getFormattedDate, readingDuration } from "../utils/util"
import "../styles/post.css"
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import MarkdownCustomComponents from "../utils/MarkdownCustomComponents";

function Post() {

    const post = useLoaderData()
    document.title = post.title;

    return (
        <div className="post">
            <div className = "p-metadata">
                <img src = "https://api.multiavatar.com/john.png" className = "profile-pic" alt = "User Profile Pic"/>
                <div className = "p-box">
                    <div className = "p-author"> { post.author } </div>
                    <div className = "p-published"> { readingDuration(post.body.length) } • { post.createdAt } </div>
                </div>
            </div>
            <div className="post-title"> { post.title } </div>
            <img src={post.image} width="800px" height="400px" className="cover-image" alt="" />
            <div className="post-body"> 
                <ReactMarkdown components = { MarkdownCustomComponents }>
                    { post.body } 
                </ReactMarkdown>
            </div>
        </div>
    )
}

export const postLoader = async ({ params }) => {
    const { id } = params
    try {
        const response = await fetch(`http://localhost:4000/post/${id}`)
        const data = await response.json()
        const { post, author } = data;
        post.author = author.firstName + " " + author.lastName;
        post.createdAt = getFormattedDate(post.createdAt);
        return post

    } catch (err) {
        console.error(err);
    }
}

export default Post
