package v2.service.generic.library.model.http;

import java.util.Objects;
import java.util.Set;
import v2.service.generic.library.model.BaseObject;

public class HttpRequestPOJO extends BaseObject{
    private String principle;
    private String credential;
    private String tokenId;
    private String queryTokenId;
    private String realmName;
    private String applicationName;
    private String groupName;
    private Set<String> resources;
    private Set<String> actions;

    public Set<String> getResources() {
        return resources;
    }

    public void setResources(Set<String> resources) {
        this.resources = resources;
    }

    public Set<String> getActions() {
        return actions;
    }

    public void setActions(Set<String> actions) {
        this.actions = actions;
    }
    
    
    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
    

    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }
    private String jsonData;
    

    public String getJsonData() {
        return jsonData;
    }

    public void setJsonData(String jsonData) {
        this.jsonData = jsonData;
    }
    
    public String getRealmName() {
        return realmName;
    }

    public void setRealmName(String realmName) {
        this.realmName = realmName;
    }
    

    public String getQueryTokenId() {
        return queryTokenId;
    }

    public void setQueryTokenId(String queryTokenId) {
        this.queryTokenId = queryTokenId;
    }
    
    public String getPrinciple() {
        return principle;
    }

    public void setPrinciple(String principle) {
        this.principle = principle;
    }

    public String getCredential() {
        return credential;
    }

    public void setCredential(String credential) {
        this.credential = credential;
    }

    public String getTokenId() {
        return tokenId;
    }

    public void setTokenId(String tokenId) {
        this.tokenId = tokenId;
    }

    
    @Override
    public int hashCode() {
        int hash = 5;
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
        final HttpRequestPOJO other = (HttpRequestPOJO) obj;
        if (!Objects.equals(this.principle, other.principle)) {
            return false;
        }
        if (!Objects.equals(this.credential, other.credential)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "HttpRequestPOJO{" + "principle=" + principle + ", credential=" + credential + '}';
    }
    
}
