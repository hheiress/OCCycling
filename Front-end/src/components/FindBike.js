// import React from 'react';
// import Table from "./Rentings/kitrentings/rentingsTable";
// import { Center } from "./Rentings/styles/mixins/Center";
// import { Link } from 'react-router-dom';

// function FindBike() {
//     fetch("http://localhost:3000/users")
//     .then((response)=>{
//     if(response.status>=200 && response.status<=299){
//         return response.json();}
//     })
//     .then((myJson)=>{
//     let getResults=myJson.data;
//     let name=getResults[0].name;
//     let last_name=getResults[0].last_name;
//     let passport=getResults[0].passport;
//     let adress= getResults[0].adress;
//     let gender=getResults[0].gender;
//     let date_birth= getResults[0].date_birth;
//     let nationality=getResults[0].nationality;
//     let email= getResults[0].email;
//     let phone_number= getResults[0].phone_number;

//     let getArticle=document.querySelector("#main-container");
//     let getCity=document.createElement("div");
//     getCity.className="article"
//     getArticle.appendChild(getCity);
//     let setCity=document.createElement("h3");
//     getCity.appendChild(setCity);
//     setCity.innerHTML=city;
//     let setDateTime=document.createElement("p");
//     setDateTime.innerHTML=dateTime;
//     setCity.appendChild(setDateTime);
//     let setImage=document.createElement("img");
//     setImage.setAttribute("src", imageLink)
//     getCity.appendChild(setImage);
    
//     let getTemprature=document.createElement("p");
//     getTemprature.innerHTML=temprature + "ÂºC";
//     getCity.appendChild(getTemprature);
//     getTemprature.className="tempr";
 
//     let getWeather=document.createElement("p");
//     getWeather.innerHTML=weather.description;
//     getCity.appendChild(getWeather);
    
//  })
//  .catch(function(error){
//      alert("Run!");
//      console.log(error);
//  });
//  }
//     return (
//         <div className="wrapper">
//             <div className="form-signin">
//                 <h1 className="text-center">Bikes</h1>
//                 <Center V H>
//                     <Table data={data} />
//                 </Center>
//                 <Link to={'/addtime'}>
//                     <button className="mt-5 btn btn-primary w-100" type="submit">Assign Time</button>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default FindBike
