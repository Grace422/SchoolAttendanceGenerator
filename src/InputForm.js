import React, { useState } from 'react';
import html2pdf from 'html2pdf.js'

export default function InputForm() {
    const [input, setInput] = useState('')
    const [isPreviewed, setIsPreviewed] = useState(false)
    const [name, setName] = useState()
    const [mat, setMat] = useState()

    const handleSubmit = (event) => {
        event.preventDefault();
        setInput('')
    }
    const handleClick = () => {
        const element = document.querySelector('#attendance')
        html2pdf(element);
    }
    return (
        <div className='input'>
            <p>School Attendance</p>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>

                <label>Matricule:</label>
                <input type='text' value={mat} onChange={(e)=>setMat(e.target.value)}/>

                <div className='select'>
                    <label>Level:</label>
                    <select>
                        <option value='200'>Level 200</option>
                        <option value='300'>Level 300</option>
                        <option value='400'>Level 400</option>
                        <option value='500'>Level 500</option>
                    </select>
                    <div />
                    <div className='select'>
                        <label>Sex:</label>
                        <select>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>
                    </div>

                    <div className='select'><label>Deparment:</label>
                        <select>
                            <option value='computer'>Computer Engineering</option>
                            <option value='electrical'>Electrical Engineering</option>
                            <option value='mechanical'>Mechanical Engineering</option>
                            <option value='civil'>Civil Engineering</option>
                        </select>
                    </div>


                    <div className='input-btn'>
                        <button onClick={() => setIsPreviewed(true)}>Preview</button>
                        <button onClick={handleClick}>Download</button>
                    </div>
                </div>

            </form>
        </div>
    )
}