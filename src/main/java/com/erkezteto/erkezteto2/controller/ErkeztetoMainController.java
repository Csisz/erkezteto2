package com.erkezteto.erkezteto2.controller;


import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.erkezteto.erkezteto2.controller.dtos.*;
import com.erkezteto.erkezteto2.service.MainService;

import org.springframework.http.ResponseEntity;

import com.erkezteto.erkezteto2.repository.model.Level;



@RestController
@RequestMapping("/")

public class ErkeztetoMainController {
    private final MainService mainService;

    public ErkeztetoMainController( MainService mainService) {
        this.mainService = mainService;
    }

    @PostMapping("level")
    public ResponseEntity<?> postLevel(@RequestBody LevelDTO dto) {
        return mainService.saveLevel(dto);
    }

    @PostMapping("ugyfelpanasz")
    public ResponseEntity<?> postUgyfelpanasz(@RequestBody PanaszDTO panasz) {
        return mainService.savePanasz(panasz);
    }

    @PostMapping("getlevel")
    public List<Level> getLevel(@RequestBody LevelDTO getLevel) {
        return mainService.search(getLevel);
    }
    
    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody UserDTO user) {
        return mainService.login(user);
    }
    

}
