import React, {useState} from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import {signup} from '../auth';

const Signup =() => {
    //useState [current values, updated value]
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, success, error } = values;

    //This is Higher Order Functions(HOC) - functions returning another function
    const handleChange = name => event => {
            // ... = rest operator = taking all the values i.e. name, email, pass,,,
            setValues({...values, error: false, [name]: event.target.value })
    } 



    const clickSubmit = (event) => {
        event.preventDefault() //so that browser does'nt reload after submit is clicked
        setValues({ ...values, error: false });
        //now we will give the values to signup
        signup({name, email, password}) //sending the JS object as ({name, email..}) that is being 
        //received above in signup  as "user"
        .then(data => {
            if(data.error){
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    });
                }
            }
        })

    }

    const signUpForm = () => (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input onChange={handleChange('name')} type="text" className='form-control' value={name}></input>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange('email')} type="email" className='form-control' value={email}></input>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={handleChange('password')} type="password" className='form-control' value={password}></input>
            </div>
            <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <Layout 
            title="Signup Page" 
            description="Sign-up to Books E-Commerce App"
            className = "container col-md-8 offset-md-2"
        >

            {showSuccess()}
            {showError()}
            {signUpForm()}

            {/*//whenever there is change we can see data in live i.e. data in state (avail in state) */}
            {/*JSON.stringify(values)*/}
        </Layout>
    );
}


export default Signup;


