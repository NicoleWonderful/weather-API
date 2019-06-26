const appKey ='69e03bf95cc69fc21fb613d6abb56487';

const searchButton = document.querySelector("#search-btn");
const searchInput =  document.querySelector("#search-txt");
const cityName = document.querySelector("#city-name");
const icon = document.querySelector("#icon");
const temperature = document.querySelector("#temp");
const humidity = document.querySelector("#humidity-div");

searchButton.addEventListener("click",findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event){
    if(event.key === "Enter"){
        findWeatherDetails();
    }
}

function findWeatherDetails(){
    if(searchInput.value === ""){

        }else{
            const searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" +  searchInput.value + "&appId=" + appKey; 
            httpRequestAsync( searchLink , theResponse );
        }
    }


function theResponse(response) {
    const jsonObject = JSON.parse(response);
    cityName.innerHTML = jsonObject.name ;
    icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    temperature.innerHTML = "溫度："+ parseInt(jsonObject.main.temp - 273) + "°";
    humidity.innerHTML = "降雨機率："+jsonObject.main.humidity + "%";
}

function httpRequestAsync(url,callback){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            callback(xhr.responseText);
        }
    }
    xhr.open("GET",url,true);
    xhr.send(null);
}