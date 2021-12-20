import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import {Table,Container,Row,Col} from 'react-bootstrap'
import {InputGroup,Button,Modal,FormControl} from 'react-bootstrap'
import axios from 'axios'
import backendurl from '../constants'
import Swal from 'sweetalert2'
function ShowQuiz() {
    let [quiz,setquiz] = useState([])
    let [Qchange,setStateQchanged] = useState(false)
    let [change,setStateChanged] = useState(false)
    const [data,setdata] = useState({
        question:'',
        marks:''
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showD, setShowD] = useState(false);
    const handleCloseD = () => setShowD(false);
    const handleShowD = () => setShowD(true);

    const [Qid,setQid] = useState(null)

    const getQuiz = async ()=>{
        try{
        let res = await axios.get(`${backendurl}/api/quiz`)
        setquiz(res.data)
        }
        catch(e){
            console.log(e)
        }
    }
    const deleteQuestion = async ()=>{
        try{
        let res = await axios.delete(`${backendurl}/api/quiz/${Qid}`)
        Swal.fire('Question Deleted Successfuly')
        setStateQchanged(!Qchange)
        }
        catch(e){
            console.log(e)
        }
    }
    const handleChange=(e)=>{
        setdata((old)=>{
            return { 
                ...old,
                [e.target.name]:e.target.value
            }
        })
    }
    const deleteQuiz= async ()=>{
        try{
            let res = await axios.delete(`${backendurl}/api/quiz`)
            setStateQchanged(!Qchange)
            }
            catch(e){
            console.log(e)
            }
    }
    const addQuestion = async ()=>{
        try{
        let res = await axios.post(`${backendurl}/api/quiz`,{Question:data.question,Marks:data.marks})
        Swal.fire('Question Added Successfuly')
        setStateQchanged(!Qchange)
        // handleClose()
        }
        catch(e){
            Swal.fire({
                icon: 'error',
                title: 'Error adding question',
                text: 'Something went wrong!',
              })
            console.log(e)
        }
    }
    useEffect(()=>{
        getQuiz()
    },[Qchange])

   
    
    return (
        <div>
        <Container>
            <Row>
                <Col style={{padding:'3em'}}>
                <Button style={{marginLeft:'auto',margin:'1em'}} variant="success" onClick={handleShow}>Add Question</Button> 
                <Button style={{marginLeft:'auto',margin:'1em'}} variant="danger" onClick={handleShowD}>Delete Question</Button> 
                <Button style={{marginLeft:'auto',margin:'1em'}} variant="dark" onClick={()=>{setStateQchanged(!Qchange)}}>Shuffle quiz</Button> 
                <Button style={{marginLeft:'auto',margin:'1em'}} variant="danger" onClick={deleteQuiz}>DeleteQuiz</Button> 
                </Col>
            </Row>
            <Row>
                <Col>
                <Table striped bordered hover>
<thead>
<tr>
  <th>Question ID</th>
  <th>Question</th>
  <th>Marks</th>
</tr>
</thead>
<tbody>
  {
quiz.map((cval)=>{
    return (
        <tr>
        <td>{cval.ID}</td>
        <td>{cval.Question}</td>
        <td>{cval.Marks}</td>
        </tr>
    )
})
  }  
</tbody>
                    </Table>
                    </Col>
            </Row>
            </Container>
            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Question</InputGroup.Text>
            <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            name="question"
            onChange={handleChange}
            value={data.question}
            />
        </InputGroup>
        <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Marks</InputGroup.Text>
            <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            name="marks"
            onChange={handleChange}
            value={data.marks}
            />
        </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={addQuestion}>Add</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showD}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete a question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Question ID</InputGroup.Text>
            <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            name="id"
            onChange={(e)=>{setQid(e.target.value)}}
            value={Qid}
            />
        </InputGroup>
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteQuestion}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
}

export default ShowQuiz
