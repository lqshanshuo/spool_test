/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.query.rest;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import v2.service.generic.library.constants.GenericStatus;
import v2.service.generic.library.model.QueryPOJO;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.library.model.ResponsePOJO;
import v2.service.generic.library.utils.HttpStreamUtil;
import v2.service.generic.library.utils.JsonUtil;
import v2.service.generic.query.service.QueryService;

/**
 * REST Web Service
 *
 * @author root
 */
@Path("query")
public class QueryResource {

    @Context
    private UriInfo context;

    @EJB
    QueryService queryService;

    /**
     * Creates a new instance of QueryResource
     */
    public QueryResource() {
    }

    /**
     * Retrieves representation of an instance of
     * prototype.generic.query.rest.QueryResource
     *
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("application/json")
    public String query() {
        return JsonUtil.toExceptionJson("Generic Query not support GET request for security purpose.");
    }

    @POST
    @Produces("application/json")
    public String queryPost(@FormParam("queryJson") String queryJson) throws IOException {
        QueryPOJO pojo = (QueryPOJO) JsonUtil.toPojo(queryJson, QueryPOJO.class);
        QueryResultPOJO result = queryService.query(pojo);
        return JsonUtil.toJson(result);
    }

    @POST
    @Path("native")
    @Produces("application/json")
    public String queryNative(String queryJson) throws IOException {
        return queryPost(queryJson);
    }

    @GET
    @Path("testquery")
    @Produces("application/json")
    public String testQuery() throws IOException {
        QueryResultPOJO result = queryService.mockQuery();

        return JsonUtil.toJson(result);
    }

    @GET
    @Path("testadd")
    @Produces("application/json")
    public String testAdd() throws IOException {
//        queryService.testAdd2();

        return "success";
    }

    @POST
    @Path("import/{path:.*}")
    @Produces("application/json")
    public String cascadeImportRest(@PathParam("path") String path,
            @Context HttpServletRequest request) throws IOException {
        ResponsePOJO result = new ResponsePOJO();
        try {
            String dir = path.substring(4);
            List<File> list = HttpStreamUtil.upLoad(request, dir);
            BufferedReader br = new BufferedReader(new FileReader(list.get(0).getAbsolutePath()));
            String data = "", s = "";
            while ((data = br.readLine()) != null) {
                s += data;
            }
            queryService.cascadeImport(s);
            list.get(0).delete();

            List result_list = new ArrayList();
            result_list.add("添加成功");
            result.setResult(result_list);
            result.setHasError(Boolean.FALSE);
            result.setStatusCode(GenericStatus.Service_Successed);
        } catch (Exception e) {
            e.printStackTrace();
            result.setHasError(Boolean.TRUE);
            result.setErrorMessage(e.getMessage());
            result.setStatusCode(GenericStatus.Service_Failed);
        }
        return JsonUtil.toJson(result);
    }

    @GET
    @Path("export/cascade/{flag}/{id}")
    @Produces("application/json")
    public Response cascadeExportById(@PathParam("id") long id,
            @PathParam("flag") boolean flag,
            @Context HttpServletResponse response) throws IOException {
        return HttpStreamUtil.downLoad(response, queryService.cascadeExport(id,flag), "back_up.json");
    }
    
    @GET
    @Path("export/cascade/{flag}/condition/{condition}")
    @Produces("application/json")
    public Response cascadeExportByCondition(@PathParam("condition") String condition,
            @PathParam("flag") boolean flag,
            @Context HttpServletResponse response) throws IOException, Exception {
        return HttpStreamUtil.downLoad(response, queryService.cascadeExport(condition,flag), "back_up.json");
    }
}
