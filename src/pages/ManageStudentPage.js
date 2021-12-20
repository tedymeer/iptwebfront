import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import {Table,Container,Row,Col,Button} from 'react-bootstrap'
import axios from 'axios'
import backendurl from '../constants'
import AddStudentPopup from '../components/AddStudentPopup'
import DeleteStudentPopup from '../components/DeleteStudentPopup'
import FindStudentPopup from '../components/FindStudentPopup'
function ManageStudentPage() {
    //Api call
    let [students,setStudents] = useState([])
    const [stdState,setstdState] = useState(false)
    const [stdStateD,setstdStateD] = useState(false)
    const getAllstudents = async ()=>{
        try{
        let res = await axios.get(`${backendurl}/api/students`)
        console.log(res)
        setStudents(res.data)
        }
        catch(e){
            console.log(e)
        }
    }
    const stdchanged = ()=>{
        setstdState(true)
    }
    const resultOfFind = (data)=>{
        setStudents(data)
    }
    const deleteAllstds = async ()=>{
        try{
            let res = await axios.delete(`${backendurl}/api/students`)
            console.log(res)
            setstdStateD(!stdStateD)
            }
            catch(e){
                console.log(e)
            }
    }
    useEffect(()=>{
        getAllstudents()
        setstdState(false)
    },[stdState])
    useEffect(()=>{
        getAllstudents()
    },[stdStateD])
    
    return (
        <div>
            <Header/>
            <Container >
                <Row style={{padding:'2em'}}>
                <Col> 
                {/* <Button variant="success">Add student</Button> */}
                <AddStudentPopup stdchanged={stdchanged} />
                </Col>             
                <Col> 
                <FindStudentPopup resultOfFind={resultOfFind} />
                {/* <Button variant="dark">Find student</Button> */}
                </Col>
                <Col>
                {/* <Button variant="danger">Delete student</Button> */}
                <DeleteStudentPopup stdchanged={stdchanged}/>
                </Col>
                <Col>
                <Button variant="danger" onClick={deleteAllstds}>Delete All Students</Button>
                
                </Col>
                </Row>
                <Row>
                    <Col>
                    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Std ID</th>
      <th>Student Name</th>
      <th>Section</th>
    </tr>
  </thead>
  <tbody>
      {
  students.map((cval)=>{
        return (
            <tr>
            <td>{cval.ID}</td>
            <td>{cval.Name}</td>
            <td>{cval.Section}</td>
            </tr>
        )
  })
      }  
  </tbody>
                        </Table>
                        </Col>
                    </Row>
                </Container>
            
        </div>
    )
}

export default ManageStudentPage
