import React from 'react';
import {useField, useFormikContext} from 'formik';
import Form from "react-bootstrap/Form";

const SelectorWrapper = ({name, options, ...otherProps}) => {
    const {setFieldValue} = useFormikContext();
    const [field] = useField(name);

    const handleChange = evt => {
        const {value} = evt.target;
        setFieldValue(name, value);
    };

    const configSelect = {
        ...field,
        ...otherProps,
        onChange: handleChange,
    };

    return (
        <>
            <Form.Label>{configSelect.title}</Form.Label>
            <Form.Select {...configSelect}>
                <option>Выбрать...</option>
                {Object.values(options).map((item, pos) => {
                    return (
                        <option key={pos} value={item}>
                            {item}
                        </option>
                    )
                })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                {configSelect.error}
            </Form.Control.Feedback>
        </>
    );
};

export default SelectorWrapper;