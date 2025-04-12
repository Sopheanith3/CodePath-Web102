# Web Development Project 7 - *Covid-19 Dashboard DATA II*

Submitted by: **Sopheanith Ny**

This web app: **This COVID-19 Global Tracker visualizes pandemic data worldwide, featuring real-time statistics, country-specific details, and interactive filtering by search, continent, and case counts, all in an intuitive, responsive interface powered by the Disease.sh API.**

Time spent: **18** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset


The following **optional** features are implemented:

- [x] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [x] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations 

  
The following **additional** features are implemented:

* [x] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

![1 1](https://github.com/user-attachments/assets/86ec3d17-0650-4ba2-a46d-0619e647c0cd)



<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.

When building this COVID-19 dashboard app, the biggest challenge I faced was the API being down. The website that provided COVID data (disease.sh) wasn't working, so my app couldn't fetch the information it needed.
To solve this problem, I had to create a backup plan. I made two JSON files - one for global COVID statistics and another for country-specific data. These files contain sample data that my app can use when the API isn't available.
I set up the code to try the original API first, but if that fails, it automatically switches to using my local JSON files instead. This way, the app always has data to display, even when the online source is down.
This issue took a lot of time to troubleshoot and fix, but having a local backup makes the app much more reliable for user

## License

    Copyright [2025] [Sopheanith Ny]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
