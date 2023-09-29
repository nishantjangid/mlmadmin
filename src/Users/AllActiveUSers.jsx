import React, { useEffect, useRef, useState } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { token, baseURL } from '../token';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { compareDesc } from 'date-fns';
import "../StyleFolder/style.css"


import CircularProgress from '@mui/material/CircularProgress';

import { useToasts } from 'react-toast-notifications';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { blockUser, getAllUsersRecords } from '../ApiHelpers';


function AllUsers() {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');    
    const [iconRotation, setIconRotation] = useState(0);
    
    const [tableData, setTableData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const {addToast} = useToasts();
    const [selectedStatus, setSelectedStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadings, setLoadings] = useState(true);
    const [data, setData] = useState([]);
    const dt = useRef(null);
  
    const exportCSV = (selectionOnly) => {
      dt.current.exportCSV({ selectionOnly });
    };
  
    const cols = [
        { field: "id", header: "SR.No" },
      { field: "userId", header: "User ID" },
      { field: "username", header: "Username" },
      { field: "mainWallet", header: "Main Wallet" },
      { field: "investmentWallet", header: "Investment Wallet" },
      { field: "isInvested", header: "Investment Status" },
      { field: "block", header: "Block" },
      { field: "datetime", header: "Datetime" },
    ];
  
    const exportPdf = () => {
      import("jspdf").then((jsPDF) => {
        import("jspdf-autotable").then(() => {
          const doc = new jsPDF.default(0, 0);
          const exportColumns = cols.map((col) => ({
            title: col.header,
            dataKey: col.field,
          }));
          console.log(exportColumns);
          doc.autoTable(exportColumns, data);
          doc.save("fundTransfers.pdf");
        });
      });
    };
  
    const exportExcel = () => {
      import("xlsx").then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
        const excelBuffer = xlsx.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
  
        saveAsExcelFile(excelBuffer, "fundTransfer");
      });
    };
  
    const saveAsExcelFile = (buffer, fileName) => {
      import("file-saver").then((module) => {
        if (module && module.default) {
          let EXCEL_TYPE =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
          let EXCEL_EXTENSION = ".xlsx";
          const data = new Blob([buffer], {
            type: EXCEL_TYPE,
          });
  
          module.default.saveAs(
            data,
            fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
          );
        }
      });
    };
  
    const getAllUsersData = async () => {
      let token = localStorage.getItem("authToken");
      if (!token) return;
      try {
        setLoadings(true);
        setLoading(true);
        let result = await getAllUsersRecords();
        console.log(result, "result");
        setData(result.result);
        setLoading(false);
        setLoadings(false);
      } catch (err) {
        setLoading(false);
        setLoadings(false);
        if (err.code == "ERR_NETWORK") {
          addToast(err.message, { appearance: "error", autoDismiss: true });
        } else if (err.code == "ERR_BAD_REQUEST") {
          addToast(err.response.data.error, {
            appearance: "error",
            autoDismiss: true,
          });
        } else if (err.response.status) {
          addToast(err.response.data.error, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    };
  
    const header = (
      <div className="flex align-items-center justify-content-end gap-2">
        <Button
          type="button"
          value="CSV"
          icon="pi pi-file"
          rounded
          onClick={() => exportCSV(false)}
          data-pr-tooltip="CSV"
        >
          CSV
        </Button>
        <Button
          type="button"
          icon="pi pi-file-excel"
          severity="success"
          value="XLS"
          rounded
          onClick={exportExcel}
          data-pr-tooltip="XLS"
        >
          XLS
        </Button>
        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          value="PDF"
          rounded
          onClick={exportPdf}
          data-pr-tooltip="PDF"
        >
          PDF
        </Button>
      </div>
    );
    const footer = `In total there are ${data ? data.length : 0} History.`;
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;        
   
     const AcceptButtonTemplate = (row) => <Button onClick={() => handleBlock(row.userId)} style={{background:"red",color:'#fff',border:'none'}}>Block</Button>
     const RejectButtonTemplate = (row) => <Button onClick={() => handleUnblock(row.userId)} style={{background:"green",color:'#fff',border:'none'}}>Unblock</Button>
   const blockedTemplate =  (row) => (
    <span>
      {row?.block == true && (
        <p style={{  color:"red",fontWeight: "bold" }}>Blocked</p>
      )}
      {row?.block == false && (
        <p style={{ color:"green",fontWeight: "bold" }}>Unblock</p>
      )}
    </span>
  ); 
    const investedTemplate = (row) => (
      <span>
        {row?.isInvested == true && (
          <p style={{  fontWeight: "bold" }}>Active</p>
        )}
        {row?.isInvested == false && (
          <p style={{ fontWeight: "bold" }}>Inactive</p>
        )}
      </span>
    );
  
    const handleBlock = async (userId) => {
      try{
        setLoadings(true);
        let result = await blockUser({userId,isBlock:1});
        setLoadings(false);
        addToast(result.message, {appearance: "success",autoDismiss: true});
        getAllUsersData();
        
      }catch(err){      
        setLoadings(false);
        if(err.code == "ERR_NETWORK"){
            addToast(err.message, {appearance: "error",autoDismiss: true});
        }   
        else if(err.code == "ERR_BAD_REQUEST"){
            addToast(err.response.data.error, {appearance: "error",autoDismiss: true});
        }
        else if(err.response.status){
            addToast(err.response.data, {appearance: "error",autoDismiss: true});
        }      
      }
    }
  
    const handleUnblock = async (userId) => {
      try{
        setLoadings(true);
        let result = await blockUser({userId,isBlock:0});
        setLoadings(false);
        addToast(result.message, {appearance: "success",autoDismiss: true});
        getAllUsersData();        
      }catch(err){      
        setLoadings(false);
        if(err.code == "ERR_NETWORK"){
            addToast(err.message, {appearance: "error",autoDismiss: true});
        }   
        else if(err.code == "ERR_BAD_REQUEST"){
            addToast(err.response.data.error, {appearance: "error",autoDismiss: true});
        }
        else if(err.response.status){
            addToast(err.response.data, {appearance: "error",autoDismiss: true});
        }      
      }
    }
  
    useEffect(() => {
      setTimeout(() => {
        setLoadings(false);
      }, 1500); // Change the delay as needed
      getAllUsersData();
    }, []);
  
    const handleReset = () => {
        getAllUsersData();
    };
 
    return (
        <>
            <div className="content-wrapper" style={{ minHeight: '706.4px' }}>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Active Users</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                                    <li className="breadcrumb-item active">All Users</li>
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>

                <section className="content">
                    <div className="container-fluid" style={{ marginTop: '-35px' }}>
                        <div className="row">
                            {/* Primary table start */}
                            <div className="col-12 mt-5">
                                <div className="card">
                                    <div className="card-body">
                                        <form role="form" type="submit">
                                            {/* <input type="hidden" name="_token" defaultValue="eLkpGsUBYr9izTDYhoNZCCY6pxm06c8hRkw1N41O" /> */}
                                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <div className="form-group">
                                                    <label>Pick a start date:</label>
                                                    <div className="input-group date" id="datepicker" data-target-input="nearest">
                                                        <input type="date" className="form-control t" placeholder="yyyy-mm-dd" name="start_date" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <div className="form-group">
                                                    <label>Pick a end date:</label>
                                                    <div className="input-group date" id="datepicker1" data-target-input="nearest">
                                                        <input type="date" className="form-control " placeholder="yyyy-mm-dd" name="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ clear: 'both' }} />
                                            {/* <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername"> User Name</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Name, User ID , Sponsor ID , Sponsor Name"
                                                        name="userid"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                </div>
                                            </div> */}
                                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername">Select id status</label>
                                                <select className="custom-select selectbox" style={{ backgroundColor: 'rgb(39 39 39)', border: "none", padding: '9px 5px', height: '3rem' }} name="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                                    <option value> ----Select---- </option>
                                                    <option >active</option>
                                                    <option >inactive</option>
                                                    <option >blocked</option>
                                                </select>
                                            </div>
                                            {/* <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername">Type</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Type" defaultValue name="type_id" />
                                                </div>
                                            </div> */}

                                            <div style={{ clear: 'both' }} />
                                            <br />
                                            <div className='row' >
                                                <div className="col-md-12 mb-12">
                                                    <center>
                                                        <button style={{ color: 'black', backgroundColor: 'rgb(195 161 119)' }} className="btn btn-primary" >Search Now</button>
                                                        <button className="btn btn-info" style={{ marginLeft: '20px', background: 'black', color: '#d8af72', border: '1px solid #d8af72' }} type="button" onClick={handleReset}>Reset <span><RotateLeftIcon /></span> </button>

                                                    </center>
                                                </div>
                                            </div>
                                            {/* <div className="dt-buttons btn-group flex-wrap mb-3">
                                                <button className="btn btn-secondary buttons-pdf buttons-html5" tabIndex={0} aria-controls="table_id" type="button">
                                                    <span>PDF</span>
                                                </button>
                                                <button className="btn btn-secondary buttons-excel buttons-html5" tabIndex={0} aria-controls="table_id" type="button">
                                                    <span>Excel</span>
                                                </button>
                                                <button className="btn btn-secondary buttons-csv buttons-html5" tabIndex={0} aria-controls="table_id" type="button">
                                                    <span>CSV</span>
                                                </button>
                                                <button className="btn btn-secondary buttons-print" tabIndex={0} aria-controls="table_id" type="button"><span>Print</span>
                                                </button>
                                            </div> */}

                                            <br />




                                        </form>
                                        <div className="single-table">
                                            <div className="table-responsive">
                                            {loadings ? (
                            <>
                              <div className="loader-container">
                                <CircularProgress sx={{ color: "orange" }} />
                              </div>
                            </>
                          ) : (
                            <>
                              <Tooltip
                                target=".export-buttons>button"
                                position="bottom"
                              />
                              {data.length > 0 ? (
                                <DataTable
                              
                                  ref={dt}
                                  paginator
                                  rows={5}
                                  rowsPerPageOptions={[5, 10, 25, 50]}
                                  tableStyle={{ minWidth: "50rem" }}
                                  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                  currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                  paginatorLeft={paginatorLeft}
                                  paginatorRight={paginatorRight}
                                  value={data}
                                  header={header}
                                  footer={footer}
                                >
                                  <Column
                                    field="id"
                                    sortable
                                    header="Sr.no"
                                  ></Column>
                                  <Column
                                    field="userId"
                                    sortable
                                    header="UserId"
                                  ></Column>
                                  <Column
                                    field="username"
                                    sortable
                                    header="Username"
                                  ></Column>
                                  <Column
                                    field="email"
                                    sortable
                                    header="Email"
                                  ></Column>
                                  <Column
                                    field="mainWallet"
                                    sortable                                    
                                    header="Main Wallet"
                                  ></Column>
                                  <Column                                    
                                    field="investmentWallet"
                                    sortable
                                    header="Investment Wallet"
                                  ></Column>                                  
                                  <Column                                  
                                  field="isInvested"
                                  sortable
                                  body={investedTemplate}
                                  header="Investment Status"
                                ></Column>
                                <Column                                  
                                  field="block"
                                  sortable
                                  body={blockedTemplate}
                                  header="Blocked/Unblocked"
                                ></Column>
                                   <Column                                  
                                  field="userId"
                                  sortable
                                  body={AcceptButtonTemplate}
                                  header="Block"
                                ></Column>
                                <Column                                  
                                  field="userId"
                                  sortable
                                  body={RejectButtonTemplate}
                                  header="Unblock"
                                ></Column>
                                <Column                                  
                                  field="datetime"
                                  sortable                                                                  
                                  header="Date/Time"
                                ></Column>
                                </DataTable>
                              ) : (
                                <DataTable
                                  ref={dt}
                                  paginator
                                  rows={5}
                                  rowsPerPageOptions={[5, 10, 25, 50]}
                                  tableStyle={{ minWidth: "50rem" }}
                                  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                  currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                  paginatorLeft={paginatorLeft}
                                  paginatorRight={paginatorRight}
                                  value={data}
                                  header={header}
                                  footer={footer}
                                  
                                ></DataTable>
                              )}
                            </>
                          )}

                                                <br /><br />

                                            </div>


                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* Primary table end */}

                        </div>

                    </div>
                </section >
            </div >

        </>
    )
}

export default AllUsers