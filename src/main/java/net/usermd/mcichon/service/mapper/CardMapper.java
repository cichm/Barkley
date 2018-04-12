package net.usermd.mcichon.service.mapper;

import net.usermd.mcichon.domain.*;
import net.usermd.mcichon.service.dto.CardDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Card and its DTO CardDTO.
 */
@Mapper(componentModel = "spring", uses = {MoneyAccountMapper.class})
public interface CardMapper extends EntityMapper<CardDTO, Card> {

    @Mapping(source = "moneyAccount.id", target = "moneyAccountId")
    CardDTO toDto(Card card);

    @Mapping(source = "moneyAccountId", target = "moneyAccount")
    Card toEntity(CardDTO cardDTO);

    default Card fromId(Long id) {
        if (id == null) {
            return null;
        }
        Card card = new Card();
        card.setId(id);
        return card;
    }
}
