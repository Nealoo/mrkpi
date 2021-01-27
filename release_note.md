Bug reports, feature requests & pull requests(frontend page only for now) are welcome

WIP:
1. Integration, set 'complete status' for week data.
8. Integration, new API for all week data for one developer.
11. UI, add button for dev to query all weeks data (including 'complete status') for one season.
    1.  show all fields and add filters to show/hide the columns in the table.
12. UI, implement loading to all buttons.
13. UI, add sweet alert for success/error message.
14. UI, add tooptip for each fields.
15. UI, add button to show hide the API response panel.
   1. show a floating button in the corner, click to show an extra panel to show the fields.
16. UI, update the layout to show two input box each line for numbers.
17. after hour 1.5 apply/approve.
    

TL page changes
1. 
2. TL page, user dropdown based on team.
3. UI, TL page, add button for get jira hours and generate report.
4. UI, show all fields and add filters to show/hide the columns in the table.
5. 2. tl page, set points slipt to different tabs, based on the metrics.
   1. each tab got its own set button to only submit content under the current tab.
6. UI, TL page, show all radar charts.

App init for the Manila team
1. set up accounts for them.
2. add attribute 'location' to the user profile.
3. update the holiday management rule. add a holiday schema attribute to all users.

under consideration
1. CI, set up CI for deployment, only bundle production resources for public.
2. Integration, redo the radar chart metrics.
3. Integration, send "full attendance day" data to the channel every week.
4. A button for set check for data completion.
5. change password feature.
6. Slack integration.
7. UI, show the week query on the button.
8. UI, TL login as a developer.
9.  Query for all data for  a season in a table view
    1. Filters for the table view.
10. UI, show button for previous/next week query.
11. Integration, add system log.
12. Integration, create a new collection for the users.
13. Integration, add more information to the weeek/season report.
14. UI for vote check.

KPI app release note - 20210127
1. UI/Integration, TL page, add week checkCompletion button/feature.
2. UI/Integration, TL page, allow TL to query seasonal weeks details report.


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