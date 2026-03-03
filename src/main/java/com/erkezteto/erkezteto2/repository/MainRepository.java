package com.erkezteto.erkezteto2.repository;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.erkezteto.erkezteto2.repository.model.*;
@Repository

public interface MainRepository extends JpaRepository<Level, String>, JpaSpecificationExecutor<Level>{
    public void saveLevel(Level level);
    
    public List<Level> findAll(Specification<Level> spec);
}