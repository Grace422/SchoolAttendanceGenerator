import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js'
import img from './images/ub-logo.jpeg';



export default function InputForm() {
    const [file, setFile] = useState()
    const fileReader = new FileReader()
    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    }
    const [formData, setFormData] = useState({
        name: '',
        matricule: '',
        department: '',
        level: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    const componentRef = useRef()
    const handleDownload = () => {
        const element = componentRef.current
        console.log(componentRef.current);
        const opt = {
            margin: 1,
            filename: `${formData.name}_Form.pdf`,
            image: { type: 'png', quality: 0.99, compression: 'best' },
            html2canvas: { scale: 3 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            output: 'blob'
        }
        html2pdf().set(opt).from(element).save()
    }
    const currentDate = new Date()
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };
    const levalMapping = {
            '200': 'First year',
            '300': 'Second year',
            '400': 'Third year',
            '500': 'Fourth year',
    }
    const formattedDate = currentDate.toLocaleDateString('en-GB', options)
    
    // if (!formData.name || !formData.matricule || !formData.department || !formData.level){
    //     navigate('/')
    //     alert('Please fill in all required fields before downloading the letter.');
    //     return null;
    // }

    return (
        <main>
        <div className='input'>
            <p>School Attendance</p>
            <form>
                <label>Name:</label>
                <input type='text' name='name' value={formData.name} onChange={handleChange} required />

                <label>Matricule:</label>
                <input type='text' name='matricule' value={formData.matricule} onChange={handleChange} required />

                <div className='select'>
                    <label>Level:</label> <br/>
                    <select name='level' value={formData.level} onChange={handleChange} required>
                        <option value=''> </option>
                        <option value='200'>Level 200</option>
                        <option value='300'>Level 300</option>
                        <option value='400'>Level 400</option>
                        <option value='500'>Level 500</option>
                    </select>
                <div />

                <div className='select'>
                        <label>Deparment:</label>
                        <select name='department' value={formData.department} onChange={handleChange} required>
                            <option value=''> </option>
                            <option value='Computer Engineering'>Computer Engineering</option>
                            <option value='Electrical Engineering'>Electrical Engineering</option>
                            <option value='Mechanical Engineering'>Mechanical Engineering</option>
                            <option value='Civil Engineering'>Civil Engineering</option>
                        </select>
                </div>


                    <div className='input-btn'>
                        <input type={'file'} accept={".csv"} id={"csvFileInput"}/>
                        <button onClick={handleDownload} type='button'>Download</button>
                        <button onClick={handleOnChange} type='button'>Download All</button>
                    </div>
                </div>
            </form>
        </div>

        <div className='container' ref={componentRef}>
                <div className='top'>
                    <p>
                        <strong style={{ fontSize: 'larger' }}>UNIVERSITY OF BUEA</strong> <br />
                        <div style={{ fontSize: '15px', fontFamily: 'arial' }}>
                            P.O. Box 63, <br />
                            Buea, South West Region <br />
                            CAMEROON <br />
                            Tel: (237) 3332 21 34/3332 26 90/3332 27 06/3332 28 13 <br />
                            Fax: (237) 3332 22 27
                        </div>
                    </p>
                    <img src={img} alt='ub-logo' className='image' />
                    <p className='top-left'>
                        <strong style={{ fontSize: 'larger' }}>REPUBLIC OF CAMEROON</strong> <br />
                        PEACE-WORK-FATHERLAND
                    </p>
                </div>
                <div className='top-bottom'>
                    <p>
                        <strong style={{ fontSize: 'larger', marginBottom: '50px' }}>FACULTY OF ENGINEERING AND TECHNOLOGY</strong> <br /> <br />
                        Dean: <strong>Agbor Dieudonne Agbor,PhD</strong> <br />
                        Vice-Dean: <strong>Dr. Nde D.Nguti</strong> <br />
                        Faculty Officer: <strong>Mme. Ekpombang Patience Taku</strong> <br />
                    </p>
                </div>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ marginTop: '15px' }}>
                        <strong>Your Ref:</strong> <hr className='line' />
                        <strong>Our Ref: <p className='year'>2024/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/UB/D/FET</p></strong>
                    </div>
                    <div>
                        <p> Date: <strong className='date' id='date'>{formattedDate}</strong> </p>
                    </div>
                </div>
                <br />

                <p className='title'>ATTESTATION OF SCHOOL ATTENDANCE</p>
                <p className='text'>
                    I, the undersigned, Dean of the Faculty of Engineering and Technology do, hereby attest that 
                    <strong> {formData.name} </strong> with matriculation number <strong> {formData.matricule} </strong> is a Level <span>{formData.level}</span> 
                    {formData.level && (
                          <span> ({levalMapping[formData.level]}) </span>
                    )}
                    student in the Faculty of Engineering and Technology, Department of <span> {formData.department} </span> for the academic year 2023/2024.
                </p> <br />
                <p className='text'>
                    In withness whereof this attestation is issued to serve as and where necessary.
                </p> <br />
                <div className='bottom'>
                    <p>
                        <strong>Agbor Dieudonne Agbor,PhD</strong> <br />
                        Dean <br />
                    </p>
                </div>
            </div>
        </main>
    )
}