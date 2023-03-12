/**
 * Formik Component wrapper for bootstrap form 
 */
import React from "react";
import { Form } from 'react-bootstrap';

import { ErrorMessage, useField } from "formik";
import { omit } from "lodash";

type FormikWrapperProps = {
    name: string;
    hint?: string;
    label?: string;
    children: JSX.Element;
    handleChange?: any;
}

const FormikWrapper = (props: FormikWrapperProps) => {
    const passableProps = omit(props, ["name", "label", "hint", "children"]);

    const ClonedContent = React.cloneElement(props.children, {
        name: props.name,
    });

    const [field, meta] = useField(props.name);

    const isInvalid = !!meta.error && meta.touched;

    console.log(props.handleChange)
    return (
        <div>
            <Form.Group controlId={props.name} >
                <div className="d-flex justify-content-between mt-4" >
                    <Form.Label>
                        {props.label || props.name} 
                    </Form.Label>
                    <div style={{ width: '80%' }}>
                        {ClonedContent}
                        {/* {
                            props.hint && <Form.Text className="text-muted"> { props.hint } </Form.Text>
                        } */}
                        <Form.Control style={{opacity: 0, height: 0, margin: 0}} isInvalid = { isInvalid }  />
                        <Form.Control.Feedback type="invalid" >
                            <ErrorMessage name={ props.name } />
                        </Form.Control.Feedback>
                    </div>
                </div>
            </Form.Group>
        </div>
    );
};




export default FormikWrapper;