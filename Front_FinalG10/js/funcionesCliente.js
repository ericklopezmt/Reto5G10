function getCliente (){
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarCliente(respuesta);
        }
    });
}

function postCliente(){
    if($("#email").val().length == 0 || $("#password").val().length == 0 || $("#name").val().length == 0 || $("#age").val().length == 0){
        alert("todos los campos son obligatorios");
    }else{
        let cajas = {
            email:$("#email").val(),
            password:$("#password").val(),
            name:$("#name").val(),
            age:$("#age").val()
        };
        $.ajax({
            url: "http://localhost:8080/api/Client/save",
            type: "POST",
            datatype: "JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("se registro correctamente el cliente");
                window.location.reload();
            }
        });
    }
}

function putCliente(idDesdeButton){
    if($("#email").val().length == 0 || $("#password").val().length == 0 || $("#name").val().length == 0 || $("#age").val().length == 0){
        alert("todos los campos son obligatorios");
    }else{
        let cajas = {
            idClient:idDesdeButton,
            email:$("#email").val(),
            password:$("#password").val(),
            name:$("#name").val(),
            age:$("#age").val()
        };
        $.ajax({
            url: "http://localhost:8080/api/Client/update",
            type: "PUT",
            datatype: "JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("se actualizo correctamente la informacion del Cliente");
                window.location.reload();
            }
        });
    }
}

function deleteCliente(idDesdeButton){
    let myData={idDesdeButton};
    $.ajax({
        url: "http://localhost:8080/api/Client/"+idDesdeButton,
        type: "DELETE",
        datatype: "JSON",
        data: JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        success: function (respuesta) {
            alert("Se borro correctamente el cliente");
            window.location.reload();
        }
    });
}

///////////////////////////////////////////////
function pintarCliente(respuesta){
    let myTable="<table>"
        myTable+="<th>NOMBRE</th>"
        myTable+="<th>EMAIL</th>"
        myTable+="<th>PASSWORD</th>"
        myTable+="<th>EDAD</th>"
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='putCliente("+respuesta[i].idClient+") '> Actualizar</button>"
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='deleteCliente("+respuesta[i].idClient+")'> Borrar</button>"
        
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}