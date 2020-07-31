import {getBaseUtilisationInfo} from './utils/tools'

export default function(){
    document.querySelector('#utilisation-store-key').addEventListener('click', function(){
        var value = getBaseUtilisationInfo();
        localStorage.setItem('utilisationKey', value.key)
        localStorage.setItem('utilisationMonth', value.month)
        localStorage.setItem('utilisationWeek', value.week)
        localStorage.setItem('utilisationYear', value.year)
        localStorage.setItem('utilisationStartDate', value.startDate)
        localStorage.setItem('utilisationEndDate', value.endDate)
    });

    document.querySelector("#utilisation-key").value = localStorage.getItem('utilisationKey');
    document.querySelector("#utilisation-year").value = localStorage.getItem('utilisationYear');
    document.querySelector("#utilisation-month").value = localStorage.getItem('utilisationMonth');
    document.querySelector("#utilisation-week").value = localStorage.getItem('utilisationWeek');
    document.querySelector("#utilisation-startdate").value = localStorage.getItem('utilisationStartDate');
    document.querySelector("#utilisation-enddate").value = localStorage.getItem('utilisationEndDate');

    document.querySelector('#utilisation-get-data').addEventListener('click', function(){
        
        var url = new URL('http://api.mrkpi.icu/checkweekhours/');
        // var url = new URL('http://localhost:5000/checkweekhours/');

        var params = getBaseUtilisationInfo();
        params.isAll = 'True';

        document.querySelector('#utilisation-get-data').setAttribute('disabled','disabled');
        document.querySelector('#utilisation-get-data').innerText = 'loading'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(status){return status.json();}).then(function(res){
            document.querySelector('#utilisation-get-data').removeAttribute('disabled');
            document.querySelector('#utilisation-get-data').innerText = 'get data';
            document.getElementById('utilisation-tbody').innerHTML = tableRowTemplate(res);
        })
        
        
    }, false);

    document.querySelector('#utilisation-get-cache').addEventListener('click', function(){
        
        var url = new URL('http://api.mrkpi.icu/checkweekhours/');
        // var url = new URL('http://localhost:5000/checkweekhours/');

        var params = getBaseUtilisationInfo();
        params.isAll = 'True';
        params.cache = 'getFromCache';

        document.querySelector('#utilisation-get-cache').setAttribute('disabled','disabled');
        document.querySelector('#utilisation-get-cache').innerText = 'loading'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(status){return status.json();}).then(function(res){
            document.querySelector('#utilisation-get-cache').removeAttribute('disabled');
            document.querySelector('#utilisation-get-cache').innerText = 'get cache';
            document.getElementById('utilisation-tbody').innerHTML = tableRowTemplate(res);
        })
        
        
    }, false);
}

function tableRowTemplate(data){
    return `
        ${Object.keys(data.response.members).map((userName, index)=>{
            const billableHours = data.response.members[userName].billed_hours;
            const workingHours  = data.response.members[userName].logged_hours;
            const requiredHours = data.response.required_hours;
            const leaveHours    = data.response.members[userName].leave_logged;
            const leaveBillable = data.response.members[userName].leave_billed;

            const adjustedBillable = billableHours - leaveBillable;
            const adjustedWorked   = workingHours - leaveHours;
            const adjustedRequired = requiredHours - leaveHours;
            const utilisation      = adjustedWorked / adjustedRequired;
            const utilisationBill  = adjustedBillable / adjustedRequired;
            return `
                <tr>
                    <th>${index+1}</th>
                    <td>${userName}</td>
                    <td>${billableHours.toFixed(2)}</td>
                    <td>${workingHours.toFixed(2)}</td>
                    <td>${requiredHours.toFixed(2)}</td>
                    <td>${leaveHours.toFixed(2)}</td>
                    <td>${adjustedWorked.toFixed(2)}</td> ${/* adjusted worked */''}
                    <td>${adjustedRequired.toFixed(2)}</td> ${/* adjusted required */''}
                    <td class="${utilisation<0.7?'table-danger':utilisation<1?'table-success':'table-warning'}">${utilisation.toFixed(2)}</td> ${/* utilisation */''}
                    <td>${utilisationBill.toFixed(2)}</td> ${/* billable utilisation */''}
                    <td>${(adjustedBillable / adjustedWorked).toFixed(2)}</td> ${/* Billable:Worked */''}
                    <td>${getRoleTargetByName(userName)[1]}</td> ${/* Target */''}
                </tr> 
            `
        }).join('')}
    `
}

function getRoleTargetByName(name){
    const roleTarget = {
        'David Mayo': ['Dev', 0.8, 'NZ'],
        'Alex Li': ['Dev', 0.8, 'NZ'],
        'Alex mayo': ['PM', 0.7, 'NZ'],
        'Alexandra Mills': ['AM', 0.7, 'NZ'],
        'Anni Luo': ['QA', 0.8, 'NZ'],
        'Audrina Heng': ['Design', 0.8, 'NZ'],
        'Barrick Hu': ['Dev', 0.8, 'NZ'],
        'Bethany Callora': ['Dev', 0.8, 'PH'],
        'Charmaine Araque': ['QA', 0.8, 'PH'],
        'Clarence Moratal': ['Dev', 0.7, 'PH'],
        'Dave Birchall': ['AM', 0.7, 'AU'],
        'Dave Pangilinan': ['Dev', 0.7, 'PH'],
        'David Li': ['Dev', 0.3, 'NZ'],
        'David Mayo': ['Dev', 0.8, 'NZ'],
        'Dexter Peñafiel': ['Dev', 0.8, 'PH'],
        'Grant Rochell Mesa': ['Dev', 0.8, 'PH'],
        'Hudson Prestidge': ['Dev', 0.8, 'NZ'],
        'James Prime': ['QA', 0.8, 'NZ'],
        'Jamie Sun': ['Dev', 0.8, 'NZ'],
        'Jason Greenwood': ['SA', 0.6, 'NZ'],
        'Jason Lin': ['Dev', 0.8, 'NZ'],
        'Jemuel Elimanco': ['Dev', 0.8, 'PH'],
        'John Tapsell': ['Dev', 0.8, 'NZ'],
        'Jonathan Xu': ['Dev', 0.8, 'NZ'],
        'Jonathan Zhou': ['Dev', 0.8, 'NZ'],
        'Kai Koh': ['Dev', 0.8, 'NZ'],
        'Ken Li': ['PM', 0.7, 'AU'],
        'Macy Ma': ['Dev', 0.8, 'NZ'],
        'Marvie Ellaine Alar': ['Dev', 0.8, 'PH'],
        'Michael Zhang': ['Dev', 0.8, 'NZ'],
        'Neal Li': ['Dev', 0.3, 'NZ'],
        'Niel Kenneth Santos': ['Dev', 0.8, 'PH'],
        'Richard Wang': ['Dev', 0.8, 'NZ'],
        'Sarah East': ['PM', 0.7, 'NZ'],
        'Shehaz Mannan': ['PM', 0.3, 'AU'],
        'Sophia Butler': ['PM', 0.7, 'NZ'],
        'Theresia Joo': ['Dev', 0.8, 'NZ'],
        'Timothy Pimentel': ['QA', 0.8, 'PH'],
        'Tony Hou': ['MD', 0.1, 'AU'],
        'Warren Elder': ['Dev', 0.8, 'NZ'],
        'William Zhao': ['Dev', 0.3, 'NZ'],
    }

    return roleTarget[name] ? roleTarget[name] : ['N/A','N/A','N/A']
}