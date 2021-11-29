import React, { useState, useContext } from "react";
import { MainContext } from "../../Context/MainContext";
import Spinner from "../../Utilities/Spinner";
import Fetch from "../../Utilities/Fetch";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";
import { FaUserEdit } from "react-icons/fa"

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const { data, setUser } = useContext(MainContext);
  const [previews, setPreviews] = useState([]);
  const [userUpdateDetails, setUserUpdateDetails] = useState({
    id: data.user.id,
    phoneNumber: data.user.phoneNumber,
    profilePicture: data.user.profilePicture,
  });

  const extractPreviewFromFile = async (uploadedFiles, isVideo = false) => {
    var newState = [];
    uploadedFiles.map((element) => {
      newState.push(URL.createObjectURL(element));
    });
    setPreviews([...previews, ...newState]);
  };

  const processImage = (file) => {
    extractPreviewFromFile(file);
    file.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => {
        console.error("Errrrrrrrrrrrrrooooooooooorrrrrrr");
      };
      reader.onerror = () => {
        console.error("Errrrrrrrrrrrrrooooooooooorrrrrrr");
      };
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result.split(",")[1];
        //console.log(binaryStr);
        // console.log(binaryStr);
        composeMedia(binaryStr, file);
      };
      reader.readAsDataURL(file);
    });
  };

  const composeMedia = (bytes, file) => {
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
    setUserUpdateDetails({ ...userUpdateDetails, profilePicture: newMedia });
  };

  const getFileExtention = (fileName) => {
    return fileName.split(".")[1];
  };

  const updateUserDetails = async () => {
    setLoading(true);
    try {
      const data = await Fetch("user/update", "put", userUpdateDetails);
      if (!data.status) {
        setLoading(false);
        toast.error(data.message);
        return;
      }
      setUser(data.data);
      localStorage.setItem("user",JSON.stringify(data.data));
      toast.success("Profile updated successfully.")
      setLoading(false);
      return;
    } catch (error) {
      console.error({ error });
      setLoading(false);
      return;
    }
  };

  
  return (
    <div className="row mb-4">
      <div className="col-lg-4">
        <div className="avatar-upload">
          <div className="avatar-edit">
            <Dropzone
              accept="image/jpeg, image/png"
              maxFiles={6}
              onDrop={(acceptedFiles) => processImage(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className=""
                  type="file"
                  id="imageUpload"
                >
                  <input {...getInputProps()} />
                  <label for="imageUpload" className="d-flex align-items-center justify-content-center"> <FaUserEdit /> </label>
                  {/* <div className="trash-file d-flex justify-content-end">
                    <IoMdAdd color="#fff" /> 
                  </div>
                  <GrAdd /> */}
                </div>
              )}
            </Dropzone>
            {/* <input
              type="file"
              id="imageUpload"
              onChange={(e) =>processImage(e.target.files)}
              accept=".jpeg"
            /> */}
          </div>
          <div className="avatar-preview">
            {previews.length > 0 ? (
              <img id="imagePreview" src={previews[0]} alt="" />
            ) : data.user.profilePicture ? (
              <img id="imagePreview" src={data.user.profilePicture} alt="" />
            ) : (
              <img
                id="imagePreview"
                src={"https://alvingrey.com/assets/alvino.svg"}
                alt=""
              />
            )}
          </div>
        </div>
        <div className="input-box">
          <div className="input-label">Firstname</div>
          <div className="select-box">
            <input
              name="name"
              className="formfield"
              value={data.user.firstName}
              disabled
            />
          </div>
        </div>
        <div className="input-box">
          <div className="input-label">Surname</div>
          <div className="select-box">
            <input
              name="name"
              className="formfield"
              value={data.user.lastName}
              disabled
            />
          </div>
        </div>
        <div className="input-box">
          <div className="input-label">Email Address</div>
          <div className="select-box">
            <input
              name="name"
              className="formfield"
              value={data.user.email}
              disabled
            />
          </div>
        </div>
        <div className="input-box">
          <div className="input-label">Phone Number</div>
          <div className="select-box">
            <input
              name="name"
              className="formfield"
              defaultValue={data.user.phoneNumber}
              onChange={(e) =>
                setUserUpdateDetails({
                  ...userUpdateDetails,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>
        </div>
        <button
          className="color-btn submit w-100 mt-3"
          type="submit"
          onClick={() => updateUserDetails()}
        >
          {loading ? <Spinner /> : "Submit Request"}
        </button>
      </div>
    </div>
  );
}
