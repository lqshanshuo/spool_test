/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.zgpa.model;

import java.util.Objects;

/**
 *
 * @author zoudan
 */
public class RequestPOJO {
    
    
    private String name;
    private String passwd;
    private String businessType;
    
    private String param1;
    private String param2;
    private String param3;
    private String param4;
    private String param5;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public String getParam1() {
        return param1;
    }

    public void setParam1(String param1) {
        this.param1 = param1;
    }

    public String getParam2() {
        return param2;
    }

    public void setParam2(String param2) {
        this.param2 = param2;
    }

    public String getParam3() {
        return param3;
    }

    public void setParam3(String param3) {
        this.param3 = param3;
    }

    public String getParam4() {
        return param4;
    }

    public void setParam4(String param4) {
        this.param4 = param4;
    }

    public String getParam5() {
        return param5;
    }

    public void setParam5(String param5) {
        this.param5 = param5;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 89 * hash + Objects.hashCode(this.name);
        hash = 89 * hash + Objects.hashCode(this.passwd);
        hash = 89 * hash + Objects.hashCode(this.businessType);
        hash = 89 * hash + Objects.hashCode(this.param1);
        hash = 89 * hash + Objects.hashCode(this.param2);
        hash = 89 * hash + Objects.hashCode(this.param3);
        hash = 89 * hash + Objects.hashCode(this.param4);
        hash = 89 * hash + Objects.hashCode(this.param5);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final RequestPOJO other = (RequestPOJO) obj;
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.passwd, other.passwd)) {
            return false;
        }
        if (!Objects.equals(this.businessType, other.businessType)) {
            return false;
        }
        if (!Objects.equals(this.param1, other.param1)) {
            return false;
        }
        if (!Objects.equals(this.param2, other.param2)) {
            return false;
        }
        if (!Objects.equals(this.param3, other.param3)) {
            return false;
        }
        if (!Objects.equals(this.param4, other.param4)) {
            return false;
        }
        if (!Objects.equals(this.param5, other.param5)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "RequestPOJO{" + "name=" + name + ", passwd=" + passwd + ", businessType=" + businessType + ", param1=" + param1 + ", param2=" + param2 + ", param3=" + param3 + ", param4=" + param4 + ", param5=" + param5 + '}';
    }
    
    
    
    
}
