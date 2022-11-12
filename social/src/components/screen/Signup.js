import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
   const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

    const PostData = ()=>{
        fetch('/signup',{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password,
                
            })
        }).then(ress=>  ress.json())
        .then(data=>{          
            if(data.err){  
                    M.toast({html: data.err,classes:"#e53935 red darken-1"})
            }else{
                M.toast({html:data.message,classes:"#43a047 green darken-1"})
                navigate('/signin')
            }
        })
        // .catch(err=>{
        //     console.log(err);
        // })
    }
    return(
        <div className="mycard">
        <div className='auth-card input-field'>
            <div className="card">
                <h2>Instagram</h2>
                <input type="text" placeholder='name'  value={name}
                    onChange={(e)=>setName(e.target.value)}/>
                <input type="text" placeholder='email'  value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder='password'  value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={PostData} className="btn waves-effect waves-light #4db6ac teal darken-1">Sign Up
                </button>
                <h5  className='p-2'>
                    <Link to="/signin" >Already have an Account ?</Link>
                </h5>
            </div>
        </div>
    </div>
    )
}

export default Signup