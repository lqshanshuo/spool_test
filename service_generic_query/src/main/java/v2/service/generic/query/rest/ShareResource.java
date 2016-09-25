/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.query.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.FormParam;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import v2.service.generic.query.entity.Share;
import v2.service.generic.query.service.ShareService;
import v2.service.generic.library.constants.GenericStatus;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.library.model.ResponsePOJO;
import v2.service.generic.library.utils.JsonUtil;
import v2.service.generic.sharing.utils.HashUtil;

/**
 * REST Web Service
 *
 * @author root
 */
@Path("share")
public class ShareResource {

    @EJB
    private ShareService shareService;

    /**
     * Creates a new instance of MockResource
     */
    public ShareResource() {
    }

    @POST
    @Path("generate/{validity}")
    @Produces("application/json")
    public String success(@FormParam("shareJson") String shareJson, @PathParam("validity") long validity) throws IOException {
        Share pojo = (Share) JsonUtil.toPojo(shareJson, Share.class);
        Date date = new Date(System.currentTimeMillis());
        pojo.setCreatetime(date);
        pojo.setExpiretime(new Date(date.getTime() + validity * 1000 * 3600 * 24));
        pojo.setValid(Boolean.TRUE);
        String token = shareService.generate(pojo);
        ResponsePOJO result = new ResponsePOJO();
        result.setHasError(Boolean.FALSE);
        result.setStatusCode(GenericStatus.Service_Successed);

        List<String> list = new ArrayList<>();
        list.add(token);
        result.setResult(list);
        return JsonUtil.toJson(result);
    }

    @POST
    @Path("fetch/{token}")
    @Produces("application/json")
    public String fetch(@PathParam("token") String token) throws IOException {
        Share share = shareService.fetch(token);
        ResponsePOJO result = new ResponsePOJO();

        if (share.getValid() == false) {
            result.setHasError(Boolean.TRUE);
            result.setStatusCode(GenericStatus.Service_Failed);
            result.setErrorMessage("Token Invalid!");
            return JsonUtil.toJson(result);
        }

        if (share.getExpiretime().getTime() < System.currentTimeMillis()) {
            result.setHasError(Boolean.TRUE);
            result.setStatusCode(GenericStatus.Service_Failed);
            result.setErrorMessage("Token Expire!");
            return JsonUtil.toJson(result);
        }

        result.setHasError(Boolean.FALSE);
        result.setStatusCode(GenericStatus.Service_Successed);
        List<Share> list = new ArrayList<>();
        list.add(share);
        result.setResult(list);
        return JsonUtil.toJson(result);
    }

}
