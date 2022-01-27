import * as yup from 'yup'

export default [
    yup.object().shape({
        name: yup.string().required('Property name is required'),
        propertyTypeId: yup.number().required('Property type is required'),
        title: yup.string().required('Title is required'),
        address: yup.string().required('Address is required'),
        state: yup.string().required('State is required'),
        lga: yup.string().required('LGA is required'),
        area: yup.string().required('Area is required'),
        description: yup.string().required('Description is required'),
        sellMySelf: yup.boolean(),
    }),
    
    yup.object().shape({
        price: yup.string().required('Price is required'),
        numberOfBedrooms: yup.string().required('Number of Bedroom is required'),
        numberOfBathrooms: yup.string().required('Number of Bathroom is required'),
    })
]

