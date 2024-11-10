import React from 'react';
import { maskPrice } from "@/utils";
import { TextInputProps } from 'react-native';

interface ITypes {
    [key: string]: {
        mask?: (...args: (string | number)[]) => string;
    }
}

const types: ITypes = {
    price: {
        mask: maskPrice,
    },
}

const useInput = (type?: string, required?: boolean) => {

    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState<String | null>(null);

    const validate = (value: string) => {
        if(!type){
            return true;
        }

        if(value.length === 0 && !required ){
            setError(null);
            return true;
        }

        if(value.length === 0 && required ){
            setError("Preencha um valor.");
            return false;
        }

        setError(null);
        return true;
    }

    const onChange = (text: string) => {
        if(error) {
            validate(text);
        }

        if(type && types[type] && types[type].mask){
            const formattedValue = types[type].mask(text);
            setValue(formattedValue);
            return;
        }
        
        setValue(text);
    }

    return {
        error,
        value,
        setValue,
        onChange,
        validate: () => validate(value),
        onBlur: () => validate(value),
    }
}

export default useInput;