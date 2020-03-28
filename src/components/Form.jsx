
import axios from "axios";
import * as yup from "yup";
import React, {useState, useEffect} from "react";

const formSchema = yup.object().shape({
    name: yup.string().required("name plz").min(2, "ur name too short"),
    size: yup.string(),
    cheese: yup.boolean(),
    pepperoni: yup.boolean(),
    extrachz: yup.boolean(),
    pineapple: yup.boolean(),
    special: yup.string()
    
});

function Form() {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    
    const [formState, setFormState] = useState({
        name: "",
        size: "",
        cheese: false,
        pepperoni: false,
        extrachz: false,
        pineapple: false,
        special: ""
    });

    const [errors, setErrors] = useState ({
        name: "",
    });

    const [post, setPost] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(response => {
                setPost(response.data);
                setFormState({
                    name: "",
                    size: "",
                    cheese: false,
                    pepperoni: false,
                    extrachz: false,
                    pineapple: false,
                    special: ""

                });
            })
            .catch(error => console.log(error.response));
    };

    const validateChange = e => {
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        })
        .catch(err => {
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            });
        });
    };

    
    
    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };

        validateChange(e);
        setFormState(newFormData);
    };

    return (
        <div className="formdiv">
            <form onSubmit={formSubmit}>
                <label htmlFor="name">
                    Name:
                    <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                    />
                    {errors.name.length > 0 ? <p>{errors.name}</p> : null}
                </label> <br/>
                <label htmlFor="size">
                    Size:
                    <select
                        id="size" 
                        name="size" 
                        value={setFormState.size}
                        onChange={inputChange}>
                        <option>small</option>
                        <option>medium</option>
                        <option>large</option>
                    </select>            
                   </label><br/>
                   <label htmlFor="cheese">
                       cheese
                       <input
                       id="cheese"
                       type="checkbox"
                       name="cheese"
                       checked={formState.cheese}
                       onChange={inputChange}
                       />
                   </label>
                   <label htmlFor="pepperoni">
                       pepperoni
                       <input
                       id="pepperoni"
                       type="checkbox"
                       name="pepperoni"
                       checked={formState.pepperoni}
                       onChange={inputChange}
                       />
                   </label>
                   <label htmlFor="extrachz">
                       extra cheese
                       <input
                       id="extrachz"
                       type="checkbox"
                       name="extrachz"
                       checked={formState.extrachz}
                       onChange={inputChange}
                       />
                   </label>
                   <label htmlFor="pineapple">
                       pineapple
                       <input
                       id="pineapple"
                       type="checkbox"
                       name="pineapple"
                       checked={formState.pineapple}
                       onChange={inputChange}
                       />
                   </label><br/>
                   <label htmlFor="special">
                Special Requests:
                <textarea
                    id="special"
                    name="special"
                    value={formState.special}
                    onChange={inputChange}
                />
            </label> <br/>
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button disabled={buttonDisabled}>Submit</button> 
            </form>
        </div>
    )
}

export default Form