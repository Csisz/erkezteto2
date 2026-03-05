package com.erkezteto.erkezteto2.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.erkezteto.erkezteto2.repository.MainRepository;
import com.erkezteto.erkezteto2.controller.dtos.*;
import com.erkezteto.erkezteto2.security.jwt.JwtUtils;
import com.erkezteto.erkezteto2.repository.model.Level;

@Service
public class MainService {
    private final MainRepository mainRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    
    @Autowired
    public MainService(MainRepository mainRepository, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.mainRepository = mainRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }
    private static final Logger log = LoggerFactory.getLogger(MainService.class);
    
    public ResponseEntity<?> saveLevel(LevelDTO level) {
        return createLevel(level);
    }
    //TODO find out what to use here instead of the hardcoded values, and if we need to set the null values at all
    
    private ResponseEntity<?> createLevel(LevelDTO level){
            try{
                Level newLevel = new Level(
                    level.barcode(),
                    level.ragszam(),
                    level.Tert(), 
                    level.date(),
                    level.szervEgyKod(),
                    level.reciever(),
                    level.sender(),
                    level.areaCode(),
                    level.City(),
                    level.address(),
                    level.content(),
                    level.regNum(),
                    level.comment(),
                    1, // db is hardcoded to 1 for now
                    level.recievedBy(),
                    level.toBeScanned(),
                    null, // cimzett_csop is null for now
                    false, // salesforce is false for now
                    1, // Page_Num is hardcoded to 1 for now
                    null, // postai_jelzo is null for now
                    false // hatosagi is false for now
                );
           

            mainRepository.save(newLevel);

            log.info("Successfully saved level:" + level);
            
            return ResponseEntity.ok().build();

        }catch(Exception e){
            log.error("Error saving level: " + e.getMessage());
            return ResponseEntity.status(500).body("Error saving level: " + e.getMessage());
        }
    }

    public ResponseEntity<?> savePanasz(PanaszDTO panasz){
        return createPanasz(panasz);
    }

    public ResponseEntity<?> createPanasz(PanaszDTO panasz){
        try{
            Level newPanasz = new Level();
            newPanasz.setBarcode(panasz.barcode());
            newPanasz.setRagszam(panasz.ragszam());
            newPanasz.setTertiveveny(panasz.Tert()); 
            newPanasz.setDatum(panasz.date());
            newPanasz.setSzerv(panasz.szervEgyKod());
            newPanasz.setNev(panasz.sender());
            newPanasz.setIranyitoszam(panasz.areaCode());
            newPanasz.setHelyseg(panasz.city());
            newPanasz.setUtca(panasz.street());
            newPanasz.setTart(panasz.content());
            newPanasz.setIktsz(panasz.iktatoszam());
            newPanasz.setKomm(panasz.comment());
            newPanasz.setErkUserId(panasz.recievedBy());
            newPanasz.setCimzett_csop(panasz.targetGroup());
            newPanasz.setScan(panasz.toBeScanned());
            newPanasz.setHatosagi(panasz.hatosagi());

            mainRepository.save(newPanasz);

            log.info("Successfully saved panasz:" + panasz);

            return ResponseEntity.ok().build();
        }catch(Exception e){
            log.error("Error saving panasz: " + e.getMessage());
            return ResponseEntity.status(500).body("Error saving panasz: " + e.getMessage());
        }
    }


    public List<Level> search(LevelDTO dto) {

        Specification<Level> spec = Specification
        .where(LevelSpecifications.hasBarcode(dto.barcode()))
        .and(LevelSpecifications.hasRagszam(dto.ragszam()))
        .and(LevelSpecifications.isTert(dto.Tert()))
        .and(LevelSpecifications.hasDate(dto.date()))
        .and(LevelSpecifications.hasSzEK(dto.szervEgyKod()))
        .and(LevelSpecifications.hasReciever(dto.reciever()))
        .and(LevelSpecifications.hasSender(dto.sender()))
        .and(LevelSpecifications.hasAreaCode(dto.areaCode()))
        .and(LevelSpecifications.hasAddress(dto.address()))
        .and(LevelSpecifications.hasCity(dto.City()))
        .and(LevelSpecifications.hasContent(dto.content()))
        .and(LevelSpecifications.hasRegNum(dto.regNum()))
        .and(LevelSpecifications.hasComment(dto.comment()))
        .and(LevelSpecifications.hasDeliveredBy(dto.recievedBy()))
        .and(LevelSpecifications.isToBeScanned(dto.toBeScanned()));

        return mainRepository.findAll(spec);


    }

    public ResponseEntity<?> login(UserDTO user) {
        try{
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.username(), user.password()));

            log.info("User " + user.username() + " logged in successfully.");

            SecurityContextHolder.getContext().setAuthentication(auth);
                
            List<String> groups = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

            String token = jwtUtils.generateToken(auth);
            log.info("Generated JWT token for user " + user.username());

            Map<String, Object> response = Map.of(
                "username", auth.getName(),
                "groups", groups,
                "token", token
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Login failed for user " + user.username() + ": " + e.getMessage());
            return ResponseEntity.status(401).build();
        }    
    }

}
