import '../scss/home.scss';
import JSONViewer from '../vendor/json-viewer.js'
import '../vendor/json-viewer.css'
import report from './report'

import {baseUrl} from './utils/env';
import {logoutAction} from './auth';
import {getBaseUserInfo} from './utils/tools';

import selectTpl from '../template/team-options.handlebars';

export default function(){
    report('tl');

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

    const tlTeam = localStorage.getItem('mrkpiTeam');
    document.querySelector('#tl-selected-user').innerHTML = selectTpl({tlTeam});
    document.querySelector('#kpi-vote-select-user').innerHTML = selectTpl({tlTeam});
    
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

        var baseInfo = getBaseUserInfo();
        
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
        
        var baseInfo = getBaseUserInfo();
        
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

        var params = getBaseUserInfo();
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

        var params = getBaseUserInfo();

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

    document.querySelector('#kpi-fetch-jira').addEventListener('click', function(){
        
        var url = new URL(`${baseUrl}checkweekhours/`);

        var params = getBaseUserInfo();
        params.setKPI = 'True';

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

    document.querySelector('#kpi-season-calculate').addEventListener('click', function(){
        
        var url = new URL(`${baseUrl}calculateseasonpoints/`);

        var params = getBaseUserInfo();
        params.season = document.querySelector("#kpi-form-season").value;

        if(!params.season){
            alert('season can\'t be empty');
        }

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
    });

    // vote select code end
}