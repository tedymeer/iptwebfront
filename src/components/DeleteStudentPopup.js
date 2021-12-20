import React,{useState} from 'react'
import {InputGroup,Button,Modal,FormControl} from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios';
import backendurl from '../constants';
function DeleteStudentPopup(props) {

    const [stdID,setStdID] = useState(null)
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const deleteStudent = async ()=>{
        try{
        let res = await axios.delete(`${backendurl}/api/students/${stdID}`)
        Swal.fire('Student Deleted Successfuly')
        props.stdchanged()
        handleClose()
        }
        catch(e){
            Swal.fire({
                icon: 'error',
                title: 'Error Deleting student',
                text: 'Something went wrong!',
              })
            console.log(e)
        }
    }

    return (
        <>
        
      <Button variant="danger" onClick={handleShow}>
        Delete student
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete a student</Modal.Title>
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
          <Button variant="danger" onClick={deleteStudent}>Delete</Button>
        </Modal.Footer>
      </Modal>
        
        </>
         );
    
}

export default DeleteStudentPopup
