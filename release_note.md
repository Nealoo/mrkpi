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
    

TL page changes
1. Bug Fix, TL page calculate button add default team.
2. TL page, user dropdown based on team.
3. UI, TL page, add button for get jira hours and generate report.
4. UI, show all fields and add filters to show/hide the columns in the table.
5. 2. tl page, set points slipt to different tabs, based on the metrics.
   1. each tab got its own set button to only submit content under the current tab.
6. UI, TL page, show all radar charts.

App init for the Manila team
1. set up accounts for them.
2. update the holiday management rule. add a holiday schema attribute to all users.

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
11. after hour 1.5 apply/approve.
12. Integration, add system log.
13. Integration, create a new collection for the users.
14. Integration, add more information to the weeek/season report.
15. UI for vote check.

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