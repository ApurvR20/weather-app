const apiKey = '0c377b3a0b3d4820b8661639231909';
async function getWeatherData(city){
    
    try{
        const content = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`);
        const json = await content.json();
        return json;
    }
    catch(e){
        console.log('Error : ', e);
    }
    return 0;
}

export default getWeatherData;