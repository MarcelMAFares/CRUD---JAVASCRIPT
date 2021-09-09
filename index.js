var dados = []

Swal.fire({
    title: "Welcome!",
    text: "Input your name:",
    input: 'text',
    showCancelButton: true        
  }).then((result) => {
  if (result.value) {
    $("#visit").html("Hello, " + result.value + "!").append(` <i class="far fa-smile-wink"></i>`)
  }else
    $("#visit").html("Hello, visitor").append(` <i class="far fa-smile-wink"></i>`)
});

function editVisitName() {
  document.getElementById("visit")
  Swal.fire({
    title: "Change name",
    text: "Input a new name:",
    input: 'text',
    showCancelButton: true        
  }).then((result) => {
  if (result.value) {
    $("#visit").html("Hello, " + result.value + "!").append(` <i class="far fa-smile-wink"></i>`)
  }else
    $("#visit").html("Hello, visitor").append(` <i class="far fa-smile-wink"></i>`)
});

}


function ApagaRegistro(id) {
  Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
          for(let i = 0; i < dados.length; i ++){

        if(dados[i].ID == id){
          dados.splice(i, 1)
        }
      }

      PopulaTabela()
    
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}

function EditaRegistro(id) {
  $("#modalRegistro").modal("show")

  dados.forEach(function(item) {
    if(item.ID == id){
      $("#hdID").val(item.ID)
      $("#txtName").val(item.Name)
      $("#txtCPF").val(item.CPF)
      $("#txtBirth").val(item.Birth.substr(6, 4) + "-" + item.Birth.substr(3, 2) + "-" + item.Birth.substr(0, 2))
      $("#txtPhone").val(item.Phone)
    }
  })
}

function PopulaTabela() {
  if(Array.isArray(dados)){

    localStorage.setItem("__dados__", JSON.stringify(dados))

    $("#tbldados tbody").html("")

    dados.forEach(function (item){
      //Template string
      $("#tbldados tbody").append(`
      <tr>
        <td>${item.Name}</td>
        <td>${item.CPF}</td>
        <td>${item.Birth}</td>
        <td>${item.Phone}</td>
        <td><button type="button" class="btn btn-primary btn-sm" onclick="EditaRegistro(${item.ID})"><i class="fa fa-edit" /></button></td>
        <td><button type="button" class="btn btn-danger btn-sm" onclick="ApagaRegistro(${item.ID})"><i class="fa fa-trash" /></button></td>
      </tr>`)
    })
  }
}

$(function() {
  dados = JSON.parse(localStorage.getItem("__dados__"))

  if(dados){
    PopulaTabela()
  }

  $("#btnSalvar").click(function() {

  let _id = $("#hdID").val()
  let Name = $("#txtName").val()
  let CPF = $("#txtCPF").val()
  let Birth = new Date($("#txtBirth").val()).toLocaleDateString("pt-br", { timeZone: "UTC"})
  let Phone = $("#txtPhone").val()
  
  
  if(!_id || _id == "0"){
    if(!Name || !CPF || !Birth || !Phone){
      Swal.fire('All fields are required')
      if(ok){
        $("#modalRegistro").modal("show")
      }
    }else{
    let registro = {}
    registro.Name = Name
    registro.CPF = CPF
    registro.Birth = Birth
    registro.Phone = Phone

    registro.ID = dados.length + 1
    dados.push(registro)

    Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Registration successfully',
    showConfirmButton: false,
    timer: 1500
  })
    }

  }
  else{
    dados.forEach(function(item) {
      if(item.ID == _id){
        if(!Name || !CPF || !Birth || !Phone){
          Swal.fire('All fields are required')
          if(ok){
            $("#modalRegistro").modal("show")
          }
        }else{
          item.Name = Name
          item.CPF = CPF
          item.Birth = Birth
          item.Phone = Phone
        }

      }
    })
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Update successfully',
      showConfirmButton: false,
      timer: 1500
    })
  }


  $("#modalRegistro").modal("hide")

  $("#hdID").val("0")
  $("#txtName").val("")
  $("#txtCPF").val("")
  $("#txtBirth").val("")
  $("#txtPhone").val("")

  PopulaTabela()
  
})

})