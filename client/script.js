const url = "http://localhost:3000/cars";



window.addEventListener("load", fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((cars) => {
      if (cars.length > 0) {
        let html = `<ul class="list-group row row-cols-2">`;
        cars.forEach((car) => {
          html += `
        <li
          class="list-group-item col-md-6 text-bg-${car.color} mb-4 rounded shadow p-3">
          <h3>${car.id}. Regnr: ${car.regnr}. Märke: ${car.brand}. Modell: ${car.model}.</h3>
          <p>Årsmodel: ${car.yearmodel}. Pris: ${car.price}.</p>
          <div>
            <button
              class="btn btn-secondary"
              <button class="" onclick="setCurrentUser('${car.id}')">
              Ändra
            </button>
            <button class="btn btn-secondary " onclick="deleteUser('${car.id}')">
              Ta bort
            </button>
          </div>
        </li>`;
        });
        html += `</ul>`;

        

        const listContainer = document.getElementById("listContainer");
        listContainer.innerHTML = "";
        listContainer.insertAdjacentHTML("beforeend", html);
      }
    });
}



function setCurrentUser(id) {
  console.log("current", id);

  fetch(`${url}/${id}`)
    .then((result) => result.json())
    .then((car) => {
      console.log(car);
      carForm.regnumber.value = car.regnr;
      carForm.carbrand.value = car.brand;
      carForm.carmodel.value = car.model;
      carForm.price.value = car.price;
      carForm.yearmodel.value = car.yearmodel;
      carForm.color.value = car.color;

      localStorage.setItem("currentId", car.id);
    });
}

function deleteUser(id) {
  console.log('delete', id);
  fetch(`${url}/${id}`, { method: 'DELETE' }).then((result) => fetchData());
  
  
}

carForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const serverUserObject = {
    regnr: '', //samma namn som i databasen
    brand: '',
    model: '',
    price: '',
    yearmodel: '',
    color: '',
  }; // lägger från fälten till databasen
  serverUserObject.regnr = carForm.regnumber.value;
  serverUserObject.brand = carForm.carbrand.value;
  serverUserObject.model = carForm.carmodel.value;
  serverUserObject.price = carForm.price.value;
  serverUserObject.yearmodel = carForm.yearmodel.value;
  serverUserObject.color = carForm.color.value;
  


  const id = localStorage.getItem("currentId");
  if (id) serverUserObject.id = id;

  const request = new Request(url, {
    method: serverUserObject.id ? "PUT" : "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(serverUserObject),
    
  });

  fetch(request).then((response) => {
    fetchData();
    localStorage.removeItem("currentId");
    carForm.reset();
    //document.getElementById("staticBackdrop").modal("show");  
    //$("#staticBackdrop").modal("show");
    //var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    //myModal.show();
  });
  
}

