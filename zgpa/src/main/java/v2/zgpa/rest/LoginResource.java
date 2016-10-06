/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.zgpa.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.ejb.Stateless;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import static v2.service.generic.library.constants.GenericStatus.Service_Failed;
import static v2.service.generic.library.constants.GenericStatus.Service_Successed;
import v2.service.generic.library.model.ResponsePOJO;
import v2.service.generic.library.utils.JsonUtil;
import v2.zgpa.ZgpaContext;
import v2.zgpa.model.RequestPOJO;
import v2.zgpa.service.LoginManager;

/**
 *
 * @author zoudan
 */
@Stateless
@Path("account")
public class LoginResource {

    private static final String Succeesed = "SUCCEESED";
    private static final String Failed = "FAILED";

    @POST
    @Path("login")
    public String login(@FormParam("queryJson") String queryJson,
            @Context HttpServletRequest httpRequest) throws IOException {

        HttpSession session = httpRequest.getSession();
        String session_id = session.getId();

        RequestPOJO request = JsonUtil.toPojo(queryJson, RequestPOJO.class);
        String personal_code = request.getName();
        String passwd = request.getPasswd().toUpperCase();
        passwd = passwd.indexOf("X")<0?passwd.replaceFirst("^0*", ""):passwd;
        String staff_type = request.getParam1();

        String key = staff_type + session_id;

        ResponsePOJO response;

        if ("YINGXIAO".equals(staff_type) || "QUTUO".equals(staff_type)) {
            System.out.println(personal_code);
            System.out.println(passwd);
            response = LoginManager.login(personal_code, passwd, staff_type, key);
        } else if ("YINGXIAO_OR_QUTUO".equals(staff_type)) {
            response = LoginManager.login(personal_code, passwd, "YINGXIAO", key);
            if (response.getHasError() && "业务代码不存在".equals(response.getErrorMessage())) {
                response = LoginManager.login(personal_code, passwd, "QUTUO", key);
            }
        } else {
            response = new ResponsePOJO(true, "未知登录类型", Service_Failed, Failed, new ArrayList());
        }
        String result = JsonUtil.toJson(response);
        return result;
    }

    @POST
    @Path("getUserInfo")
    public String getUserInfo(@FormParam("queryJson") String queryJson,
            @Context HttpServletRequest httpRequest) throws IOException {

        RequestPOJO request = JsonUtil.toPojo(queryJson, RequestPOJO.class);
        HttpSession session = httpRequest.getSession();
        String session_id = session.getId();
        String staff_type = request.getParam1();

        String key = staff_type + session_id;

        String result;
        boolean hasError = true;
        String errMsg = "No user info,Please login first";
        int statusCode = Service_Failed;
        String status = Failed;
        List<String> result_list = new ArrayList();

        for (Map.Entry<String, String> entry : ZgpaContext.userMap.entrySet()) {
            if (entry.getKey().equals(key)) {
//                Staffentity00 userPOJO = entry.getValue();
//                String user_message = JsonUtil.toJson(userPOJO);
                String user_message = entry.getValue();
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
    @POST
    @Path("getUserInfo2")
    public String getUserInfo2(@FormParam("queryJson") String queryJson,
            @Context HttpServletRequest httpRequest) throws IOException {

        RequestPOJO request = JsonUtil.toPojo(queryJson, RequestPOJO.class);
        HttpSession session = httpRequest.getSession();
        String session_id = session.getId();
        String staff_type = request.getParam1();

        String key = staff_type + session_id;

        String result;
        boolean hasError = true;
        String errMsg = "No user info,Please login first";
        int statusCode = Service_Failed;
        String status = Failed;
        List<String> result_list = new ArrayList();

        for (Map.Entry<String, String> entry : ZgpaContext.userMap.entrySet()) {
            if (entry.getKey().equals(key)) {
//                Staffentity00 userPOJO = entry.getValue();
//                String user_message = JsonUtil.toJson(userPOJO);
                String user_message = entry.getValue();
//                user_message = new String(user_message.getBytes(), "UTF-8");
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
