import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import configVariables from '@/constants/Config';
import { Button, Container, InputGroup } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { Field, Form, Formik } from "formik";
import FormikWrapper from '@/components/forms/FormikWrapper';


const FormikForm = () => {

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Enter your email address."),
        password: Yup.string()
            .min(2, "Too Short!")
            .max(15, "Too Long!")
            .required("Enter a valid password."),
        phone: Yup.string()
            .matches(configVariables.phoneRegex, "Invalid phone number.")
            .required("Enter a valid phone number."),
        type: Yup.string().required("Please select a valid option."),
        amount: Yup.number()
            .integer("invalid decimal")
            .required("Please enter valid amount."),
        conditions: Yup.boolean()
            .oneOf([true], "You must accept our terms and conditions.")
            .required("Terms & Conditions"),
    })

    return (
        <div className="p-4">
            <Container className="max-w-6xl">
                <h1 className="text-4xl font-bold">Forms</h1>
                <p className="text-xl text-gray-600">Form elements &amp; validations usage.</p>
            </Container>
            <Container className="max-w-6xl mt-10 ">
                <div className="p-5 mb-10 border border-primary rounded">
                    <h4 className="text-lg font-bold">Form</h4>
                    <p className="text-xl text-gray-600">Form elements inputs, buttons &amp; checkbox</p>
                    <hr className="my-4" />
                    <div className="max-w-md">
                        <Formik
                            initialValues={{
                                email: "",
                                phone: "",
                                password: "",
                                type: "",
                                amount: "",
                                conditions: false,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                alert(JSON.stringify(values, null, 2));
                            }}
                        >
                            {(formikProps) => (
                                <Form>
                                    <FormikWrapper
                                        name={"email"}
                                        label={"Email Address"}
                                        hint={"Type invalid email for error."}
                                    >
                                        <Field 
                                            name={"email"}
                                            onChange={(e) => formikProps.handleChange(e)}
                                            value={formikProps.values.email}
                                            placeholder="Enter email"
                                            type="email"
                                            className='w-100 bg-dark p-2 px-4 text-white border border-primary rounded form-control'
                                        />
                                        {/* <input
                                            name={"email"}
                                            onChange={formikProps.handleChange}
                                            value={formikProps.values.email}
                                            placeholder="Enter email"
                                            className='w-100 bg-dark p-2 px-4 text-white border border-primary rounded form-control'
                                        /> */}
                                    </FormikWrapper>
                                    <FormikWrapper
                                        name={"password"}
                                        label={"Password"}
                                        hint={"Type any pw less than 3 or greater than 5."}
                                    >
                                        <Field
                                            name={"password"}
                                            onChange={(e) => formikProps.handleChange(e)}
                                            value={formikProps.values.password}
                                            placeholder="Enter password"
                                            type="password"
                                            className='w-100 bg-dark p-2 px-4 text-white border border-primary rounded form-control'
                                        />
                                        {/* <input
                                            name={"password"}
                                            onChange={(e) => formikProps.handleChange(e)}
                                            value={formikProps.values.password}
                                            placeholder="Enter password"
                                            className='w-100 bg-dark p-2 px-4 text-white border border-primary rounded form-control'
                                        /> */}
                                    </FormikWrapper>
                                    <FormikWrapper
                                        name={"phone"}
                                        label={"Phone"}
                                        hint={"Type any phone number less than 5 digits long or longer than 10."}
                                    >
                                        <Field
                                            name={"phone"}
                                            onChange={(e) => formikProps.handleChange(e)}
                                            value={formikProps.values.phone}
                                            placeholder="Enter phone"
                                            type="phone"
                                            className='w-100 bg-dark p-2 px-4 text-white border border-primary rounded form-control'
                                        />
                                        {/* <input
                                            name={"phone"}
                                            onChange={(e) => formikProps.handleChange(e)}
                                            value={formikProps.values.phone}
                                            placeholder="Enter phone"
                                            className='w-100 bg-dark p-2 px-4 text-white border border-primary rounded form-control'
                                        /> */}
                                    </FormikWrapper>
                                    <FormikWrapper
                                        name={"type"}
                                        label={"Select your option"}
                                        hint={"Select your options"}
                                    >
                                        {/* <Field as={Select} placeholder="..Select option..">
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                    </Field> */}
                                        {/* select between  */}
                                        <Field
                                            name={"type"}
                                            onChange={(e) => formikProps.handleChange(e)}
                                            value={formikProps.values.type}
                                            placeholder="..Select option.."
                                            as="select"
                                            className='w-100 bg-dark p-2 px-4 text-white border border-primary rounded form-control'
                                        >
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                            <option value="option3">Option 3</option>
                                        </Field>

                                        {/* <select
                                            name={"type"}
                                            onChange={(e) => formikProps.handleChange(e)}
                                            value={formikProps.values.type}
                                            placeholder="..Select option.."
                                            className='w-100 bg-dark p-2 px-4 text-white border border-primary rounded form-control'
                                        >
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                            <option value="option3">Option 3</option>
                                        </select> */}
                                    </FormikWrapper>
                                    <FormikWrapper
                                        name={"amount"}
                                        label={"Amount"}
                                        hint={"Enter any valid amount."}
                                    >
                                        {/* <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="gray.300"
                                            fontSize="1.2em"
                                        >
                                            $
                                        </InputLeftElement>
                                        <Input
                                            name={"amount"}
                                            onChange={(e) => formikProps.handleChange(e)}
                                            value={formikProps.values.amount}
                                            placeholder="Enter amount"
                                        />
                                    </InputGroup> */}
                                        <Field
                                            name={"amount"}
                                            onChange={(e) => formikProps.handleChange(e)}
                                            value={formikProps.values.amount}
                                            placeholder="Enter amount"
                                            type="input"
                                            className='w-100 bg-dark p-2 px-4 text-white border border-primary rounded form-control'
                                        />
                                        {/* <input
                                            name={"amount"}
                                            onChange={(e) => formikProps.handleChange(e)}
                                            value={formikProps.values.amount}
                                            placeholder="Enter amount"
                                            className='w-100 bg-dark p-2 px-4 text-white border border-primary rounded form-control'
                                        /> */}
                                    </FormikWrapper>
                                    <FormikWrapper
                                        name={"conditions"}
                                        label={"Terms & Conditions"}
                                        hint={"Please accept our terms and conditions."}
                                    >

                                        <div className='d-flex flex-row w-100'>
                                            <Field
                                                name={"conditions"}
                                                onChange={(e) => formikProps.handleChange(e)}
                                                onClick={(e) => formikProps.setFieldValue("conditions", e.target.checked)}
                                                value={formikProps.values.conditions}
                                                type="checkbox"
                                            />
                                            {/* <input
                                                name={"conditions"}
                                                onChange={(e) => formikProps.handleChange(e)}
                                                value={formikProps.values.conditions}
                                                type="checkbox"
                                            /> */}
                                            <p className='mt-3 mx-2'>Accept our terms please</p>
                                        </div>
                                    </FormikWrapper>
                                    {/* <Button
                                    size={"lg"}
                                    width={"100%"}
                                    color={"white"}
                                    bgColor={"brand.primary"}
                                    disabled={!formikProps.isValid}
                                    leftIcon={<Icon as={FaCheck} />}
                                    onClick={() => formikProps.handleSubmit()}
                                >
                                    Verify
                                </Button> */}
                                    
                                    <button
                                        type="submit"
                                        disabled={!formikProps.isValid}
                                        onClick={() => formikProps.handleSubmit()}
                                        className='btn btn-primary text-white mt-4'
                                    >
                                        Submit
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default FormikForm;