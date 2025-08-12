const body = document.querySelector('body');
const form = document.getElementsByTagName('form');
const inputLocation = document.querySelector('input[type="text"]');
const submitBtn = document.querySelector("button[type='submit']");
const weatherResults = document.querySelector(".weather-results");
const resolvedAddress = document.querySelector(".resolved-address");
const temp = document.querySelector(".temp");
const minmaxtemp = document.querySelector(".minmaxtemp");
const conditions = document.querySelector(".conditions");
const unit = document.querySelector(".unit")
const loading = document.querySelector(".loading");


async function getLocationTemp(city){
    loading.classList.remove("hide");

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=WSTTFR7JHD25RXA4U5PVLCKWJ`, {mode: 'cors'});

    const weatherData = await response.json();

    resolvedAddress.textContent = `${weatherData.resolvedAddress}`;
    conditions.textContent = `${weatherData.currentConditions.conditions}`;
    if (unit.value === "fahrenheit") {
        temp.textContent = `Temperature: ${weatherData.currentConditions.temp}° F`;
        minmaxtemp.textContent = `${weatherData.days[0].tempmin} | ${weatherData.days[0].tempmax}° F`;
    } else {
        temp.textContent = `Temperature: ${Math.round((weatherData.currentConditions.temp -32) / 1.8 * 10) / 10}° C`;
        minmaxtemp.textContent = `${Math.round((weatherData.days[0].tempmin -32) / 1.8 * 10) / 10}° | ${Math.round((weatherData.days[0].tempmax -32) / 1.8 * 10) / 10}° C`;
    }

    body.removeAttribute("class");

    if (weatherData.currentConditions.temp > 86) {
        body.classList.add("hot");
    } else if (weatherData.currentConditions.temp > 59) {
        body.classList.add("warm");
    } else if (weatherData.currentConditions.temp > 41) {
        body.classList.add("cold");
    } else {
        body.classList.add("ice-cold");
    }

    loading.classList.add("hide");
    weatherResults.classList.remove("hide");
}

submitBtn.addEventListener("click", () => {
    if (inputLocation.value) {
        getLocationTemp(inputLocation.value);
    }
})