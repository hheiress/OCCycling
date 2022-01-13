import React, { useEffect, useReducer, useState } from 'react'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import VolunteerPanel from '../../VolunteerPanel';
import ChangeBikeStatus from './ChangeBikeStatus'
import DeleteBike from './DeleteBike.js';
import { toast } from 'react-toastify/dist';
import dynamicGetFetch from "./../../DymanicRequests/dynamicGetFetch";
import icon from "../../../images/icon.svg";

const bikeFormReducer = (state, event) => {
  if (event.type === 'fetch') {
    return event.bike;
  }
  console.log(state, event);
  return {
    ...state,
    [event.name]: event.value,
  }
}
function UpdateBicycle(props) {
  const [submitting, setSubmitting] = useState(false);
  const [station, setStation] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [photoThumbnail, setPhotoThumbnail] = useState("Photo")
  const [bike, setBike] = useReducer(bikeFormReducer, {});

  const urlStation = `/station`;

  useEffect(() => {
    dynamicGetFetch(urlStation)
    .then((data) => {
      console.log("First render");
      setStation(data);
    })
  }, []);
  
  const urlBikeId =`/bikes/${props.match.params.id}`;
  useEffect(() => {
      dynamicGetFetch(urlBikeId)
      .then((data) => {
        console.log("First render");
        console.log(data)
        // const bike = data.find(x => x.id == props.match.params.id)
        setBike({
          type: 'fetch',
          bike: data,
        })
        fetch(`http://localhost:3000/bikes/${props.match.params.id}/photo`).then(data => {
          data.status === 500 ? setPhotoThumbnail(<img className="photo-btn" src={icon}/>) : setPhotoThumbnail(<img className="photo-btn" src={`http://localhost:3000/bikes/${props.match.params.id}/photo`} />)
        })
      })
    }, [setBike, props.match.params.id]);

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("model_name", bike.model_name)
    formData.append("brand_name", bike.brand_name)
    formData.append( "status", bike.status);
    formData.append( "entry_date", bike.entry_date);
    formData.append( "conditions", bike.conditions);
    formData.append( "station_id", bike.station_id);
    formData.append( "bike_number", bike.bike_number);

    if(isFilePicked){
        formData.append("bike_photo", selectedFile);
    }else{
        formData.append("bike_photo", null);
    }{
        setSubmitting(true);
        fetch(`http://localhost:3000/bikes/${props.match.params.id}`, {
        method: 'PUT',
        body: formData,
    })
      setTimeout(() => {
        toast.info("Bicycle Updated!");
        setSubmitting(false);
      }, 500);
    }
  }
  
  const handleChange = event => {
    setBike({
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
  const updatedStation = station.filter(
    item => item.station_name === bike.station_name
  )

  const hiddenFileInput = React.useRef(null);
  const imageUpload = event => {
    hiddenFileInput.current.click();
  };
  
  return (
    <div>
      <VolunteerPanel />
      <div className="prelinks-wrapper">
      <Link to={'/bicycles'}>
            <p>&#60; ALL BICYCLES</p>
      </Link>
      </div>
      <div className="wrapper">
        <div className="return-form">
          
        </div>
        <div className="form-wrapper">
          <p><b>UPDATE BICYCLE</b></p>
          <Form onSubmit={handleSubmit} className="form-align" >
            <div className="margin-form">
              <button
                type="button"
                onClick={imageUpload}
                className="photo-btn-update">{photoThumbnail}</button>
              </div>
              <h5 className={bike.status}>{bike.status}</h5>  
              <ChangeBikeStatus 
                    bike_id={bike.id}
                    bike_status={bike.status}/>
                <Form.Control
                    id="bikephoto"
                    name="bike_photo"
                    onChange={changeHandler}
                    value={ "" || bike.bike_photo}
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                    type="file"
                 />
            <div className="margin-form">
              <Form.Control
                  name="bike_number"
                  type="number"
                  autocomplete="off"
                  onChange={handleChange}
                  value={bike.bike_number}
                  disabled={submitting}
                  required/>
            </div>
            <div className="margin-form">
              <Form.Control
                name="model_name"
                type="text"
                autocomplete="off"
                onChange={handleChange}
                value={bike.model_name}
                disabled={submitting}
                required/>
            </div>
            <div className="margin-form">
              <Form.Control
                  name="brand_name"
                  type="text"
                  autocomplete="off"
                  onChange={handleChange}
                  value={bike.brand_name}
                  disabled={submitting}
                  required/>
            </div>
            <div className="margin-form">
              <Form.Control
                as="select"
                name="station_id"
                onChange={handleChange}
                value={bike.station_id}
                disabled={submitting}
                required>
                {station.map((item) => (
                  <option value={item.id}>{item.station_name}</option>
                ))}
              </Form.Control>
            </div>
            <div className="margin-form condition">
              <p>CONDITION</p>
              <Form.Control
                as="textarea"
                rows={5}
                autocomplete="off"
                name="conditions"
                onChange={handleChange}
                value={bike.conditions}
                disabled={submitting}
                required/>
            </div>
            <div className="margin-form-button">
              <Button className="submit-button" type="submit" disabled={submitting}>Done</Button>
            </div>
          </Form>
        </div>
      </div>
      <div className="buttons-resident prelinks-wrapper">
            <DeleteBike name={bike.model_name} params={bike.id}/>
            <Link to={'/bikehistory/'+ bike.id}
                bike_name={bike.model_name}
            > 
            <button className="history-button">History</button>
            </Link>
        </div>
    </div>
  )
}
export default UpdateBicycle;