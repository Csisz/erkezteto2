package com.erkezteto.erkezteto2.controller.dtos;

import java.util.Date;

public record getLevelDTO(
    Date from, 
    Date to, 
    String bizonylatszam, 
    String Barcode, 
    String szallito, 
    String total, 
    String reciever) {

}
