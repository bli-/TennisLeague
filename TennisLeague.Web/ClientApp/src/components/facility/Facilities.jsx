import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { getAllFacilities, createFacility, deleteFacility, updateFacility } from '../../api/facilityApi';
import FacilityModal from './FacilityModal';
import FacilitiesTable from './FacilitiesTable';
import validateFacility from './facilityValidation';
import  './Facilities.css';

const Facilities = () => {
    const NewFacilityTemplate = {
        name: '',
        addressLine1: '',
        city: '',
        state: '',
        zip: '',
        numberOfCourts: 0
    };
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fieldErrors, setSubmitErrors] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [facility, setFacility] = useState(NewFacilityTemplate);
    const [modalMode, setModalMode] = useState('Add');

    useEffect(() => {
        populateFacilities();
        setRefresh(false);
    }, [refresh])

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    }

    const populateFacilities = async () => {
        let response;
        try {
            response = await getAllFacilities();
        } catch(e) {
            setError("Server error. Please try again later.");
            setLoading(false);
        }
        
        if (!response || (response.status >= 400 && response.status < 600)) {
            setError("Server error. Please try again later.");
            setLoading(false);
            return;
        } 
  
        const data = await response.json();
        setFacilities(data);
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

        let response;
        let submitErrorMessage = "Server error";
        if (modalMode === 'Add') {
            response = await createFacility(facility);
            submitErrorMessage = "Server error when creating facility";
        }
        else if (modalMode === "Edit") {
            response = await updateFacility(facility);
            submitErrorMessage = "Server error when updating facility";
        }

        if (response.status <= 299) {
            setSubmitErrors([]);
            setRefresh(true);
            setFacility(NewFacilityTemplate);
            toggleModal();
        } else {
            setSubmitErrors([submitErrorMessage]);
        }
    }

    const onDeleteClick = async (id) => {
        let response = await deleteFacility(id);

        if (response.status <= 299) {
            setRefresh(true);
        } else {
            setSubmitErrors(["Server error when deleting facility"]);
        }
    }

    const onAddClick = () => {
        setModalMode('Add');
        setSubmitErrors([]);
        setFacility(NewFacilityTemplate);
        toggleModal();
    }

    const onEditClick = (id) => {
        setModalMode('Edit');
        setSubmitErrors([]);
        setFacility(facilities.find(f => f.id === id));
        toggleModal();
    }

    const changeHandler = (key, value) => {
        setFacility(prevState => ({
            ...prevState,
            [key]: value
        }));
    }
    
    let contents;

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
            <FacilityModal 
                isOpen={isModalOpen} 
                toggleOpen={toggleModal} 
                submit={submit} 
                errors={fieldErrors} 
                facility={facility} 
                changeHandler={changeHandler}
                modalMode={modalMode}
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