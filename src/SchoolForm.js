import React from 'react';
import img from './images/ub-logo.jpeg';

export default function SchoolForm() {
    return (
        <div className='container' id='attendance'>
            <div className='top'>
                <p>
                    <strong style={{ fontSize: '20px' }}>UNIVERSITY OF BUEA</strong> <br />
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
                    <strong className='one'>REPUBLIC OF CAMEROON</strong> <br />
                    PEACE-WORK-FATHERLAND
                </p>
            </div>
            <div className='top-bottom'>
                <p>
                    <strong style={{ fontSize: '22px', marginBottom: '50px' }}>FACULTY OF ENGINEERING AND TECHNOLOGY</strong> <br /> <br/>
                    Dean: <strong>Agbor Dieudonne Agbor,PhD</strong> <br />
                    Vice-Dean: <strong>Dr. Nde D.Nguti</strong> <br />
                    Faculty Officer: <strong>Mme. Ekpombang Patience Taku</strong> <br />
                </p>
            </div>
            <hr />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{marginTop: '15px'}}>
                    <strong>Your Ref:</strong> <hr className='line'/>
                    <strong>Our Ref: <p className='year'>2024/ 106 /UB/D/FET</p></strong>
                </div>
                <div>
                    <p> Date: <strong className='date'>06 JAN 2024</strong> </p>
                </div>
            </div>
            <br />

            <p className='title'>ATTESTATION OF SCHOOL ATTENDANCE</p>
            <p className='text'>
                I, the undersigned, Dean of the Faculty of Engineering and Technology do, hereby attest that
                <strong> NEGUE KWAHAM MAEL GRACE</strong> with matriculation number <strong>FE21A252</strong> is in Level 400 (Third year)
                student in the Faculty of Engineering and Technology, Department of Computer Engineering for the academic
                year 2023/2024.
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
    )
}