/*
- styling
*/
import { setCityVal,getLocation, getCurrentData, getDayForecast, checkError } from "./func_that_parses_stuff";

const ui = document.createElement('div');
ui.id = 'ui';

// topbar
const topbar = document.createElement('div');
topbar.id = 'topbar';
topbar.textContent = 'Weather';
ui.appendChild(topbar);


// search input
const searchForm = document.createElement('form');
const inputDivs = document.createElement('div');
ui.appendChild(searchForm);

const citySearch = document.createElement('input');
citySearch.setAttribute('type','text');
citySearch.placeholder = 'Enter City here';
inputDivs.appendChild(citySearch);
const errorMessage = document.createElement('div');
errorMessage.textContent = 'City does not exist';
errorMessage.style.color = 'red';
errorMessage.style.visibility = 'collapse';
errorMessage.id = 'error';

// Panels that display info
// location panel
const locationPanel = document.createElement('div');
locationPanel.style.visibility = 'collapse';
locationPanel.classList.add('panel');
const locationHeader = document.createElement('div');
locationHeader.classList.add('header');
locationHeader.textContent = 'Location';
const city = document.createElement('div');
const timezoneDiv = document.createElement('div');
locationPanel.appendChild(locationHeader);
locationPanel.appendChild(city);
locationPanel.appendChild(timezoneDiv);
const locationDisplay = ({location, timezone}) => {
    locationPanel.style.visibility = 'visible';
    city.textContent = `City : ${location}`;
    timezoneDiv.textContent = `Timezone : ${timezone}`;
}

// current weather panel
const currentPanel = document.createElement('div');
currentPanel.style.visibility = 'collapse';
currentPanel.classList.add('panel');
const currentHeader = document.createElement('div');
currentHeader.classList.add('header');
currentHeader.textContent = 'Weather right now';
const temp = document.createElement('div');
const feelTemp = document.createElement('div');
const humidity = document.createElement('div');
const precipitation = document.createElement('div');
const currentWeather  = document.createElement('div');
currentWeather.classList.add('condition');
const currentWeatherImg = document.createElement('img');

// find easier way
[currentHeader,currentWeather,temp, feelTemp, humidity, precipitation].forEach((ele)=>{
    currentPanel.appendChild(ele);
})

const currentDisplay = ({tempC, feelC, tempF, feelF, humid,preci, currentCondition, currentConditionIcon}) => {

    currentPanel.style.visibility = 'visible';
    temp.textContent = `Temperature : ${tempC}\u00B0C/ ${tempF}\u00B0F`;
    feelTemp.textContent = `Feels like : ${feelC}\u00B0C/ ${feelF}\u00B0F`;
    humidity.textContent = `Humidity : ${humid}%`;
    precipitation.textContent = `Precipitation : ${preci} mm`;
    currentWeather.textContent = `Weather : ${currentCondition}`;
    currentWeatherImg.src = `https:${currentConditionIcon}`;
    currentWeather.appendChild(currentWeatherImg);

}

// today's weather panel and predictions
const todayPanel = document.createElement('div');
todayPanel.style.visibility = 'collapse';
todayPanel.classList.add('panel');
const todayHeader = document.createElement('div');
todayHeader.classList.add('header');
todayHeader.textContent = 'Prediction for today';
const dateDiv = document.createElement('div');
const sunriseDiv = document.createElement('div');
const sunsetDiv = document.createElement('div');
const maxTemp = document.createElement('div');
const minTemp = document.createElement('div');
const predictionDiv = document.createElement('div');
predictionDiv.classList.add('condition');
const predictionImage = document.createElement('img');

[todayHeader,dateDiv,sunriseDiv,sunsetDiv, maxTemp, minTemp, predictionDiv].forEach((ele) => {
    todayPanel.appendChild(ele);
})

const todayDisplay = ({sunrise, sunset, date, maxC, maxF, minC, minF, prediction, predictionIcon}) =>{

    todayPanel.style.visibility = 'visible';
    dateDiv.textContent = `Date : ${date}`;
    maxTemp.textContent = `Max. temp : ${maxC}\u00B0C/ ${maxF}\u00B0F`;
    minTemp.textContent = `Min. temp : ${minC}\u00B0C/ ${minF}\u00B0F`;
    sunriseDiv.textContent = `Sunrise : ${sunrise}`; 
    sunsetDiv.textContent = `Sunset : ${sunset}`;
    predictionDiv.textContent = `Prediction : ${prediction}`;
    predictionImage.src = `https:${predictionIcon}`;
    predictionDiv.appendChild(predictionImage);
}


// submit button
const submit = document.createElement('button');
submit.textContent = 'Submit';
submit.addEventListener('click', async (e)=>{
    e.preventDefault();
    
    if(citySearch.value === '')
    return;
    
    await setCityVal(citySearch.value);
    if(checkError())
    {
       locationPanel.style.visibility = 'collapse';
       currentPanel.style.visibility = 'collapse';
       todayPanel.style.visibility = 'collapse';
       errorMessage.style.visibility = 'visible';
       return;
    }
    errorMessage.style.visibility = 'collapse';
    locationDisplay({...getLocation()});
    currentDisplay({...getCurrentData()});
    todayDisplay({...getDayForecast()});
})
inputDivs.appendChild(submit);
searchForm.appendChild(inputDivs);
searchForm.appendChild(errorMessage);

[searchForm,locationPanel,currentPanel,todayPanel].forEach(ele => {
    ui.appendChild(ele);
})


export default ui;