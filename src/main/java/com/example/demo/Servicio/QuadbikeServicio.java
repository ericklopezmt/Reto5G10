/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.Servicio;

import com.example.demo.Modelo.Quadbike;
import com.example.demo.Repositorio.QuadbikeRepositorio;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author eric2
 */
@Service
public class QuadbikeServicio {

    @Autowired
    private QuadbikeRepositorio quadbikeRepositorio;

    public List<Quadbike> getAll() {
        return quadbikeRepositorio.getAll();
    }

    public Optional<Quadbike> getQuadbike(int quadbikeId) {
        return quadbikeRepositorio.getQuadbike(quadbikeId);
    }

    public Quadbike save(Quadbike quadbike) {
        if (quadbike.getId() == null) {
            return quadbikeRepositorio.save(quadbike);
        } else {
            Optional<Quadbike> quadbike1 = quadbikeRepositorio.getQuadbike(quadbike.getId());
            if (quadbike1.isEmpty()) {
                return quadbikeRepositorio.save(quadbike);
            } else {
                return quadbike;
            }
        }
    }
    
    public Quadbike update(Quadbike quadbike){
        if(quadbike.getId()!=null){
            Optional<Quadbike> e= quadbikeRepositorio.getQuadbike(quadbike.getId());
            if(!e.isEmpty()){
                if(quadbike.getName()!=null){
                    e.get().setName(quadbike.getName());
                }
                if(quadbike.getBrand()!=null){
                    e.get().setBrand(quadbike.getBrand());
                }
                if(quadbike.getYear()!=null){
                    e.get().setYear(quadbike.getYear());
                }
                if(quadbike.getDescription()!=null){
                    e.get().setDescription(quadbike.getDescription());
                }
                if(quadbike.getCategory()!=null){
                    e.get().setCategory(quadbike.getCategory());
                }
                quadbikeRepositorio.save(e.get());
                return e.get();
            }else{
                return quadbike;
            }
        }else{
            return quadbike;
        }
    }

    
    public boolean deleteQuadbike(int quadbikeId){
        Boolean d=getQuadbike(quadbikeId).map(quadbike -> {
            quadbikeRepositorio.delete(quadbike);
            return true;
        }).orElse(false);
        return d;
    }
}
