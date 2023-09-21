const apiKey = '0c377b3a0b3d4820b8661639231909';
let json = '';
async function getWeatherData(city){
    
    try{
        const content = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`);
        json = await content.json();
    } catch(e) {
        console.log('err : ',e);
    }
    return json;
}

export default getWeatherData;