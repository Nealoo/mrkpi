import '../scss/home.scss';
import JSONViewer from '../vendor/json-viewer.js'
import '../vendor/json-viewer.css'
import report from './report'

import {baseUrl} from './utils/env';
import {logoutAction} from './auth';
import {getBaseUserInfo, kpiTableTemplate} from './utils/tools'

export default function(){
    report();

    function getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        // Return array of year and week number
        return weekNo;//[d.getUTCFullYear(), weekNo];
    }

    if(window.innerWidth < 768){
        document.querySelector('#kpi-response-area').classList.remove('sticky-top','vh-100');
    }

    document.querySelector('#kpi-current-week-number').innerHTML = getWeekNumber(new Date());

    document.querySelector("#kpi-form-year").value = localStorage.getItem('mrkpiYear');
    document.querySelector("#kpi-form-week").value = localStorage.getItem('mrkpiWeek');

    document.querySelectorAll('.kpi-season-table-query').forEach(elem=>elem.addEventListener('click', function(e){
        InitSeasonTable(e.target.dataset.season);
    }));

    function InitSeasonTable(season){
        let userParams = getBaseUserInfo();
        userParams.season = season;

        var url = new URL(`${baseUrl}report/season/${userParams.email}/`);

        url.search = new URLSearchParams(userParams).toString();

        fetch(url).then(function(status){return status.json();}).then(function(res){
            document.querySelector('#dev_kpi_tbody').innerHTML = kpiTableTemplate(res.response, season);
        })
    }
    
    function getHoursInfo(){
        // var clientBillable = document.querySelector("#kpi-form-clientBillable").value;
        // var companyPayProject = document.querySelector("#kpi-form-companyPayProject").value;
        // var companyPayExtra = document.querySelector("#kpi-form-companyPayExtra").value;
        var afterHour = document.querySelector("#kpi-form-afterHour").value;
        
        var afterHourExtra = document.querySelector("#kpi-form-afterHourExtra").value;
        var totalActualWorking = document.querySelector("#kpi-form-totalActualWorking").value;
        
        var fullAttendanceDay = document.querySelector("#kpi-form-fullAttendanceDay").value;
        
        var writeShareDoc = document.querySelector("#kpi-form-writeShareDoc").value;
        var demoTopic = document.querySelector("#kpi-form-demoTopic").value;
        var sharingTopic = document.querySelector("#kpi-form-sharingTopic").value;

        var baseInfo = getBaseUserInfo();
        
        return {
            "email": baseInfo.email,
            "key": baseInfo.key,
            "year": baseInfo.year,
            "week": baseInfo.week,

            // "clientBillable": clientBillable,
            // "companyPayProject": companyPayProject,
            // "companyPayExtra": companyPayExtra,
            "afterHour": afterHour,
            
            "afterHourExtra": afterHourExtra,
            "totalActualWorking": totalActualWorking,
            
            "fullAttendanceDay": fullAttendanceDay,
            
            "writeShareDoc": writeShareDoc,
            "demoTopic": demoTopic,
            "sharingTopic": sharingTopic
        }
    }
    
    function getVoteInfo(){
        var voteType = document.querySelector("#kpi-form-voteType").value;
        var voteFor = document.querySelector("#kpi-form-voteFor").value;
        var votePoint = document.querySelector("#kpi-form-votePoint").value;
        var voteReason = document.querySelector("#kpi-form-voteReason").value;
        var skipVote = document.querySelector("input[name=kpi-form-skipvote]:checked").value;
        
        var baseInfo = getBaseUserInfo();
        
        return {
            "email": baseInfo.email,
            "key": baseInfo.key,
            "year": baseInfo.year,
            "week": baseInfo.week,

            "voteType": voteType,
            "voteFor": voteFor,
            "votePoint": votePoint,
            "voteReason": voteReason,
            "skipVote": skipVote
        }
    }
    
    document.querySelector('#kpi-form-get-points').addEventListener('click', function(){
        
        var url = new URL(`${baseUrl}getpoints/`);

        var params = getBaseUserInfo();

        url.search = new URLSearchParams(params).toString();

        fetch(url).then(function(status){return status.json();}).then(function(res){
            var textarea = document.querySelector("textarea");
            textarea.value = JSON.stringify(res);

            document.querySelector("button.load-json").click();
        })
        
        
    }, false);

    document.querySelector('#kpi-form-set-hours').addEventListener('click', function(){
        
        var url = new URL(`${baseUrl}sethours/`);

        var params = getHoursInfo();

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
        
        var url = new URL(`${baseUrl}setvote/`);

        var params = getVoteInfo();

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

    document.querySelector('#kpi-logout').addEventListener('click', function(){
        alert(`logged out, and your key: ${localStorage.getItem('mrkpiKey')}`)
        logoutAction();
    });
    
    

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
    let emailResults = [];

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

    const updateEmailInput = () => {
        document.querySelector('#kpi-form-voteFor').value = emailResults.join(', ');
    }

    const voteClearBtn = document.querySelector('#kpi-form-clear-vote');

    voteClearBtn.addEventListener('click', () => {
        emailResultContainer.innerHTML = '';
        emailResults = [];
        updateEmailInput();
        document.querySelector('#kpi-form-userVotePoint').value = '';
        document.querySelector('#kpi-form-userVoteReason').value = '';
    });

    // vote select code end
}