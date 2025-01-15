import './App.css';
import InputForm from './InputForm'; 
import SchoolForm from './SchoolForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <InputForm/> }/>
        <Route path ='/school' element={ <SchoolForm/> }/>
        <Route path='/input' element={ <InputForm/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
