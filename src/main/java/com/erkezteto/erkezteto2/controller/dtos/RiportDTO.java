package com.erkezteto.erkezteto2.controller.dtos;

import java.time.LocalDateTime;

public record RiportDTO(
    String barcode,
    String ragszam,
    LocalDateTime from,
    LocalDateTime to,
    String name,
    String sender,
    String areaCode,
    String City,
    String street,
    String iktatoszam,
    String SzervEgyKod
) {

}
