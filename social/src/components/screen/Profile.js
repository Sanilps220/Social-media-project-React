import React, { useContext, useEffect, useState } from 'react'
import {UserContext} from '../../App'

const Profile = () => {
    const [pics, setPics] = useState([]);
    const {state , dispatch } = useContext(UserContext)
    console.log(state);
    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                setPics(result.mypost)
            })
    }, [])

    return (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div className="" style={{
                display: "flex", justifyContent: "space-arround", margin: "18px 0px", borderBottom: '1px solid black'
            }
            }>
                <div className="c">
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="pic" />
                </div>
                <div className="c">
                    <h4>{state ? state.name : ". . . "}</h4>
                    <div className="" style={{ display: 'flex', justifyContent: "space-between", width: "100%" }}>
                        <h5>40 post</h5>
                        <h5>13 followers</h5>
                        <h5>20 following</h5>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    pics.map(item =>{
                        return(
                            <img className='item' key={item._id} src={item.photo} alt={item.title} />
                        )
                    })
                }
         <img className='item' src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="kp" />
            </div>
        </div>
    )
}

export default Profile