import React, {useState,useRef} from 'react';
import axios from 'axios';
import './stylesheets/home.css'

export default function LoginSignup(){
    let [signup_error_msg,setSignupErrMsg]=useState()
    let [loginActive,setLoginActive]=useState('inactive')
    let [signupActive,setSignupActive]=useState('active')
    const [data,setData]=useState({
        gardenid:"",
        name:"",
        phone:"",
        profession:"",
        password:"",
        confirmPassword:"",
    });
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSignup=(e)=>{
        e.preventDefault();
        console.log(data)
        if(data.password!=data.confirmPassword){
            console.log("Password!=confirmPassword")
            setSignupErrMsg("Password and confirm passwords do not match !")
            signup_err_msg.current.style.display='block'
        }
        else{
            //console.log(data)
            axios.post('user/create',data)
            .then(res=>{
                console.log(res.data.token,res.data.user);
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('user',JSON.stringify(res.data.user))
                window.history.replaceState('page2', 'Title', '/profile');
                window.location.reload()
            }).catch(e=>{
                console.log(e);
                setSignupErrMsg("Phone number already in use or password too short")
                signup_err_msg.current.style.display='block'
            })
            }
    }
    const handleLogin=(e)=>{
        e.preventDefault();
        //console.log(data)
        const loginData={
            phone:data.phone,
            password:data.password
        }
        axios.post('user/login',loginData)
        .then(res=>{
            console.log(res.data.token,res.data.user);
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('user',JSON.stringify(res.data.user))
            //console.log(res.data.user)
            window.history.replaceState('page2', 'Title', '/profile');
            window.location.reload()
        }).catch(e=>{
            console.log(e);
            err_msg.current.style.display='block'
        })
    }
    const clearData=()=>{
        data.gardenid="";
        data.name="";
        data.phone="";
        data.profession=""
        data.password="";
        data.confirmPassword="";
    }
    const loginForm=useRef()
    const signupForm=useRef()
    const err_msg=useRef()
    const signup_err_msg=useRef()
    const selectSignup=(e)=>{
        clearData()
        loginForm.current.style.display='none'
        setLoginActive("inactive")
        signupForm.current.style.display='block'
        setSignupActive("active")
    }
    const selectLogin=(e)=>{
        clearData()
        signupForm.current.style.display='none'
        setSignupActive("inactive")
        loginForm.current.style.display='block'
        setLoginActive("active")
    }
    return (
        <>
            <div class='buttons-main'>
                <button class={"toggle_button"+" "+signupActive} onClick={selectSignup}>Signup</button> 
                <button class={"toggle_button"+" "+loginActive} onClick={selectLogin}>Login</button>
            </div>
            <br></br> 
            <div class='container' ref={signupForm} style={{display:"block"}}>
            <form  onSubmit={handleSignup} autoComplete="on">
                <div class="row">
                <div class="col-25"><label> Name:</label></div>
                <div class="col-75"><input type="text" name="name" required value={data.name} onChange={handleChange} /></div>
                </div>
                <div class="row">
                <div class="col-25"><label>Phone:</label></div>     
                <div class="col-75"><input type="text" name="phone" required value={data.phone} onChange={handleChange} /></div>
                </div>
                <div class="row">
                <div class="col-25"><label>Profession:</label> </div>    
                <div class="col-75"><select name="profession" required value={data.profession} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="owner">Owner</option>
                    <option value="supervisor">supervisor</option>
                </select>
                </div>
                </div>
                <div class="row">
                <div class="col-25"><label>Garden ID:</label> </div>    
                <div class="col-75"><input type="text" name="gardenid" required value={data.gardenid} onChange={handleChange} /></div>
                </div>
                <div class="row">
                <div class="col-25"><label>Passowrd:</label> </div>    
                <div class="col-75"><input type="password" name="password" required value={data.password} onChange={handleChange} /></div>
                </div>
                <div class="row">
                <div class="col-25"><label>Confirm password:</label></div>     
                <div class="col-75"><input type="password" name="confirmPassword" required value={data.confirmPassword} onChange={handleChange} /> </div> 
                </div>        
                <div class="row">
                <div class="row"><small ref={signup_err_msg} style={{display:"none", color:"red"}}>{signup_error_msg}</small></div> 
                <input type="submit" value="Submit" />
                </div>
            </form>
            </div>
            <div class='container' ref={loginForm} style={{display:"none"}}>
                <form onSubmit={handleLogin} autoComplete="on">
                    <div class="row">
                        <div class="col-25"><label> Phone:</label></div>
                        <div class="col-75"><input type="text" name="phone" required value={data.phone} onChange={handleChange} /></div>
                    </div>
                    <div class="row">
                    <div class="col-25"><label>Password:</label></div>     
                    <div class="col-75"><input type="password" name="password" required value={data.password} onChange={handleChange} /></div>
                    </div>
                    <div class="row"><small ref={err_msg} style={{display:"none", color:"red"}}>Invalid Phone number and  password combination</small></div> 
                    <div class="row"><input type="submit" value="Submit" /></div>
                    
                </form>
            </div>
        </>
    )
}