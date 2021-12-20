import React,{useState} from 'react'
import {InputGroup,Button,Modal,FormControl} from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios';
import backendurl from '../constants';
function FindStudentPopup(props) {

    const [stdID,setStdID] = useState(null)
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const findStudent = async ()=>{
        try{
        let res = await axios.get(`${backendurl}/api/students/${stdID}`)
        props.resultOfFind([res.data])
        handleClose()
    }
        catch(e){
            Swal.fire({
                icon: 'error',
                title: 'Error Finding student',
                text: 'Something went wrong!',
              })
            console.log(e)
        }
    }

    return (
        <>
        
      <Button variant="dark" onClick={handleShow}>
        Find student
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Find a student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Student ID</InputGroup.Text>
            <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            name="stdname"
            onChange={(e)=>{setStdID(e.target.value)}}
            value={stdID}
            />
        </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={findStudent}>Find</Button>
        </Modal.Footer>
      </Modal>
        
        </>
         );
    
}

export default FindStudentPopup
