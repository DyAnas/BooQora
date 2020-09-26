import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './StyleSignUp.css';

export default function SignUp(props) {

    const schema = Yup.object().shape({
        name: Yup.string().required("rquired"),
        email: Yup.string().required(),
        password: Yup.string().required('Password is required'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })


    return <Formik
        enableReinitialize={true} // rebuild form aft change values
        initialValues={props.values}
        onsubmit={props.onsubmit}
        validationSchema={schema}
        render={props => {
            return <div className=" p-2 float-left">

                <Form className="form-controll col-ms-2">

                    <div className="hight ">
                        <label className="float-left">Name</label>
                        <br/>
                        <Field name="name" type="text" className="form-control border-0" placeholder="name"/>
                        <ErrorMessage component="span" name="name"/>
                    </div>


                    <div className="hight ">
                        <label className="float-left">E-post</label>
                        <br/>
                        <Field name="email" type="text" className="form-control border-0" placeholder="email"/>

                        <ErrorMessage className="text-danger" name="email"/>
                    </div>


                    <div className="hight ">
                        <label className="float-left">Password</label>
                        <br/>
                        <Field name="password" type="password" className="form-control border-0" placeholder="passord"/>

                        <ErrorMessage className="text-danger" name="password"/>
                    </div>


                    <div className="hight ">
                        <label className="float-left">Confirm Password</label>
                        <br/>
                        <Field name="passwordConfirmation" type="password" className="form-control border-0"
                               placeholder="confirm password"/>

                        <ErrorMessage className="text-danger" name="passwordConfirmation"/>
                    </div>


                    <button className="btn-info" type="submit">Send</button>
                </Form></div>
        }}
    />


}