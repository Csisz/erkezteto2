package com.erkezteto.erkezteto2.controller.exceptions;

public class OperationFailedException extends RuntimeException {
    public OperationFailedException(String message) {
        super(message);
    }

}
