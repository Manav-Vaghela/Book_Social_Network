package com.book_social_network.Entity;

import org.springframework.data.jpa.domain.Specification;

import java.awt.*;

public class BookSpecification {

    public static Specification<Book> withOwnerId(Integer ownerId){

        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("owner").get("id"), ownerId));
    }
}
