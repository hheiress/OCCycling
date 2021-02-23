import React, {Component} from 'react';
import moment, {duration} from "moment";

class SetTimer extends Component{
    state = {
        timerStarted: false,
        timerStopped: true,
        hours:0,
        mins:0,
        seconds:0
     };
 
     setCountdown(){
         const futureDate = moment(this.props.futureDate)
         const today = moment();
 
         const clockDuration =duration(futureDate.diff(today));
         const hours=clockDuration.hours();
         const mins =clockDuration.minutes();
         const seconds =clockDuration.seconds();
 
         this.setState(
             [hours + ":" + mins + ":" + seconds]
         );
     }
     componentDidMount (){
         if(this.state.timerStopped){
         this.setCountdown();
         this.interval= setInterval(()=>{
             this.setCountdown({timerStarted:true, timerStopped:false});
     }, 1000);
 }
}
 
 componentWillUnmount (){
     this.setCountdown({timerStarted:false, timerStopped:true});
     clearInterval(this.interval);
 }

    render () {

    return (
        <div>
            {/* <h1>Time left: {count}, {newTime}  </h1> */}
            {Object.keys(this.state).map((key, i) => (
                <div className= "countdown-segment">
                    <p> {this.state[i]}</p>
                </div>    
            ))}

        </div>
    )
   }
}

export default SetTimer;