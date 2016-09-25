/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.matrix.client;

import java.io.IOException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import v2.service.generic.library.constants.GenericStatus;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.library.utils.JsonUtil;

/**
 * REST Web Service
 *
 * @author root
 */
@Path("mock")
public class MockResource {

    /**
     * Creates a new instance of MockResource
     */
    public MockResource() {
    }

    

    @GET
    @Path("success")
    @Produces("application/json")
    public String success() throws IOException {
        QueryResultPOJO result = new QueryResultPOJO();
        result.setHasError(Boolean.FALSE);
        result.setStatusCode(GenericStatus.Service_Successed);
        return JsonUtil.toJson(result);
    }
    
    @GET
    @Path("service_error")
    @Produces("application/json")
    public String service_error() throws IOException {
        QueryResultPOJO result = new QueryResultPOJO();
        result.setHasError(Boolean.TRUE);
        result.setErrorMessage("This is an error message from mock API");
        result.setStatusCode(GenericStatus.Service_Failed);
        return JsonUtil.toJson(result);
    }
    
    @GET
    @Path("server_error")
    @Produces("application/json")
    public String server_error() throws IOException {
        throw new UnsupportedOperationException();
    }
}
