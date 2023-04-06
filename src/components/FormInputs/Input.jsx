import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

export const FormInput = (props) => {
    const { className, id, validation, name, label, placeholder, type = "text" } = props;
    return (
        <FormGroup className={className}>
            <Label htmlFor={id}>{label}</Label>
            <Input
                name={name}
                placeholder={placeholder}
                type={type}
                className="form-control"
                id={id}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values[name] || ""}
                invalid={
                    validation.touched[name] && validation.errors[name]
                        ? true
                        : false
                }
            />
            {validation.touched[name] && validation.errors[name] ? (
                <FormFeedback type="invalid">
                    {validation.errors[name]}
                </FormFeedback>
            ) : null}
        </FormGroup>
    );
};
