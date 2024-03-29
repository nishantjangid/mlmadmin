import { useState, useEffect } from "react";
import "./Style.css";

import { Snackbar, Button } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useToasts } from "react-toast-notifications";
import { getRefferalDetails, register, sendMailOtp, verifyMailOtp } from "../../ApiHelpers";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [sponsorId, setSponsorId] = useState("");
  const [sponsorName, setSponsorName] = useState("");
  const [email, setEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const { addToast } = useToasts();
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message,setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let username = e.target.username.value;
    let mobileNo = e.target.mobileNo.value;
    let conpass = e.target.conpassword.value;
    let password = e.target.password.value;

    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!validRegex.test(email) || !email) {
      addToast("Please provide a valid email", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    if (password !== conpass) {
      addToast("Password and confirm password not matched", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    if (!password) {
      addToast("Please provide a password", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    if (!username) {
      addToast("Please provide a username", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    if (!mobileNo) {
      addToast("Please provide a mobileNo", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    try {
      let result = await register({
        email,
        password,
        refferalCode: "admin",
        mobileNo,
        username,
        role: 1,
      });
      console.log(result, "result");
      navigate("/login");
    } catch (err) {
      console.log(err, "err");
      if (err.code == "ERR_NETWORK") {
        addToast(err.message, { appearance: "error", autoDismiss: true });
      } else if (err.code == "ERR_BAD_REQUEST") {
        addToast(err.response.data.error, {
          appearance: "error",
          autoDismiss: true,
        });
      } else if (err.response.status) {
        addToast(err.response.data, { appearance: "error", autoDismiss: true });
      }
    }
  };

  const handleSponserId = async (e) => {
    setSponsorId(e.target.value);
  };

  const getRefferalUsername = async (e) => {
    try {
      let result = await getRefferalDetails({ userId: e });
      setSponsorName(result.result);
    } catch (err) {
      setSponsorName("");
      if (err.code == "ERR_NETWORK") {
        addToast(err.message, { appearance: "error", autoDismiss: true });
      } else if (err.code == "ERR_BAD_REQUEST") {
        addToast(err.response.data.error, {
          appearance: "error",
          autoDismiss: true,
        });
      } else if (err.response.status) {
        addToast(err.response.data, { appearance: "error", autoDismiss: true });
      }
    }
  };

  const handleOpenDialog = async () => {
    try {
      setVerifying(true);
      let result = await sendMailOtp({ email });
      setMessage(result.message);
      setVerifying(false);
      setOpenDialog(true);
    } catch (err) {
      setVerified(false);
      setVerifying(false);
      if (err.code == "ERR_NETWORK") {
        addToast(err.message, { appearance: "error", autoDismiss: true });
      } else if (err.code == "ERR_BAD_REQUEST") {
        addToast(err.response.data.error, {
          appearance: "error",
          autoDismiss: true,
        });
      } else if (err.response.status) {
        addToast(err.response.data, { appearance: "error", autoDismiss: true });
      }
    }
  };

  const handleCloseDialog = async () => {
    if (!otp) {
      addToast("Please enter otp", { appearance: "error", autoDismiss: true });
      return;
    }
    if (!email) {
      addToast("Please enter Email", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    try {
      setLoading(true);
      let result = await verifyMailOtp({ otp, email });
      setVerified(true);
      setLoading(false);
      setOpenDialog(false);
      setOtp("");
    } catch (err) {
      setLoading(false);
      setVerified(false);
      setMessage("");
      if (err.code == "ERR_NETWORK") {
        addToast(err.message, { appearance: "error", autoDismiss: true });
      } else if (err.code == "ERR_BAD_REQUEST") {
        addToast(err.response.data.error, {
          appearance: "error",
          autoDismiss: true,
        });
      } else if (err.response.status) {
        addToast(err.response.data, { appearance: "error", autoDismiss: true });
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="register_div">
        <section className="login_section signup_section">
          <div className="start-box">
            <div id="stars" />
            <div id="stars2" />
            <div id="stars3" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12  signup_content_col">
                <h1>
                  Join the <br /> T A Trading{" "}
                </h1>
                <ul>
                  <li>1. Signup</li>
                  <li>2. Email verification</li>
                  <li>3. Login</li>
                  <li>4. Get purchase details via email</li>
                  <li>5. See transaction history via dashboard</li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="form_box">
                  <div className="logo_img">
                    {/* <img className="img-fluid " src="https://hammertradex.com/public/front/assets/img/htx-logo.png" alt /> */}
                  </div>
                  <h3>Sign Up</h3>
                  <div>
                    <form method="post" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div style={{ position: "relative" }}>
                            <input
                              type="text"
                              className="input_box"
                              placeholder="E-mail"
                              name="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setVerified(false);
                                setVerifying(false);
                              }}
                              required
                            />
                            <div className="col-lg-2 col-md-12 col-sm-12">
                              {verifying ? (
                                <button
                                  type="button"
                                  style={{
                                    alignItems: "center",
                                    width: "100px",
                                    backgroundColor: "#c3a177",
                                    padding: "10px",
                                    position: "absolute",
                                    right: "0",
                                    top: "0",
                                    height: "40px",
                                  }}
                                  className="btn"
                                >
                                  Verifying...
                                </button>
                              ) : verified ? (
                                <button
                                  type="button"
                                  style={{
                                    alignItems: "center",
                                    width: "100px",
                                    backgroundColor: "#c3a177",
                                    padding: "10px",
                                    position: "absolute",
                                    right: "0",
                                    top: "0",
                                    height: "40px",
                                  }}
                                  className="btn"
                                >
                                  Verified
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  style={{
                                    alignItems: "center",
                                    width: "100px",
                                    backgroundColor: "#c3a177",
                                    padding: "10px",
                                    position: "absolute",
                                    right: "0",
                                    top: "0",
                                    height: "40px",
                                  }}
                                  onClick={() => {
                                    var validRegex =
                                      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                                    if (!validRegex.test(email) || !email) {
                                      addToast("Please provide a valid email", {
                                        appearance: "error",
                                        autoDismiss: true,
                                      });
                                      return;
                                    }
                                    handleOpenDialog();
                                  }}
                                  className="btn"
                                >
                                  Verify
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        <Dialog
                          open={openDialog}
                          onClose={() => {
                            setOpenDialog(false);
                            setVerifying(false);
                          }}
                          maxWidth="xs"
                          fullWidth={false}
                        >
                          <DialogTitle>Enter OTP</DialogTitle>
                          <DialogContent>
                            <p
                              style={{
                                color: "green",
                                fontWeight: "bold",
                                padding: "10px",
                              }}
                            >
                              {message}
                            </p>
                            <TextField
                              autoFocus
                              // margin="dense"
                              id="otp"
                              label="OTP"
                              type="text"
                              name="otp"
                              value={otp}
                              onChange={(e) => {
                                setMessage("");
                                setOtp(e.target.value);
                              }}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => {
                                setOpenDialog(false);
                                setVerifying(false);
                              }}
                              color="primary"
                            >
                              Cancel
                            </Button>
                            {loading ? (
                              <Button color="primary" type="submit">
                                Loading...
                              </Button>
                            ) : (
                              <Button
                                color="primary"
                                type="submit"
                                onClick={handleCloseDialog}
                              >
                                Submit
                              </Button>
                            )}
                          </DialogActions>
                          <div className="dialog-container">
                            <Snackbar
                              open={openSnackbar}
                              autoHideDuration={6000} // Adjust the duration as needed
                              className="Snackbar-root" // Apply the CSS class
                              onClose={handleSnackbarClose}
                            >
                              <MuiAlert
                                elevation={6}
                                variant="filled"
                                severity="error" // Change the severity to "success" for a green alert
                                onClose={handleSnackbarClose}
                              >
                                {snackbarMessage}
                              </MuiAlert>
                            </Snackbar>
                          </div>
                        </Dialog>

                        {/* <div className="col-lg-6 col-md-12 col-sm-12">
                                                    <input type="text" className="input_box" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                </div> */}
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <input
                            type="text"
                            className="input_box"
                            placeholder="User Name"
                            name="username"
                            required
                          />
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <input
                            type="password"
                            className="input_box"
                            placeholder="Password"
                            name="password"
                            required
                          />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <input
                            type="password"
                            className="input_box"
                            placeholder="Confirm Password"
                            name="conpassword"
                            required
                          />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <input
                            type="text"
                            className="input_box"
                            placeholder="Phone number"
                            name="mobileNo"
                            required
                          />
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12 forget_password terms_div">
                          <div
                            style={{
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <input
                              style={{
                                width: "15px",
                                height: "15px",
                                marginTop: "0",
                              }}
                              type="checkbox"
                              id="terms"
                              name="terms"
                              defaultValue="terms"
                              required
                            />
                            <label htmlFor="terms">
                              I agree all statements in{" "}
                              <span
                                style={{
                                  color: "#c3a177",
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                              >
                                Terms of service
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* <p style={{ color: 'white', textAlign: 'center' }}>message</p> */}
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <button
                            style={{ cursor: "pointer", marginBottom: "0.8em" }}
                            className="form_submit_btn"
                            id="submit"
                            type="submit"
                            name="submit"
                          >
                            Sign Up
                          </button>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 signup_btn">
                          <p>Already have an account?</p>{" "}
                          <span
                            style={{ cursor: "pointer" }}
                            className=""
                            onClick={() => navigate("/login")}
                          >
                            {" "}
                            Login Now
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
