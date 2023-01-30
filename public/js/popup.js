
function passainfo(id){
    console.log(id)
    // document.getElementById('teste').innerHTML = id;
    
    var modal = document.getElementById(id+"overlay")
    console.log(modal)
    document.getElementById('modal-body').innerHTML = ""
    document.getElementById('modal-body').appendChild(modal);
    document.getElementById("formEdit").action = "/gerenciar_turma/" + id;
}
function close(id){
    var modal = document.getElementById(id+"overlay")
    fechar = modal.close()
}