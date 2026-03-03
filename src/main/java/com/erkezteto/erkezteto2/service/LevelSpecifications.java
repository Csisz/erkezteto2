package com.erkezteto.erkezteto2.service;

import java.time.LocalDateTime;
import org.springframework.data.jpa.domain.Specification;

import com.erkezteto.erkezteto2.repository.model.Level;

public class LevelSpecifications {
    
    public static Specification<Level> hasBarcode(String barcode) {
        return (root, query, criteriaBuilder) -> 
            barcode == null? null : criteriaBuilder.equal(root.get("barcode"), barcode);
    }

    public static Specification<Level> hasRagszam(String ragszam) {
        return (root, query, criteriaBuilder) -> 
            ragszam == null? null : criteriaBuilder.equal(root.get("ragszam"), ragszam);
    }

    public static Specification<Level> isTert(Boolean tert) {
        return (root, query, criteriaBuilder) -> 
            tert == null ? null : criteriaBuilder.equal(root.get("tertiveveny"), tert);
    }

    public static Specification<Level> hasDate(LocalDateTime date) {
        return (root, query, criteriaBuilder) -> 
            date == null ? null : criteriaBuilder.equal(root.get("datum"), date);
    }

    public static Specification<Level> hasSzEK(String szervEgKod){
        return (root, query, criteriaBuilder) ->
            szervEgKod == null? null : criteriaBuilder.equal(root.get("szerv"), szervEgKod);
    }

    public static Specification<Level> hasReciever(String reciever){
        return (root, query, criteriaBuilder) ->
            reciever == null? null : criteriaBuilder.equal(root.get("nev"), reciever);
    }

    public static Specification<Level> hasSender(String sender){
        return (root, query, criteriaBuilder) -> 
            sender == null? null : criteriaBuilder.equal(root.get("kuldo"), sender);
    }

    public static Specification<Level> hasAreaCode(Integer areaCode){
        return (root, query, criteriaBuilder) ->
            areaCode == null? null : criteriaBuilder.equal(root.get("iranyitoszam"), areaCode);
    }

    public static Specification<Level> hasCity(String city){
        return (root, query, criteriaBuilder) -> 
            city == null? null : criteriaBuilder.equal(root.get("helyseg"), city);
    }

    public static Specification<Level> hasAddress(String address){
        return (root, query, criteriaBuilder) ->
            address == null? null : criteriaBuilder.equal(root.get("utca"), address);
    }

    public static Specification<Level> hasContent(String content) {
        return (root, query, criteriaBuilder) ->
            content == null? null : criteriaBuilder.equal(root.get("tart"), content);
    }

    public static Specification<Level> hasRegNum(String regnum){
        return (root, query, criteriaBuilder) -> 
            regnum == null? null : criteriaBuilder.equal(root.get("iktsz"), regnum);
    }

    public static Specification<Level> hasComment(String comment){
        return (root, query, criteriaBuilder) ->
            comment == null? null : criteriaBuilder.equal(root.get("komm"), comment);
    }

    public static Specification<Level> hasPageNum(Integer pageNum){
        return (root, query, criteriaBuilder) ->
            pageNum == null ? null : criteriaBuilder.equal(root.get("db"), pageNum);
    }

    public static Specification<Level> hasDeliveredBy(String recievedBy){
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.equal(root.get("erkUserId"), recievedBy);
    }

    public static Specification<Level> isToBeScanned(boolean toBeScanned){
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.equal(root.get("scan"), toBeScanned);
    }

    public static Specification<Level> címzettCsop(String cimzett_csop){
        return (root, query, criteriaBuilder) ->
            cimzett_csop == null? null : criteriaBuilder.equal(root.get("cimzett_csop"), cimzett_csop);
    }

    public static Specification<Level> isSalesforce(Boolean salesforce){
        return (root, query, criteriaBuilder) ->
            salesforce == null ? null : criteriaBuilder.equal(root.get("salesforce"), salesforce);
    }

    public static Specification<Level> hasPostaiJelzo(String postai_jelzo){
        return (root, query, criteriaBuilder) ->
            postai_jelzo == null? null : criteriaBuilder.equal(root.get("postai_jelzo"), postai_jelzo);
    }

    public static Specification<Level> isHatosagi(Boolean hatosagi){
        return (root, query, criteriaBuilder) ->
            hatosagi == null ? null : criteriaBuilder.equal(root.get("hatosagi"), hatosagi);
    }   

}
