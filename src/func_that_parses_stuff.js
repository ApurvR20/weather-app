import getWeatherData from "./apiMethods";

let forecastData;

const setCityVal = async(city) => {
    
    forecastData = await getWeatherData(city);
    console.log(forecastData);
}

const getLocation = () => ({
        location : `${forecastData.location.name}, ${forecastData.location.country}`, 
        timezone : forecastData.location.tz_id
    })

const getCurrentData = () => {

    const current = {...forecastData.current};

    const {
        condition : {text : currentCondition, icon : currentConditionIcon},
        feelslike_c : feelC, 
        feelslike_f : feelF, 
        humidity : humid, 
        precip_mm : preci, 
        temp_c : tempC, 
        temp_f : tempF } = current;

    return {tempC, feelC, tempF, feelF, humid, preci,currentCondition,currentConditionIcon};
}

const getDayForecast = () => {
    
    const { 
    astro : {sunrise, sunset},
    date,
    day : {maxtemp_c : maxC, maxtemp_f : maxF, mintemp_c : minC, mintemp_f : minF, condition : {text : prediction, icon : predictionIcon}},
    }  = forecastData.forecast.forecastday[0];

    return {sunrise, sunset, date, maxC, maxF, minC, minF, prediction, predictionIcon}
}


export {setCityVal, getLocation, getCurrentData, getDayForecast};