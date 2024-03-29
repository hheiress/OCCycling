import React, {useEffect, useReducer, useState} from 'react'
import {Link} from "react-router-dom";
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import VolunteerPanel from '../../VolunteerPanel';
import Footer from '../../Footer';
import { toast } from 'react-toastify/dist';
import dynamicGetFetch from "./../../DymanicRequests/dynamicGetFetch";
import dynamicPostFetch from "./../../DymanicRequests/dynamicPostFetch";

const formReducer = (state, event) => {
    if (event.reset) {
        return {
            user_photo: '',
            gender: '',
            name: '',
            last_name: '',
            passport: '',
            address: '',
            location_id: null,
            date_birth: null,
            nationality: '',
            email: '',
            phone_number: '',
            status: '',
        }
    }
    return {
        ...state,
        [event.name]: event.value
    }
}

function CreateNewRenter() {
    const [dataForm, setDataForm] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [locations, setLocations] = useState([]);
    const [photoThumbnail, setPhotoThumbnail] = useState("Photo")

    const urlLocation = `/location`
    useEffect(() => {
        dynamicGetFetch(urlLocation) 
            .then((data) => {
                console.log("Setting locations %j", data)
                setLocations(data);
            })
    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("user_photo", selectedFile);
        formData.append("name", dataForm.name);
        formData.append("last_name", dataForm.last_name);
        formData.append("passport", dataForm.passport);
        formData.append("address", dataForm.address);
        formData.append("location_id", dataForm.location_id);
        formData.append("gender", dataForm.gender);
        formData.append("date_birth", dataForm.date_birth);
        formData.append("nationality", dataForm.nationality);
        formData.append("email", dataForm.email);
        formData.append("phone_number", dataForm.phone_number);
        formData.append("status", "Active");

        if (dataForm.phone_number > 2147483647) {
            alert("***Phone Number must have 9 digits***");
            event.preventDefault();

        } else {
            event.preventDefault();
            setSubmitting(true);

            //fetch - post
            const urlUsers = `/users`;
            dynamicPostFetch(urlUsers, formData, {})
            //
            setTimeout(() => {
                toast.info("New User Added");
                setSubmitting(false);
                setDataForm({
                    reset: true
                });
            }, 3000);
        }
    }

    const handleChange = event => {
        setDataForm({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const changeHandler = event => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        setPhotoThumbnail(<img className="photo-btn" src={URL.createObjectURL(event.target.files[0])}/>);
        console.log(selectedFile);
    }

    const hiddenFileInput = React.useRef(null);
    const imageUpload = event => {
        hiddenFileInput.current.click();
    };

    return (
        <div>
            <VolunteerPanel/>
            <div className="prelinks-wrapper">
                    <Link to={'/residents'}>
                        <p>&#60; ALL RENTERS</p>
                    </Link>
                </div>
            <div className="wrapper">
                <div className="newrenter-form-wrapper">
                    <p><b>ADD NEW RENTER</b></p>
                    <Form className="form-align" onSubmit={handleSubmit}>
                        <div className="margin-form">
                            <button
                                type="button"
                                onClick={imageUpload}
                                className="photo-btn">{photoThumbnail}
                            </button>
                            <Form.Control
                                id="userphoto"
                                name="user_photo"
                                onChange={changeHandler}
                                value={dataForm.user_photo || ''}
                                ref={hiddenFileInput}
                                style={{display: 'none'}}
                                type="file"
                            />
                        </div>
                        <div className="wrap-names-renter">
                            <div className="margin-form-name">
                                <Form.Control
                                    name="name"
                                    autocomplete="off"
                                    onChange={handleChange}
                                    value={dataForm.name || ''}
                                    placeholder="Name"
                                    required
                                />
                            </div>
                            <div className="margin-form-name">
                                <Form.Control
                                    name="last_name"
                                    autocomplete="off"
                                    onChange={handleChange}
                                    value={dataForm.last_name || ''}
                                    placeholder="Last Name"
                                    required
                                />
                            </div>

                        </div>

                        <div className="margin-form">
                            <Form.Control
                                name="passport"
                                autocomplete="off"
                                onChange={handleChange}
                                value={dataForm.passport || ''}
                                placeholder="Passport"
                                required
                            />
                        </div>

                        <div className="margin-form">
                            <Form.Control as="select" name="location_id" onChange={handleChange} value={dataForm.location_id || null} required>
                                <option value="" disabled selected hidden>Location</option>
                                {locations.map((item) => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </Form.Control>
                        </div>
                        <div className="margin-form">
                            <Form.Control
                                name="address"
                                autocomplete="off"
                                onChange={handleChange}
                                value={dataForm.address || ''}
                                placeholder="Address or Container"
                                required
                            />
                        </div>
                        <div className="margin-form condition">
                            <p>GENDER</p>
                            <Form.Control
                                as="select"
                                className="select"
                                name="gender"
                                onChange={handleChange}
                                value={dataForm.gender || ''}
                                required>

                                <option value="" disabled selected hidden>Choose...</option>

                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Other">Other</option>

                            </Form.Control>
                        </div>
                        <div className="margin-form condition">
                            <p>DATE OF BIRTH</p>
                            <Form.Control
                                type="date"
                                name="date_birth"
                                autocomplete="off"
                                onChange={handleChange}
                                value={dataForm.date_birth || ''}
                                placeholder="Date of Birth"
                                required
                            />
                        </div>
                        <div className="margin-form condition">
                            <Form.Control
                                name="nationality"
                                autocomplete="off"
                                onChange={handleChange}
                                value={dataForm.nationality || ''}
                                placeholder="Nationality"
                                required/>
                        </div>
                        <div className="margin-form">
                            <Form.Control
                                type="email"
                                name="email"
                                autocomplete="off"
                                onChange={handleChange}
                                value={dataForm.email || ''}
                                placeholder="Email"
                                required/>
                        </div>
                        <div className="margin-form">
                            <Form.Control className="number"
                                          type="number"
                                          name="phone_number"

                                          onChange={handleChange}
                                          value={dataForm.phone_number || ''}
                                          placeholder="Phone Number"
                                          required/>
                        </div>
                        <div className="margin-form-button">
                            <Button className="submit-button" type="submit">Register</Button>
                        </div>
                    </Form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CreateNewRenter;