import react from 'react';
import { Link } from "react-router-dom";

const ResidentsTable = (props)=>{

    return (
        <tr key={props.index}>
            <td>{props.item.name}</td>
                    <td>{props.item.last_name}</td>
                    <td>{props.item.passport}</td>
                    <td>{props.item.address}</td>
                    <td>{props.item.gender}</td>
                    <td>{props.item.date_birth}</td>
                    <td>{props.item.nationality}</td>
                    <td>{props.item.email}</td>
                    <td>{props.item.phone_number}</td>
                    <td>
                      <Link to={'/updaterenter/' + props.item.id}>
                        <button className="update-button">Update</button>
                      </Link>
                      <Link to={'/userhistory/'+ props.item.id}
                            user_name={props.item.name}
                            user_last_name={props.item.last_name}>    
                            <button className="history-button">History</button>
                      </Link>
                    </td>
                    <td className={props.item.status}>{props.item.status}</td>
        </tr>
    )
}

export default ResidentsTable;