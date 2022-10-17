//GET, POST , PUT Y DELETE

function getCategoria() {
    $.ajax({
        url: "http://localhost:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarCategoria(respuesta);
        }
    });

}

function postCategoria() {
    if($("#name").val().length == 0 || $("#description").val().length == 0 ){
        alert("todos los campos son obligatorios");
    }else{
        let cajas = {
            name:$("#name").val(),
            description:$("#description").val()
        };
        $.ajax({
            url: "http://localhost:8080/api/Category/save",
            type: "POST",
            datatype: "JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("se creo correctamente la categoria");
                window.location.reload();
            }
        });
    }
}

function putCategoria(idDesdeButton) {
    if($("#name").val().length == 0 || $("#description").val().length == 0 ){
        alert("todos los campos son obligatorios");
    }else{
        let cajas = {
            id:idDesdeButton,
            name:$("#name").val(),
            description:$("#description").val()
        };
        $.ajax({
            url: "http://localhost:8080/api/Category/update",
            type: "PUT",
            datatype: "JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("se actualizo correctamente la informacion de la categoria");
                window.location.reload();
            }
        });
    }
}

function deleteCategoria(idDesdeButton) {
    let myData={idDesdeButton};
    $.ajax({
        url: "http://localhost:8080/api/Category/"+idDesdeButton,
        type: "DELETE",
        datatype: "JSON",
        data: JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        success: function (respuesta) {
            alert("Se borro correctamente la categoria");
            window.location.reload();
        }
    });
}
///////////////////////////////////////////////
function pintarCategoria(respuesta){
    let myTable="<table>"
        myTable+="<th>NOMBRE</th>"
        myTable+="<th>DESCRIPCION</th>"
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='putCategoria("+respuesta[i].id+") '> Actualizar</button>"
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='deleteCategoria("+respuesta[i].id+")'> Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}