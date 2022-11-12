import React, { useState , useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Login = () => {
    const {state, dispatch} = useContext(UserContext)
    const navigate = useNavigate()
   
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const PostData = ()=>{
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        return M.toast({html: "Invalid Email",classes:"#e53935 red darken-1"})
        }
        fetch('/signin',{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({               
                email,
                password
            })
        })
        .then(res=> res.json())
        .then(data=>{          
            if(data.error){
                M.toast({html: data.error,classes:"#e53935 red darken-1"})
            }else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data})
                M.toast({html:"Logged in success",classes:"#43a047 green darken-1"})
                navigate('/');               
            }
        })
        .catch(err=>{
            console.log("err catch",err);
        })
    }
    
    return (
        <div className="mycard">
            <div className='auth-card input-field'>
                <div className="card">
                    <h2>Instagram</h2>
               
                    <input type="text" placeholder='email' value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder='password' value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                    <button onClick={PostData} className="btn waves-effect waves-light #4db6ac teal darken-1" >Sign in
                    </button>
                    <h5 className='p-2'>
                    <Link to="/signup" >Create a new Account ?</Link>
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default Login