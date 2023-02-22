import React from 'react';
import FormField from './FormField';

const FormFields = ({handleChange, handleBlur, values, errors, touched, fields}) => {
    return fields.map((field, i) => {
        return (
            <FormField
                key={i}
                placeholder={field.placeholder}
                onChangeText={handleChange(field.name)}
                onBlur={handleBlur(field.name)}
                value={values[field.name]}
                error={touched[field.name] && errors[field.name]}
                secureTextEntry={field.secureTextEntry}
                isEyeEnabled={field.isEyeEnabled}
                isCorrect={(touched[field.name])}
            />
        );
    });
};

export default FormFields;
