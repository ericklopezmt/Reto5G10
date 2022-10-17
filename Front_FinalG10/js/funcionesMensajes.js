//GET, POST , PUT Y DELETE

function getMensajes(){
    $.ajax({
        url: "http://localhost:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarMensaje(respuesta);
        }
    });
}

function postMensajes(){
    if($("#messageText").val().length == 0 ){
        alert("todos los campos son obligatorios");
    }else{
        let cajas = {
            messageText:$("#messageText").val(),
            client:{idClient: +$("#select-client").val()},
            quadbike:{id: +$("#select-quadbike").val()}
        };
        $.ajax({
            url: "http://localhost:8080/api/Message/save",
            type: "POST",
            datatype: "JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("se registro correctamente el mensaje");
                window.location.reload();
            }
        });
    }
}

function putMensajes(idDesdeButton){
    if($("#messageText").val().length == 0 ){
        alert("todos los campos son obligatorios");
    }else{
        let cajas = {
            idMessage:idDesdeButton,
            messageText:$("#messageText").val(),
            client:{idClient: +$("#select-client").val()},
            quadbike:{id: +$("#select-quadbike").val()}
        };
        $.ajax({
            url: "http://localhost:8080/api/Message/update",
            type: "PUT",
            datatype: "JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("se actualizo correctamente la informacion del mensaje");
                window.location.reload();
            }
        });
    }
}

function deleteMensajes(idDesdeButton){
    let myData={idDesdeButton};
    $.ajax({
        url: "http://localhost:8080/api/Message/"+idDesdeButton,
        type: "DELETE",
        datatype: "JSON",
        data: JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        success: function (respuesta) {
            alert("Se borro correctamente el mensaje");
            window.location.reload();
        }
    });
}

///////////////////////////////////////////////
function pintarMensaje(respuesta){
    let myTable="<table>"
        myTable+="<th>MENSAJE</th>"
        myTable+="<th>CUATRIMOTO</th>"
        myTable+="<th>CLIENTE</th>"

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].quadbike.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='putMensajes("+respuesta[i].idMessage+") '> Actualizar</button>"
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='deleteMensajes("+respuesta[i].idMessage+")'> Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function getQuadbike_Message(){
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

function getClient_Message(){
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