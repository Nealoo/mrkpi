export function getBaseUserInfo(){
    let kpiEmail = document.querySelector("#kpi-form-email").value;
    let kpiKey = document.querySelector("#kpi-form-key").value;
    let kpiYear = document.querySelector("#kpi-form-year").value;
    let kpiWeek = document.querySelector("#kpi-form-week").value;
    
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