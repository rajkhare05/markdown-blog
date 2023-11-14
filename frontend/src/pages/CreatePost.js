import { useContext, useState } from "react"
// import { useEffect, useRef } from "react"
import Button from "@mui/material/Button"
import SaveIcon from "@mui/icons-material/Save"
import VisibilityIcon from "@mui/icons-material/Visibility"
import CreateIcon from "@mui/icons-material/Create"
import PublishIcon from "@mui/icons-material/Publish"
import ReactMarkdown from "react-markdown"
import MarkdownCustomComponents from "../utils/MarkdownCustomComponents"
import ButtonGroup from "@mui/material/ButtonGroup"
import "../styles/createPost.css"
import { readingDuration } from "../utils/util"
import { useNavigate } from "react-router-dom"
import TokenContext from "../contexts/TokenContext"
import axios from "axios"

function CreatePost() {
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [coverImageURL, setCoverImageURL] = useState('')
    const [paneWindow, setPaneWindow] = useState('create')
    const { accessToken } = useContext(TokenContext)
    const navigate = useNavigate()

    // const textareaHeightRef = useRef(null)

    const clickHandler = () => {
        paneWindow === 'create' ? setPaneWindow('preview') : setPaneWindow('create')
    }

    const savePostHandler = async (token) => {
        try {
            const res = await axios.post('http://localhost:4000/post/new', { 
                title: title, 
                body: content, 
                image: coverImageURL
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            const data = res.data
            navigate(`/post/${data.id}`)
            
        } catch (err) {
            console.error(err)
        }

    }

    const buttonStyle = {
        textTransform: 'none'
    }


    const newLineHandler = () => {
        const textarea = document.getElementsByClassName('post-container')[0];
        /*
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
        textarea.scrollTop = textarea.scrollHeight + 30 + 'px';
        */
        textarea.focus();
    };

    /*
    useEffect(() => {
        if (textareaHeightRef != null && paneWindow === 'create') {
            const scrollOffset = textareaHeightRef.current.scrollHeight - textareaHeightRef.current.clientHeight
            textareaHeightRef.current.scrollTop = scrollOffset
        }
    }, [content, paneWindow])
    */

    return (
        <div className = "create-post">
            <div className = "button-group">
                <ButtonGroup variant = "contained">
                    {
                        paneWindow === "create"
                        ? <Button variant = "contained" style = { buttonStyle } endIcon = { <VisibilityIcon/> } onClick = { clickHandler }> Preview </Button>
                        : <Button variant = "contained" style = { buttonStyle } endIcon = { <CreateIcon/> } onClick = { clickHandler }> Edit </Button>

                    }
                    <Button variant = "contained" style = { buttonStyle } endIcon = { <SaveIcon /> } onClick = { async () => await savePostHandler(accessToken) }> Save </Button>
                    <Button variant = "contained" style = { buttonStyle } endIcon = { <PublishIcon /> }> Publish </Button>
                </ButtonGroup>
            </div>
            { 
                paneWindow === "create" ?
                <div className="new-post-area">
                    <textarea 
                        className = "post-title-container" 
                        value = { title } 
                        onChange = { (e) => setTitle(e.target.value) } 
                        placeholder = "Title">
                    </textarea>

                    <textarea 
                        className = "post-cover-image-url"
                        value = { coverImageURL }
                        onChange = { (e) => setCoverImageURL(e.target.value) }
                        placeholder = "Cover Image URL">
                    </textarea>
                    
                    <textarea 
                        //ref = { textareaHeightRef } 
                        onInput = { newLineHandler } 
                        className = "post-container" 
                        value = {content} 
                        onChange = { (e) => setContent(e.target.value) } 
                        placeholder = "Start from here ...">
                    </textarea>
                </div>
                : 
                <div className = "preview-container">
                    <div className = "p-metadata">
                        <img src = "https://api.multiavatar.com/john.png" className = "profile-pic" alt = "User Profile Pic"/>
                        <div className = "p-box">
                            <div className = "p-author"> John Doe </div>
                            <div className = "p-published"> { readingDuration(content.length) } • 22 Jan 2023 </div>
                        </div>
                    </div>
                    {/* TODO: Fix image width & height */}
                    <ReactMarkdown components = { MarkdownCustomComponents } className = "post-title">
                        { '# '.concat(title) }
                    </ReactMarkdown>
                    
                    <ReactMarkdown components = { MarkdownCustomComponents } className = "preview-post">
                        { content }
                    </ReactMarkdown>
                    {/* TODO: Implement function that adds id or className to elements */}
                </div>
            }
        </div> 
    )
}

export default CreatePost

