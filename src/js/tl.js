import '../scss/home.scss';
import JSONViewer from '../vendor/json-viewer.js'
import '../vendor/json-viewer.css'
import report from './report'

import {baseUrl} from './utils/env';

export default function(){
    report('tl');

    function getBasicInfo(){
        var kpiEmail = document.querySelector("#kpi-form-email").value;
        var kpiKey = document.querySelector("#kpi-form-key").value;
        var kpiYear = document.querySelector("#kpi-form-year").value;
        var kpiWeek = document.querySelector("#kpi-form-week").value;
        
        return {
            "email": kpiEmail,
            "key": kpiKey,
            "year": kpiYear,
            "week": kpiWeek
        }
    }
    
    function getHoursInfo(){
        var voteType = document.querySelector("#kpi-form-voteType").value;
        var votePoint = document.querySelector("#kpi-form-votePoint").value;
        var voteReason = document.querySelector("#kpi-form-voteReason").value;

        var lateDay = document.querySelector("#kpi-form-lateDay").value;
        var leaveDay = document.querySelector("#kpi-form-leaveDay").value;
        var earlyLeaveDay = document.querySelector("#kpi-form-earlyLeaveDay").value;
        var wfhDay = document.querySelector("#kpi-form-wfhDay").value;
        
        var demoPoints = document.querySelector("#kpi-form-demoPoints").value;
        var mrComponent = document.querySelector("#kpi-form-mrComponent").value;
        var knowledgeReuse = document.querySelector("#kpi-form-knowledgeReuse").value;
        var bugFromTester = document.querySelector("#kpi-form-bugFromTester").value;
        var urgentDelivery = document.querySelector("#kpi-form-urgentDelivery").value;
        var seriousMistakePoint = document.querySelector("#kpi-form-seriousMistakePoint").value;
        var seriousMistakeReason = document.querySelector("#kpi-form-seriousMistakeReason").value;

        var totalBillable = document.querySelector("#kpi-form-totalBillable").value;
        var totalActualWorking = document.querySelector("#kpi-form-totalActualWorking").value;
        var totalJiraWorking = document.querySelector("#kpi-form-totalJiraWorking").value;
        var leave = document.querySelector("#kpi-form-leave").value;

        var baseInfo = getBasicInfo();
        
        return {
            "email": baseInfo.email,
            "key": baseInfo.key,
            "year": baseInfo.year,
            "week": baseInfo.week,

            "voteType": voteType,
            "votePoint": votePoint,
            "voteReason": voteReason,

            "lateDay": lateDay,
            "leaveDay": leaveDay,
            "earlyLeaveDay": earlyLeaveDay,
            "wfhDay": wfhDay,
            
            "demoPoints": demoPoints,
            "mrComponent": mrComponent,
            "knowledgeReuse": knowledgeReuse,
            "bugFromTester": bugFromTester,
            "urgentDelivery": urgentDelivery,
            "seriousMistakePoint": seriousMistakePoint,
            "seriousMistakeReason": seriousMistakeReason,

            "totalBillable": totalBillable,
            "totalActualWorking": totalActualWorking,
            "totalJiraWorking": totalJiraWorking,
            "leave": leave
        }
    }
    
    function getVoteInfo(){
        var userVoteType = document.querySelector("#kpi-form-voteType").value;
        var userVoteFor = document.querySelector("#kpi-form-voteFor").value;
        var userVotePoint = document.querySelector("#kpi-form-votePoint").value;
        var userVoteReason = document.querySelector("#kpi-form-voteReason").value;
        var skipVote = document.querySelector("input[name=kpi-form-skipvote]:checked").value;
        
        var baseInfo = getBasicInfo();
        
        return {
            "email": baseInfo.email,
            "key": baseInfo.key,
            "year": baseInfo.year,
            "week": baseInfo.week,

            "userVoteType": userVoteType,
            "userVoteFor": userVoteFor,
            "userVotePoint": userVotePoint,
            "userVoteReason": userVoteReason,
            "skipVote": skipVote
        }
    }
    
    document.querySelector('#kpi-form-get-points').addEventListener('click', function(){
        
        var url = new URL(`${baseUrl}techleadsetting/`);

        var params = getBasicInfo();
        params.getFor = document.querySelector("#tl-selected-user").value;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(status){return status.json();}).then(function(res){
            var textarea = document.querySelector("textarea");
            textarea.value = JSON.stringify(res);

            document.querySelector("button.load-json").click();
        })
        
        
    }, false);

    document.querySelector('#kpi-week-calculate').addEventListener('click', function(){
        
        var url = new URL(`${baseUrl}calculatepoints/`);

        var params = getBasicInfo();

        url.search = new URLSearchParams(params).toString();

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(status){return status.json();}).then(function(res){
            var textarea = document.querySelector("textarea");
            textarea.value = JSON.stringify(res);

            document.querySelector("button.load-json").click();
        })
        
        
    }, false);

    document.querySelector('#kpi-form-set-hours').addEventListener('click', function(){
        
        var url = new URL(`${baseUrl}techleadsetting/`);

        var params = getHoursInfo();
        params.setFor = document.querySelector("#tl-selected-user").value;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(status){return status.json();}).then(function(res){
            var textarea = document.querySelector("textarea");
            textarea.value = JSON.stringify(res);

            document.querySelector("button.load-json").click();
        })
        
        
    }, false);

    document.querySelector('#kpi-form-set-vote').addEventListener('click', function(){
        
        var url = new URL(`${baseUrl}techleadsetting/`);

        var params = getVoteInfo();
        params.setFor = document.querySelector("#tl-selected-user").value;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(status){return status.json();}).then(function(res){
            var textarea = document.querySelector("textarea");
            textarea.value = JSON.stringify(res);

            document.querySelector("button.load-json").click();
        })
        
        
    }, false);

    document.querySelector('#kpi-form-store-local').addEventListener('click', function(){
        var value = getBasicInfo();
        localStorage.setItem('mrkpiName', value.email)
        localStorage.setItem('mrkpiKey', value.key)
        localStorage.setItem('mrkpiYear', value.year)
        localStorage.setItem('mrkpiWeek', value.week)
    });

    document.querySelector('#kpi-form-clear-local').addEventListener('click', function(){
        localStorage.removeItem('mrkpiName');
        localStorage.removeItem('mrkpiKey');
        localStorage.removeItem('mrkpiYear');
        localStorage.removeItem('mrkpiWeek');
    });

    document.querySelector("#kpi-form-email").value = localStorage.getItem('mrkpiName');
    document.querySelector("#kpi-form-key").value = localStorage.getItem('mrkpiKey');
    document.querySelector("#kpi-form-year").value = localStorage.getItem('mrkpiYear');
    document.querySelector("#kpi-form-week").value = localStorage.getItem('mrkpiWeek');
    
    

    var jsonObj = {};
    var jsonViewer = new JSONViewer();
    document.querySelector("#json").appendChild(jsonViewer.getContainer());

    var textarea = document.querySelector("textarea");
    textarea.value = JSON.stringify({
        key1: "try get points, and the result will be here"
    });

    // textarea value to JSON object
    var setJSON = function() {
        try {
            var value = textarea.value;
            jsonObj = JSON.parse(value);
        }
        catch (err) {
            alert(err);
        }
    };

    // load default value
    setJSON();

    var loadJsonBtn = document.querySelector("button.load-json");
    var collapseBtn = document.querySelector("button.collapse");
    var maxlvlBtn = document.querySelector("button.maxlvl");

    loadJsonBtn.addEventListener("click", function() {
        setJSON();
        jsonViewer.showJSON(jsonObj);
    });

    collapseBtn.addEventListener("click", function() {
        jsonViewer.showJSON(jsonObj, null, 1);
    });

    maxlvlBtn.addEventListener("click", function() {
        jsonViewer.showJSON(jsonObj, 1);
    });
    
    // vote select code start
    const emailResults = [];

    // const emailDropdownContainer = document.getElementsByClassName('email-dropdown-container')[0];
    // const emailNames = [
    //     'davidmayo',
    //     'jamesprime',
    //     'richard',
    //     'jason',
    //     'kai',
    //     'john',
    //     'barrick',
    //     'jonathan'
    // ]
    // const emailDropdown = document.createElement('select');
    // emailDropdown.classList.add('email-dropdown');
    // const placeholderOption = document.createElement('option');
    // placeholderOption.setAttribute('disabled', true);
    // placeholderOption.setAttribute('selected', true);
    // placeholderOption.innerHTML = 'Select an email';
    //     emailDropdown.appendChild(placeholderOption);
    // emailNames.forEach(email => {
    //     email += '@moustacherepublic.com';
    //     const emailOption = document.createElement('option');
    //     emailOption.setAttribute('value', email);
    //     emailOption.innerHTML = email;
    //     emailDropdown.appendChild(emailOption);
    // });
    // emailDropdownContainer.appendChild(emailDropdown);

    const emailDropdown = document.getElementsByClassName('email-dropdown')[0];

    emailDropdown.addEventListener('change', () => {
        const selectedEmail = emailDropdown.options[emailDropdown.selectedIndex].value;
        if (emailResults.includes(selectedEmail)) return false;
        emailResults.push(selectedEmail);
        addEmailResult(selectedEmail);
    });

    const emailResultContainer = document.getElementsByClassName('email-result-container')[0];

    const removeEmailResult = (email, element) => {
        const emailIndex = emailResults.indexOf(email);
        emailResults.splice(emailIndex, 1);
        element.remove();
        updateEmailInput();
    }

    const addEmailResult = email => {
        const emailResult = document.createElement('div');
        const emailSpan = document.createElement('span');
        const removeSpan = document.createElement('span');
        emailSpan.innerHTML = email;
        removeSpan.innerHTML = 'x';
        removeSpan.classList.add('email-result--remove');
        emailResult.appendChild(emailSpan)
        emailResult.appendChild(removeSpan);
        removeSpan.addEventListener('click', ()=> {
        removeEmailResult(email, emailResult);
        });
        emailResultContainer.appendChild(emailResult);
        updateEmailInput();
    }

    emailResults.forEach(email => {
        addEmailResult(email);
    });

    const updateEmailInput = () => {
        const emailInput = document.getElementsByClassName('email-result-input')[0];
        emailInput.value = emailResults.join(', ');
    }

    // vote select code end
}