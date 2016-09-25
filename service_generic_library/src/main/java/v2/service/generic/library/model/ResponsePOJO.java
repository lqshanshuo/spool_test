/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.library.model;

import java.util.List;
import java.util.Objects;

public class ResponsePOJO<T> extends BaseObject {

    private Boolean hasError;
    private String errorMessage;
    private Integer statusCode;
    private String status;
    private List<T> result;

    public ResponsePOJO() {
    }
    
    

    public ResponsePOJO(Boolean hasError, String errorMessage, Integer statusCode, String status, List<T> result) {
        this.hasError = hasError;
        this.errorMessage = errorMessage;
        this.statusCode = statusCode;
        this.status = status;
        this.result = result;
    }

    
    
    /**
     * @return the result
     */
    public List<T> getResult() {
        return result;
    }

    /**
     * @param result the result to set
     */
    public void setResult(List<T> result) {
        this.result = result;
    }

    public Boolean getHasError() {
        return hasError;
    }

    public void setHasError(Boolean hasError) {
        this.hasError = hasError;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 79 * hash + Objects.hashCode(this.hasError);
        hash = 79 * hash + Objects.hashCode(this.errorMessage);
        hash = 79 * hash + Objects.hashCode(this.statusCode);
        hash = 79 * hash + Objects.hashCode(this.status);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final ResponsePOJO other = (ResponsePOJO) obj;
        if (!Objects.equals(this.hasError, other.hasError)) {
            return false;
        }
        if (!Objects.equals(this.errorMessage, other.errorMessage)) {
            return false;
        }
        if (!Objects.equals(this.statusCode, other.statusCode)) {
            return false;
        }
        if (!Objects.equals(this.status, other.status)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ResponsePOJO{" + "hasError=" + hasError + ", errorMessage=" + errorMessage + ", statusCode=" + statusCode + ", status=" + status + '}';
    }

}
