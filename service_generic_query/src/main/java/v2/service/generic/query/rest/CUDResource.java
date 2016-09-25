/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.query.rest;

import java.io.IOException;
import javax.ejb.EJB;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import v2.service.generic.library.model.CUDPOJO;
import v2.service.generic.library.model.ResponsePOJO;
import v2.service.generic.library.utils.JsonUtil;
import v2.service.generic.query.service.CUDService;

/**
 * REST Web Service
 *
 * @author root
 */
@Path("cud")
public class CUDResource {

    @Context
    private UriInfo context;

    @EJB
    CUDService cudService;

    /**
     * Creates a new instance of CUDResource
     */
    public CUDResource() {
    }

    @POST
    @Path("add")
    @Produces("application/json")
    public String addPost(@FormParam("queryJson") String queryJson) throws IOException {
        CUDPOJO pojo = (CUDPOJO) JsonUtil.toPojo(queryJson, CUDPOJO.class);
        ResponsePOJO result = cudService.add(pojo);
        return JsonUtil.toJson(result);
    }

    @POST
    @Path("update")
    @Produces("application/json")
    public String updatePost(@FormParam("queryJson") String queryJson) throws IOException {
        CUDPOJO pojo = (CUDPOJO) JsonUtil.toPojo(queryJson, CUDPOJO.class);
        ResponsePOJO result = cudService.update(pojo);
        return JsonUtil.toJson(result);
    }

    @POST
    @Path("remove")
    @Produces("application/json")
    public String removePost(@FormParam("queryJson") String queryJson) throws IOException {
        CUDPOJO pojo = (CUDPOJO) JsonUtil.toPojo(queryJson, CUDPOJO.class);
        ResponsePOJO result = cudService.remove(pojo);
        return JsonUtil.toJson(result);
    }

    @GET
    @Path("testadd")
    @Produces("application/json")
    public String testAdd() throws IOException {
        String json = "{\"className\":\"v2.service.generic.query.entity.ZEntity\",\"attributes\":{\"category\":\"LYTest\",\"name\":\"LYTEST1465976891590\"}}";
        return addPost(json);
    }

}
