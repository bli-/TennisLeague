import { Button, Table } from 'reactstrap';
import { Facility } from '../../models/Facility';

type Props = {
    facilities: Facility[],
    onDeleteClick: (id: number) => void,
    onEditClick: (id: number) => void
}

const FacilitiesTable = (props: Props) => {
    const { facilities, onDeleteClick, onEditClick } = props;
    
    return (
        <Table striped>
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
        </Table>
    );
}

export default FacilitiesTable;