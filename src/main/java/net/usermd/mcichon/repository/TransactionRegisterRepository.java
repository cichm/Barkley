package net.usermd.mcichon.repository;

import net.usermd.mcichon.domain.TransactionRegister;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TransactionRegister entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransactionRegisterRepository extends JpaRepository<TransactionRegister, Long> {

}
