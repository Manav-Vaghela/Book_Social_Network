package com.book_social_network.Enum;

import lombok.Getter;

import javax.annotation.processing.Generated;

@Getter
public enum EmailTemplateName {

    ACTIVATE_ACCOUNT("activate_account");
    private final String name;

    EmailTemplateName(String name){
        this.name = name;
    }
}
