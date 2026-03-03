package com.erkezteto.erkezteto2.repository.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "levels")
public class Level {

    @Id
    @Column(name = "barcode", nullable = false)
    private String barcode;

    @Column(name = "ragszam")
    private String ragszam;

    @Column(name = "tertiveveny")
    private boolean tertiveveny;

    @Column(name = "datum")
    private LocalDateTime datum;

    @Column(name = "szerv")
    private String szerv;

    @Column(name = "nev")
    private String nev;

    @Column(name = "kuldo")
    private String kuldo;

    @Column(name = "iranyitoszam")
    private Integer iranyitoszam;

    @Column(name = "helyseg")
    private String helyseg;

    @Column(name = "utca")
    private String utca;

    @Column(name = "tart")
    private String tart;

    @Column(name = "iktsz")
    private String iktsz;

    @Column(name = "komm")
    private String komm;

    @Column(name = "db")
    private Integer db;

    @Column(name = "erk_user_id")
    private String erkUserId;

    @Column(name = "scan")
    private boolean scan;

    // DB column is cimzett_csop, but Java field should be camelCase
    @Column(name = "cimzett_csop")
    private String cimzettCsop;

    @Column(name = "salesforce")
    private boolean salesforce;

    // If your DB column is literally "Page_Num", keep it mapped explicitly
    @Column(name = "Page_Num")
    private Integer pageNum;

    @Column(name = "postai_jelzo")
    private String postaiJelzo;

    @Column(name = "hatosagi")
    private boolean hatosagi;

    // JPA requires a no-arg constructor
    public Level() {}

    public Level(
            String barcode,
            String ragszam,
            boolean tertiveveny,
            LocalDateTime datum,
            String szerv,
            String nev,
            String kuldo,
            Integer iranyitoszam,
            String helyseg,
            String utca,
            String tart,
            String iktsz,
            String komm,
            Integer db,
            String erkUserId,
            boolean scan,
            String cimzettCsop,
            boolean salesforce,
            Integer pageNum,
            String postaiJelzo,
            boolean hatosagi
    ) {
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
        this.cimzettCsop = cimzettCsop;
        this.salesforce = salesforce;
        this.pageNum = pageNum;
        this.postaiJelzo = postaiJelzo;
        this.hatosagi = hatosagi;
    }

    public String getBarcode() { return barcode; }
    public void setBarcode(String barcode) { this.barcode = barcode; }

    public String getRagszam() { return ragszam; }
    public void setRagszam(String ragszam) { this.ragszam = ragszam; }

    public boolean isTertiveveny() { return tertiveveny; }
    public void setTertiveveny(boolean tertiveveny) { this.tertiveveny = tertiveveny; }

    public LocalDateTime getDatum() { return datum; }
    public void setDatum(LocalDateTime datum) { this.datum = datum; }

    public String getSzerv() { return szerv; }
    public void setSzerv(String szerv) { this.szerv = szerv; }

    public String getNev() { return nev; }
    public void setNev(String nev) { this.nev = nev; }

    public String getKuldo() { return kuldo; }
    public void setKuldo(String kuldo) { this.kuldo = kuldo; }

    public Integer getIranyitoszam() { return iranyitoszam; }
    public void setIranyitoszam(Integer iranyitoszam) { this.iranyitoszam = iranyitoszam; }

    public String getHelyseg() { return helyseg; }
    public void setHelyseg(String helyseg) { this.helyseg = helyseg; }

    public String getUtca() { return utca; }
    public void setUtca(String utca) { this.utca = utca; }

    public String getTart() { return tart; }
    public void setTart(String tart) { this.tart = tart; }

    public String getIktsz() { return iktsz; }
    public void setIktsz(String iktsz) { this.iktsz = iktsz; }

    public String getKomm() { return komm; }
    public void setKomm(String komm) { this.komm = komm; }

    public Integer getDb() { return db; }
    public void setDb(Integer db) { this.db = db; }

    public String getErkUserId() { return erkUserId; }
    public void setErkUserId(String erkUserId) { this.erkUserId = erkUserId; }

    public boolean isScan() { return scan; }
    public void setScan(boolean scan) { this.scan = scan; }

    // New clean name
    public String getCimzettCsop() { return cimzettCsop; }
    public void setCimzettCsop(String cimzettCsop) { this.cimzettCsop = cimzettCsop; }

    // ✅ Backward compatible methods (so MainService.setCimzett_csop(...) still compiles)
    public String getCimzett_csop() { return cimzettCsop; }
    public void setCimzett_csop(String cimzett_csop) { this.cimzettCsop = cimzett_csop; }

    public boolean isSalesforce() { return salesforce; }
    public void setSalesforce(boolean salesforce) { this.salesforce = salesforce; }

    public Integer getPageNum() { return pageNum; }
    public void setPageNum(Integer pageNum) { this.pageNum = pageNum; }

    // ✅ Backward compatible methods for your old naming
    public Integer getPage_Num() { return pageNum; }
    public void setPage_Num(Integer pageNum) { this.pageNum = pageNum; }

    public String getPostaiJelzo() { return postaiJelzo; }
    public void setPostaiJelzo(String postaiJelzo) { this.postaiJelzo = postaiJelzo; }

    public boolean isHatosagi() { return hatosagi; }
    public void setHatosagi(boolean hatosagi) { this.hatosagi = hatosagi; }
}