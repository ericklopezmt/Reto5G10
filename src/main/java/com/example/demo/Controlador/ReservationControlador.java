/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.Controlador;

import com.example.demo.Modelo.Reservation;
import com.example.demo.Repositorio.CountClient;
import com.example.demo.Servicio.ReservationServicio;
import com.example.demo.Servicio.Status;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


/**
 *
 * @author eric2
 */
@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*")

public class ReservationControlador {

    @Autowired
    private ReservationServicio reservationService;

    @GetMapping("/all")
    public List<Reservation> getReservations() {
        return reservationService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Reservation> getReservation(@PathVariable("id") int reservationId) {
        return reservationService.getReservation(reservationId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation reservation) {
        return reservationService.save(reservation);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation update(@RequestBody Reservation reservation) {
        return reservationService.update(reservation);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int reservationId){
        return reservationService.deleteReservation(reservationId);
    }

    @GetMapping("/report-clients")
    public List<CountClient> getResrvationReportClient(){
        return reservationService.getTopClients();
    }

    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
    public List<Reservation> getResrvationReportDates(@PathVariable("dateOne") String dateOne,@PathVariable("dateTwo") String dateTwo){
        return reservationService.informePeriodoTiempoReservas(dateOne, dateTwo);
    }
    
    @GetMapping("/report-status")
    public Status getResrvationStatusReport(){
        return reservationService.getReservationStatusReport();
    }
}
