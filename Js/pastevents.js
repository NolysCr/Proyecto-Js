// function createID(text) {
//     return text.toLowerCase().replace(/\s+/g, "-");
// }

// function createCategories() {

//     let EventsGroup = []
//     let CategoriesGroup = []
//     let CategoriesHTMLSection = ""

//     data.events.forEach(event => {
//         if (event.date <= data.currentDate) {

//             if (!CategoriesGroup.includes(event.category)) {

//                 CategoriesGroup.push(event.category);

//                 CategoriesHTMLSection += `
//                     <input type="checkbox" class="btn-check" id="btncheck-${event.category}" value="${event.category}">
//                     <label class="btn categories-category" for="btncheck-${event.category}">${event.category}</label>
//                 `;
//             };

//             EventsGroup.push(event)
//         };
//     });

//     document.getElementById("categories").innerHTML = CategoriesHTMLSection
//     return EventsGroup
// };
// function updateEventsShown() {

//     let EventsHTMLSection = "";
//     let CheckboxGroupChecked = [...document.querySelectorAll("input[class = btn-check]:checked")].map(category => category.value);
//     let SearchInputValue = document.getElementById("SearchInput").value.toLowerCase();

//     EventsAvailable.forEach(event => {

//         if ((CheckboxGroupChecked.length == 0 || CheckboxGroupChecked.includes(event.category)) && (SearchInputValue.length == 0 || (event.name.toLowerCase()).includes(SearchInputValue) || (event.description.toLowerCase()).includes(SearchInputValue))) {

//             EventsHTMLSection += `
//                 <div class="card text-center" style="width: 18rem;">
//                     <img src="${event.image}" class="card-img-top h-50 object-fit-cover p-3" alt="${event.name} Event Image">
//                         <div class="card-body">
//                             <h5 class="card-title">${event.name}</h5>
//                             <p class="card-text">${event.description}</p>
//                         </div>
//                     <div class="card-footer">
//                         <div class="d-flex justify-content-between align-items-center">
//                             <span>Price $${event.price}</span>
//                             <a href="./details.html?id=${event._id}" class="btn btn-outline-light">Details</a>
//                         </div>
//                     </div>
//                 </div>
//             `;
//         };
//     });
//     if (EventsHTMLSection == "") {
//         alert("Adjust the filters to find an event")
//     }

//     document.getElementById("events").innerHTML = EventsHTMLSection
// };

// const EventsAvailable = createCategories()
// const CheckboxGroup = [...document.querySelectorAll("input[class = btn-check")]
// const SearchInput = document.getElementById("SearchInput")

// updateEventsShown()

// CheckboxGroup.forEach(checkbox => {
//     checkbox.addEventListener("click", updateEventsShown)
// })

// SearchInput.addEventListener("keyup", updateEventsShown)

document.addEventListener("DOMContentLoaded", () => {
    const events = getEvents();
    console.log(events);
    createCategories();
    updateEventsShown();
});

async function getEvents() {
    const response = await fetch(
        "https://mindhub-xj03.onrender.com/api/amazing/"
    );
    const events = await response.json().then((data) => data.events);
    return events;
}

function createID(text) {
    return text.toLowerCase().replace(/\s+/g, "-");
}

async function createCategories() {
    const events = await getEvents();
    let EventsGroup = [];
    let CategoriesGroup = [];
    let CategoriesHTMLSection = "";

    events.forEach((event) => {
        if (event.date <= data.currentDate) {
        if (!CategoriesGroup.includes(event.category)) {
            CategoriesGroup.push(event.category);

            CategoriesHTMLSection += `
                <input type="checkbox" class="btn-check" id="btncheck-${event.category}" value="${event.category}">
                <label class="btn categories-category" for="btncheck-${event.category}">${event.category}</label>
            `;
        }

        EventsGroup.push(event);
    }
    });

    document.getElementById("categories").innerHTML = CategoriesHTMLSection;
    return EventsGroup;
}

async function updateEventsShown() {
    let eventsAvailable = await createCategories();
    let checkboxGroupChecked = [
        ...document.querySelectorAll("input[class = btn-check]:checked"),
    ].map((category) => category.value);
    let searchInputValue = document
        .getElementById("SearchInput")
        .value.toLowerCase();

    let eventHTMLSection = eventsAvailable
        .filter((event) => {
            return (
                (checkboxGroupChecked.length == 0 ||
                    checkboxGroupChecked.includes(event.category)) &&
                (searchInputValue.length == 0 ||
                    event.name.toLowerCase().includes(searchInputValue) ||
                    event.description.toLowerCase().includes(searchInputValue))
            );
        })
        .map((event) => {
            return `
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
        })
        .join("");

    if (eventHTMLSection.length == 0) {
        eventHTMLSection = "No events found";
    }

    document.getElementById("events").innerHTML = eventHTMLSection;
}

const CheckboxGroup = [...document.querySelectorAll("input[class = btn-check")];
const SearchInput = document.getElementById("SearchInput");

CheckboxGroup.forEach((checkbox) => {
    checkbox.addEventListener("click", updateEventsShown);
});

SearchInput.addEventListener("keyup", updateEventsShown);