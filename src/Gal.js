import React,{useState,Component} from 'react'
import a from "./Login"
import fire from "./config/fire"
import {Link,withRouter,Redirect} from 'react-router-dom'
import firebase from "firebase"
import { Widget ,addResponseMessage} from 'react-chat-widget';
import axios from "axios"
import logo from "./images/Sparrow Bird.png"
import 'react-chat-widget/lib/styles.css';

 

class Gal extends Component{
constructor(props)
{
super(props)
this.handleChange=this.handleChange.bind(this)
this.state={
files:null,
users:[],
error:"",
progress:"no file selected"
}
}
componentDidMount()
{
    addResponseMessage("NEED SOME HELP??");
}


     handleNewUserMessage = async () => {
        axios.get('https://api.adviceslip.com/advice')
        .then(function (response) {
           var aa=response["data"]["slip"]["advice"]
        
            addResponseMessage(aa)
        })
        .catch(function (error) {
          console.log(error);
        })
      
     }

handleChange=(files)=>{
this.setState({
files:files,
})

}
commonSave=()=>{
    this.setState({ progress:"uploading please wait......" });
    
let bucketName="images"
let file=this.state.files[0]

var a=bucketName+"/"+file.name;
let storageRef=firebase.storage().ref(a)
let uploadTask=storageRef.put(file)

var database = firebase.database();
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
()=>{
    

})
uploadTask.then((snapshot)=>{
    const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      this.setState({ progress:(progress+" % uploaded" )});
    
    
    
    snapshot.ref.getDownloadURL().then( 
    (downloadURL)=> { 
var newPostKey = firebase.database().ref().child('users').push().key;

       
        var updates = {};
        updates['/common/'+newPostKey] = downloadURL;
        updates['/commonn/'+newPostKey] = file.name;
        
        
        return firebase.database().ref().update(updates);
        }).catch((error)=>{console.log(error)
        this.setState({error})
    })  

})}
handleSave=()=>{
    this.setState({ progress:"uploading please wait......" });
   
let bucketName="images"
let file=this.state.files[0]
var a=bucketName+"/"+file.name;
let storageRef=firebase.storage().ref(a)
let uploadTask=storageRef.put(file)

var database = firebase.database();
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
()=>{
    

})
uploadTask.then((snapshot)=>{
    const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      this.setState({ progress:(progress+" % uploaded" )});
    
    
    snapshot.ref.getDownloadURL().then( 
    (downloadURL)=> { 
var newPostKey = firebase.database().ref().child('users').push().key;

       
        var updates = {};
        updates['/users/'+localStorage.getItem('key')+"--"+newPostKey] = downloadURL;
        updates['/userss/'+localStorage.getItem('key')+"--"+newPostKey] = file.name;
        
        
        return firebase.database().ref().update(updates);
        }).catch((error)=>{console.log(error)
        this.setState({error})
    })  

})}

showImage=()=>{
console.log("1")
let storageRef=firebase.storage().ref()
let spaceRef=storageRef.child('images/'+this.state.files[0].name)
storageRef.child('images/'+this.state.files[0].name).getDownloadURL().then((url)=>{
console.log(url)
document.getElementById('new-img').src=url
})
}
render()
{
    if(localStorage.getItem('key'))
    {
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
<div className="jumbotron ">
<div
                    className="alert alert-danger w-50 mx-auto"
                    style={{ display: this.state.error ? "" : "none" }}
                >
                    error in upload ,refresh and try again
                </div>
<div>
<p>{this.state.progress} </p>
{/* <form> */}
<div className="form-group">
<label className="text-muted">SELECT FILE </label>
<input
type="file"


className="form-control-file"
onChange={(e)=>{this.handleChange(e.target.files)}}
/>
</div>
<button className="btn btn-primary btn-raised mr-5" onClick={this.handleSave}>Save for me</button>
<button className="btn btn-primary btn-raised" onClick={this.commonSave}>Share with all</button>
{(this.state.progress=="uploaded successfully")&&(<p>*To upload another file please reload the page</p>)}

{/* <button className="btn btn-primary btn-raised" onClick={this.window.location.reload}>reload</button> */}
{/* <button onClick={this.showImage}>Show</button>  */}
<img id="new-img"/>
{/* </form> */}
</div>
</div>
<div className="container   w-50 mx-auto">
    <div className="w-50 mx-auto row" >
<Link className="btn btn btn-outline-success btn-raised btn-lg ml-5  col-sm"  to="/store" >My Files</Link>
<Link className="btn btn btn-outline-success btn-raised btn-lg ml-5 mt-5 col-sm"  to="/allstore" >Shared Files</Link>
</div>
    </div>
    <Widget handleNewUserMessage={this.handleNewUserMessage}
     profileAvatar={logo}
    title="Hi There!"
    subtitle="The Team usually replies in few minutes"/>
</>
)
    }
    else
    {
        return(
            <h1>login please</h1>
        )
    }
}
}
export default Gal;
