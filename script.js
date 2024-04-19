document.addEventListener('DOMContentLoaded', function() {
    // Inicia el carrusel automáticamente utilizando métodos de Bootstrap
    new bootstrap.Carousel(document.getElementById('carouselTragos'), {
        interval: 3000 // Intervalo de 3 segundos entre cada diapositiva
    }); 

    // Controla el cambio automático de las imágenes cada 3 segundos
    setInterval(function() {
        document.querySelector('#carouselTragos .carousel-control-next').click();
    }, 3000);
});

const cargarDatos = async () => {
    try {
        const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
        const res = await fetch(url);
        const datos = await res.json();
        return datos;

    } catch (err) {
        console.log(err);
    }
};

// Define displayMenu function para la promesa cargarDatos
function displayMenu(menuData) {
    const menuTable = document.getElementById('menu-table'); // Corregido el ID de la tabla
    const menuItems = menuData.drinks; // Suponiendo que "drinks" es la clave que contiene el array de bebidas
      
    let html = `
        <thead>
            <tr>
                <th>TRAGO</th>
                <th>INGREDIENTES</th>
                <th>INSTRUCCIONES</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
    `;
      
    menuItems.forEach(item => {
         // Filtrar ingredientes para eliminar los que son null
         const ingredients = Object.keys(item)
         .filter(key => key.startsWith('strIngredient') && item[key] !== null)
         .map(key => item[key]);
     
     // Unir los ingredientes en una cadena separada por espacios
     const ingredientList = ingredients.join(' <br>');
        html += `
            <tr>
                <td>${item.strDrink}</td>
                <td>${ingredientList}</td>
                <td>${item.strInstructions}</td>
                <td><img src="${item.strDrinkThumb}" alt="${item.strDrink}" style="max-width: 100px; max-height: 100px;"></td>
            </tr>
        `;
    });
      
    html += `</tbody>`;
      
    menuTable.innerHTML = html;
}

// Llama a la función cargarDatos
cargarDatos().then(datos => displayMenu(datos));
