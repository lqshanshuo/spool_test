/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.zgpa.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import static v2.service.generic.library.constants.GenericStatus.Service_Failed;
import static v2.service.generic.library.constants.GenericStatus.Service_Successed;
import v2.service.generic.library.model.QueryPOJO;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.library.model.ResponsePOJO;
import v2.service.generic.library.model.http.HttpResponsePOJO;
import v2.service.generic.library.utils.HttpClientUtil;
import v2.service.generic.library.utils.JsonUtil;
import v2.zgpa.ZgpaContext;
import v2.zgpa.model.Stuffentity;
import v2.zgpa.model.RequestPOJO;

/**
 *
 * @author zoudan
 */
@Stateless
@Path("account")
public class loginResource {

    private static final String Succeesed = "SUCCEESED";
    private static final String Failed = "FAILED";
    private static final String QueryUrl = "http://localhost:8080/service_generic_query/api/query/native";

    @POST
    @Path("login")
    public String login(@FormParam("queryJson") String queryJson,
            @Context HttpServletRequest httpRequest) throws IOException {

        HttpSession session = httpRequest.getSession();
        String session_id = session.getId();

        String result = "";
        boolean hasError = true;
        String errMsg = "Service Unknown Error";
        int statusCode = Service_Failed;
        String status = Failed;
        List<String> result_list = new ArrayList();
        try {
            RequestPOJO request = JsonUtil.toPojo(queryJson, RequestPOJO.class);

            String name = request.getName();
            String passwd = request.getPasswd();

            QueryPOJO query = new QueryPOJO();
            query.setClassName("Stuffentity");
            query.setPageMaxSize(1);
            query.setCurrentPageNumber(1);
            Map eq = new HashMap();
            eq.put("type", "STUFF_INFO");
            eq.put("personal_code", name);
            query.setEqMap(eq);
            String jsonRequest = JsonUtil.toJsonWithoutEmpth(query);
            HttpResponsePOJO pojo = HttpClientUtil.jsonRequest(QueryUrl, jsonRequest, "POST", null);
            QueryResultPOJO queryResult = JsonUtil.toPojo(pojo.getBody(), QueryResultPOJO.class);

            if (queryResult.getResult().size() > 1) {
//                return JsonUtil.getValue(JsonUtil.toJson(result.getResult().get(0)), "description");
                hasError = true;
                errMsg = "业务代码存在多条记录";
                System.out.println("业务代码存在多条记录");
            } else if (queryResult.getResult().isEmpty()) {
                System.out.println("业务代码不存在");
                hasError = true;
                errMsg = "业务代码不存在";

            } else {
                String user_message = JsonUtil.toJson(queryResult.getResult().get(0));
                System.out.println("-------------------- " + user_message);
                Stuffentity userPOJO = JsonUtil.toPojo(user_message, Stuffentity.class);
                String id_number = userPOJO.getId_last_four();
                if (id_number.length() < 4) {
                    hasError = true;
                    errMsg = "密码错误";
                } else {
                    String pwd = id_number.substring(id_number.length() - 4, id_number.length());
                    System.out.println("----------pwd = " + pwd);
                    if (pwd.equals(passwd)) {
                        hasError = false;
                        errMsg = "";

                        result_list.add(user_message);
                        statusCode = Service_Successed;
                        status = Succeesed;

                        ZgpaContext.userMap.put(session_id, userPOJO);

                    } else {
                        hasError = true;
                        errMsg = "密码错误";
                    }
                }

            }
        } catch (Exception ex) {
            errMsg = ex.getMessage();
            Logger.getLogger(loginResource.class.getName()).log(Level.SEVERE, null, ex);
        }
        ResponsePOJO response = new ResponsePOJO(hasError, errMsg, statusCode, status, result_list);
        result = JsonUtil.toJson(response);
        return result;
    }

    @POST
    @Path("getUserInfo")
    public String getUserInfo(@FormParam("queryJson") String queryJson,
            @Context HttpServletRequest httpRequest) throws IOException {

        HttpSession session = httpRequest.getSession();
        String session_id = session.getId();

        String result;
        boolean hasError = true;
        String errMsg = "No user info,Please login first";
        int statusCode = Service_Failed;
        String status = Failed;
        List<String> result_list = new ArrayList();

        for (Map.Entry<String, Stuffentity> entry : ZgpaContext.userMap.entrySet()) {
            if (entry.getKey().equals(session_id)) {
                Stuffentity userPOJO = entry.getValue();
                String user_message = JsonUtil.toJson(userPOJO);
                user_message = new String(user_message.getBytes(), "UTF-8");
//                System.out.println();
                hasError = false;
                errMsg = "";
                statusCode = Service_Successed;
                status = Succeesed;
                result_list.add(user_message);
            }
        }

        ResponsePOJO response = new ResponsePOJO(hasError, errMsg, statusCode, status, result_list);
        result = JsonUtil.toJson(response);
        return result;
    }

}
