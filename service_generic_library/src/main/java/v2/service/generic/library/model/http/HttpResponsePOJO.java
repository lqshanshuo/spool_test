
package v2.service.generic.library.model.http;

import java.util.Objects;
import org.apache.http.HttpResponse;
import v2.service.generic.library.model.BaseObject;

public class HttpResponsePOJO extends BaseObject{
    private String body;
    private int statusCode;
    private HttpResponse response;
    
    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public HttpResponse getResponse() {
        return response;
    }

    public void setResponse(HttpResponse response) {
        this.response = response;
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
        final HttpResponsePOJO other = (HttpResponsePOJO) obj;
        if (!Objects.equals(this.body, other.body)) {
            return false;
        }
        if (this.statusCode != other.statusCode) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "HttpResponsePOJO{" + "body=" + body + ", statusCode=" + statusCode + '}';
    }
    
}
