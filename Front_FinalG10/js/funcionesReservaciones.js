//GET, POST , PUT Y DELETE

function getReservaciones(){
    $.ajax({
        url: "http://localhost:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarReservaciones(respuesta);
        }
    });
}

function postReservaciones(){
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0){
        alert("todos los campos son obligatorios");
    }else{
        let cajas = {
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            client:{idClient: +$("#select-client").val()},
            quadbike:{id: +$("#select-quadbike").val()}
        };
        $.ajax({
            url: "http://localhost:8080/api/Reservation/save",
            type: "POST",
            datatype: "JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("se creo correctamente la Resevacion");
                window.location.reload();
            }
        });
    }
}

function putReservaciones(idDesdeButton){
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0){
        alert("todos los campos son obligatorios");
    }else{
        let cajas = {
            idReservation:idDesdeButton,
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            client:{idClient: +$("#select-client").val()},
            quadbike:{id: +$("#select-quadbike").val()}
        };
        $.ajax({
            url: "http://localhost:8080/api/Reservation/update",
            type: "PUT",
            datatype: "JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("se actualizo correctamente la informacion de la Reservacion");
                window.location.reload();
            }
        });
    }
}

function deleteReservaciones(idDesdeButton){
    let myData={idDesdeButton};
    $.ajax({
        url: "http://localhost:8080/api/Reservation/"+idDesdeButton,
        type: "DELETE",
        datatype: "JSON",
        data: JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        success: function (respuesta) {
            alert("Se borro correctamente la Reservacion");
            window.location.reload();
        }
    });
}

///////////////////////////////////////////////
function pintarReservaciones(respuesta){
    let myTable="<table>"
        myTable+="<th>FECHA DE INICIO</th>"
        myTable+="<th>FECHA DE DEVOLUCION</th>"
        myTable+="<th>ESTADO</th>"
        myTable+="<th>CUATRIMOTO</th>"
        myTable+="<th>CLIENTE</th>"
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].quadbike.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='putReservaciones("+respuesta[i].idReservation+") '> Actualizar</button>"
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='deleteReservaciones("+respuesta[i].idReservation+")'> Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function getQuadbike_Reservation(){
    $.ajax({
        url: "http://localhost:8080/api/Quadbike/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let $select=$("#select-quadbike");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            })
        }
    });
}

function getClient_Reservation(){
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let $select=$("#select-client");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            })
        }
    });
}