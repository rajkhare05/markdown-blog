import "../styles/card.css"

function Card({ post }) {

    let postTitle = post.title
    const postTitleLength = postTitle.length

    if (postTitleLength > 80) {
        post.title = postTitle.slice(0, 80).concat(" ...")
    }

    return (
        <div className="card">
            <img className="image" src={ post.image } width="410px" height="482px" />
            <div className="post-metadata">
                <div className="author">{ post.author }</div>
                <div className="separator">•</div>
                <div className="timestamp">{ post.createdAt }</div>
            </div>
            <div className="title">{ post.title }</div>
            {/* <div className="hidden-post-body">{ post.body }</div> */}
        </div>
    )
}

export default Card
