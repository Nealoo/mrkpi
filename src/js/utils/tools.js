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