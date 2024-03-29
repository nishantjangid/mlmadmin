import axios from "axios";
import { BASEURL } from "../Constants";

/*
*************** CALL API HERE *******************************
*/

// LOGIN
export const login = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let result = await axios.post(`${BASEURL}/users/adminsignin`,obj,{headers:{
                'Content-Type':"application/json"
            }});
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })
}

// REGISTER
export const register = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let result = await axios.post(`${BASEURL}/users/adminsignup`,obj,{headers:{
                'Content-Type':"application/json"
            }});
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })    
}

// RESET PASSWORD
export const resetPassword = async(obj)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken'); 
            let result = await axios.post(`${BASEURL}/users/resetPassword`,obj,{headers: {
                'x-access-token': `${accesstoken}`,
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    }) 
}

// FUND TRANSFER 
export const fundTransfer = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken');
            let result = await axios.post(`${BASEURL}/users/fundTrnasfer`,obj,{headers:{
                'Content-Type':"application/json",
                'x-access-token': `${accesstoken}`,
            }});
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })    
}

// FUND TRANSACTIONS
export const fundTransferHistory = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken');
            let result = await axios.post(`${BASEURL}/users/fundTrnasferHistory`,obj,{headers:{
                'Content-Type':"application/json",
                'x-access-token': `${accesstoken}`,
            }});
            console.log(result," result");
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    }) 
}

// Send OTP
export const sendOtp = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let result = await axios.post(`${BASEURL}/users/sendotp`,obj,{headers:{
                'Content-Type':"application/json"
            }});
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })    
}

// Verify Otp
export const verifyOtp = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let result = await axios.post(`${BASEURL}/users/verifyotp`,obj,{headers:{
                'Content-Type':"application/json"
            }});
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })    
}

//Request Deposite
export const requestDesposit = async(obj)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken');

            var formdata = new FormData();
            formdata.append("amount", obj.amount);
            formdata.append("message", obj.message);
            formdata.append("attachment", obj.attachment);  

            let result = await axios.post(`${BASEURL}/users/requestDesposit`,formdata,{headers: {
                'x-access-token': `${accesstoken}`,
                'Content-Type':'multipart/form-data'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    }) 
}

//Get all deposite data
export const getdepositedata = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{            
            let result = await axios.post(`${BASEURL}/users/allUserDeposit`,obj,{headers:{                
                'Content-Type':"application/json"
            }});
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })
}

// User details
export const getuserDetail = async () => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken');
            let result = await axios.get(`${BASEURL}/users/userDetail`,{headers:{
                'x-access-token': `${accesstoken}`,
                'Content-Type':"application/json"
            }});
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })
}

//approve deposite 
export const approvedeposite = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken');
            let result = await axios.post(`${BASEURL}/users/approveDeposite`,obj ,{headers:{
                'x-access-token': `${accesstoken}`,
                'Content-Type':"application/json"
            }});
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })
}

//reject deposite 
export const rejectDeposite = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken');
            let result = await axios.post(`${BASEURL}/users/rejectDeposite`,obj ,{headers:{
                'x-access-token': `${accesstoken}`,
                'Content-Type':"application/json"
            }});
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })
}

//user investment 
export const investment = async(obj)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken'); 
            let result = await axios.post(`${BASEURL}/users/investment`,obj,{headers: {
                'x-access-token': `${accesstoken}`,
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    }) 
}

//investment history 
export const investmentHistory = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken');
            let result = await axios.post(`${BASEURL}/users/investmentHistory`,obj,{headers:{
                'x-access-token': `${accesstoken}`,
                'Content-Type':"application/json"
            }});
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })
}

//user witdraw request 
export const withdrawRequest = async(obj)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken'); 
            let result = await axios.post(`${BASEURL}/users/withdraw`,obj,{headers: {
                'x-access-token': `${accesstoken}`,
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    }) 
}

//user witdraw request history
export const withdrawHistory = async()=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken'); 
            let result = await axios.get(`${BASEURL}/users/withdrawHistory`,{headers: {
                'x-access-token': `${accesstoken}`,
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    }) 
}

//approve deposite 
export const approveWithdraw = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken');
            let result = await axios.post(`${BASEURL}/users/approveWithdraw`,obj ,{headers:{
                'x-access-token': `${accesstoken}`,
                'Content-Type':"application/json"
            }});
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })
}

//reject deposite 
export const rejectWithdraw = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken');
            let result = await axios.post(`${BASEURL}/users/rejectWithdraw`,obj ,{headers:{
                'x-access-token': `${accesstoken}`,
                'Content-Type':"application/json"
            }});
            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })
}

// get dashboard data
export const dashboardData = async()=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken'); 
            let result = await axios.get(`${BASEURL}/users/dashboard`,{headers: {
                'x-access-token': `${accesstoken}`,
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    }) 
}

// get refferal detail
export const getRefferalDetails = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken'); 
            let result = await axios.post(`${BASEURL}/users/userDetailById`,obj,{headers: {
                'x-access-token': `${accesstoken}`,
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })     
}

// get refferal detail
export const getAllUsers = async () => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken'); 
            let result = await axios.get(`${BASEURL}/users/allUsers`,{headers: {
                'x-access-token': `${accesstoken}`,
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })     
}

// get user level data
export const getLevelData = async (obj) => {    
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken'); 
            let result = await axios.post(`${BASEURL}/users/level-Income`,obj,{headers: {
                'x-access-token': `${accesstoken}`,
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })      
}

// setting api
export const settingUpdate = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken'); 
            let result = await axios.post(`${BASEURL}/users/adminSettings`,obj,{headers: {
                'x-access-token': `${accesstoken}`,
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })     
}

// fetch setting api
export const settingDataFetch = async () => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken'); 
            let result = await axios.get(`${BASEURL}/users/fetchSettings`,{headers: {
                'x-access-token': `${accesstoken}`,
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })     
}

// GET ALL WITHDRAW REQUEST
export const getAllWithdrawRequst = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken'); 
            let result = await axios.post(`${BASEURL}/users/allWithdrawHistory`,obj,{headers: {                
                'Content-Type':'application/json',
                'x-access-token': `${accesstoken}`
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })     
}

export const getAllUsersRecords = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{            
            let result = await axios.post(`${BASEURL}/users/totalUsers`,obj,{headers: {                
                'Content-Type':'application/json',            
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })     
}


// setting api
export const blockUser = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken'); 
            let result = await axios.post(`${BASEURL}/users/block`,obj,{headers: {
                'x-access-token': `${accesstoken}`,
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })     
}

export const sendMailOtp = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{            
            let result = await axios.post(`${BASEURL}/users/sendOtpMail`,obj,{headers: {                
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })     
}

// verify email otp
export const verifyMailOtp = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{            
            let result = await axios.post(`${BASEURL}/users/verifyMailOtp`,obj,{headers: {                
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })    
}

// forgot password
export const forgotPassword = async (obj) => {
    return new Promise(async (resolve,reject)=>{
        try{            
            let result = await axios.post(`${BASEURL}/users/forgot`,obj,{headers: {                
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })     
}

// get user level data
export const getTransactions = async (obj) => {    
    return new Promise(async (resolve,reject)=>{
        try{
            let accesstoken = localStorage.getItem('authToken'); 
            let result = await axios.post(`${BASEURL}/users/trnasactions`,obj,{headers: {
                'x-access-token': `${accesstoken}`,
                'Content-Type':'application/json'
              },});

            if(result.status == 200 || result.status == 201){
                resolve(result.data);
            }else{
                reject(result.data);
            }
        }catch(err){
            reject(err);
        }
    })      
}

