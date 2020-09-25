
import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './signup.css';

export default function SignUp(props){

const schema =Yup.object().shape({
    name: Yup.string().required("rquired"),
    email:Yup.string().required(),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})
const border={
  border: "4px",
}

    return <Formik 
    enableReinitialize={true} // rebuild form aft change values
      initialValues={props.values}
      onsubmit={props.onsubmit}
      validationSchema={schema}
      render={props=>{
        return <Form className="form-controll p-5">
            <div>
        <label>Name</label>
        <Field name="name" type="text" className={border}/>
    
        <ErrorMessage name="name" />
        
        </div>
        <hr></hr>
        <div className="w-25 h-50">
        <label>E-post</label>
        <Field name="email" type="text" className="no-border"/>
    
        <ErrorMessage name="email" />
        </div>
        <hr></hr>
        <div>
        <label>Password</label>
        <Field name="password" type="password" className="no-border"/>
      
        <ErrorMessage name="password" />
        </div>
        <hr></hr>
        <div>
        <label>Confirm Password</label>
        <Field name="passwordConfirmation" type="password" className="no-border"/>
       
        <ErrorMessage name="passwordConfirmation" />
        </div>
        <hr></hr>
        <button className="btn-info" type="submit">Send</button>
    </Form>
      }}
    />
   

}