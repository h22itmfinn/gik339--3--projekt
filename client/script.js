const url = "http://localhost:3000/cars";

window.addEventListener("load", fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((cars) => {
      if (cars.length > 0) {
        let html = `<ul class="w-3/4 my-3 mx-auto flex flex-wrap gap-2 justify-center">`;
        cars.forEach((car) => {
          html += `
        <li
          class="bg-${car.color}-200 basis-1/4 text-${car.color}-900 p-2 rounded-md border-2 border-${car.color}-400 flex flex-col justify-between">
          <h3>${car.id}. Regnr: ${car.regnr}. Märke: ${car.brand}. Modell: ${car.model}.</h3>
          <p>Årsmodel: ${car.yearmodel}. Pris: ${car.price}.</p>
          <div>
            <button
              class="rounded-md bg-white/50 p-1 text-sm"
              <button
              class="border border-${car.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="setCurrentUser('${car.id}')">
              Ändra
            </button>
            <button class="border border-${car.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="deleteUser('${car.id}')">
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
      carForm.regNumber.value = car.regnr;
      carForm.carBrand.value = car.brand;
      carForm.carModel.value = car.model;
      carForm.price.value = car.price;
      carForm.yearModel.value = car.yearmodel;
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
    regNumber: '',
    carBrand: '',
    carModel: '',
    price: '',
    yearModel: '',
    color: '',
  };
  serverUserObject.regNumber = carForm.regNumber.value;
  serverUserObject.carBrand = carForm.carBrand.value;
  serverUserObject.carModel = carForm.carModel.value;
  serverUserObject.price = carForm.price.value;
  serverUserObject.yearModel = carForm.yearModel.value;
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
  });
}
