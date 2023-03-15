function createID(text) {
    return text.toLowerCase().replace(/\s+/g, "-");
}

function createCategories(eventsData) {

    let categories = document.getElementById("categories");
    let categoriesList = new Array();
    eventsData.events.forEach(event => {
        if (!categoriesList.includes(event.category)) {
            categoriesList.push(event.category);
        };
    });

    categoriesList.forEach(category => {
        let checkbox = `<div>
            <input type="checkbox" name="${createID(category)}" id="category-${createID(category)}">
            <label for="category-${createID(category)}">${category}</label>
        </div>`

        categories.innerHTML += checkbox;
    });

}