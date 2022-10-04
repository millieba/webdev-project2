# Project 2

## Commands

Run server with `npm start`

## Contents and functionality 


## Technical requirements 

### Context API 

To use the context API we decided to implement dark mode to our website, and use createContext and the useContext-hook to apply the theme globally. The solution for using the context API for dark mode was inspired by a solution from a previous project that I (Mariell) worked on: https://gitlab.stud.idi.ntnu.no/tdt4140-2022/landsby-3/gruppe_38/matnettside/-/blob/main/feedme/src/contexts/theme.js. We found out a bit too late in the project that this might not have been the most optimal solution for our project. Because TypeScript is a lot stricter when it comes to types than JavaScript, we ended up having some type-issues. When trying to fix the type-errors, the context would not work and we could not get it to work. Our page works just fine for the user, but it does not render 100% correctly. In the future we will be more aware of types when writing code in TS.  
 
### HTML Web Storage 

Local storage was used to save the users choice in regards to applying dark mode, or not. When using local storage the storage is persistent, and the user's choice will not expire on tab-close. 
We used session storage to show the user a new random emoji every time they enter the website. Session web storage is not persistent and the session expires on tab-close, this is how the emoji gets renewed at each visit to the website. 


## Testing with Jest 

We did make a unit test for the component Headline.tsx which tests whether the id=”headline” is existent in the file. We tried to test several components, but we were unable to due to useContext which was used in almost all our components. The error-message we got when trying to run the snapshot-test for the App-component was: "Uncaught TypeError: Object is not iterable (cannot read property Symbol(Symbol.iterator))". We know now that it's because {theme} is not an iterable. We're trying to return an object when using "UseContext()" but we're trying to send in an Array.This was not noticed until we started testing, but we did not have time to fix it. We therefore decided to create a new component without using useContext in it to test it. This was done to simply try out some testing. 

## Responsive design and GUI-testing 

