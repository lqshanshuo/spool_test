/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.library.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class CUDPOJO extends BaseObject {

    private static final long serialVersionUID = -2663866226792560556L;

    private String className;
    
    private Map<String, Object> attributes = new HashMap<>();

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 67 * hash + Objects.hashCode(this.className);
        hash = 67 * hash + Objects.hashCode(this.attributes);
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
        final CUDPOJO other = (CUDPOJO) obj;
        if (!Objects.equals(this.className, other.className)) {
            return false;
        }
        if (!Objects.equals(this.attributes, other.attributes)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "CUDPOJO{" + "className=" + className + ", attributes=" + attributes + '}';
    }
    
    
    
}
