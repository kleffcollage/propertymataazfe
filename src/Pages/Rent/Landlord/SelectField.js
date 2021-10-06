import React, { useEffect, useState } from "react"
import { useField, useFormikContext } from 'formik';


const SelectField = (props) => {
    const { values: { category }, touched, setFieldValue} = useFormikContext();
    const [ field, meta ] = useField(props);
    const [selected, setSelected] = useState(null)
    
    const getSelectedCategory = () => {
        let currentCategory = props.categories.filter(item => item.id == category)
        setSelected(currentCategory)
        
        console.log({currentCategory})
    }
    
    useEffect(() => {
        if(category !== '' && touched.category) {
            setFieldValue(props.name, category);
        }
        
        { (category !== 0 && category !== "") && getSelectedCategory() }
        
        console.log(props.categories )
    }, [category, touched.category, setFieldValue, props.name]);
    
    
    return (
        <>
            <select {...props} {...field} className="formfield">
                <option>Choose a sub category</option>
                {( selected && selected.subcategory ) && 
                    selected.subcategory.map((_category, index) => {
                        return (
                            <option key={index} value={_category.id}> { _category.name } </option>
                        )
                    })
                }
            </select>
            
            { !!meta.touched && 
                !!meta.error && 
                <div> { meta.error } </div>
            }
        </>
    )
}

export default SelectField;
