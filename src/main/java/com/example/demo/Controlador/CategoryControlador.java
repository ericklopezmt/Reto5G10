/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.Controlador;

import com.example.demo.Modelo.Category;
import com.example.demo.Servicio.CategoryServicio;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


/**
 *
 * @author eric2
 */
@RestController
@RequestMapping("/api/Category")
@CrossOrigin(origins = "*")

public class CategoryControlador {

    @Autowired
    private CategoryServicio categoryService;

    @GetMapping("/all")
    public List<Category> getCategorys() {
        return categoryService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Category> getCategory(@PathVariable("id") int Id) {
        return categoryService.getCategory(Id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Category save(@RequestBody Category category) {
        return categoryService.save(category);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Category update(@RequestBody Category category) {
        return categoryService.update(category);
    }

    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int categoryId){
        return categoryService.deleteCategory(categoryId);
    }

    

}
