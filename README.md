# Project 2

Welcome to our project! On the website you can access GitLab repositories using a project-ID (e.g. 17534) and an access token. You can choose whether you want to display Issues or Commits, and how you want them displayed. You can also choose which information about the Issues and Commits you want to display.

Link to website: http://it2810-43.idi.ntnu.no/project2/ 

## Component overview

Arrows indicate that the component is being rendered in the above component, the dashed lines indicates imports such as functions and theme.

 <img src="components connected.png">

## Folder structure 

``` src
┣ api
┃ ┣ Connect.tsx
┃ ┣ GetCommits.tsx
┃ ┗ GetIssues.tsx
┣ charts
┃ ┣ CommitBarChart.tsx
┃ ┣ CommitsChart.tsx
┃ ┣ IssueAssigneeChart.tsx
┃ ┗ IssueStateChart.tsx
┣ components
┃ ┣ CommitsFilter.tsx
┃ ┣ CommitsViews.tsx
┃ ┣ DarkMode.tsx
┃ ┣ Headline.tsx
┃ ┣ IssuesFilter.tsx
┃ ┣ IssuesViews.tsx
┃ ┣ PaginationFunctions.tsx
┃ ┗ UserInput.tsx
┣ contexts
┃ ┗ ThemeContext.tsx
┣ images
┃ ┗ project-id.png
┣ __tests__
┃ ┣ App.test.tsx
┃ ┣ Headline.test.tsx
┃ ┗ UserInput.test.tsx
┣ App.css
┣ App.tsx
┣ index.css
┣ index.tsx
┣ react-app-env.d.ts
┣ reportWebVitals.ts
┗ setupTests.ts
``` 

## Commands

Run server with `npm install` and then `npm start`

## Technical requirements 

This app was implemented using TypeScript React. React is great for making single page applications as it allows for fast and easy updates on components. We have implemented mostly functional components, but for illustrative purposes we also have one class component, CommitsBarChart. 

### Context API 

The Context API is used to share data globally amongst React components i.e. if there is a state you want all components to share. We decided to use the Context API to implement dark mode to our website. We might have over complicated the use of the API, and ended up having some type-issues. Our page works just fine for the user, but a snapshot test reveals that the page does not render as expected. If we had some more time we would probably try to use the Context API to share less advanced types e.g. just a boolean and put “light theme/dark theme” based on the boolean. 

### HTML Web Storage 

Local storage was used to save the user’s theme preferences. When using local storage the storage is persistent, and the user’s choice will not expire on tab-close. 
We used session storage to display a random emoji every time the user opens the website in a new tab. Because we wanted to demonstrate both setting and getting a value from the session storage, we first put the random emoji in session storage so we could get it from session storage when setting the page headline. Session web storage is not persistent and the session expires on tab-close. This is how the emoji gets renewed at each visit to the website. 

### GitLab API requests

Our project uses the promise-based HTTP client Axios for making get requests to the GitLab API. Axios is a relatively small library which can be installed through npm. Initially, we used Fetch to get data from GitLab, which also is a promise-based HTTP client built into most popular browsers. However, as Fetch does not provide the fetched data as a JSON automatically, retrieving the actual result has to be done using two promises. Switching to Axios made the code more readable as the JSON result can be accessed directly inside the response object under the "data" property. An added bonus is that Axios also has wider browser support than Fetch. Both Fetch and Axios use an AJAX approach when making HTTP requests. As our project is a single page application (SPA) , it is crucial that data can be retrieved and exchanged in the background without having to reload the entire page. AJAX - asynchronous JavaScript, allows us to do exactly that.

The response data from the GitLab API includes more information than we planned on displaying. We therefore decided to make two components, GetIssues and GetCommits. Both components make a get request, and then gather only the relevant information in an array called cleanedResults. The array of cleaned results is then passed to the view components IssuesViews and CommitsViews, which controls how the results are displayed. The user is given the choice between list view and charts. In the list view, the components IssuesFilter or CommitsFilter allow the user to filter retrieved issues or commits on certain properties, e.g. “view only closed issues”. The Connect component coordinates the get requests in GetIssues and GetCommits by passing the same project id and access token from UserInput as props to GetIssues and GetCommits. 

### Responsive layout 

To ensure a responsive and flexible design, we made sure that all elements from the beginning were as responsive as possible. Therefore we implemented Materials UI (MUI), which is a React library of user interface components that have great accessibility and scalability in most browsers. 
We used MUI components for the input-fields where the user types in the Gitlab repo project ID and access token, the selection dropdowns, grid, popup modal, pagination, and the buttons. In addition, we used several of MUI’s icons as buttons (e.g., the “?”-button and “X”-button)

MUI grid was used to display the commits and issues in a responsive manner, it is basically the same as a regular CSS grid, without having to manually adjust all the CSS through defining containers and children and sizes. We barely used plain CSS for styling at all, having less CSS in the project, in our opinion, made the code more readable. Most of the styling was done through defining a const variable that was passed to the sx (a shortcut for defining styles of MUI components) prop of MUI components or the style prop of regular CSS elements.
We also added a scalable image in our popup modal which opens when the user clicks on the “?”-button, which helps the user to find their project id which is needed to view the issues and commits of a project.
Implementing grid and mostly responsive MUI-components made it possible to limit our use of media queries.To demonstrate the use of media queries, the headline’s (h3-tag with id=”headline”) padding is altered using media queries when the screen is narrower than 600 px with 1vh on top and bottom. Similarly, we have used viewport sizes vh and vw on a few of the elements in our project, such as the headline, popup modal, and some of the dropdowns to ensure that their size was adjusted accordingly to the screen’s width or height.

## Testing with Jest 

Run tests with `npm test`

Jest is a JavaScript testing-library that is included when you create a react-app. For our app we did make a unit test for the component Headline.tsx which tests whether the id=”headline” is existent in the file. We tried to test several components, but we were unable to pass any tests due to useContext being  present in almost all our components. We therefore decided to create a new component without using useContext in it to test it. This was done to simply try out some testing. 
The tests can be found under src /tests . There are three tests in total. App.test.tsx is supposed to be the snapshot-test that checks whether the App components output unexpectedly changes, but as aforementioned it will not pass because of the type-error in useContext().  

## Testing of responsive design 

* When tested on a laptop, everything works correctly. The website adjusts to the web browser window size. Both themes work correctly, and the correct information is displayed when chosen.
* The website was tested on an iPad. To improve the website appearance on tablets, the issues content box is positioned beneath the commits, and both boxes are adjusted to fit the tablet screen. The select boxes and views function properly and display accurate data in both the bright and dark modes.
* The phone test was executed on an iPhone. All functionality worked correctly. The website layout and both light and dark themes work as they should.

* __Cross browser testing__: we have tested our project in the browsers Google Chrome, Safari, Mozilla Firefox and Microsoft Edge. The project behaves as expected in all four.

## Charts 

For the charts in this project, we used the rechart library from recharts.org. This library is among the most used and popular React chart libraries. We chose to use this charts library since it is built on React components and was created specifically for building various types of charts in React applications. The ResponsiveContainer component was used to modify and adjust the chart size based on the application window size. To build the pie charts, we used the PieChart component with the Cell component to give each slice of the pie a unique color. The bar chart was created using the BarChart component, and the bars were displayed using the Bar component. 


