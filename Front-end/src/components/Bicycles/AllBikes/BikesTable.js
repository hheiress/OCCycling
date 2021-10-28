import react from 'react';
import {Link} from "react-router-dom";

function BikesTable (props) {

    return(
        <tr key={props.index}>
           <td className="id-number">{props.item.bike_number}</td>
                <td>{props.item.brand_name}</td>
                <td>{props.item.model_name}</td>
                <td>{props.item.station_name}</td>
                <td>{props.item.entry_date.slice(0, 10)}</td>
                <td>{props.item.conditions}</td>
                <td className={props.item.status}>{props.item.status}</td>
                <td>
                    <Link to={'/updatebicycle/' + props.item.id}>
                        <button className="update-button">Update</button>
                    </Link>
                    <Link to={'/bikehistory/'+ props.item.id}
                        bike_name={props.item.model_name}>
                        <button className="history-button">History</button>
                    </Link>
                </td> 
        </tr>
    )
}

export default BikesTable;