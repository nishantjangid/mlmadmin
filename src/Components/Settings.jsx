import React, { useEffect, useState } from 'react'
import "../StyleFolder/Setting.css"
import { settingUpdate,settingDataFetch } from '../ApiHelpers';
import { useToasts } from 'react-toast-notifications';

function Settings() {
    const {addToast} = useToasts();
    const [settingData,setSettingData]= useState({withdrawCommission:0,level1:0,level2:0,level3:0,ROI:0});
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(settingData.withdrawCommission == ""){
            addToast("Please provide a valid withdraw Comission", {appearance: "error",autoDismiss: true});
            return;
        }
        if(settingData.level1 == ""){
            addToast("Please provide a level 1", {appearance: "error",autoDismiss: true});
            return; 
        }
        if(settingData.level2 == ""){
            addToast("Please provide a level 2", {appearance: "error",autoDismiss: true});
            return; 
        }
        if(settingData.level3 == ""){
            addToast("Please provide a level 3", {appearance: "error",autoDismiss: true});
            return; 
        }
        if(settingData.ROI == ""){
            addToast("Please provide a ROI", {appearance: "error",autoDismiss: true});
            return; 
        }
        try{
            let result = await settingUpdate(settingData);                                        
                addToast(result.message, {appearance: "success",autoDismiss: true});                            
                fetchSettingData();

        }catch(err){              
            if(err.code == "ERR_NETWORK"){
                addToast(err.message, {appearance: "error",autoDismiss: true});
            }   
            else if(err.code == "ERR_BAD_REQUEST"){
                addToast(err.response.data.error, {appearance: "error",autoDismiss: true});
            }
            else{
                addToast(err.response.data, {appearance: "error",autoDismiss: true});
            }
        }
    }

    const fetchSettingData = async () => {
        try{
            let result = await settingDataFetch();
            console.log(result);
            if(result.result.length){
                setSettingData(result.result[0]);
            }
        }catch(err){
            if(err.code == "ERR_NETWORK"){
                addToast(err.message, {appearance: "error",autoDismiss: true});
            }   
            else if(err.code == "ERR_BAD_REQUEST"){
                addToast(err.response.data.error, {appearance: "error",autoDismiss: true});
            }
            else{
                addToast(err.response.data, {appearance: "error",autoDismiss: true});
            }            
        }
    }

    useEffect(()=>{
        fetchSettingData();
    },[])
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
                        <form role="form" type="submit" onSubmit={handleSubmit}>
                            {/* <input type="hidden" name="_token" defaultValue="eLkpGsUBYr9izTDYhoNZCCY6pxm06c8hRkw1N41O" /> */}
                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                <label htmlFor="validationCustomUsername">Withdraw Commission:</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        step="any"
                                        required
                                        className="form-control"
                                        placeholder=""
                                        name="withdrawCommission"
                                        value={settingData.withdrawCommission}
                                        onChange={(e)=>setSettingData({...settingData,[e.target.name]:e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                <label htmlFor="validationCustomUsername">Level 1:</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        step="any"
                                        required
                                        className="form-control"
                                        placeholder=""
                                        name="level1"
                                        value={settingData.level1}
                                        onChange={(e)=>setSettingData({...settingData,[e.target.name]:e.target.value})}
                                    />
                                </div>
                            </div>
                            <div style={{ clear: 'both' }} />
                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                <label htmlFor="validationCustomUsername">Level 2:</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        step="any"
                                        required
                                        className="form-control"
                                        placeholder=""                                        
                                        name="level2"
                                        value={settingData.level2}
                                        onChange={(e)=>setSettingData({...settingData,[e.target.name]:e.target.value})}

                                    />
                                </div>
                            </div>
                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                <label htmlFor="validationCustomUsername">Level 3:</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        step="any"
                                        required
                                        className="form-control"
                                        placeholder=""
                                        name="level3"
                                        value={settingData.level3}
                                        onChange={(e)=>setSettingData({...settingData,[e.target.name]:e.target.value})}


                                    />
                                </div>
                            </div>

                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                <label htmlFor="validationCustomUsername">ROI Monthly</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        step="any"
                                        required
                                        className="form-control"
                                        placeholder=""
                                        name="ROI"
                                        value={settingData.ROI}
                                        onChange={(e)=>setSettingData({...settingData,[e.target.name]:e.target.value})}

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
                            
                            <div>
                                <button type='submit' class="btn btn-primary text-center">Submit</button>
                            </div>
                        </form>
                    </div>

                </div>



            </div>
        </div>
            
        </>
    )
}

export default Settings