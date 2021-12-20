import React,{useState} from 'react'
import {InputGroup,Button,Modal,FormControl} from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios';
import backendurl from '../constants';
function AddStudentPopup(props) {

    const [data,setdata] = useState({
        stdname:'',
        stdsec:''
    })
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange=(e)=>{
        setdata((old)=>{
            return { 
                ...old,
                [e.target.name]:e.target.value
            }
        })
    }
    const addStudent = async ()=>{
        try{
        let res = await axios.post(`${backendurl}/api/students`,{Name:data.stdname,Section:data.stdsec})
        Swal.fire('Student Added Successfuly')
        props.stdchanged()
        handleClose()
        }
        catch(e){
            Swal.fire({
                icon: 'error',
                title: 'Error adding student',
                text: 'Something went wrong!',
              })
            console.log(e)
        }
    }

    return (
        <>
        
      <Button variant="success" onClick={handleShow}>
        Add student
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
            <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            name="stdname"
            onChange={handleChange}
            value={data.stdname}
            />
        </InputGroup>
        <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Section</InputGroup.Text>
            <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            name="stdsec"
            onChange={handleChange}
            value={data.stdsec}
            />
        </InputGroup>
        </Modal.Body>
        <Modal.Footer>
            
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={addStudent}>Add</Button>
        </Modal.Footer>
      </Modal>
        
        </>
         );
    
}

export default AddStudentPopup
