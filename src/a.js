import React,{useState,Component} from 'react'
import a from "./Login"
import {Link,withRouter,Redirect} from 'react-router-dom'
import fire from "./config/fire"

import firebase from "firebase"
import {storage} from "firebase/firebase"
class Gal extends Component{
constructor(props)
{
super(props)
this.state={
files:null,
error:"",
progress:"nothing to be uploaded"
}
}
handleChange=(files)=>{
this.setState({
files:files,
error:""
})

}
 handleSave() {
    let bucketName="images"
    
     
  

    console.log('not started')
    let file=this.state.files[0]
    var a=bucketName+"/"+file.name;
    let storageRef=fire.storage().ref(a)
  console.log('start of upload')
  // async magic goes here...
  
   let uploadTask= storageRef.put(file)
  //initiates the firebase side uploading 
  uploadTask.on('state_changed', 
  (snapShot) => {
    //takes a snap shot of the process as it is happening
    console.log(snapShot)
  }, (err) => {
    //catches the errors
    console.log(err)
  }, () => {
    // gets the functions from storage refences the image storage in firebase by the children
    // gets the download url then sets the image from firebase as the value for the imgUrl key:
    storage.ref('images').child(file.name).getDownloadURL()
     .then(downloadURL => {
        var newPostKey = firebase.database().ref().child('users').push().key;

       
             var updates = {};
             updates['/users/' + localStorage.getItem('key')+"--"+file.name+"-"+newPostKey] = downloadURL;
            
            
             return firebase.database().ref().update(updates);
             }).catch((error)=>{console.log("error")
             this.setState({error})
            })
     })
  
  }
//  handleSave=()=>{
// let bucketName="images"
// let file=this.state.files[0]
// let thumb="thumbs"
// var a=bucketName+"/"+file.name;
// let storageRef=fire.storage().ref(a)


// var database = firebase.database();
// let uploadTask= storageRef.put(file)
// uploadTask.on('state_changed', 
// (snapShot) => {
  
//   console.log(snapShot)
// }, (err) => {
//   console.log(err)
// }, () => {
  
//   storage.ref('images').child(file.name).getDownloadURL()
//    .then(downloadURL => {
//     var newPostKey = firebase.database().ref().child('users').push().key;

       
//     var updates = {};
//     updates['/users/' + localStorage.getItem('key')+"--"+file.name+"-"+newPostKey] = downloadURL;
    
    
//     return firebase.database().ref().update(updates);
//     }).catch((error)=>{console.log("error")
//     this.setState({error})
//    })
// })

// // uploadTask.snapshot.ref.getDownloadURL().then( 
// //     (downloadURL)=> { 
// // var newPostKey = firebase.database().ref().child('users').push().key;

       
// //         var updates = {};
// //         updates['/users/' + localStorage.getItem('key')+"--"+file.name+"-"+newPostKey] = downloadURL;
        
        
// //         return firebase.database().ref().update(updates);
// //         }).catch((error)=>{console.log("error")
// //         this.setState({error})
// //     })  
// this.setState({ progress:"uploaded successfully" });
// }
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
<Link className="navbar-brand text-center" to="/">PICSHARE</Link>
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
<p>{this.state.progress}</p>
{/* <form> */}
<div className="form-group">
<label className="text-muted">SELECT FILE </label>
<input
type="file"


className="form-control-file"
onChange={(e)=>{this.handleChange(e.target.files)}}
/>
</div>
<button className="btn btn-primary btn-raised" onClick={this.handleSave}>Save</button>
{(this.state.progress=="uploaded successfully")&&(<p>*To upload another file please reload the page</p>)}

{/* <button className="btn btn-primary btn-raised" onClick={this.window.location.reload}>reload</button> */}
{/* <button onClick={this.showImage}>Show</button>  */}
<img id="new-img"/>
{/* </form> */}
</div>
</div>
<div className="container   w-50 mx-auto">
    <div className="w-50 mx-auto " >
<Link className="btn btn btn-outline-success btn-raised btn-lg ml-5"  to="/store" >go to gallery</Link>
</div>
    </div>
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
