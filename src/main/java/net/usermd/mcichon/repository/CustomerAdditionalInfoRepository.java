package net.usermd.mcichon.repository;

import net.usermd.mcichon.domain.CustomerAdditionalInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CustomerAdditionalInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerAdditionalInfoRepository extends JpaRepository<CustomerAdditionalInfo, Long> {

}
