const myModal = document.getElementById('modal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})

function passainfo(id){
  console.log(id)
  // document.getElementById('teste').innerHTML = id;
  
  var modal = document.getElementById(id+"modal")
  console.log(modal)
  document.getElementById('modal-body').innerHTML = ""
  document.getElementById('modal-body').appendChild(modal);
  // document.getElementById("formEdit").action = "/editarAluno/" + id;
}
