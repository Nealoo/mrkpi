Bug reports, feature requests & pull requests(frontend page only for now) are welcome

WIP:
1. UI, update the dev kpi field to two fields one row. and add select.
2. Integration, add round to all calculation function.
3. Integration, add leave check for the full attendance check.
4. Integration, set 'complete status' for week data.
5. UI, add 'complete status' into the week data table.
6. UI, implement loading to all buttons.
7. UI, add sweet alert for success/error message.
8. UI, add tooptip for each fields.
9.  update the input fields layout.
   1. show a floating button in the corner, click to show an extra panel to show the API response panel.
10. after hour 1.5 apply/approve.
    

TL page changes
1. UI, TL page, show all radar charts.

App init for the Manila team
1. set up accounts for them.
2. add attribute 'location' to the user profile.
3. update the holiday management rule. add a holiday schema attribute to all users.

under consideration
1. CI, set up CI for deployment, only bundle production resources for public.
2. Integration, redo the radar chart metrics.
3. Integration, send "full attendance day" data to the channel every week.
4. change password feature.
5. Slack integration.
6. UI, show the week query on the button.
7. UI, TL login as a developer.
8. UI, Filters for the table view.
9.  UI, show button for previous/next week query.
10. Integration, add system log.
11. Integration, create a new collection for the users.
12. Integration, add more information to the weeek/season report.
13. UI for vote check for dev.
14. UI, tl page, set points slipt to different tabs, based on the metrics.
   1. each tab got its own set button to only submit content under the current tab.

KPI app release note - 20210128
1. DEV, update dev, tl page to use the same base template.
2. UI, adding loading status for the login button.
3. UI, update the vote clear button to clear points and reasons.
4. Integration, tl page, support skip vote for devs.
5. UI, added more field to TL page, rearranged the fields.


KPI app release note - 20210127
1. UI/Integration, TL page, add week checkCompletion button/feature.
2. UI/Integration, TL page, allow TL to query seasonal weeks details report.
3. UI, TL page, make the field compact.
4. DEV, combined all table to one single template.
5. UI, set default value '0' for the table data.
6. UI, add 'afterHour' and 'afterHourExtra' to the table data view.
7. UI, add margin to season buttons.
8. ui, add loading message.


KPI app release note - 20210126
1. UI, updated TL page floating panel.
2. UI, dev page show season data table view.
3. Integration, new API to support the season data table view.
4. Bug Fix, TL page calculate button add default team.
5. Integration, requires permission for the tl get method.
6. Integration, TL API, set default team.
7. Integration, tl api, add validation, return object for the season calculate.
8. UI, add 'fetch jira data' and 'season calculate' button.
9. UI, add season input box.
10. UI, TL page, show select options based on TL team.

KPI app release note - 20210125
1. UI, tl page show the full attendence day, full week day in report.
2. Integration, added more details to the weekly report.
3. UI, updated the TL page to have the latest changes.

KPI app release note - 20210124

1. Integration, fixed the tl get permission issue.
2. Integration, Set default for the actual working.

KPI app release note - 20210123
1. UI, added support to show the final KPI hours after points (100% points weight in)
2. UI, updated to show the current week.
3. UI, fxed the issue of repainting the report
4. UI, added clear vote button.
5. UI, added log in page.
6. UI, removed store/clear in local button, added logout button.
7. UI, fixed the display issue for mobile.
8. UI, made the week and year input floating.
10. Integration, fixed an issue of setting Jira hours into a wrong week.
11. Integration, added support for new users.
12. UI & Integration, support query for season 1 - 4.
13. UI, added TL page to get/set dev’s points, and show report in a table view. 

KPI app release note - 20210118
1. Integration, update daily log/plan check script to use the new database.

KPI app release note - 20210106
1. Integration, removed all hardcoded '2020'
2. Integration, migrate database, update code

KPI app release note - 20201223
1. Integration, updated the tempo key.

KPI app release note - 20201117
1. Integration, update code to test Slack command, code is imcomplete

KPI app release note - 20201113
1. Integration, pdate Slack notice to notice voter by Slack.

KPI app release note - 20201023
1. Integration, update Theresis's kpi threshold
2. Integration, update Slck user code.

KPI app release note - 20201022
1. Integration, add taco vote into the week kpi report

KPI app release note - 20201021
1. exclude the after hour extra

KPI app release note - 20201016
1. add the user validate api

KPI app release note - 20201015
1. fix the multiple vote bug
2. add function to calculate automatically every week
3. set automatically set worklog job
4. remove the old logic before team function
5. update the report related function to support team

KPI app release note - 20201009
1. open season 4 and add support to d team slack check
2. update the chicken listener function
3. update the vote limit, so dev can't vote for different team
4. update KPI user validation
5. add more user for the temp hours

KPI app release note - 20201006
1. Frontend, DEV, add support to .env file
2. Integration, add team related helper function

KPI app release note - 20200910
1. quick fix for the nz time zone

KPI app release note - 20200731
1. utilisation update
   1. add color
   2. add index
   3. add target/role
2. Integration, support leave calculation, in case the incorrect time log

KPI app release note - 20200729
1. release utilisation page
2. add new api to support the utilisation page
3. UI, remove jira related fields
4. Integration, add support to get data from tempo

KPI app release note - 20200720
1. add radar chart
2. Bug fixing, corrected the wrong field title

KPI app release note - 20210719
1. support skip vote
2. add support to the season 3 chart
3. Integration, add support to the season KPI chart query


KPI app release note - 20200717  KPI version 1 released
1. installed webpack
2. updated code structure
3. add bootstrap

KPI app release note - 20200716
1. update vote select function
2. Integration, add season calculation and season report


KPI app release note - 20200713
1. upated the voteType to a select
2. add copy to cilpboard feature for vote

KPI app release note - 20200710
2. provide the email list for vote and the copy function
3. Integration, added run chicken to get vote.


KPI app release note - 20200220
1. first version released.
2. added buttons to send request.
3. added field to show response.


KPI app release note - 20200219
1. frontend project created on github.

KPI app release note - 20200201
1. add validation

KPI app release note - 20200130
1. set hours function, set vote function, get points function


KPI app release note - 20200123
1. Integration, init the integration


npx github-markdown release_note.md > release_note.html