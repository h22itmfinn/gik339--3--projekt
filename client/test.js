// <!-- //Lägg till dessa länkar i <head> - FÖR SweetAlert - snyggt men funkar inte som det ska
//     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.min.css">
//     <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.all.min.js"></script>
//  -->


// let modalWrap = null;
// let modal = null;

// function showModal() {
    
    
    
//     //var modalWrap = null;
//     // if(modalWrap!=null){
//     //   modalWrap.removeItem();
//     // }
//     if (modalWrap == null){

    
//     modalWrap = document.createElement('div');
//     modalWrap.innerHTML = `
//         <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//           <div class="modal-dialog">
//               <div class="modal-content">
//               <div class="modal-header">
//                 <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
//                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div class="modal-body">
//             ...
//             </div>
//               <div class="modal-footer">
//                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                 <button type="submit" name="submitUserForm" data-bs-dismiss="modal" class="btn btn-primary">Understood</button>
//               </div>
//             </div>
//           </div>
//         </div>`;
//     // const placeModal = document.getElementById("placeModal")
//     // placeModal.innerHTML = "";
//     // placeModal.insertAdjacentHTML("beforeend", modalWrap);
//     document.body.append(modalWrap);
//     }

//     var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
//     setTimeout(() => {
//       modal.show();
//     }, 100);
// }

// const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
// const appendAlert = (message, type) => {
//   const wrapper = document.createElement('div')
//   wrapper.innerHTML = [
//     `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//     `   <div>${message}</div>`,
//     '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//     '</div>'
//   ].join('')

//   alertPlaceholder.append(wrapper)
// }

// const alertTrigger = document.getElementById('liveAlertBtn')
// if (alertTrigger) {
//   alertTrigger.addEventListener('click', () => {
//     appendAlert('Nice, you triggered this alert message!', 'success')
//   })
// }



// function showAlert(message) {
//   // Skapa ett alert-element
//   const alert = document.createElement('div');
//   alert.classList.add('alert', 'alert-success', 'mt-3','alert-dismissible', 'fade', 'show');
//   alert.innerHTML = `
//     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//     <strong>${message}</strong>
//   `;

//   // Lägg till alert i placeholder-elementet
//   const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
//   alertPlaceholder.innerHTML = ''; // Rensa tidigare alerts
//   alertPlaceholder.appendChild(alert);

//   // Stäng alert efter 3 sekunder (3000 millisekunder)
//   setTimeout(() => {
//     alert.remove();
//   }, 3000);
// }

// document.getElementById("carForm").addEventListener("submit", myFunction);

// function myFunction(message) {
//     // event.defaultPrevented();
//     alert(message)
//     // alert(`${message} (${method})`);
//     // console.log(response)
   
// }


// function myFunction(message) {
//   Swal.fire({
//       icon: 'success',
//       title: message,
//       showConfirmButton: false,
//       timer: 5000 // Tid i millisekunder (justera efter behov)
//   });
// }