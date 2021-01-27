import {baseUrl} from './utils/env';
import dev from './dev';

import devTpl from '../template/dev.handlebars';
import loginTpl from '../template/login.handlebars';

import funnyMessages from './loading-message';

export default function(){

    let loadingMessage = funnyMessages[Math.round(Math.random() * funnyMessages.length)];
    document.querySelector('#kpi-content').innerHTML = `KPI API is waking...<br/>(${loadingMessage})`;

    let userCredentials = getUserInfoFromLocal();

    if(userCredentials.userName && userCredentials.password){
        validateUser(userCredentials.userName, userCredentials.password).then(res=>{
            if(res.isValidUser){
                loginAction(userCredentials.userName, userCredentials.password, res.userTeam, res.userRole == 'admin');
            }else{
                logoutAction();
            }
        }).catch(err=>{
            console.warn(err);
        });
    }else{
        document.querySelector('#kpi-content').innerHTML = loginTpl();
        bindLoginBtnAction();
    }
}

function bindLoginBtnAction(){
    document.querySelector('#kpi-login')?.addEventListener('click', function(){
        let userName = document.querySelector('#kpi-form-email').value;
        let password = document.querySelector('#kpi-form-key').value;
        validateUser(userName, password).then(res=>{
            // response format:
            // {
            //     "isValidUser": true,
            //     "userRole": "admin",
            //     "userTeam": "neal"
            // }
            if(res.isValidUser){
                loginAction(userName, password, res.userTeam, res.userRole == 'admin');
            }else{
                alert('username or key is invalid');
            }
        }).catch(err=>{
            console.warn(err);
        });
    }, false);
}

export function loginAction(userName, password, team, isAdmin){
    setLocalStorage(userName, password, team);
    if(!isAdmin){
        document.querySelector('#kpi-content').innerHTML = devTpl({team});
        dev();
    }else{
        window.location.href = '/tl.html';
    }
}

export function logoutAction(){
    document.querySelector('#kpi-content').innerHTML = loginTpl();
    clearLocalStorage();
    bindLoginBtnAction();
}

export function getUserInfoFromLocal(){
    let userName = localStorage.getItem('mrkpiName');
    let password = localStorage.getItem('mrkpiKey');
    let team     = localStorage.getItem('mrkpiTeam');

    return {
        'userName': userName,
        'password': password,
        'team': team
    }
}

export function setLocalStorage(userName, password, team){
    localStorage.setItem('mrkpiName', userName);
    localStorage.setItem('mrkpiKey', password);
    localStorage.setItem('mrkpiTeam', team);
}

export function clearLocalStorage(){
    localStorage.removeItem('mrkpiName');
    localStorage.removeItem('mrkpiKey');
    localStorage.removeItem('mrkpiTeam');
}

export function validateUser(userName, password){
    var url = new URL(`${baseUrl}user/validate/`);

    var params = {
        'userEmail': userName,
        'key': password
    }

    return new Promise(resolve=>{
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(status){if(status.status!=200){throw 'api error';}return status.json();}).then(function(res){
            resolve(res);
        });
    });
}