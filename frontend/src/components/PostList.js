import Card from "../components/Card"
import "../styles/postList.css"

function PostList({ posts }) {

    return (
        <div className = "post-list">
            {
                 posts.map((post) => <Card post = { post } key = { post._id } />)
            }
        </div>
    )
}

export default PostList

