package com.erkezteto.erkezteto2.controller.dtos;

import java.time.LocalDateTime;

public record PanaszDTO(
    String barcode,
    String ragszam,
    boolean Tert,
    LocalDateTime date,
    String szervEgyKod,
    String sender,
    Integer areaCode,
    String city,
    String street,
    String content,
    String iktatoszam,
    String comment,
    boolean hatosagi,
    String recievedBy,
    String targetGroup,
    boolean toBeScanned

) {

}
