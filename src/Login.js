import React,{Component} from "react"
import { directive, isArgumentPlaceholder } from "@babel/types"
import {Link,withRouter,Redirect} from 'react-router-dom'
import fire from "./config/fire"
import Gal from "./Gal"
import {isAuth} from "./index"


class Login extends Component{
  
     constructor(props)
     {
       
       super(props)
         this.login=this.login.bind(this)
         this.signup=this.signup.bind(this)
        
         
         this.handleChange=this.handleChange.bind(this)
        this.state ={
        
            
            email:"",
             password:"",
             user:{},
             error:"",
             open1:false
         }
     }
    authListener()
   {
     fire.auth().onAuthStateChanged((user)=>{
       if(user)
       {
        this.setState({user})
      }
       else this.setState({user:null})
     })
  }
  

  logout(e)
  {

     e.preventDefault()
    
      
      fire.auth().signOut().then((u)=>
      console.log(u)).catch((error)=>(console.log("error is")))
      localStorage.removeItem('key')
      
      
     
 }
  componentDidMount()
  {
    this.authListener();
  }
    signup(e)
    {
        e.preventDefault()
        fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>
        console.log(u)).catch((error)=>{
          this.setState({error:"wrong combination"})
          console.log(error)})
        this.setState({
            email:"",
            password:"",
            open1:true
            
            
            
        })
    }
    login(e)
    {
      e.preventDefault()
      fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
      console.log(u)
      localStorage.setItem('test', 1)}).catch((error)=>{
        localStorage.removeItem('test')
        this.setState({error:"wrong combination"})
        console.log(error)})
      this.setState({
          email:"",
          password:"",
          open1:true
      
          
          
          
      })
     
      
      
    }
     
    handleChange(e)
    {
      this.setState({error:""})
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    aaaa()
    {
        if(this.state.user)
        return true
        else
        return false
    }
   
    
render()
{
    if(!fire.auth().currentUser)
    {
       
    return(
     
      
       
       
        <div style={{backgroundColor: '#478559'}}>
      
        
      
           <div >
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      
      <Link className="navbar-brand text-center" href="#">FILESHARE</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
         
         
          
        </div>
      </div>
    </nav>
    </div>
    <div className="jumbotron "  >
        <h1 className="text-center"><u>WELCOME TO FILESHARE</u></h1>
        <p className="lead text-center">SAVE AS WELL ASSHARE YOUR FILES</p>

    </div>
    <div
                    className="alert alert-danger w-50 mx-auto"
                    style={{ display: this.state.error ? "" : "none" }}
                >
                    {this.state.error}
                </div>
           
           <div className="jumbotron w-50 mx-auto" style={{width: "18rem",height:"20rem",background:"#d3d3d3",width:"18rem",border: "6px solid black"}}>
          
            <form>
                <div className="form-group">
                <label className="text-dark">Email</label>
                <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.email}/>
                </div>
                <div className="form-group">
                <label className="text-dark">Password</label>
                 <input
                 name="password"
                type="password"
                className="form-control"
                id="password"
                onChange={this.handleChange}
                value={this.state.password}/>
                </div>
               
                {/* <button className="btn btn-primary btn-raised" onClick={this.signup}></button> */}
                  <button className="btn btn-primary btn-raised" onClick={this.login}>signin</button>  
                  
                
            </form>
            
            </div>
        </div>

    )
    }
    else
    {
      console.log(this.state.user.uid)
      localStorage.setItem('key',this.state.user.uid)
      
        return (
            <div style={{backgroundColor: '#478559'}}>
           
           
            <div>
<nav className="navbar navbar-expand-lg navbar-light bg-info">
  
  <Link className="navbar-brand text-center" href="#">{fire.auth().currentUser.email}</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
     
     
      
    </div>
  </div>
</nav>
</div>
<div className="jumbotron " >
        <h1 className="text-center"><u>WELCOME TO PICSHARE</u></h1>
        <p className="lead text-center">CREATE YOUR CIRCLE TO SHARE YOUR PHOTOS WITH...</p>

    </div>
            <div className="jumbotron w-50 mx-auto" style={{width:"18rem",border: "6px solid black",background:"##d3d3d3"}}>
                <h3>{fire.auth().currentUser.email} kindly go to collections</h3>
                <button className="btn btn-raised btn-primary mr-5 mt-5" onClick={this.logout}>logout</button> 
                
                <div className="d-inline-block">
                <Link className="btn btn-raised btn-success ml-5 mt-5" to={`/gal/${this.state.open1}`}>collection</Link> 
                </div>
            </div>
            </div>
        )
    }
}


}


export default Login;




