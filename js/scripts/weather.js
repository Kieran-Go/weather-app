const newWeather = () => {
    let data = {};

    const degrees = ["farhenheit", "celsius"];
    let activeDegrees = degrees[0];

    // Initialize the button event listener that fetches, processes and displays the weather data
    const init = () =>{
        const searchBar = document.querySelector(".search-bar");
        searchBar.addEventListener("keydown", (event) => {
            if(event.key === "Enter"){
                const searchTerm = searchBar.value;
                getWeather(searchTerm)
                    .then((weather) => {
                        processWeather(weather);
                    })
                    .then(() => {
                        showWeatherData();
                    })
                    .catch((err) =>{
                        console.error("An error occured: " + err);
                    }
                );
                searchBar.value = "";
                searchBar.blur();
            }
        });
    }

    // Use an API to fetch the weather data of the user-inputted city
    const getWeather = async (city) => {
        const key = "VBV2QW7BLETV2FBHWVQB4NQUS";
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`, {
            mode: "cors"
        });
        const weather = await response.json();
        return weather;
    }

    // Set the data object with only the necessary weather data
    const processWeather = async (weather) => {
        data = {
            resolvedAddress: weather.resolvedAddress,
            conditions: weather.currentConditions.conditions,
            datetime: weather.currentConditions.datetime,
            precip: weather.currentConditions.precip,
            humidity: weather.currentConditions.humidity,
            icon: weather.currentConditions.icon,
            far: weather.currentConditions.temp.toFixed(1),
            cel : ((weather.currentConditions.temp - 32) * (5/9)).toFixed(1),
            days: weather.days,
        };
    }

    const showWeatherData = () => {
        const container = document.querySelector(".weather-container");
        container.innerHTML = "";

        // Main
        container.appendChild(showMainData());
        setMainTemp();

        // Details
        container.appendChild(showDetails());

        // Week
        container.appendChild(showWeek());
    }

    const showMainData = () => {
        const mainWeather = newElement("div", "", null, ["weather-main"]);
        // Address
        mainWeather.appendChild(newElement("h2", data.resolvedAddress));
        // Icon
        mainWeather.appendChild(newImg(`media/images/weather-icons/${data.icon}.svg`, null, null, ["main-img"]));
        // Temp
        mainWeather.appendChild(newElement("div", "", null, ["main-temp"]));

        return mainWeather;
    }

    const showDetails = () => {
        const detailContainer = newElement("div", "", null, ["weather-details"]);
        detailContainer.appendChild(newElement("h2", "Weather Details"));
        const details = [
            { title: "Condition:", value: data.conditions },
            { title: "Time:", value: data.datetime },
            { title: "Humidity:", value: data.humidity },
            { title: "Precipitation:", value: data.precip > 0 ? data.precip : "None" }
        ];

        details.forEach(detail => {
            const div = newElement("div", "", null, ["detail"]);
            div.appendChild(newElement("p", detail.title, null, ["detail-title"]));
            div.appendChild(newElement("p", detail.value));

            detailContainer.appendChild(div);
        });

        return detailContainer;
    }

    const initTempToggle = () => {
        const inactive = document.querySelector(".inactive-degrees");
        inactive.addEventListener("click", () => toggleDegrees());
    }

    const toggleDegrees = () => {
        if(activeDegrees === degrees[0]) activeDegrees = degrees[1];
        else activeDegrees = degrees[0];

        setMainTemp();
        setWeekTemp();
    }

    const setMainTemp =  () => {
        const mainTemp = document.querySelector(".main-temp");
        mainTemp.innerHTML = "";

        const deg = activeDegrees === degrees[0] ? data.far : data.cel;
        const farClass = activeDegrees === degrees[0] ? "active-degrees" : "inactive-degrees";
        const celClass = activeDegrees === degrees[1] ? "active-degrees" : "inactive-degrees";

        mainTemp.appendChild(newElement("h1", deg));
        mainTemp.appendChild(newElement("p", "°F", null, ["farhenheit", farClass]));
        mainTemp.appendChild(newElement("p", "/"));
        mainTemp.appendChild(newElement("p", "°C", null, ["celsius", celClass]));

        const weatherMain = document.querySelector(".weather-main");
        weatherMain.appendChild(mainTemp);

        initTempToggle();
    }

    const setWeekTemp = () => {
        const dayTemps = document.querySelectorAll(".day-temp");
        const week = getWeekData();

        for(let i = 0; i < dayTemps.length; i++){
            const temp = activeDegrees === degrees[0] ? `${week[i].farMin}° / ${week[i].farMax}°` : `${week[i].celMin}° / ${week[i].celMax}°`
            dayTemps[i].textContent = temp;
        }
    }

    const showWeek = () => {
        const oldWeekElement = document.querySelector(".week");
        if(oldWeekElement){
            oldWeekElement.remove();
        }
        const weekElement = newElement("div", "", null, ["week"]);
        
        weekElement.appendChild(newElement("h2", "Weekly Forecast"));
        const daysContainer = newElement("div", "", null, ["days-container"])
        weekElement.appendChild(daysContainer);

        const week = getWeekData();
        week.forEach(day => {
            const dayDiv = newElement("div", "", null, ["day"]);

            dayDiv.appendChild(newElement("p", getDayName(day.date)));
            dayDiv.appendChild(newImg(`media/images/weather-icons/${day.icon}.svg`, null, null, ["day-img"]));

            const temp = activeDegrees === degrees[0] ? `${day.farMin}° / ${day.farMax}°` : `${day.celMin}° / ${day.celMax}°`
            dayDiv.appendChild(newElement("p", temp, null, ["day-temp"]));

            daysContainer.appendChild(dayDiv);
        })

        return weekElement;
    }

    const getWeekData = () => {
        const week = [];
        data.days.forEach(day =>{
            week.push({
                date: day.datetime,
                icon: day.icon,
                farMin: day.tempmin.toFixed(1),
                farMax: day.tempmax.toFixed(1),
                celMin: ((day.tempmin -32) * (5/9)).toFixed(1),
                celMax: ((day.tempmax -32) * (5/9)).toFixed(1),
            })
        });
        week.splice(0, 1);
        week.splice(7);
        return week;
    }

    const getDayName = (date) => {
        const formatter = new Date(date);
        return formatter.toLocaleDateString("en-US", {weekday: "long"});
    }

    return { init };
}