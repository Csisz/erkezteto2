package com.erkezteto.erkezteto2.service;

import java.time.LocalDateTime;
import org.springframework.data.jpa.domain.Specification;

import com.erkezteto.erkezteto2.repository.model.Level;

public class LevelSpecifications {

    private static final Specification<Level> MATCH_ALL = (root, query, cb) -> cb.conjunction();

    /** Case-insensitive LIKE or NOT LIKE for string fields. */
    private static Specification<Level> stringSpec(String field, String value, boolean exclude) {
        if (value == null || value.isBlank()) return MATCH_ALL;
        String pattern = "%" + value.toLowerCase() + "%";
        return (root, query, cb) -> exclude
            ? cb.notLike(cb.lower(root.get(field)), pattern)
            : cb.like(cb.lower(root.get(field)), pattern);
    }

    public static Specification<Level> hasBarcode(String barcode, boolean exclude) {
        return stringSpec("barcode", barcode, exclude);
    }

    public static Specification<Level> hasRagszam(String ragszam, boolean exclude) {
        return stringSpec("ragszam", ragszam, exclude);
    }

    public static Specification<Level> isTert(Boolean tert) {
        if (tert == null) return MATCH_ALL;
        return (root, query, cb) -> cb.equal(root.get("tertiveveny"), tert);
    }

    public static Specification<Level> hasDate(LocalDateTime date) {
        if (date == null) return MATCH_ALL;
        return (root, query, cb) -> cb.equal(root.get("datum"), date);
    }

    public static Specification<Level> hasSzEK(String szervEgKod, boolean exclude) {
        return stringSpec("szerv", szervEgKod, exclude);
    }

    public static Specification<Level> hasReciever(String reciever, boolean exclude) {
        return stringSpec("nev", reciever, exclude);
    }

    public static Specification<Level> hasSender(String sender, boolean exclude) {
        return stringSpec("kuldo", sender, exclude);
    }

    public static Specification<Level> hasAreaCode(Integer areaCode) {
        if (areaCode == null) return MATCH_ALL;
        return (root, query, cb) -> cb.equal(root.get("iranyitoszam"), areaCode);
    }

    public static Specification<Level> hasCity(String city, boolean exclude) {
        return stringSpec("helyseg", city, exclude);
    }

    public static Specification<Level> hasAddress(String address, boolean exclude) {
        return stringSpec("utca", address, exclude);
    }

    public static Specification<Level> hasContent(String content, boolean exclude) {
        return stringSpec("tart", content, exclude);
    }

    public static Specification<Level> hasRegNum(String regnum, boolean exclude) {
        return stringSpec("iktsz", regnum, exclude);
    }

    public static Specification<Level> hasComment(String comment, boolean exclude) {
        return stringSpec("komm", comment, exclude);
    }

    public static Specification<Level> hasPageNum(Integer pageNum) {
        if (pageNum == null) return MATCH_ALL;
        return (root, query, cb) -> cb.equal(root.get("db"), pageNum);
    }

    public static Specification<Level> hasDeliveredBy(String recievedBy, boolean exclude) {
        return stringSpec("erkUserId", recievedBy, exclude);
    }

    public static Specification<Level> isToBeScanned(Boolean toBeScanned) {
        if (toBeScanned == null) return MATCH_ALL;
        return (root, query, cb) -> cb.equal(root.get("scan"), toBeScanned);
    }

    public static Specification<Level> cimzettCsop(String cimzett_csop, boolean exclude) {
        return stringSpec("cimzett_csop", cimzett_csop, exclude);
    }

    public static Specification<Level> isSalesforce(Boolean salesforce) {
        if (salesforce == null) return MATCH_ALL;
        return (root, query, cb) -> cb.equal(root.get("salesforce"), salesforce);
    }

    public static Specification<Level> hasPostaiJelzo(String postai_jelzo, boolean exclude) {
        return stringSpec("postai_jelzo", postai_jelzo, exclude);
    }

    public static Specification<Level> isHatosagi(Boolean hatosagi) {
        if (hatosagi == null) return MATCH_ALL;
        return (root, query, cb) -> cb.equal(root.get("hatosagi"), hatosagi);
    }
}
