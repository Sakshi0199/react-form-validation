import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
    const [values, setValues] = useState({ name: "", age: "", email: "", song: {} });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        if (e.target.files && e.target.files[0]) {
            setValues({
                ...values,
                [name]: e.target.files[0]
            });
        }
        else
            setValues({
                ...values,
                [name]: value
            });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors,callback,isSubmitting]);

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    };
};

export default useForm;