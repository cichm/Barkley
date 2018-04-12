package net.usermd.mcichon.repository;

import net.usermd.mcichon.domain.FacilityDestination;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FacilityDestination entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FacilityDestinationRepository extends JpaRepository<FacilityDestination, Long> {

}
