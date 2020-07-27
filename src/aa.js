import React,{Component} from "react"
import {Link,withRouter,Redirect} from 'react-router-dom'
import firebase from "firebase"
import Skeleton from '@yisheng90/react-loading'
import ReactLoading from 'react-loading';


class allStore extends Component{
    constructor(props)
    {
        super(props)
       // this.createstatef=this.createstatef.bind(this)
        this.state ={
            words:[],
            names:[],
            list:[],
            progress:0,
            progress1:0
            
        }
    }
    componentDidMount()
    {
        const wordRef=firebase.database().ref("users")
        const wordRef1=firebase.database().ref("userss")
        wordRef.on('value',(snapshot)=>
        {
            let words=snapshot.val();
            let newState=[];
            for(let word in words)
            {
               var k=word.split("--",2) 
               
               if(k[0]===localStorage.getItem('key'))
               {
                newState.push({
                    
                 
                 word:words[word]
                    
                })
            }
            }
            this.setState({
                words:newState,
                progress:1
            })
        })
        wordRef.on('value',(snapshot)=>
        {
            let words=snapshot.val();
            let newState=[];
            for(let word in words)
            {
               var k=word.split("--",2) 
               
               if(k[0]===localStorage.getItem('key'))
               {
                newState.push({
                    
                 names:words[word]
                    
                })
            }
            }
            this.setState({
                words:newState,
                progress1:1
            })
        })
        //   var i
        // let state1=[]
        // var len=this.state.words.length
        // for(i=0;i<len;i++)
        // {
        //     state1.push(
        //         {
        //          url:this.state.words.word[0],
        //          name:this.state.names.names[0]  

        //         }
        //     )
        // }
        // this.setState({list:state1})
       
       


    }
    // createstatef=()=>
    // {
        
    //     var i
    //     let state1=[]
    //     var len=this.state.words.length
    //     console.log(len)
    //     for(i=0;i<len;i++)
    //     {
    //         state1.push(
    //             {
    //              url:this.state.words[i].word,
    //              name:this.state.names[i] .names 

    //             }
    //         )
    //     }
    //    // this.setState({list:state1})


    // }
    delete(url)
    {

    }
  
render()
{
    
    
      
    
    
    if(localStorage.getItem('key'))
    {
    if(this.state.progress==1&&this.state.progress1==1)
    {
        var i
        let state1=[]
        var len=this.state.words.length
        console.log(len)
        for(i=0;i<len;i++)
        {
            state1.push(
                {
                 url:this.state.words[i].word,
                 name:this.state.names[i] .names 

                }
            )
        }
        console.log(state1)
        
        
       // {var length=(this.state.words).length}
       
    return(
        <>
        <div>
<nav className="navbar navbar-expand-lg navbar-light bg-info">
<Link className="navbar-brand text-center" to="/">FILESHARE</Link>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
<div className="navbar-nav">
</div>
</div>
</nav>
</div>
<div className="jumbotron row">
{state1.map((word)=>
{
  return( 
      <> 
      <div >
<div className="card col-sm mt-3 mb-3 ml-3 mr-3 rounded mb-3" style={{width:"18rem",border: "6px solid black"}}>
  {/* <img className="card-img-top" src="..." alt="Card image cap"/> */}
  <div className="card-body" >
  
    <p className="card-text">{word.name}</p>
    <a href={word.word} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-raised">download</a>
    <Link   className="btn btn-primary btn-raised ml-3">delete</Link>
  </div>
  </div>
</div>
</>
  )

    



})
}
</div>
        
            
  
        </>)}
        else
       return (
           <>
            <div>
<nav className="navbar navbar-expand-lg navbar-light bg-info">
<Link className="navbar-brand text-center" to="/">FILESHARE</Link>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
<div className="navbar-nav">
</div>
</div>
</nav>
</div>
<div style={{
    position:"fixed",
    top: "40%",
    left: "45%",
    width:"30em",
    height:"18em",
    margintop: "-9em",
    marginleft: "-15em", 
    
    }}>
<ReactLoading type={"spokes"} color={"#fffff"} height={'20%'} width={'20%'} />
</div>
        </>


       )}
          else
          return(
            <div>
            <h1>login first</h1>
            <a href="http://localhost:3000">click here to login</a>
           
         </div>

          )
        }
        
        
        }

export default allStore;


