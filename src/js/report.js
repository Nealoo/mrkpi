import Chart from 'chart.js';
import $ from 'jquery';
import {getBaseUserInfo} from './utils/tools'

export default function(){

    $('#kpi-season-query').click(()=>{

        let ctx = document.getElementById('kpi-season-chart');
        let userParams = getBaseUserInfo();
        userParams.season = '3'

        $.ajax({
            url: 'http://api.mrkpi.icu/getseasonpoints/',
            // url: 'http://localhost:5000/getseasonpoints/',
            method: 'POST',
            data: userParams
        }).done((res)=>{
            processChartWithData(res);
        }).fail((err)=>{
            console.log(err);
            ctx.getContext("2d").fillText(JSON.stringify(err.responseText), 10, 50);
        })

        function processChartWithData(reportData){

            if(!(reportData && reportData.response && reportData.response.data)){
                return false;
            }

            delete reportData.response.data['jonathan@moustacherepublic.com']
            delete reportData.response.data['barrick@moustacherepublic.com']

            let labelsArray = [];
            let normalHoursArray = [];
            let extraHoursArray = [];
            let pointsArray = [];
            
            $.each(reportData.response.data, (email, data)=>{
                labelsArray.push(email.replace('@moustacherepublic.com', ''));
                normalHoursArray.push(data.totalNormalKPIHours);
                extraHoursArray.push(data.totalExtraKPIHours)
                pointsArray.push(data.totalPoints);
            })

            initChart(labelsArray, normalHoursArray, extraHoursArray, pointsArray);
        }

        function initChart(labelsArray, normalHoursArray, extraHoursArray, pointsArray){
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
        }
    });
    
}