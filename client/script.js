const url = "http://localhost:3000/cars";

window.addEventListener("load", fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((cars) => {
      if (cars.length > 0) {
        let html = `<div class="row">`;
        cars.forEach((car) => {
          html += `
        <div
          class="col-md-3 text-bg-${car.color} mb-4 rounded shadow p-3 ms-5 mt-4">
          <h4>Märke: ${car.brand}.<br> Modell: ${car.model}.</h4>
          <p>Årsmodel: ${car.yearmodel}. Pris: ${car.price}. Regnr: ${car.regnr}. </p>
          <div>
            <button
              class="btn btn-${car.color}" onclick="setCurrentCar('${car.id}')">
              Ändra
            </button>
            <button class="btn btn-${car.color}" type="button" onclick="deleteCar(${car.id})">
              Ta bort

            </button>
          </div>
        </div>`;
        });
        html += `</div>`;
        
        const listContainer = document.getElementById("listContainer");
        listContainer.innerHTML = "";
        listContainer.insertAdjacentHTML("beforeend", html);
      }
    });
}

//Som sätter nuvarande bil, när vi klickar på "Ändra" knappen så blir alla fält ifyllda.
function setCurrentCar(id) {
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

//Funktion för att ta bort en bil, går efter ID.
function deleteCar(id) {
  console.log('delete',id);
  fetch(`${url}/${id}`,{method:'DELETE'})
  .then((result) => {
    messageFunction("Bilen är borttagen!",'warning');
    fetchData();
  });
}

//Lägger en eventlyssnare på "Skicka" knappen i vårt formulär och kallar på handleSubmit
carForm.addEventListener("submit", handleSubmit);

//Funktion som hanterar inskick av formuläter och skickar det till databasen
function handleSubmit(e) {
  e.preventDefault();
  const serverCarObject = {
    regnr: '', //samma namn som i databasen
    brand: '',
    model: '',
    price: '',
    yearmodel: '',
    color: '',
  }; // lägger från fälten till databasen
  serverCarObject.regnr = carForm.regnumber.value;
  serverCarObject.brand = carForm.carbrand.value;
  serverCarObject.model = carForm.carmodel.value;
  serverCarObject.price = carForm.price.value;
  serverCarObject.yearmodel = carForm.yearmodel.value;
  serverCarObject.color = carForm.color.value;

  const id = localStorage.getItem("currentId");
  if (id) serverCarObject.id = id;

  //Variabel för både post och put.
  const method = serverCarObject.id ? "PUT" : "POST";
  const request = new Request(url, {
    method: method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(serverCarObject),
  });

  //Meddelandet till SweetAlert.
  const message =
    method === "PUT"
      ? `Bilen ${carForm.regnumber.value} har ändrats`
      : `Bilen ${carForm.regnumber.value} har lagts till`;

  //Kallar på messageFunction som hanterar meddelandet vid förändring av resurs
  messageFunction(message,'success');

  fetch(request).then((response) => {
    fetchData();
    localStorage.removeItem("currentId");
    carForm.reset();
  });  
}

//Funktion SweetAlert för att visa upp när en resurs ändras på något sätt.
function messageFunction(message,type) {
  Swal.fire({
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 2000 // Tid i millisekunder (justera efter behov)
  });
}