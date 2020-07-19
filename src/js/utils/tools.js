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