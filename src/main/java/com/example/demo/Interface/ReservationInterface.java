/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.demo.Interface;

import com.example.demo.Modelo.Reservation;
import java.util.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author eric2
 */
public interface ReservationInterface extends CrudRepository <Reservation, Integer>{
    
    public List<Reservation> findAllByStatus(String status);
    public List<Reservation> findAllByStartDateAfterAndStartDateBefore (Date datoUno, Date datoDos);
    @Query("SELECT c.client, COUNT(c.client) from Reservation As c group by c.client order by COUNT(c.client) DESC")
    public List<Object[]> countTotalReservationByClient();
}
