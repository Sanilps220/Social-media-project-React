import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'
const navigator = useNavigate;

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        if (url) {
            fetch('/createpost', {
                method: 'post',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                    }
                    else {
                        M.toast({ html: "New post created successfulley", classes: "#43a047 green darken-1" })
                        console.log("db requests")
                        navigator('/')
                    }
                })
        }
    }, [url])

    //dqwnvafwq")"dq6icpspd")
    const postDetails = () => {
        console.log("clicked", image);

        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "my-app")
        data.append("cloud_name", "db6icpspd")
        fetch("https://api.cloudinary.com/v1_1/db6icpspd/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
                console.log("data", data);
                // console.log("title",title);
                // console.log("body",body);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='card input-filed'
            style={{
                textAlign: "center", maxWidth: 500, padding: 20, margin: "10px auto"
            }}>
            <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder='title'
            />
            <input
                onChange={(e) => setBody(e.target.value)}
                value={body}
                type="text"
                placeholder='body'
            />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Choose picture</span>
                    <input
                        type="file"
                        onChange={(e) => {
                            console.log(e.target.files)
                            setImage(e.target.files[0])
                        }} /
                    >
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #4db6ac teal darken-1"
                onClick={() => postDetails()}>
                Submit
            </button>
        </div>
    )
}

export default CreatePost