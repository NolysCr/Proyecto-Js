import { data as localdata } from "./data.js";
const ApiURL = "https://mindhub-xj03.onrender.com/api/amazing"

async function obtain_EventsData() {

    try {

        const response = await fetch(ApiURL)
        const exterdata = await response.json()
        return exterdata

    } catch (error) {

        console.log("API couldn't be reached, local data will be used instead");
        return localdata

    };

};

function createID(text) {
    return text.toLowerCase().replace(/\s+/g, "-");
}

async function createCategories() {
    try {

        const data = await obtain_EventsData()
        console.log(data);

        let EventsGroup = []
        let CategoriesGroup = []
        let CategoriesHTMLSection = ""
        let PageTitle = document.title

        data.events.forEach(event => {

            if (PageTitle == "Home" || ((PageTitle == "Past Events") ? event.date < data.currentDate : event.date >= data.currentDate)) {

            if (!CategoriesGroup.includes(event.category)) {

                CategoriesGroup.push(event.category);

                CategoriesHTMLSection += `
                <input type="checkbox" class="btn-check" id="btncheck-${event._id}" value="${event.category}">
                <label class="btn categories-category" for="btncheck-${event._id}">${event.category}</label>
            `;
            };
            EventsGroup.push(event)
        };
    });

        document.getElementById("categories").innerHTML = CategoriesHTMLSection

        const CheckboxGroup = [...document.querySelectorAll("input[class = btn-check")]
        const SearchInput = document.getElementById("SearchInput")

        CheckboxGroup.forEach(checkbox => {
            checkbox.addEventListener("click", updateEventsShown)
        });

        SearchInput.addEventListener("keyup", updateEventsShown)
        return EventsGroup
    } catch (error) {
        console.log(error)
    };
};


function updateEventsShown() {

    let EventsHTMLSection = "";
    let CheckboxGroupChecked = [...document.querySelectorAll("input[class = btn-check]:checked")].map(category => category.value);
    let SearchInputValue = document.getElementById("SearchInput").value.toLowerCase();

    EventsAvailable.forEach(event => {

        if ((CheckboxGroupChecked.length == 0 || CheckboxGroupChecked.includes(event.category)) && (SearchInputValue.length == 0 || (event.name.toLowerCase()).includes(SearchInputValue) || (event.description.toLowerCase()).includes(SearchInputValue))) {

            EventsHTMLSection += `
                <div class="card text-center" style="width: 18rem;">
                    <img src="${event.image}" class="card-img-top h-50 object-fit-cover p-3" alt="${event.name} Event Image">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text">${event.description}</p>
                        </div>
                    <div class="card-footer">
                        <div class="d-flex justify-content-between align-items-center">
                            <span>Price $${event.price}</span>
                            <a href="./details.html?id=${event._id}" class="btn btn-outline-light">Details</a>
                        </div>
                    </div>
                </div>
            `;
        };
    });
    if (EventsHTMLSection == "") {
        alert("Adjust the filters to find an event")
    };

    document.getElementById("events").innerHTML = EventsHTMLSection
};

const EventsAvailable = await createCategories()

updateEventsShown()