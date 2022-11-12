import React, { useEffect, useState, useContext } from 'react'
//import { put } from '../../../../Server/routes/post'

import { UserContext } from '../../App'

const Home = () => {
  const [data, setData] = useState([])
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    fetch('/allpost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log("data :", result);
        setData(result.posts)
      })
  }, [])


  const likePost = (id) => {
    fetch('/like', {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then(result => {
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
       setData(newData) 
      })
      .catch(err => {
        console.log(err);
      })
  }
  const unlikePost = (id) => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err);
      })
  }

  const makeComment = (text, postId) => {
    fetch('/comment', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId,
        text
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch(err => console.log(err))
  }
  const deletePost = (postId) => {
    fetch(`/deletePost/${postId}`, {
      method: 'delete',
      headers: {
        Authorization: "Bearer " + localStorage.getItem('jwt')
      }
    }).then(res => res.json() )
      .then(result => {
        console.log("del",result)
        
        const newData = data.filter(item => {
          return item._id !== result._id
        })

          setData(newData) 

      })
      .catch(err => {
        console.log(err);
      })
  }
const deleteComment = (postId)=>{

  fetch(`/deletetext/${postId}`,{
    method:"delete",
    headers:{
      Authorization:"Bearer "+ localStorage.getItem('jwt')
    }
  }).then(res=> res.json())
  .then(result => {
    console.log(result.text)
  })
}
  return (
    <div className='home'>
      {
        data.map(item => {
          return (
            <div className="card home-card" key={item._id} >
              <h5>{item.postedby.name}
                {
                  item.postedby._id === state
                                    &&
                  <i className="material-icons" style={{ float: 'right' ,cursor:"pointer"}}
                    onClick={() => deletePost(item._id)} >delete</i>
                }
              </h5>
              <div className="card-image">
                <img src={item.photo} alt="flower" />
              </div>
              <div className="card-content">
                <h6>{item.title}</h6>
                <p>{item.body} </p>
                <i className="material-icons" style={{ color: "red" }}>favorite</i>
                {

                  item.likes.includes(state)

                    ? <i className="material-icons like"
                      onClick={() => { unlikePost(item._id); console.log(state._id) }}>thumb_down</i>

                    : <i className="material-icons like"
                      onClick={() => { likePost(item._id); console.log(state) }}>thumb_up</i>
                }
                <i onClick={dispatch({ status: 'false' })} ></i>
                <h6>{item.likes.length}</h6>
                {
                  item.comments.length > 0 ?
                    item.comments.map(record => {
                      return (                        
                        <div>
                        <h6 key={record._id}><span style={{ fontWeight: "500" }}>{record.postedby.name} </span> {record.text}  </h6>
                        <span>
               <i className="material-icons" style={{ float: 'right' ,cursor:"pointer"}}
               onClick={() => deleteComment(record._id)} >delete</i></span> </div>
                      )
                    })
                    :
                    <p></p>
                }

                <form onSubmit={(e) => { 
                  e.preventDefault()
                  makeComment(e.target[0].value, item._id);
                }}>
                  <input type="text" placeholder="add a comment" />
                </form>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home