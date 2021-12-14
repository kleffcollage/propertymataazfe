import * as yup from 'yup'

export default [
    yup.object().shape({
        name: yup.string().required('Field is required'),
        title: yup.string().required('Field is required'),
        address: yup.string().required('Field is required'),
        state: yup.string().required('Field is required'),
        lga: yup.string().required('Field is required'),
        area: yup.string().required('Field is required'),
        description: yup.string().required('Field is required'),
        sellMySelf: yup.boolean(),
    }),
    
    yup.object().shape({
        price: yup.string().required('Field is required'),
        numberOfBedrooms: yup.string().required('Field is required'),
        numberOfBathrooms: yup.string().required('Field is required'),
        longitude: yup.string().required('Field is required'),
        latitude: yup.string().required('Field is required'),
    })
]

