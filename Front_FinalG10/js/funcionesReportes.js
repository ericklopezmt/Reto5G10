function traerReporteStatus(){
    $.ajax({
        url: "http://localhost:8080/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarStatus(respuesta);
        }
    });
}

function traerRepoerteFechas(startDesdeButton,devolutionDesdeButton){
    let myData={startDesdeButton,devolutionDesdeButton};
    $.ajax({
        url: "http://localhost:8080/api/Reservation/report-dates/{"+startDesdeButton+"}/{"+devolutionDesdeButton+"}",
        type: "GET",
        datatype: "JSON",
        data: JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        success: function (respuesta) {
            pintarRepoerteFechas(respuesta);
            window.location.reload();
        }
    });
}

function traerRepoerteClientes(){
    $.ajax({
        url: "http://localhost:8080/api/Reservation/report-clients",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarRepoerteClientes(respuesta);
        }
    });
}

function pintarStatus(respuesta){
    let myTable="<table>"
        myTable+="<th>COMPLETADAS</th>"
        myTable+="<th>CANCELADAS</th>"
        myTable+="<tr>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function pintarRepoerteClientes(respuesta){
    let myTable="<table>"
        myTable+="<th>Nombre del Cliente</th>"
        myTable+="<th>Reservas</th>"
        for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].total+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    }
    $("#resultado1").html(myTable);
}

function pintarRepoerteFechas(respuesta){
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
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}