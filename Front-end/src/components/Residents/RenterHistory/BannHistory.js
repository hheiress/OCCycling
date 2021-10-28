import react, {useState, useEffect, Link} from "react";
import VolunteerPanel from "../../VolunteerPanel";
import HistoryButtons from "./HistoryButtons";
import Accordion from 'react-bootstrap/esm/Accordion';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

function BannUser (props){
    const [banns, setBanns] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:3000/bann_history",{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
              }
            })
        .then((res) => res.json())
        .then((data) => {
            console.log("First render");
              let banns = data.filter(x => x.user_id == props.match.params.id)
              console.log(banns)
              setBanns(banns)
          }, [setBanns, props.match.params.id]);
        })
    return (
        <>
        <VolunteerPanel />
        <div className="wrapper">
        <HistoryButtons
                    user_id={props.match.params.id}
                    user_name={props.match.params.user_name}
                    user_last_name={props.match.params.user_last_name}
        />
        <h1 className="header-history"><hr width="20%"/></h1>
        <h1 className="header-history"><span className="bike-word">Bann </span> History</h1>
        <span>Number of total banns: {banns.length} </span>
            <div className="bann-history-wrapper">
                <div className="user-history"> 
                    {banns?.length > 0 ? banns.map((item, index) => (
                        <Accordion>
                        <Accordion.Item eventKey="0">
                        <Accordion.Header>Bann Story
                         <KeyboardArrowDownIcon/>
                         </Accordion.Header>
                         <Accordion.Body>
                        <div className="history-block" key={index}>
                        <p className="user-history-text" key={index}>
                          <span className="user-history-list"> Bann Start: </span>{item.start_date.slice(0,19)}<br/>
                          <span className="user-history-list"> Bann Finished: </span> {item.finish_date}<br/>
                        </p>
                        </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                        )
                    )
                    : <p className="text-center">No banns, clear history!</p> 
                        
                }
                </div>
            </div>
        </div>
    </> 
    )
}
export default BannUser;