import React from 'react'
import "../StyleFolder/Setting.css"

function Settings() {
    return (
        <> <div className='main-div' >
            <div className="settings">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Minimum investment</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="https://hammertradex.com"></a></li>
                                <li className="breadcrumb-item active">All Users</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
                <div style={{ marginLeft: 'auto' }} className="card">

                    <div className="card-body">
                        <form role="form" type="submit">
                            {/* <input type="hidden" name="_token" defaultValue="eLkpGsUBYr9izTDYhoNZCCY6pxm06c8hRkw1N41O" /> */}
                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                <label htmlFor="validationCustomUsername">Withdraw Commission:</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        name="userid"


                                    />
                                </div>
                            </div>
                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                <label htmlFor="validationCustomUsername">Level 1:</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        name="userid"


                                    />
                                </div>
                            </div>
                            <div style={{ clear: 'both' }} />
                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                <label htmlFor="validationCustomUsername">Level 2:</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        name="userid"


                                    />
                                </div>
                            </div>
                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                <label htmlFor="validationCustomUsername">Level 3:</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        name="userid"


                                    />
                                </div>
                            </div>

                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                <label htmlFor="validationCustomUsername">ROI Monthly</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        name="userid"


                                    />
                                </div>
                            </div>
                            {/* <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername">Type</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Type" defaultValue name="type_id" />
                                                </div>
                                            </div> */}

                            <div style={{ clear: 'both' }} />
                            <br />



                            <br />




                        </form>
                    </div>

                </div>



            </div>
        </div>
            
        </>
    )
}

export default Settings