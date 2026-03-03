package com.erkezteto.erkezteto2.controller.dtos;

import java.time.LocalDateTime;

public record LevelDTO(
    String barcode,
    String ragszam, 
    boolean Tert,
    LocalDateTime date,
    String szervEgyKod, 
    String reciever,
    String sender, 
    int areaCode, 
    String City, 
    String address, 
    String content, 
    String regNum, 
    String comment, 
    String recievedBy, 
    boolean toBeScanned) {

}
