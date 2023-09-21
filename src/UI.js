/*
- display all data correctly
- autocomplete options
- styling
*/
import { setCityVal,getLocation, getCurrentData, getDayForecast } from "./func_that_parses_stuff";

const ui = document.createElement('div');

// topbar
const topbar = document.createElement('div');
topbar.id = 'topbar';
topbar.textContent = 'Weather';
ui.appendChild(topbar);


// search input
const searchForm = document.createElement('form');
ui.appendChild(searchForm);

const citySearch = document.createElement('input');
citySearch.setAttribute('type','text');
citySearch.placeholder = 'Enter City here';
searchForm.appendChild(citySearch);
const errorMessage = document.createElement('div');
errorMessage.id = 'error';

// Panels that display info
// location panel
const locationPanel = document.createElement('div');
locationPanel.style.visibility = 'collapse';
locationPanel.classList.add('panel');
const city = document.createElement('div');
const timezoneDiv = document.createElement('div');
locationPanel.appendChild(city);
locationPanel.appendChild(timezoneDiv);
const locationDisplay = ({location, timezone}) => {
    locationPanel.style.visibility = 'visible';
    city.textContent = location;
    timezoneDiv.textContent = timezone;
}

// current weather panel
const currentPanel = document.createElement('div');
currentPanel.style.visibility = 'collapse';
currentPanel.classList.add('panel');
const temp = document.createElement('div');
const feelTemp = document.createElement('div');
const humidity = document.createElement('div');
const precipitation = document.createElement('div');
const currentWeather  = document.createElement('div');
const currentWeatherImg = document.createElement('img');
currentWeather.appendChild(currentWeatherImg);
// find easier way
[currentWeather,temp, feelTemp, humidity, precipitation].forEach((ele)=>{
    currentPanel.appendChild(ele);
})

const currentDisplay = ({tempC, feelC, tempF, feelF, humid,preci, currentCondition, currentConditionIcon}) => {

    currentPanel.style.visibility = 'visible';
    temp.textContent = `Temperature : ${tempC}\u00B0C/ ${tempF}\u00B0F`;
    feelTemp.textContent = `Feels like : ${feelC}\u00B0C/ ${feelF}\u00B0F`;
    humidity.textContent = `Humidity : ${humid}%`;
    precipitation.textContent = `Precipitation : ${preci} mm`;
    currentWeather.textContent = currentCondition;
    // try to set this as background
    currentWeatherImg.src = `https:${currentConditionIcon}`;
}

// today's weather panel and predictions
const todayPanel = document.createElement('div');
todayPanel.style.visibility = 'collapse';
todayPanel.classList.add('panel');
const dateDiv = document.createElement('div');
const sunData = document.createElement('div');
const temps = document.createElement('div');
const predictionDiv = document.createElement('div');
const predictionImage = document.createElement('img');
predictionDiv.appendChild(predictionImage);
[dateDiv,sunData, temps, predictionDiv].forEach((ele) => {
    todayPanel.appendChild(ele);
})

const todayDisplay = ({sunrise, sunset, date, maxC, maxF, minC, minF, prediction, predictionIcon}) =>{

    todayPanel.style.visibility = 'visible';
    dateDiv.textContent = `Date : ${date}`;
    temps.textContent = `Max. temp : ${maxC}\u00B0C/ ${maxF}\u00B0F \nMin. temp : ${minC}\u00B0C/ ${minF}\u00B0F`;
    sunData.textContent = `Sunrise : ${sunrise} \n Sunset : ${sunset}`;
    predictionDiv.textContent = `Prediction : ${prediction}`;
    predictionImage.src = `https:${predictionIcon}`;
}


// submit button
const submit = document.createElement('button');
submit.textContent = 'submit';
submit.addEventListener('click', async (e)=>{
    e.preventDefault();
    errorMessage.textContent = '';
    if(citySearch.value === '')
    return;
    
    // function runs here that calls api and displays results 
    await setCityVal(citySearch.value)
    .catch(
        (err) => { 
        errorMessage.textContent = 'Invalid city';
        console.log(err);        
        }
    );
    locationDisplay({...getLocation()});
    currentDisplay({...getCurrentData()});
    todayDisplay({...getDayForecast()});

})
searchForm.appendChild(submit);
searchForm.appendChild(errorMessage);

[searchForm,locationPanel,currentPanel,todayPanel].forEach(ele => {
    ui.appendChild(ele);
})


export default ui;