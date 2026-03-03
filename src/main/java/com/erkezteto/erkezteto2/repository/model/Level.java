package com.erkezteto.erkezteto2.repository.model;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;

@Entity
public class Level {
    @Id
    private String barcode;
    private String ragszam;
    private boolean tertiveveny;   
    private LocalDateTime datum;
    private String szerv;
    private String nev;
    private String kuldo;
    private Integer iranyitoszam;
    private String helyseg;
    private String utca;
    private String tart;
    private String iktsz;
    private String komm;
    private Integer db;
    private String erkUserId;
    private boolean scan;
    private String cimzett_csop;
    private boolean salesforce;
    private Integer Page_Num;
    private String postai_jelzo;
    private boolean hatosagi;

    public Level(String barcode, String ragszam, boolean tertiveveny, LocalDateTime datum, String szerv, String nev, String kuldo, Integer iranyitoszam, String helyseg, String utca, String tart, String iktsz, String komm, Integer db, String erkUserId, boolean scan, String cimzett_csop, boolean salesforce, Integer Page_Num, String postai_jelzo, boolean hatosagi) {
        this.barcode = barcode;
        this.ragszam = ragszam;
        this.tertiveveny = tertiveveny;
        this.datum = datum;
        this.szerv = szerv;
        this.nev = nev;
        this.kuldo = kuldo;
        this.iranyitoszam = iranyitoszam;
        this.helyseg = helyseg;
        this.utca = utca;
        this.tart = tart;
        this.iktsz = iktsz;
        this.komm = komm;
        this.db = db;
        this.erkUserId = erkUserId;
        this.scan = scan;
        this.cimzett_csop = cimzett_csop;
        this.salesforce = salesforce;
        this.Page_Num = Page_Num;
        this.postai_jelzo = postai_jelzo;
        this.hatosagi = hatosagi;

    }

    public void setBarcode(String barcode){
        this.barcode = barcode;
    }

    public String getBarcode(){
        return this.barcode;
    }

    public void setRagszam(String ragszam){
        this.ragszam = ragszam;
    }

    public String getRagszam(){
        return this.ragszam;
    }

    public void setTertiveveny(boolean tertiveveny){
        this.tertiveveny = tertiveveny;
    }

    public boolean getTert(){
        return this.tertiveveny;
    }

    public void setDatum(LocalDateTime datum){
        this.datum = datum;
    }

    public LocalDateTime getDatum(){
        return this.datum;
    }

    public void setSzerv(String szerv){
        this.szerv = szerv;
    }

    public String getSzerv(){
        return this.szerv;
    }

    public void setNev(String nev){
        this.nev = nev;
    }

    public String getNev(){
        return this.nev;
    }

    public void setKuldo(String kuldo){
        this.kuldo = kuldo;
    }

    public String getKuldo(){
        return this.kuldo;
    }

    public void setIranyitoszam(Integer iranzitoszam){
        this.iranyitoszam = iranzitoszam;
    }

    public Integer getIranzitoszam(){
        return this.iranyitoszam;
    }

    public void setHelyseg(String helyseg){
        this.helyseg = helyseg;
    }

    public String getHelyseg(){
        return this.helyseg;
    }

    public void setUtca(String utca){
        this.utca = utca;
    }

    public String getUtca(){
        return this.utca;
    }

    public void setTart(String tart){
        this.tart = tart;
    }

    public String getTart(){
        return this.tart;
    }

    public void setIktsz(String iktsz){
        this.iktsz = iktsz;
    }

    public String getIktsz(){
        return this.iktsz;
    }

    public void setKomm(String komm){
        this.komm = komm;
    }

    public String getKomm(){
        return this.komm;
    }

    public void setDb(int db){
        this.db = db;
    }

    public int getDb(){
        return this.db;
    }

    public void setErkUserId(String erkUserId){
        this.erkUserId = erkUserId;
    }

    public String getErkUserId(){
        return this.erkUserId;
    }

    public void setScan(boolean scan){
        this.scan = scan;
    }

    public boolean getScan(){
        return this.scan;
    }

    public void setCimzett_csop(String cimzett_csop){
        this.cimzett_csop = cimzett_csop;
    }

    public String getCimzett_csop(){
        return this.cimzett_csop;
    }

    public void setSalesforce(boolean salesforce){
        this.salesforce = salesforce;
    }

    public boolean getSalesforce(){
        return this.salesforce;
    }

    public void setPage_Num(int Page_Num){
        this.Page_Num = Page_Num;
    }

    public int getPage_Num(){
        return this.Page_Num;
    }

    public void setPostai_jelzo(String postai_jelzo){
        this.postai_jelzo = postai_jelzo;
    }

    public String getPostai_jelzo(){
        return this.postai_jelzo;
    }

    public void setHatosagi(boolean hatosagi){
        this.hatosagi = hatosagi;
    }

    public boolean getHatosagi(){
        return this.hatosagi;
    }

}
