import { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { getAllFacilities, createFacility, deleteFacility, updateFacility } from '../../api/facilityApi';
import FacilitiesTable from './FacilitiesTable';
import validateFacility from './facilityValidation';
import  './Facilities.css';
import { Facility } from '../../models/Facility';
import ModalTemplate from '../shared/ModalTemplate';
import FacilityEntryForm from './FacilityEntryForm';

const Facilities = () => {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>(null);
    const [fieldErrors, setSubmitErrors] = useState<string[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [facility, setFacility] = useState(new Facility());
    const [modalMode, setModalMode] = useState<string>('Add');

    useEffect(() => {
        populateFacilities();
        setRefresh(false);
    }, [refresh])

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    }

    const populateFacilities = async () => {
        let facilities: Facility[];
        try {
            facilities = await getAllFacilities();
        } catch(e) {
            setError("Server error. Please try again later.");
            setLoading(false);
            return;
        }

        setFacilities(facilities);
        setLoading(false);
    }

    const submit = async () => {
        var errors = validateFacility(facility);
        if (errors.length > 0) {
            setSubmitErrors(errors);
            return;
        } else {
            setSubmitErrors([])
        }

        let submitErrorMessage = "Server error";
        try {
            if (modalMode === 'Add') {
                submitErrorMessage = "Server error when creating facility";
                await createFacility(facility);
            } else if (modalMode === "Edit") {
                submitErrorMessage = "Server error when updating facility";
                await updateFacility(facility);
            }
        } catch (e) {
            setSubmitErrors([submitErrorMessage]);
            return;
        }        

        setSubmitErrors([]);
        setRefresh(true);
        setFacility(new Facility());
        toggleModal();
    }

    const onDeleteClick = async (id: number) => {
        try {
            await deleteFacility(id);
        } catch (e) {
            setSubmitErrors(["Server error when deleting facility"]);
            return;
        }

        setRefresh(true);
    }

    const onAddClick = () => {
        setModalMode('Add');
        setSubmitErrors([]);
        setFacility(new Facility());
        toggleModal();
    }

    const onEditClick = (id: number) => {
        setModalMode('Edit');
        setSubmitErrors([]);
        setFacility(facilities.find(f => f.id === id));
        toggleModal();
    }

    const changeHandler = (key:string, value:any) => {
        setFacility(prevState => ({
            ...prevState,
            [key]: value
        }));
    }

    const CreateFacilityEntryForm = (): JSX.Element => {
        return <FacilityEntryForm 
                    submit={submit} 
                    errors={fieldErrors} 
                    facility={facility} 
                    changeHandler={changeHandler}
                />
    }
    
    let contents: JSX.Element;

    if (loading) {
        contents = <p><em>Loading...</em></p>
    } else if (error != null) {
        contents = <div className="alert alert-danger" role="alert">{error}</div>
    } else if (facilities.length > 0) {
        contents = <FacilitiesTable facilities={facilities} onDeleteClick={onDeleteClick} onEditClick={onEditClick} />
    } else {
        contents = <p>No facilities available</p>
    }

    return (
        <>
            <ModalTemplate
                isOpen={isModalOpen} 
                submit={submit} 
                headerText={`${modalMode} Tennis Court`}
                submitButtonText={`${modalMode} Facility`}
                toggleOpen={toggleModal}
                content={CreateFacilityEntryForm()}
            />
            <div className="split">
                <h1 id="courtLabel">The Courts</h1>
                <Button color="primary" onClick={onAddClick}>Add Courts</Button>
            </div>
            {contents}
        </>
    )
}

export default Facilities;