import React, {useRef, useState} from 'react'
import { Card,Form,Button, Container } from 'react-bootstrap'
// import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { database } from '../firebase' 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Signup() {
    // const emailRef = useRef()
    // const passwordRef = useRef()
    // const passwordConfirmRef = useRef()
    // const {signup} = useAuth()
    const  history =useNavigate()
    const [login, setLogin] = useState(false)

    function handleSubmit(e,type){
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        if (type=="signup"){
        createUserWithEmailAndPassword(database, email, password)
        .then((userCredential) => {
        // The user has been created successfully
        const user = userCredential.user;
        console.log(user, "authData");
        history("/home/t")
        })
        .catch((error) => {
        // Handle errors here
        alert(error.code)
        console.error(error);
        setLogin(true)
        });
    }else{
        signInWithEmailAndPassword(database, email, password)
        .then((userCredential) => {
        // The user has been created successfully
        const user = userCredential.user;
        console.log(user, "authData");
        history("/home/t")
        })
        .catch((error) => {
        // Handle errors here
        alert(error.code)
        console.error(error);
        })
    }
    }

  return (
        // <div className='App'>
        //     <div>
        //         <div onClick={()=> setLogin(false)}>Sign Up</div>
        //         <div onClick={()=> setLogin(true)}>Sign In</div>
        //     </div>
        //     <h1>{login?"SignIn":"SignUp"}</h1>
        //     <form onSubmit={(e) => handleSubmit(e,login?"signin":"signup")}>
        //         <input name='email' placeholder='Email' type='email' /> <br/>
        //         <input name='password' placeholder='Password' type='password'/>  <br/><br/>
        //         <button  > {login?"SignIn":"SignUp"}</button>
        //     </form>

        // </div>
        <Container className='d-flex align-items-center justify-content-center'
        style={{minHeight:'100vh'}} >
            <div className='w-100' style={{maxWidth:'400px'}}>
                <Card>
                    <Card.Body>
                         
                        <h2 className="text-center mb-4"> {login?"SignIn":"SignUp"}</h2>
                        <Form onSubmit={(e) => handleSubmit(e,login?"signin":"signup")}>
                            <Form.Group id='email' >
                                <Form.Label> Email</Form.Label>
                                <Form.Control name='email' placeholder='Email' type='email' required />
                            </Form.Group><br/>
                            <Form.Group id='password' >
                                <Form.Label> Password</Form.Label>
                                <Form.Control name='password' placeholder='Password' type='password' required />
                            </Form.Group> <br/>
                            <Button className='w-100' type='submit'>
                            {login?"Sign In":"Sign Up"}</Button>
                        </Form>
                    </Card.Body>
                </Card>
        
                <div className='w-100 text-center mt-2'>
                    Aleady have an account? 
                    <span onClick={()=> !login? setLogin(true):setLogin(false)} style={{
                        color: 'blue', // Change the text color to blue
                        cursor: 'pointer', // Add a pointer cursor on hover
                        textDecoration: 'underline' // Add underline on hover
                        }}> {login?"Sign up":"Sign in"}
                    </span>
                </div>
            </div>
        </Container>
   
  )
}

export default Signup