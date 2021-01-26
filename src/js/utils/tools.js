import {getUserInfoFromLocal} from '../auth';

export function getBaseUserInfo(){
    let userInfo = getUserInfoFromLocal()
        let kpiEmail = userInfo.userName;
        let kpiKey = userInfo.password;
        let kpiYear = document.querySelector("#kpi-form-year").value;
        let kpiWeek = document.querySelector("#kpi-form-week").value;

        // always save the latest year and week info
        localStorage.setItem('mrkpiYear', kpiYear)
        localStorage.setItem('mrkpiWeek', kpiWeek)
        
        return {
            "email": kpiEmail,
            "key": kpiKey,
            "year": kpiYear,
            "week": kpiWeek
        }
}

// <th scope="col">Name</th>
// <th scope="col">Working</th>
// <th scope="col">Billable</th>
// <th scope="col">points</th>
// <th scope="col">fullAttendancePoints</th>
// <th scope="col">logTimeDaily</th>
// <th scope="col">planTimeDaily</th>
// <th scope="col">writeShareDoc</th>
// <th scope="col">fullAttendanceDay</th>
// <th scope="col">fullWeekDay</th>
// <th scope="col">extraKPIHours</th>
// <th scope="col">leave</th>
// <th scope="col">normalKPIHours</th>
// <th scope="col">totalActualWorking</th>
// <th scope="col">helpVotePoints</th>
// <th scope="col">helpingWinner</th>
// <th scope="col">mostBillable</th>
// <th scope="col">mostWorking</th>
// <th scope="col">shareVotePoints</th>
// <th scope="col">sharingWinner</th>
// <th scope="col">sharingTopic</th>
// <th scope="col">totalAttitude</th>
// <th scope="col">totalExtra</th>
// <th scope="col">totalExtraKPIHours</th>
// <th scope="col">totalGoal</th>
// <th scope="col">totalHelping</th>
// <th scope="col">totalNormalKPIHours</th>
// <th scope="col">totalPerformance</th>
// <th scope="col">totalSharing</th>

//kpiDate:
// {
//     'kai@moustacherepublic.com':{
//         'hours': {},
//         'attitude': {},
//         ...,
//         'totalPoints': 123,
//         ...
//     }
// }
// or
// [
//     {
//         'hours': {},
//         'attitude': {},
//         ...,
//         'totalPoints': 123,
//         ...
//     },
//     ...
//     {}
// ]

export function kpiTableTemplate(kpiData, season=false) {

    let generateIndexKey;
    if(season){
        generateIndexKey = key=>(season-1)*13 + Number(key) + 1;
    }else{
        generateIndexKey = key=>key.replace('@moustacherepublic.com','');
    }

    return `
        ${Object.keys(kpiData).map((userEmail, index)=>{
            return `
                <tr>
                    <td>${generateIndexKey(userEmail)}</td>
                    <td>${kpiData[userEmail]?.hours?.totalJiraWorking}</td>
                    <td>${kpiData[userEmail]?.hours?.totalBillable}</td>
                    <td>${kpiData[userEmail]?.totalPoints}</td>
                    <td>${kpiData[userEmail]?.attitude?.fullAttendancePoints}</td>
                    <td>${kpiData[userEmail]?.attitude?.logTimeDaily}</td>
                    <td>${kpiData[userEmail]?.attitude?.planTimeDaily}</td>
                    <td>${kpiData[userEmail]?.attitude?.writeShareDoc}</td>
                    <td>${kpiData[userEmail]?.fullAttendanceDay}</td>
                    <td>${kpiData[userEmail]?.fullWeekDay}</td>
                    <td>${kpiData[userEmail]?.hours?.extraKPIHours}</td>
                    <td>${kpiData[userEmail]?.hours?.leave}</td>
                    <td>${kpiData[userEmail]?.hours?.normalKPIHours}</td>
                    <td>${kpiData[userEmail]?.hours?.totalActualWorking}</td>
                    <td>${kpiData[userEmail]?.performance?.helpVotePoints}</td>
                    <td>${kpiData[userEmail]?.performance?.helpingWinner}</td>
                    <td>${kpiData[userEmail]?.performance?.mostBillable}</td>
                    <td>${kpiData[userEmail]?.performance?.mostWorking}</td>
                    <td>${kpiData[userEmail]?.performance?.shareVotePoints}</td>
                    <td>${kpiData[userEmail]?.performance?.sharingWinner}</td>
                    <td>${kpiData[userEmail]?.sharingTopic}</td>
                    <td>${kpiData[userEmail]?.totalAttitude}</td>
                    <td>${kpiData[userEmail]?.totalExtra}</td>
                    <td>${kpiData[userEmail]?.totalExtraKPIHours}</td>
                    <td>${kpiData[userEmail]?.totalGoal}</td>
                    <td>${kpiData[userEmail]?.totalHelping}</td>
                    <td>${kpiData[userEmail]?.totalNormalKPIHours}</td>
                    <td>${kpiData[userEmail]?.totalPerformance}</td>
                    <td>${kpiData[userEmail]?.totalSharing}</td>
                </tr> 
            `
        }).join('')}
    `
}

export function getBaseUtilisationInfo(){
    let key = document.querySelector("#utilisation-key").value;
    let year = document.querySelector("#utilisation-year").value;
    let month = document.querySelector("#utilisation-month").value;
    let week = document.querySelector("#utilisation-week").value;
    let startDate = document.querySelector("#utilisation-startdate").value;
    let endDate = document.querySelector("#utilisation-enddate").value;
    
    return {
        "key": key,
        "year": year,
        "month": month,
        "week": week,
        "startDate": startDate,
        "endDate": endDate
    }
}