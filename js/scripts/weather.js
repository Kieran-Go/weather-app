const newWeather = () => {
    // Initialize the button event listener that fetches, processes and displays the weather data
    const init = () =>{
        const searchBtn = document.querySelector(".city-form button");
        searchBtn.addEventListener("click", () => {
            const searchTerm = document.querySelector(".city-form input").value;
            getWeather(searchTerm)
                .then((weather) => {
                    return processWeather(weather);
                })
                .then((data) => {
                    showWeatherData(data);
                })
                .catch((err) =>{
                    console.error("An error occured: " + err);
                }
            );
        });
    }

    // Use an API to fetch the weather data of the user-inputted city
    const getWeather = async (city) => {
        const key = "VBV2QW7BLETV2FBHWVQB4NQUS";
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`, {
            mode: "cors"
        });
        const weather = await response.json();
        console.log(weather);
        return weather;
    }

    // Return an object with only the necessary weather data
    const processWeather = async (weather) => {
        return {
            resolvedAddress: weather.resolvedAddress,
            description: weather.description,
            conditions: weather.currentConditions.conditions,
            datetime: weather.currentConditions.datetime,
            icon: weather.currentConditions.icon,
            temp: weather.currentConditions.temp,
        };
    }

    const showWeatherData = (data) => {
        console.log(data);
    }

    return { init };
}