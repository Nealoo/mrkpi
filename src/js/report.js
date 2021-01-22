import Chart from 'chart.js';
import $ from 'jquery';
import {getBaseUserInfo} from './utils/tools'

import {baseUrl} from './utils/env';

export default function(mode){

    let ctx = document.getElementById('kpi-season-chart');
    let ctxRadar = document.getElementById('kpi-season-radar-chart');

    $('#kpi-season-query1').click(()=>{
        InitSeasonGraph('1');
    });

    $('#kpi-season-query2').click(()=>{
        InitSeasonGraph('2');
    });
    
    $('#kpi-season-query3').click(()=>{
        InitSeasonGraph('3');
    });

    $('#kpi-season-query4').click(()=>{
        InitSeasonGraph('4');
    });

    function InitSeasonGraph(season){
        let userParams = getBaseUserInfo();
        userParams.season = season;

        $.ajax({
            
            url: `${baseUrl}getseasonpoints/`,
            method: 'POST',
            data: userParams
        }).done((res)=>{
            processChartWithData(res);
        }).fail((err)=>{
            console.log(err);
            ctx.getContext("2d").fillText(JSON.stringify(err.responseText), 10, 50);
        });
    }

    $('#kpi-week-query').click(()=>{

        let userParams = getBaseUserInfo();
        
        $.ajax({
            url: `${baseUrl}getweekpoints/`,
            method: 'POST',
            data: userParams
        }).done((res)=>{
            processChartWithData(res);
        }).fail((err)=>{
            console.log(err);
            ctx.getContext("2d").fillText(JSON.stringify(err.responseText), 10, 50);
        });
    });

    function processChartWithData(reportData){

        if(!(reportData && reportData.response && reportData.response.data)){
            return false;
        }

        const seasonData = reportData.response.data;

        let labelsArray = [];
        let normalHoursArray = [];
        let extraHoursArray = [];
        let pointsArray = [];
        let radarArray = [];
        let avgRadarArray = [];

        let maxAttitude = 0;
        let maxExtra = 0;
        let maxGoal = 0;
        let maxPerformance = 0;
        let maxSharing = 0;
        let maxHelping = 0;

        let sumAttitude = 0;
        let sumExtra = 0;
        let sumGoal = 0;
        let sumPerformance = 0;
        let sumSharing = 0;
        let sumHelping = 0;
        
        $.each(seasonData, (email, data)=>{
            labelsArray.push(email.replace('@moustacherepublic.com', ''));
            normalHoursArray.push(data.totalNormalKPIHours);
            extraHoursArray.push(data.totalExtraKPIHours)
            pointsArray.push(data.totalPoints);

            sumAttitude += Number(data.totalAttitude);
            sumExtra += Number(data.totalExtra);
            sumGoal += Number(data.totalGoal);
            sumPerformance += Number(data.totalPerformance);
            sumSharing += Number(data.totalSharing)
            sumHelping += Number(data.totalHelping)

            maxAttitude    = data.totalAttitude    > maxAttitude    ? data.totalAttitude    : maxAttitude;
            maxExtra       = data.totalExtra       > maxExtra       ? data.totalExtra       : maxExtra;
            maxGoal        = data.totalGoal        > maxGoal        ? data.totalGoal        : maxGoal;
            maxPerformance = data.totalPerformance > maxPerformance ? data.totalPerformance : maxPerformance;
            maxSharing     = data.totalSharing     > maxSharing     ? data.totalSharing     : maxSharing;
            maxHelping     = data.totalHelping     > maxHelping     ? data.totalHelping     : maxHelping;

        });

        // final KPI hours start
        // 1. get the clear array without negtive hours
        // normalHoursArray = [30,-5,-6,30,-10] //testing only
        let absIndexArray = [];
        let absPointsArray = [];
        let absNormalHoursArray = normalHoursArray.filter((nHour,index)=>{
            if(nHour < 0){
                absIndexArray.push(index);
            }else{
                absPointsArray.push(pointsArray[index]);
            }
            return nHour >= 0;
        });

        // 2. get the average of the hours and points
        const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

        let avgNormalHour = average(absNormalHoursArray);
        let avgPoint = average(absPointsArray);
        let pointsDifferenceRateArray = absPointsArray.map(point=>(point-avgPoint)/avgPoint);
        let normalHoursAdjustmetArray = pointsDifferenceRateArray.map(rate=>rate*avgNormalHour)


        // console.log(absIndexArray, pointsArray, absPointsArray, absNormalHoursArray)
        // console.log('=====')
        // console.log(avgNormalHour,avgPoint,pointsDifferenceRateArray,normalHoursAdjustmetArray)

        absIndexArray.forEach(index=>{
            normalHoursAdjustmetArray.splice(index,0,0);
        })

        // console.log(normalHoursAdjustmetArray)

        let finalHoursArray = normalHoursArray.map((nHour,index)=>{
            return nHour+normalHoursAdjustmetArray[index];
        })

        // console.log(finalHoursArray);

        // let finalHoursArray = [50,60,70,80,90];

        // final KPI hours end

        if(mode != 'tl'){
            const seasonDataLen = Object.keys(seasonData).length - 2;

            let avgAttitude = sumAttitude/seasonDataLen;
            let avgExtra = sumExtra/seasonDataLen;
            let avgGoal = sumGoal/seasonDataLen;
            let avgPerformance = sumPerformance/seasonDataLen;
            let avgSharing = sumSharing/seasonDataLen;
            let avgHelping = sumHelping/seasonDataLen;

            let userParams = getBaseUserInfo();
            let currentUserData = seasonData[userParams.email];
            radarArray.push(
                currentUserData.totalAttitude/maxAttitude,
                currentUserData.totalExtra/maxExtra,
                currentUserData.totalGoal/maxGoal,
                currentUserData.totalPerformance/maxPerformance,
                currentUserData.totalSharing/maxSharing,
                currentUserData.totalHelping/maxHelping
            )

            avgRadarArray.push(
                avgAttitude/maxAttitude,
                avgExtra/maxExtra,
                avgGoal/maxGoal,
                avgPerformance/maxPerformance,
                avgSharing/maxSharing,
                avgHelping/maxHelping
            );
        }

        // show the tl infomation table
        if(mode == 'tl'){
            const tlTableTemplate = kpiData => {
                return `
                    ${Object.keys(kpiData).map((userEmail, index)=>{
                        return `
                            <tr>
                                <td>${userEmail.replace('@moustacherepublic.com','')}</td>
                                <td>${kpiData[userEmail]?.hours?.totalJiraWorking}</td>
                                <td>${kpiData[userEmail]?.hours?.totalBillable}</td>
                                <td>${kpiData[userEmail]?.totalPoints}</td>
                            </tr> 
                        `
                    }).join('')}
                `
            }
            console.log(tlTableTemplate)
            $('#tl_kpi_tbody').html(tlTableTemplate(seasonData));
        }
        

        // console.log(
        //     'avgAttitude', avgAttitude,
        //     'avgExtra', avgExtra,
        //     'avgGoal', avgGoal,
        //     'avgPerformance', avgPerformance
        // )

        initChart(labelsArray, normalHoursArray, extraHoursArray, pointsArray, finalHoursArray, radarArray, avgRadarArray);
    }

    function initChart(labelsArray, normalHoursArray, extraHoursArray, pointsArray, finalHoursArray, radarArray, avgRadarArray){
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labelsArray,
                datasets: [{
                    label: 'Normal KPI hours',
                    data: normalHoursArray,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },{
                    label: 'Extra KPI hours',
                    data: extraHoursArray,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },{
                    label: 'KPI points',
                    data: pointsArray,
                    type: 'line',
                    // this dataset is drawn on top
                    order: 2
                },{
                    label: 'final hours(100% weight in)',
                    data: finalHoursArray,
                    borderColor: 'rgba(54, 162, 235, 0.2)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    type: 'line',
                    // this dataset is drawn on top
                    order: 2
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        if(mode == 'tl'){
            return false;
        }

        var myRadarChart = new Chart(ctxRadar, {
            type: 'radar',
            data: {
                labels: ['Attitude', 'Extra', 'Goal', 'Performance(inc.Sharing/Helping)', 'Sharing', 'Helping'],
                datasets: [{
                    data: radarArray,
                    label: 'My data',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },{
                    data: avgRadarArray,
                    label: 'Avg data',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235,1)',
                    borderWidth: 1
                }]
            },
            options: {
                scale: {
                    angleLines: {
                        display: false
                    },
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 1
                    }
                }
            }
        });
    }
    
}