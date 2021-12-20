import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes ,Route } from 'react-router-dom';
import ManageStudentPage from './pages/ManageStudentPage'
import ManageQuizPage from './pages/ManageQuizPage';
import AdminPage from './pages/AdminPage';
import b from '../src/constants'
function App() {
  return (
    <div className="App">
      
    
     <Routes>
          <Route path="/" element={<AdminPage/>}/>
          <Route path="/student" element={<ManageStudentPage/>}/>
          <Route path="/quiz" element={<ManageQuizPage/>}/>        
     </Routes>
    
    
    </div>
  );
}

export default App;
