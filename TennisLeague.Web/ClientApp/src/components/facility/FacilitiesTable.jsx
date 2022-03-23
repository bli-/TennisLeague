import { Button } from 'reactstrap';

const FacilitiesTable = (props) => {
    const { facilities, onDeleteClick, onEditClick } = props;
    
    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Courts</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {facilities.map(f => 
                    <tr key={f.id.toString()}>
                        <td>{f.name}</td>
                        <td>{f.addressLine1}</td>
                        <td>{f.numberOfCourts}</td>
                        <td>
                            <Button outline color="secondary" className="me-1" onClick={() => onEditClick(f.id)}>Edit</Button>
                            <Button outline color="secondary" onClick={() => onDeleteClick(f.id)}>Delete</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default FacilitiesTable;