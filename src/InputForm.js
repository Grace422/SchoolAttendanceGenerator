import React, { useState } from 'react';
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js'
import img from './images/ub-logo.jpeg';
import * as XLSX from 'xlsx';


export default function InputForm() {
    // const componentRef = useRef()
    const [students, setStudents] = useState([])
    const [file, setFile] = useState()
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const workSheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(workSheet);
                setStudents(jsonData);

                const mappedStudents = jsonData.map((student) => ({
                    ...student,
                    levelMapped:
                        levelMapping[String(student.level)] || 'Unknown Level'
                }))
                setStudents(mappedStudents)
            };
            reader.readAsArrayBuffer(file);
        } else {
            console.error("No file selected");
        }
    };
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
    const currentDate = new Date()
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options)
    const levelMapping = {
        '200': 'First year',
        '300': 'Second year',
        '400': 'Third year',
        '500': 'Fourth year',
    }

    const generatePDF = (studentData, filename) => {
        const element =
            document.createElement('div');
        element.innerHTML = `
            <div class='container' ref={componentRef}>
                <div class='top'>
                    <div>
                        <div>
                          <strong style='fontSize: larger'>UNIVERSITY OF BUEA</strong>
                         </div>
                        <div class='intro-text'>
                            P.O. Box 63, <br />
                            Buea, South West Region <br />
                            CAMEROON <br />
                            Tel: (237) 3332 21 34/3332 26 90/3332 27 06/3332 28 13 <br />
                            Fax: (237) 3332 22 27
                        </div>
                    </div>
                    <div>
                        <img src=${img} alt='ub-logo' class='image' />
                    </div>
                    <div>
                        <strong class='repub'>REPUBLIC OF CAMEROON</strong> 
                        <p class='moto'> PEACE-WORK-FATHERLAND </p>
                    </div>
                </div>
                <div class='top-bottom'>
                    <p>
                        <strong style='fontSize: larger; marginBottom: 50px;'>FACULTY OF ENGINEERING AND TECHNOLOGY</strong> <br /> <br />
                        Dean: <strong>Agbor Dieudonne Agbor,PhD</strong> <br />
                        Vice-Dean: <strong>Dr. Nde D.Nguti</strong> <br />
                        Faculty Officer: <strong>Mme. Ekpombang Patience Taku</strong> <br />
                    </p>
                </div>
                <hr />
                <div class='ref-date'>
                    <div>
                        <strong class='ref' >Your Ref:</strong> <br />
                        <strong>Our Ref: <p class='year'>2024/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/UB/D/FET</p></strong>
                    </div>
                    <div>
                        <p> Date: <strong class='date' id='date'>${formattedDate}</strong> </p>
                    </div>
                </div>
                <br />

                <p class='title'>ATTESTATION OF SCHOOL ATTENDANCE</p>
                <p class='text'>
                    I, the undersigned, Dean of the Faculty of Engineering and Technology do, hereby attest that 
                    <strong> ${studentData.name} </strong> with matriculation number <strong> ${studentData.matricule} </strong> is a Level <span>${studentData.level}</span> 
                <span> (${studentData.levelMapped}) </span>
                    student in the Faculty of Engineering and Technology, Department of <span> ${studentData.department} </span> for the academic year 2023/2024.
                </p> <br />
                <p class='text'>
                    In withness whereof this attestation is issued to serve as and where necessary.
                </p> <br />
                <div class='bottom'>
                    <p>
                        <strong>Agbor Dieudonne Agbor,PhD</strong> <br />
                        Dean <br />
                    </p>
                </div>
            </div>
        `;
        const opt = {
            margin: 1,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98, compression: 'best' },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            output: 'blob'
        }
        html2pdf().set(opt).from(element).save()
    }
    const handleDownloadAll = () => {
        students.forEach((student) => {
            const filename = `${student.name}_Form.pdf`;
            generatePDF(student, filename)
        });
    }
    const handleDownload = () => {
        const { name, matricule, level, department } = formData;
        if (!name || !matricule || !level || !department) {
            alert('Please fill in all fields before downloading.')
            return
        }
        const levelMapped = levelMapping[formData.level] || 'Unknown Level'
        const singleStudent = {
            ...formData,
            levelMapped,
        }
        const filename = `${formData.name}_Form.pdf`;
        generatePDF(singleStudent, filename);
    }

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
                        <label>Level:</label> <br />
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
                            <input type='file' accept=".xlxs, .xls" onChange={handleFileUpload} />
                            <button onClick={handleDownload} type='button'>Download</button>
                            <button onClick={handleDownloadAll} type='button'>Download All</button>
                        </div>
                    </div>
                </form>
            </div>

            {students.length > 0 && (
                <div className='allStudents'>
                    <p>Name: {students[0]?.name}</p>
                    <p>Name: {students[1]?.name}</p>
                    <p>Name: {students[2]?.name}</p>
                    <p>Name: {students[3]?.name}</p>
                </div>
            )}


            <div className='container'>
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
                        <span> ({levelMapping[formData.level]}) </span>
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