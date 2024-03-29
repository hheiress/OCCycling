import React, {Component} from 'react';
import moment, {duration} from "moment";


class SetTimer extends Component{
    state = {
        timerStarted: false,
        timerStopped: true,
        hours:0,
        mins:0,
        seconds:0,
        color: ""
     };
 
     setCountdown(){
         const now = moment(new Date());
         const dueDate = moment(this.props.dueDate);
        //(rentingDate()20:00+starting_time(04:00))-localTime()22:00- = diff 
         const clockDuration =duration(now.diff(dueDate));
         const hours=clockDuration.hours();
         const mins =clockDuration.minutes();
         const seconds =clockDuration.seconds();
         this.setState(
             [hours + ":" + mins + ":" + seconds]
         );
        //  (this.state[0]) 
         if(this.state[0] > 0){
          this.setState[0]({ color: "red" });
        // clockDuration.style.color ="violet"
         }
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
                    <p> {this.state[i]} </p>
                </div>    
            ))}
            {/* <UpdateRenting componentWillUnmount={this.componentWillUnmount()}/> */}
        </div>
    )
   }
}

export default SetTimer;