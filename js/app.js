const recipes = '[{"id":0,"name":"Gulasch","ingredients":[{"name":"Karoffeln","amount":200,"unit":"gram"},{"name":"Zwiebeln","amount":1,"unit":"pieces"},{"name":"Pilze","amount":100,"unit":"gram"}]},{"id":1,"name":"Linsengemüse","ingredients":[{"name":"Linsen","amount":500,"unit":"gram"}]},{"id":2,"name":"Gemüseauflauf","ingredients":[{"name":"Karoffeln","amount":200,"unit":"gram"},{"name":"Lauch","amount":100,"unit":"gram"}]}]';
const recipesJson = JSON.parse(recipes);

const ingredientsMap = new Map();

//document.body.onload = addElement;
document.body.onload = addMealCheckbox;

function addMealCheckbox() {

    const parent = document.getElementById('anchor');

    // <input type="checkbox" id="coding" name="interest" value="coding" checked>
    // <label for="coding">Coding</label>


    recipesJson.forEach(recipe => {

        var container = document.createElement('div');

        var classAttr = document.createAttribute("class");
        classAttr.value = "plainDiv";
        container.setAttributeNode(classAttr);



        const inputElement = document.createElement('input');
        inputElement.addEventListener('change', change);

        const labelElement = document.createElement('label');

        const labelContent = document.createTextNode(recipe.name);
        labelElement.appendChild(labelContent);
        parent.appendChild(labelElement);

        // var forAttr = document.createAttribute("for");
        // forAttr.value = recipe.id;
        // label.setAttributeNode(forAttr);

        // var classAttr = document.createAttribute("class");
        // classAttr.value = "meal2";
        // child.setAttributeNode(classAttr);

        var typeAttr = document.createAttribute("type");
        typeAttr.value = "checkbox";
        inputElement.setAttributeNode(typeAttr);

        var valueAttr = document.createAttribute("value");
        valueAttr.value = recipe.name;
        inputElement.setAttributeNode(valueAttr);

        const idAttr = document.createAttribute("id");
        idAttr.value = recipe.id;
        inputElement.setAttributeNode(idAttr);

        inputElement.classList.toggle("hiddenCheckBox2");

        const newContent = document.createTextNode(recipe.name);
        inputElement.appendChild(newContent)



        // build the DOM
        labelElement.appendChild(inputElement);
        container.appendChild(labelElement);
        parent.appendChild(container);

        parent.appendChild(document.createElement('br'));
    });




}

// const selectElement = document.getElementById('anchor');
// selectElement.addEventListener('change', (event) => {
//     const result = document.getElementById('ingredients');
//     result.textContent = `You like ${event.target.value}`;
// });

function change(e) {

    const isChecked = e.target.checked;

    const id = e.target.id;

    const nearestDiv = e.target.closest("div");
    nearestDiv.classList.toggle("redBorder");



    const ingredients = recipesJson[id].ingredients;
    ingredients.forEach(ingredient => {



        if (isChecked) {

            if (ingredientsMap.has(ingredient.name)) {
                const value = ingredientsMap.get(ingredient.name);
                ingredientsMap.set(ingredient.name, value + ingredient.amount);
            } else {
                ingredientsMap.set(ingredient.name, ingredient.amount);
            }

        } else {
            const value = ingredientsMap.get(ingredient.name);
            const result = value - ingredient.amount;
            if (result == 0) {
                ingredientsMap.delete(ingredient.name);
            } else {
                ingredientsMap.set(ingredient.name, result);
            }
        }


    });

    writeToHtml();
}

function writeToHtml() {
    const parent = document.getElementById('ingredients');
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    ingredientsMap.forEach(function(value, key) {

        var child = document.createElement('div');
        const newContent = document.createTextNode(key + " = " + value);
        child.appendChild(newContent);
        parent.appendChild(child);
    })
}