import { Link } from "react-router-dom"
import "../styles/card.css"

function Card({ post }) {

    const postTitle = post.title
    const postBody = post.body

    if (postTitle.length > 75) {
        post.title = postTitle.slice(0, 75).concat(" ...")
    }

    if (postBody.length >= 160) {
        post.body = postBody.slice(0, 151).concat(" ...")
    }

    return (
        <div className = "card">

            <img src = { post.image } className = "post-image" alt = "post-cover"/>

            <div className = "post-metadata">
                <h2 className = "title"> { post.title } </h2> 
                <div className = "epigraph"> { post.body } </div>

                <div className = "author-and-date">
                    <div className = "author"> { post.author } </div>
                    <div className = "separator"> • </div>
                    <div className = "date"> { post.createdAt } </div>
                </div>

                <div className = "read-more"> <Link to = { `post/${ post._id }` }> Read More </Link> </div>
            </div>
        </div>
    )
}

export default Card 

