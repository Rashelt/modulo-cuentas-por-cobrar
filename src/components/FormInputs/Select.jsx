import React, { useState } from "react";
import { FormFeedback, FormGroup, Label } from "reactstrap";
import Select from "react-select";

export const FormSelect = (props) => {
    const { label, options, name, validation, id } = props;

    return (
        <FormGroup>
            <Label htmlFor={id}>{label}</Label>
            <Select
                id={id}
                options={options}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                value={validation.values[name]}
                onChange={(value) => {
                    validation.setFieldValue(name, value);
                }}
                className={
                    validation.touched[name] &&
                    !!validation.errors[name] &&
                    "is-invalid"
                }
            />
            {!!validation.errors[name] && validation.touched[name] && (
                <FormFeedback className="d-block">
                    {validation.errors[name]}
                </FormFeedback>
            )}
        </FormGroup>
    );
};
