package net.usermd.mcichon.repository;

import net.usermd.mcichon.domain.FacilityFrom;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FacilityFrom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FacilityFromRepository extends JpaRepository<FacilityFrom, Long> {

}
