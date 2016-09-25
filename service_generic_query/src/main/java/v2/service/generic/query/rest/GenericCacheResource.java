/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.query.rest;

import java.io.IOException;
import java.util.ArrayList;
import javax.ws.rs.FormParam;
import javax.ws.rs.Path;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import v2.service.generic.library.cache.GenericCachePool;
import v2.service.generic.library.constants.GenericStatus;
import v2.service.generic.library.model.QueryPOJO;
import v2.service.generic.library.model.ResponsePOJO;
import v2.service.generic.library.utils.JsonUtil;
import v2.service.scripter.CacheUtil;
import v2.service.scripter.CacheUtil;

/**
 * REST Web Service
 *
 * @author root
 */
@Path("genericCache")
public class GenericCacheResource {

    public GenericCacheResource() {
    }

    @Path("cachePool")
    @POST
    @Produces("application/json")
    public String getCachePool(@FormParam("queryJson") String queryJson) throws IOException {

        Object resullt = GenericCachePool.getCachePool();
        ResponsePOJO resultPOJO = new ResponsePOJO();
        resultPOJO.setResult(new ArrayList());
        resultPOJO.setHasError(Boolean.FALSE);
        resultPOJO.setStatusCode(GenericStatus.Service_Successed);
        if (resullt != null) {
            resultPOJO.getResult().add(resullt);
        }
        return JsonUtil.toJson(resultPOJO);
    }

    @Path("getCacheDetail")
    @POST
    @Produces("application/json")
    public String getCacheDetail(@FormParam("queryJson") String queryJson) throws IOException {
        QueryPOJO pojo = (QueryPOJO) JsonUtil.toPojo(queryJson, QueryPOJO.class);
        String cacheCategory = (String) pojo.getEqMap().get("cacheCategory");
        String cacheName = (String) pojo.getEqMap().get("cacheName");
        Object resullt = GenericCachePool.getCacheDetail(cacheCategory, cacheName);
        ResponsePOJO resultPOJO = new ResponsePOJO();
        resultPOJO.setResult(new ArrayList());
        resultPOJO.setHasError(Boolean.FALSE);
        resultPOJO.setStatusCode(GenericStatus.Service_Successed);
        if (resullt != null) {
            resultPOJO.getResult().add(resullt);
        }
        return JsonUtil.toJson(resultPOJO);
    }

    @Path("setCacheDetail")
    @POST
    @Produces("application/json")
    public String setCacheDetail(@FormParam("queryJson") String queryJson) throws IOException {
        QueryPOJO pojo = (QueryPOJO) JsonUtil.toPojo(queryJson, QueryPOJO.class);
        String cacheCategory = (String) pojo.getEqMap().get("cacheCategory");
        String cacheName = (String) pojo.getEqMap().get("cacheName");
        String cacheDetail = (String) pojo.getEqMap().get("cacheDetail");

        GenericCachePool.setCacheDetail(cacheCategory, cacheName, cacheDetail);
        ResponsePOJO resultPOJO = new ResponsePOJO();
        resultPOJO.setHasError(Boolean.FALSE);
        resultPOJO.setStatusCode(GenericStatus.Service_Successed);
        return JsonUtil.toJson(resultPOJO);
    }

    @Path("cleanCache")
    @POST
    @Produces("application/json")
    public String cleanCache(@FormParam("queryJson") String queryJson) throws IOException {
        QueryPOJO pojo = (QueryPOJO) JsonUtil.toPojo(queryJson, QueryPOJO.class);
        String cacheCategory = (String) pojo.getEqMap().get("cacheCategory");
        String cacheName = (String) pojo.getEqMap().get("cacheName");
        GenericCachePool.cleanCache(cacheCategory, cacheName);
        ResponsePOJO resultPOJO = new ResponsePOJO();
        resultPOJO.setHasError(Boolean.FALSE);
        resultPOJO.setStatusCode(GenericStatus.Service_Successed);
        return JsonUtil.toJson(resultPOJO);
    }
}
