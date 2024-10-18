# Weather website

## contents
[Description](#description)
[usage](#usage)
[features](#features)
[development](#development)
[challenges](#challenges)

## Description
This website is a weather website that uses the open weather API to get weather data. The server for this website is able to handle requests to get data for a specific city. It is also able to get forecast data for the next five days. Additionally the site stores the users search history on the page so it is easily available to search again.

## usage
One can enter a city in the search bar and upon pressing search the currentweather for that city will be displayed as well as the 5 day forecast. Once the user has made a search, that city is saved and rendered on the page when the page reloads. 

## features 
This app is deployed on a server and stores data. It is also equipped with the open weather API in order to retrieve weather data. The link to the server can be found here:

## development
I developed the server side of the application using multiple fetch requsts to the API as well and handling and destructuring the data that came back. I had to make sure the data that is sent back to the client side matches what that side of the application needs in order to render the items. This involved using alot of console logging to print and make sense of the data that I was getting back from the API.

## Challenges
I had a lot of challenges making the application work for both ends. The most challenging part for me was figuring out how to make fetch requests to the API with the exact endpoint to get the data that I needed. Another huge challenge was figuring out what to do with that data so that the client side gets what it needs. I would say the logic for weather services was the hardest part for me. It was very tricky to think through, and the typescript syntax can be difficult to work with at times. Overall this project was a great learning experience that really tested my ability to perservere and think throug things.