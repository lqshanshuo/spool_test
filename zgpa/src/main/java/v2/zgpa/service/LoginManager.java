/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.zgpa.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import static v2.service.generic.library.constants.GenericStatus.Service_Failed;
import static v2.service.generic.library.constants.GenericStatus.Service_Successed;
import v2.service.generic.library.model.QueryPOJO;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.library.model.ResponsePOJO;
import v2.service.generic.library.model.http.HttpResponsePOJO;
import v2.service.generic.library.utils.HttpClientUtil;
import v2.service.generic.library.utils.JsonUtil;
import v2.zgpa.ZgpaContext;
import v2.zgpa.model.Qutuostaffentity;
import v2.zgpa.model.Yingxiaostaffentity;
import v2.zgpa.rest.LoginResource;

/**
 *
 * @author zoudan
 */
public class LoginManager {

    private static final String Succeesed = "SUCCEESED";
    private static final String Failed = "FAILED";
//    private static final String QueryUrl = "http://localhost:26446/service_generic_query/api/query/native";
    private static final String QueryUrl = "http://localhost:8080/service_generic_query/api/query/native";

    public static ResponsePOJO login(String personal_code, String passwd, String staff_type, String key) {

        boolean hasError = true;
        String errMsg = "Service Unknown Error";
        int statusCode = Service_Failed;
        String status = Failed;
        List<String> result_list = new ArrayList();

        try {

            String class_name = "";
            String type = "";

            if ("YINGXIAO".equals(staff_type)) {
                class_name = "Yingxiaostaffentity";
                type = "YINGXIAO_STAFF_INFO";
            } else if ("QUTUO".equals(staff_type)) {
                class_name = "Qutuostaffentity";
                type = "QUTUO_STAFF_INFO";
                System.out.println("type = " + type);

            }

            QueryPOJO query = new QueryPOJO();
            query.setClassName(class_name);
            query.setPageMaxSize(1);
            query.setCurrentPageNumber(1);
            Map eq = new HashMap();
            eq.put("type", type);
            eq.put("personal_code", personal_code);
            query.setEqMap(eq);
            String jsonRequest = JsonUtil.toJsonWithoutEmpth(query);
            HttpResponsePOJO pojo = HttpClientUtil.jsonRequest(QueryUrl, jsonRequest, "POST", null);
            QueryResultPOJO queryResult = JsonUtil.toPojo(pojo.getBody(), QueryResultPOJO.class);

            if (queryResult == null || queryResult.getResult() == null || queryResult.getResult().isEmpty()) {
                System.out.println("业务代码不存在");
                hasError = true;
                errMsg = "业务代码不存在";
            } else {
                String user_message = JsonUtil.toJson(queryResult.getResult().get(0));
                System.out.println("-------------------- " + user_message);
                Yingxiaostaffentity userPOJO1;
                Qutuostaffentity userPOJO2;
                String id_number;
                if ("YINGXIAO".equals(staff_type)) {
                    userPOJO1 = JsonUtil.toPojo(user_message, Yingxiaostaffentity.class);
                    id_number = userPOJO1.getId_last_four();
                } else {
                    userPOJO2 = JsonUtil.toPojo(user_message, Qutuostaffentity.class);
                    id_number = userPOJO2.getId_last_four();
                }

                String pwd = id_number;//id_number.substring(id_number.length() - 4, id_number.length());
                System.out.println("----------pwd = " + pwd);
                if (pwd.equals(passwd)) {
                    hasError = false;
                    errMsg = "";

                    result_list.add(user_message);
                    statusCode = Service_Successed;
                    status = Succeesed;

                    ZgpaContext.userMap.put(key, user_message);

                } else {
                    System.out.println("----------passwd = " + passwd);

                    hasError = true;
                    errMsg = "密码错误";
                }

            }
        } catch (Exception ex) {
            errMsg = ex.getMessage();
            Logger.getLogger(LoginResource.class.getName()).log(Level.SEVERE, null, ex);
        }
        ResponsePOJO response = new ResponsePOJO(hasError, errMsg, statusCode, status, result_list);
        return response;
    }
;
}
