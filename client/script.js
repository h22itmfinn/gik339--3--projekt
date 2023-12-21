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
          <h4>${car.id}. Märke: ${car.brand}. Modell: ${car.model}.</h4>
          <p>Årsmodel: ${car.yearmodel}. Pris: ${car.price}. Regnr: ${car.regnr}. </p>
          <div>
            <button
              class="btn btn-${car.color}" onclick="setCurrentUser('${car.id}')">
              Ändra
            </button>
            <button id="dltBtn" class="btn btn-${car.color}" type="button" onclick="deleteUser(event,${car.id})">
              Ta bort

            </button>
          </div>
        </div>`;
        });
        html += `</div>`;
        

        // document.getElementById("dltBtn").addEventListener("click", deleteUser);
        // let dlt = document.getElementById("dltBtn");
        // dlt.addEventListener("click", deleteUser);

        const listContainer = document.getElementById("listContainer");
        listContainer.innerHTML = "";
        listContainer.insertAdjacentHTML("beforeend", html);
        // document.getElementById("dltBtn").addEventListener("click", deleteUser);
        
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

// document.getElementById("dltBtn").addEventListener("click", deleteUser);

function deleteUser(event, id) {
  // event.preventDefault();
  console.log('delete',id);
  // e.preventedDefault();
  // console.log('delete', id);
  // fetch(`${url}/${id}`, { method: 'DELETE' })
  // .then((response) => console.log(response));
  //("Bilen borttagen"))
  // .then((result) => fetchData());
  fetch(`${url}/${id}`,{method:"DELETE"})
  .then((result) => {
    myFunction("Bilen borttagen.");
    fetchData();
  });

  console.log("BILEN BORTTAGEN!!!!!!!!")
  // myFunction("Bilen borttagen.");
}

function deleteUser1(id){
  // const fetchy = await fetch(`${url}/${id}`, { method: 'DELETE' });
  // console.log(fetchy);
  // myFunction(fetchy);

  
  fetch(`${url}/${id}`, { method: 'DELETE'})
    .then(res => res.status(200)) // or res.json()
    .then(res => console.log(res))
    .then(()=>myFunction("Bilen borttagen"))
    .then(()=>{
      var millisecondsToWait = 5000;
      setTimeout(function() {
    // Whatever you want to do after the wait
    }, millisecondsToWait);
    })
    .then((result) => fetchData());
    
    // return res;     
    //myFunction("Bilen borttagen");
  
}
// console.log(test)

// function deleteUser(id) {
//   // Skapa en Promise
//   const promise = new Promise((resolve) => {
//     // Din kod för att ta bort användaren
//     fetch(`${url}/${id}`, { method: 'DELETE' })
//       .then(() => resolve());
//   });

//   // Lägg till sedan din önskade åtgärd efter borttagningen
//   promise
//     .then(() => myFunction("Bilen borttagen"))
//     .then(() => fetchData());
// }


const deleteMethod = {
  method: 'DELETE', // Method itself
  headers: {
   'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
  },
  // No need to have body, because we don't send nothing to the server.
 }
 // Make the HTTP Delete call using fetch api
 function deleteUser2(id){
 fetch(`${url}/${id}`, deleteMethod) 
 .then((response) => console.log(response))
 .then(data => console.log(data))
 .then(()=>myFunction("bajs")) // Manipulate the data retrieved back, if we want to do something with it
 .catch(err => console.log(err)); // Do something with the error
 };

 function deleteUser3(id){
  fetch(url + "/" + id, {
    method: 'DELETE'
  }).then(() => {
     console.log('removed');
  }).catch(err => {
    console.error(err)
  });
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
  console.log("Testtest1")

  
  // myFunction(`Bilen ${carForm.regnumber.value} har ändrats`);


  const id = localStorage.getItem("currentId");
  if (id) serverUserObject.id = id;

  const method = serverUserObject.id ? "PUT" : "POST";

  const request = new Request(url, {
    // method: serverUserObject.id ? "PUT" : "POST",
    method: method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(serverUserObject),
    
  });
  console.log("Testtest2")

  const message =
    method === "PUT"
      ? `Bilen ${carForm.regnumber.value} har ändrats`
      : `Bilen ${carForm.regnumber.value} har lagts till`;

  myFunction(message);

  fetch(request).then((response) => {
    fetchData();
    localStorage.removeItem("currentId");
    carForm.reset();

    console.log("Testtest3")
    // showAlert("Ditt meddelande har skickats!"); // Visa alert
    // myFunction("Bilen uppdaterad");

    // const method = serverUserObject.id ? "PUT" : "POST";
    // myFunction(`Bilen ${carForm.regnumber.value} har ändrats`, method);

    // myFunction(`Bilen ${carForm.regnumber.value} har ändrats`);
    

  });

  console.log("Testtest4")
  
}






// function myFunction(message) {
//     // event.defaultPrevented();
//     alert(message)
//     // alert(`${message} (${method})`);
//     // console.log(response)
   
// }


function myFunction(message) {
  Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 5000 // Tid i millisekunder (justera efter behov)
  });
}