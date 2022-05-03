import { Button, Table } from "reactstrap";
import { Session } from "../../models/Session";

type Props = {
    sessions: Session[];
    onDeleteClick: (id: number) => void;
    onEditClick: () => void;
}

const SessionsTable = (props: Props) => {
    const {sessions, onDeleteClick, onEditClick} = props;

    return (
    <>
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
                {sessions.map(s => // not sure how to output league name yet
                    <tr key={s.id.toString()}>
                        {/* <td>{f.league}</td> 
                        <td>{f.addressLine1}</td>
                        <td>{f.numberOfCourts}</td> */}
                        <td>
                            <Button outline color="secondary" className="me-1" onClick={() => onEditClick()}>Edit</Button>
                            <Button outline color="secondary" onClick={() => onDeleteClick(s.id)}>Delete</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    </>
    );
}

export default SessionsTable;