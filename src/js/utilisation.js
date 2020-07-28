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
        
        // var url = new URL('http://api.mrkpi.icu/checkweekhours/');
        var url = new URL('http://localhost:5000/checkweekhours/');

        var params = getBaseUtilisationInfo();
        // params.isAll = 'True';

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
            document.querySelector('#utilisation-get-data').innerText = 'get data'
            console.log(res, tableRowTemplate(res));
            document.getElementById('utilisation-tbody').innerHTML = tableRowTemplate(res);
        })
        
        
    }, false);
}

function tableRowTemplate(data){
    return `
        ${Object.keys(data.response.members).map((userName)=>{
            return `
                <tr>
                    <th>#</th>
                    <td>${userName}</td>
                    <td>${data.response.members[userName].billed_hours}</td>
                    <td>${data.response.members[userName].logged_hours}</td>
                    <td>${data.response.required_hours}</td>
                    <td>${data.response.members[userName].leave_logged}</td>
                    <td>Adjusted Required</td>
                    <td>Utilisation</td>
                    <td>Billable Utilisation</td>
                    <td>Billable:Worked</td>
                    <td>Target</td>
                </tr> 
            `
        }).join('')}
    `
}