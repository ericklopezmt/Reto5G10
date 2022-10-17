//GET, POST , PUT Y DELETE

function getQuadbike (){
    $.ajax({
        url: "http://localhost:8080/api/Quadbike/all",
        type: "GET",
        datatype: "JSON",
        success: function (json_Quadbike) {
            console.log(json_Quadbike);
            pintarQuadbike(json_Quadbike);
        }
    });
}

function postQuadbike(){
    if($("#brand").val().length == 0 || $("#year").val().length == 0 || $("#selectCategoria").val().length == 0 || $("#name").val().length == 0 || $("#descrition").val().length == 0){
        alert("todos los campos son obligatorios");
    }else{
        let cajas = {
            brand:$("#brand").val(),
            year:$("#year").val(),
            category:{id: +$("#selectCategoria").val()},
            name:$("#name").val(),
            description:$("#descrition").val()
        };
        $.ajax({
            url: "http://localhost:8080/api/Quadbike/save",
            type: "POST",
            datatype: "JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("se creo correctamente la Quadbike");
                window.location.reload();
            }
        });
    }
}

function putQuadbike(idDesdeButton){
    if($("#brand").val().length == 0 || $("#year").val().length == 0 || $("#selectCategoria").val().length == 0 || $("#name").val().length == 0 || $("#descrition").val().length == 0){
        alert("todos los campos son obligatorios");
    }else{
        let cajas = {
            id:idDesdeButton,
            brand:$("#brand").val(),
            year:$("#year").val(),
            category:{id: +$("#selectCategoria").val()},
            name:$("#name").val(),
            description:$("#descrition").val()
        };
        $.ajax({
            url: "http://localhost:8080/api/Quadbike/update",
            type: "PUT",
            datatype: "JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("se actualizo correctamente la informacion de la Cuatrimoto");
                window.location.reload();
            }
        });
    }
}

function deleteQuadbike(idDesdeButton){
    let myData={idDesdeButton};
    $.ajax({
        url: "http://localhost:8080/api/Quadbike/"+idDesdeButton,
        type: "DELETE",
        datatype: "JSON",
        data: JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        success: function (respuesta) {
            alert("Se borro correctamente la Cuatrimoto");
            window.location.reload();
        }
    });
    
}
///////////////////////////////////////////////////////////////////
function pintarQuadbike(json_Quadbike){
    let myTable="<table>"
        myTable+="<th>MARCA</th>"
        myTable+="<th>AÑO</th>"
        myTable+="<th>CATEGORIA</th>"
        myTable+="<th>NOMBRE</th>"
        myTable+="<th>DESCRIPCION</th>"
    for(i=0;i<json_Quadbike.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+json_Quadbike[i].brand+"</td>";
        myTable+="<td>"+json_Quadbike[i].year+"</td>";
        myTable+="<td>"+json_Quadbike[i].category.name+"</td>";
        myTable+="<td>"+json_Quadbike[i].name+"</td>";
        myTable+="<td>"+json_Quadbike[i].description+"</td>";
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='putQuadbike("+json_Quadbike[i].id+") '> Actualizar</button>"
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='deleteQuadbike("+json_Quadbike[i].id+")'> Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoQuadbike").html(myTable);
}

function getCategoria_Quadbike(){
    $.ajax({
        url: "http://localhost:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let $select=$("#selectCategoria");
            $.each(respuesta, function(id,name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            })
        }
    });
}

