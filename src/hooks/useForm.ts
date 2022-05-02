import { useState } from 'react';
import React from 'react';

interface HandleNameChangeInterface {
    target: HTMLInputElement;
  }
export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = ( newFormState = initialState ) => {
        setValues( newFormState );
    }


    const handleInputChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {

        setValues({
            ...values,
            [ e.target.name ]: e.target.value
        });

    }

    return [ values, handleInputChange, reset ];

}