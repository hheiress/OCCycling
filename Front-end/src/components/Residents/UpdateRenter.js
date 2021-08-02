import React, { useEffect, useReducer, useState } from 'react'
// import {Image} from "react-"
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import VolunteerPanel from '../VolunteerPanel';
import ChangeStatus from './ChangeStatus';
import DeleteRenter from './DeleteRenter';
import { toast } from 'react-toastify';
import Footer from '../Footer';

const userFormReducer = (state, event) => {
    if (event.type === 'fetch') {
      return event.user;
    }
    console.log(state, event);
    return {
      ...state,
      [event.name]: event.value,
    }
  }

function UpdateRenter(props) {
    const [submitting, setSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [locations, setLocations] = useState([]);
    const [photoThumbnail, setPhotoThumbnail] = useState("Photo")
    
    const [user, setUser] = useReducer(userFormReducer, {});
    useEffect(() => {
        fetch(`http://localhost:3000/users/${props.match.params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setUser({
                    type: 'fetch',
                    user: data,
                  })
                setPhotoThumbnail(<img className="photo-btn" src={`http://localhost:3000/users/${props.match.params.id}/photo`} />);  
            })
    }, [setUser, props.match.params.id]);

    useEffect(() => {
        fetch("http://localhost:3000/location")
            .then((res) => res.json())
            .then((data) => {
                setLocations(data);
            })
    }, []);

    const handleSubmit = event => {
        const dataBirth = user.date_birth.slice(0,10)
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("last_name", user.last_name);
        formData.append("passport", user.passport);
        formData.append("address", user.address);
        formData.append("gender", user.gender);
        formData.append("date_birth", user.date_birth);
        formData.append("nationality", user.nationality);
        formData.append("email", user.email);
        formData.append("phone_number", user.phone_number);
        formData.append("status", user.status);
        if(isFilePicked){
            formData.append("user_photo", selectedFile);
        }else{
            formData.append("user_photo", null);
        }
        if (user.phone_number > 999999999) {
            alert("***Phone Number must have 9 digits***");
        } else {
            setSubmitting(true);
            fetch(`http://localhost:3000/users/${props.match.params.id}`, {
                method: 'PUT',
                body: formData,
            })
            setTimeout(() => {
                toast.info("User Updated!");
                setSubmitting(false);
            }, 500);
        }
    }

    const handleChange = event => {
        setUser({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const changeHandler = event => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        setPhotoThumbnail(<img className="photo-btn" src={URL.createObjectURL(event.target.files[0])} />);
        console.log(selectedFile);
    }

    const hiddenFileInput = React.useRef(null);
    const imageUpload = event => {
        hiddenFileInput.current.click();
    };

    return (
        <div >
            <VolunteerPanel />
            <div className="prelinks-wrapper">
               
                    <Link to={'/residents'}>
                        <p>&#60; ALL RENTERS</p>
                    </Link>
               
            </div>
            <div className="wrapper">
                <div className="newrenter-form-wrapper">
                    <p><b>UPDATE RENTER</b></p>
                    <Form className="form-align" onSubmit={handleSubmit}>
                        <div className="margin-form">
                            <button
                                type="button"
                                onClick={imageUpload}
                                className="photo-btn-update">{photoThumbnail}
                            </button>
                            {/* <select>
                                <option className={user.status}>{user.status}</option>    
                            </select> */}
                            <h5 className={user.status}>{user.status}</h5>  
                           <ChangeStatus 
                                user_id={user.id}
                                user_status={user.status}/>
                            <Form.File
                                id="userphoto"
                                name="user_photo"
                                onChange={changeHandler}
                                value={ "" || user.user_photo}
                                ref={hiddenFileInput}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="wrap-names-renter">
                            <div className="margin-form-name">
                                <Form.Control
                                    name="name"
                                    autocomplete="off"
                                    onChange={handleChange}
                                    value={user.name}
                                    placeholder="Update Name"
                                    disabled={submitting}
                                    required
                                />
                            </div>

                            <div className="margin-form-name">
                                <Form.Control
                                    name="last_name"
                                    autocomplete="off"
                                    onChange={handleChange}
                                    value={user.last_name}
                                    placeholder="Update Last Name"
                                    disabled={submitting}
                                    required
                                />
                            </div>
                        </div>
                        <div className="margin-form">
                            <Form.Control
                                name="passport"
                                autocomplete="off"
                                onChange={handleChange}
                                value={user.passport}
                                placeholder="Passport"
                                disabled={submitting}
                                required
                            />
                        </div>
                        <div className="margin-form">
                            <Form.Control as="select" name="location_id" onChange={handleChange} value={user.location_id} required>
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
                                value={user.address}
                                placeholder="Address or Container"
                                disabled={submitting}
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
                                value={user.gender}
                                disabled={submitting}
                                required >
                                <option value={user.gender} selected hidden>{user.gender}</option>
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
                                placeholder="Birth date"
                                onChange={handleChange}
                                value={user.date_birth}
                                disabled={submitting}
                                required
                            />
                        </div>
                        <div className="margin-form condition">
                            <Form.Control
                                name="nationality"
                                autocomplete="off"
                                onChange={handleChange}
                                value={user.nationality}
                                placeholder="Nationality"
                                disabled={submitting}
                                required />
                        </div>
                        <div className="margin-form">
                            <Form.Control
                                type="email"
                                name="email"
                                autocomplete="off"
                                onChange={handleChange}
                                value={user.email}
                                placeholder="Email"
                                disabled={submitting}
                                required />
                        </div>
                        <div className="margin-form">
                            <Form.Control className="number"
                                type="number"
                                name="phone_number"
                                onChange={handleChange}
                                value={user.phone_number}
                                placeholder="Phone Number"
                                disabled={submitting}
                                required />
                        </div>
                        <div className="margin-form-button">
                            <Button className="submit-button" type="submit">Update User</Button>
                        </div>
                    </Form>
                </div>
                <div className="buttons-resident prelinks-wrapper">
                    <DeleteRenter name={user.name} params={user.id}/>
                    <Link to={'/userhistory/'+ user.id}
                    user_name={user.name}
                    user_last_name={user.last_name}>    
                    <button className="history-button">History</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UpdateRenter;