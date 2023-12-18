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
          <h3>Märke: ${car.brand} Modell:${car.model}</h3>
          <p>Årsmodel: ${car.yearmodel} Pris: ${car.price}</p>
          <div>
            <button
              class="rounded-md bg-white/50 p-1 text-sm"
              <button
              class="border border-${car.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="setCurrentUser('${car.regnr}')">
              Ändra
            </button>
            <button class="border border-${car.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="deleteUser('${car.regnr}')">
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

fetchData();

function setCurrentUser(id) {
  console.log("current", id);

  fetch(`${url}/${id}`)
    .then((result) => result.json())
    .then((car) => {
      console.log(car);
      carForm.firstName.value = user.firstName;
      carForm.lastName.value = user.lastName;
      carForm.username.value = user.username;
      carForm.color.value = user.color;

      localStorage.setItem("currentReg", car.regnr);
    });
}

function deleteUser(regnr) {
  console.log("delete", regnr);
  fetch(`${url}/'${regnr}'`, { method: "DELETE" }).then((result) => fetchData());
}

carForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const serverUserObject = {
    regNumber: "",
    carBrand: "",
    carModel: "",
    price: "",
    yearModel: "",
    color: "",
  };
  serverUserObject.regNumber = carForm.regNumber.value;
  serverUserObject.carBrand = carForm.carBrand.value;
  serverUserObject.carModel = carForm.carModel.value;
  serverUserObject.price = carForm.price.value;
  serverUserObject.yearModel = carForm.yearModel.value;
  serverUserObject.color = carForm.color.value;

  const reg = localStorage.getItem("currentReg");
  if (reg) serverUserObject.reg = reg;

  const request = new Request(url, {
    method: serverUserObject.reg ? "PUT" : "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(serverUserObject),
  });

  fetch(request).then((response) => {
    fetchData();
    localStorage.removeItem("currentReg");
    userForm.reset();
  });
}
