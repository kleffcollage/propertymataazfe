import React, { useState, useContext, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dropzone from "react-dropzone";
import { MainContext } from "../../../Context/MainContext";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";


function ApplicationForm({ property, isRentForm, close }) {

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const user = useContext(MainContext)
  console.log({user});
  const [applicationTypes, setApplicationTypes] = useState([]);
  const [mediafiles, setMediaFiles ] = useState({
	passport: null,
	workId: null,
  });
  
	const userDetails = {
		register: {
			firstName: user.data.user.firstName,
			middleName: "",
			lastName: user.data.user.lastName,
			email: user.data.user.email,
			mobileNumber: user.data.user.phoneNumber,
			address: "",
			nationality: "",
			dateOfBirth: "",
			nationality: "",
			maritalStatus: "",
			occupation: "",
			employer: "",
			workAddress: "",
			annualIncome: "",
			passport: mediafiles.passport,
			workId: mediafiles.workId,
		},
		nextOfKin: {
			nokFirstName: "",
			nokLastName: "",
			nokEmail: "",
			nokMobileNumber: "",
			nokRelationship: "",
		},
		propertyId: 0,
		applicationTypeId: 0,
	};
	
	const getApplicationTypes = async () => {
		try {
		  	let { data } = await Fetch("Application/types");
			// console.log("Application types: ", data);
		  	setApplicationTypes(data);
		} catch (error) {
		  console.log(error);
		}
	};
	
	// console.log(userDetails.workId.length)
	
    
	const formSubmit = async values => {
		setLoading(true)
		
		values.register.passport = mediafiles.passport
		values.register.workId = mediafiles.workId
		
		console.log({values});
		
		values.applicationTypeId = applicationTypes.find( type => type.name == "RENT").id
		console.log(applicationTypes)
		
		try {
			const { workId, passport} = values.register
			if(workId == null && passport == null ) return
			
			let data = await Fetch("Application/new", "post", values);
			console.log("Enquire Rent:", data);
			
			if (!data.status) {
				setLoading(false);
				setErrorMessage(data.message);
				console.log(errorMessage);
				return;
			}
			if (data.status != "400") {
				setLoading(false);
				console.log(data);
			} else {
				setLoading(false)
				toast.error(errorMessage)
				console.log(errorMessage);
			}
		} catch (error) {
			setLoading(false)
			toast.error(error.message)
		}
	}
  
	const grabUploadedFile = (uploadedFiles, isPassport = true ) => {
		uploadedFiles.forEach((file) => {
		const reader = new FileReader();

		reader.onabort = () => {
			console.log("Errrrrrrrrrrrrrooooooooooorrrrrrr");
		};
		reader.onerror = () => {
			console.log("Errrrrrrrrrrrrrooooooooooorrrrrrr");
		};
		reader.onload = () => {
			// Do whatever you want with the file contents
			const binaryStr = reader.result.split(",")[1];
			// console.log(reader.result);
			//console.log(binaryStr);
			// console.log("GrabUp", binaryStr);
			composeMedia(binaryStr, file, isPassport);
		};
		console.log(file);
		reader.readAsDataURL(file);
		});
	};
  
	const composeMedia = (bytes, file, isPassport) => {
		var files = [];

		var newMedia = {
		name: file.name,
		extention: getFileExtention(file.name),
		base64String: bytes,
		propertyId: 0,
		isImage:
			getFileExtention(file.name) == "jpeg" ||
			getFileExtention(file.name) == "jpg" ||
			getFileExtention(file.name) == "png"
			? true
			: false,
		isVideo: getFileExtention(file.name) == "mp4" ? true : false,
		isDocument: getFileExtention(file.name) == "pdf" ? true : false,
		};

		files.push(newMedia);
		console.log(files);
		
		if(isPassport) {
			setMediaFiles({
				...mediafiles,
				passport: newMedia,
			});
			return
		}
		
		setMediaFiles({
			...mediafiles,
			workId: newMedia,
		});
	};

	const getFileExtention = (fileName) => {
		return fileName.split(".")[1];
	};

    useEffect(() => {
    //   window.scrollTo({
    //     top: 0,
    //     left: 0,
    //     behavior: 'smooth'
    //   });
		const fetchData = async () => {
			await getApplicationTypes();
		}
		
		fetchData();
    }, [])

  return (
    <>
      <ToastContainer />
      
      <div className="top-section">
        <div className="back">
          <i className="fas fa-chevron-left"></i>
          <span className="backs" onClick={
              page == "2" ? () => { setPage(page - 1 ); } : close
            }
          >
            Back          
          </span>
        </div>
        <div className="logo">
          <img src="../../asset/logo.png" alt="Logo" />
        </div>
      </div>
      
      <Formik
        initialValues={userDetails}
        onSubmit={ async (values, { setSubmitting }) => {
			await formSubmit(values)
			// console.log({values})
			// alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          {page == 1 ? (
            <div className="modal-content">
              <div className="content-section mt-4">
                <div className="schedule-title mb-4">
                  { property ? property.name : null }
                </div>
                
                <h3 className="section-title"> Application Form</h3>
                
                <div className="input-box">
                    <label htmlFor="register.firstName" className="input-label">First Name</label>
                    <Field name="register.firstName" placeholder="Ezra" className="formfield" />
                    <ErrorMessage name="register.firstName" />
                </div>
                <div className="input-box">
                    <label htmlFor="middleName" className="input-label">Middle Name</label>
                    <Field name="register.middleName" placeholder="Ezra" className="formfield" />
                    <ErrorMessage name="register.middleName" />
                </div>
                <div className="input-box">
                    <label htmlFor="register.lastName" className="input-label">Last Name</label>
                    <Field name="register.lastName" placeholder="Ezra" className="formfield" />
                    <ErrorMessage name="register.lastName" />
                </div>
                <div className="input-box">
                    <label htmlFor="register.mobileNumber" className="input-label">Mobile Number</label>
                    <Field name="register.mobileNumber" placeholder="Ezra" className="formfield" />
                    <ErrorMessage name="register.mobileNumber" />
                </div>
                <div className="input-box">
                    <label htmlFor="register.email" className="input-label">Email Address</label>
                    <Field name="register.email" type="email" placeholder="Your email address" className="formfield" />
                    <ErrorMessage name="email" />
                </div>
				<div className="input-box">
                    <label htmlFor="register.address" className="input-label">Residential Address</label>
                    <Field name="register.address" placeholder="Ezra" className="formfield" />
                    <ErrorMessage name="register.address" />
                </div>
				<div className="input-box">
                    <label htmlFor="register.dateOfBirth" className="input-label">Date of Birth</label>
                    <Field name="register.dateOfBirth" type="date" className="formfield" />
                    <ErrorMessage name="register.dateOfBirth" />
                </div>
				<div className="input-box">
                    <label htmlFor="register.nationality" className="input-label">Nationality</label>
                    <Field name="register.nationality" type="text" className="formfield" />
                    <ErrorMessage name="register.nationality" />
                </div>
				<div className="input-box">
                    <label htmlFor="register.maritalStatus" className="input-label">Marital status</label>
                    <div className="select-box">
                        <Field name="register.maritalStatus" as="select" className="formfield">
                            <option>Choose an option</option>
                            <option>Single</option>
							<option>Married</option>
							<option>Divorced</option>
                        </Field>
                        <div className="arrows"></div>
                    </div>
                    <ErrorMessage name="register.maritalStatus" />
                </div>
				
                <button className="secondary-btn" onClick={() => setPage(page + 1)}>
                  Next
                </button>
              </div>
            </div>
          ) : page == 2 ? (
            <div className="modal-content">
            	<div className="content-section mt-4">
                	<div className="input-box">
				
						<div className="input-box">
							<label htmlFor="register.occupation" className="input-label">Occupation</label>
							<Field name="register.occupation" type="text" className="formfield" />
							<ErrorMessage name="register.occupation" />
						</div>
						<div className="input-box">
							<label htmlFor="register.employer" className="input-label">Employer</label>
							<Field name="register.employer" type="text" className="formfield" />
							<ErrorMessage name="register.employer" />
						</div>
						<div className="input-box">
							<label htmlFor="register.workAddress" className="input-label">Work Address</label>
							<Field name="register.workAddress" type="text" className="formfield" />
							<ErrorMessage name="register.workAddress" />
						</div>
						
					
						{ isRentForm ?
						<>
						
							<div className="input-box">
								<label htmlFor="register.annualIncome" className="input-label">What is your annual income?</label>
								<Field name="register.annualIncome" type="text" placeholder="This can be your annual salary of an estimated income" className="formfield" />
								<ErrorMessage name="register.annualIncome" />
						    </div>
							
							
							<Dropzone
							accept="image/jpeg, image/png"
							maxFiles={1}
							onDrop={(acceptedFiles) => grabUploadedFile(acceptedFiles)}
							>
							{ ({ getRootProps, getInputProps }) => (
								<section>
									<div
									{...getRootProps()}
									className={
										mediafiles.passport 
										? "do-upload uploaded"
										: "do-upload"
									}
									>
									<input {...getInputProps()} />
									{ mediafiles.passport ? (
										<>
										<i className="far fa-check" />
										{`Passport Uploaded`}
										</>
									) : (
										<>
										<i className="far fa-image" />
										Upload Passport Photograph
										</>
									)}
									</div>
								</section>
							)}
							</Dropzone>
						
							<Dropzone
								accept="image/jpeg, image/png"
								maxFiles={1}
								onDrop={(acceptedFiles) => grabUploadedFile(acceptedFiles, false)}
							>
								{({ getRootProps, getInputProps }) => (
								<section>
									<div
										{...getRootProps()}
										className={
											mediafiles.workId 
											? "do-upload uploaded"
											: "do-upload"
										}
									>
									<input {...getInputProps()} />
									{mediafiles.workId ? (
										<>
											<i className="far fa-check" />
											{`Copy of Work Id Uploaded`}
										</>
									) : (
										<>
											<i className="far fa-video" />
											Upload a Copy of Work Id
										</>
									)}
									</div>
								</section>
								)}
							</Dropzone>
						</> 
						: null }
					
						<div className="schedule-title my-4">Next of Kin</div>
						
						<div className="input-box">
							<label htmlFor="nextOfKin.nokFirstName" className="input-label">First Name</label>
							<Field name="nextOfKin.nokFirstName" type="text" className="formfield" />
							<ErrorMessage name="nextOfKin.nokFirstName" />
						</div>
						<div className="input-box">
							<label htmlFor="nextOfKin.nokMiddleName" className="input-label">Middle Name</label>
							<Field name="nextOfKin.nokMiddleName" type="text" className="formfield" />
							<ErrorMessage name="nextOfKin.nokMiddleName" />
						</div>
						<div className="input-box">
							<label htmlFor="nextOfKin.nokLastName" className="input-label">Surname</label>
							<Field name="nextOfKin.nokLastName" type="text" className="formfield" />
							<ErrorMessage name="nextOfKin.nokLastName" />
						</div>
						<div className="input-box">
							<label htmlFor="nextOfKin.nokMobileNumber" className="input-label">Mobile Number</label>
							<Field name="nextOfKin.nokMobileNumber" type="text" className="formfield" />
							<ErrorMessage name="nextOfKin.nokMobileNumber" />
						</div>
						<div className="input-box">
							<label htmlFor="nextOfKin.nokEmail" className="input-label">Email</label>
							<Field name="nextOfKin.nokEmail" type="email" className="formfield" />
							<ErrorMessage name="nextOfKin.nokEmail" />
						</div>
						<div className="input-box">
							<label htmlFor="nextOfKin.nokRelationship" className="input-label">Relationship</label>
							<Field name="nextOfKin.nokRelationship" type="text" className="formfield" />
							<ErrorMessage name="nextOfKin.nokRelationship" />
						</div>
					
						<button className="secondary-btn mt-5" type="submit">{ loading ? <Spinner /> : "Submit" }</button>
					</div>
            	</div>
            </div>
          ) : null }
        </Form>
      </Formik>
    </>
  );
}

export default ApplicationForm;
