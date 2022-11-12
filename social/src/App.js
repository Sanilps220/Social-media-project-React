import React,{useEffect, useContext , createContext, useReducer } from 'react'
import { BrowserRouter as Router, Route , Routes ,useNavigate } from 'react-router-dom'
import "./App.css"
import Navbar from "./components/Navbar";
import Home from "./components/screen/Home";
import Signup from "./components/screen/Signup";
import Signin from "./components/screen/Signin";
import Profile from "./components/screen/Profile";
import CreatePost from './components/screen/CreatePost';
import { reducer , initialState } from './reducer/userReducer';
export const UserContext = createContext()

//swhich for chech active route kar karam karee ... 
const Routing = () =>{
  const history = useNavigate() 
  const {state, dispatch} = useContext(UserContext)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))    
    if(user){
      dispatch({type:"USER",  payload:user})      
    }else{
      history('/signin')
    }
  },[])
 //element={<Home />}
  return(
    <Routes>      
      <Route path='/' element={<Home />}/>     
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/create' element={<CreatePost />} />
    </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return( 
  <UserContext.Provider value={{state,dispatch}} >
  <Router>
    <Navbar />
    <Routing />
 
  </Router>
  </UserContext.Provider>
  )
}

export default App;
// const [state,dispatch] = useReducer(reducer, initialState)

// return (
//   <UserContext.Provider value={{state,dispatch}}>
    
//   </UserContext.Provider>
// );