import React, { useEffect, useState, useRef } from 'react';
// import { baseURL, token } from '../../token';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashBoard from '../DashBoard';

function Forget() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const newPassRef = useRef(null);
    const conPassRef = useRef(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setMessage('');
        setPassword(event.target.value);
    };
    const handlePassword1Change = (event) => {
        setMessage('');
        setPassword1(event.target.value);
    };





   

    useEffect(() => {
        // Simulate a delay to showcase the loading animation
        setTimeout(() => {
            setLoading(false);
        }, 5); // Change the delay as needed
    }, []);

    return (
        <>
            <div className={`fade-in ${loading ? '' : 'active'}`}>
                <div className="start-box"><div id="stars" /><div id="stars2" /><div id="stars3" /></div>
                <div style={{ backgroundColor: 'black' }} className="dflex">

                    <div className="dLeft" style={{ borderRadius: 30 }}>
                        <div className="start-box"><div id="stars" /><div id="stars2" /><div id="stars3" /></div>
                        <div className="form_box">
                            <div className="loginForm">
                                {/* <img src='../component/public/WhatsApp.png' alt='image'/> */}
                                <h4 style={{ color: 'white', textAlign: 'center' }}>Forget Password</h4>
                                <div className={`fade-in ${loading ? '' : 'active'}`}>
                                    <p style={{ color: 'white', textAlign: 'center' }}>{message}</p>
                                    {step === 1 && (
                                        <div className="loginAction wow flipInX" style={{ visibility: 'visible', animationName: 'flipInX' }}>
                                            {/* Step 1: Enter Email and Send OTP */}
                                            <input
                                                type="text"
                                                name="email"
                                                placeholder="Enter Email"
                                                className="form-control"
                                                required="username"
                                                value={email}
                                                onChange={handleEmailChange}
                                                style={{ borderRadius: 15, paddingLeft: 15, fontWeight: 'bold' }}
                                            />
                                            <button style={{ padding: '10px', width: '100%', borderRadius: '5px', marginTop: '0.5em', backgroundColor: 'rgb(195 161 119)', border: 'none' }}>Send OTP</button>
                                        </div>
                                    )}
                                    {step === 2 && (
                                        <div className="step2">
                                            {/* Step 2: Enter OTP */}
                                            <input
                                                type="text"
                                                name="otp"
                                                placeholder="Enter OTP"
                                                className="form-control"
                                                required="otp"
                                                value={otp}
                                                onChange={handleOtpChange}
                                                style={{ borderRadius: 15, paddingLeft: 15, fontWeight: 'bold' }}
                                            />
                                            <button style={{ padding: '10px', width: '100%', borderRadius: '5px', marginTop: '0.5em', backgroundColor: 'rgb(195 161 119)', border: 'none' }} >Verify OTP</button>
                                        </div>
                                    )}
                                    {step === 3 && (
                                        <div className="step3">
                                            {/* Step 3: Change Password */}
                                            <form >
                                                <div className="input_box_div">
                                                    <label htmlFor="new_pass">New password:</label>
                                                    <input
                                                        className="input_box"
                                                        type="password"
                                                        name="new_pass"
                                                        ref={newPassRef}
                                                        placeholder="New password"
                                                        required
                                                        onChange={handlePasswordChange}
                                                    />
                                                </div>
                                                <div className="input_box_div">
                                                    <label htmlFor="con_pass">Confirm password:</label>
                                                    <input
                                                        className="input_box"
                                                        type="password"
                                                        name="con_pass"
                                                        ref={conPassRef}
                                                        placeholder="Confirm password"
                                                        required
                                                        onChange={handlePassword1Change}
                                                    />
                                                </div>
                                                <div className="dash_second_col_third" >
                                                    <input style={{ padding: '10px', width: '100%', borderRadius: '5px', marginTop: '0.5em', backgroundColor: 'rgb(195 161 119)', border: 'none' }} type="submit" className="button_submit" defaultValue="Update" />
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Forget;