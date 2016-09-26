package v2.service.scripter;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import v2.service.generic.library.model.QueryPOJO;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.library.model.http.HttpResponsePOJO;
import v2.service.generic.library.utils.HttpClientUtil;
import v2.service.generic.library.utils.JsonUtil;

public class ConfigurationUtil {

    static boolean isDev = false;
    private static String instance = null;

    public static String getRequestURL() {
        return getLocalAddressURL() + "service_generic_query/api/query/native";
    }

    public static String getLocalAddressURL() {
        String localAddress = "";
        try {
            if (isDev) {
                localAddress = ConfigurationUtil.getValue("nativeServerAddress", "http://localhost:41535/service_generic_query/api/query/native");
            } else {
                if (instance == null) {
                    synchronized (ConfigurationUtil.class) {
                        instance = ConfigurationUtil.getValue("nativeServerAddress", "http://localhost:8080/service_generic_query/api/query/native");
                    }
                }
                localAddress = instance;
            }

            if ("".equalsIgnoreCase(localAddress)) {
                localAddress = "localhost:8080";
            }

        } catch (Exception ex) {
            Logger.getLogger(ConfigurationUtil.class.getName()).log(Level.SEVERE, null, ex);
        }
        String url = "http://" + localAddress + "/";
        return url;
    }

    public static String getValue(String key, String url) throws Exception {
        if (url == null || "".equalsIgnoreCase(url)) {
            url = getRequestURL();
        }
        QueryPOJO query = new QueryPOJO();
        query.setClassName("Genericentity");
        query.setPageMaxSize(1);
        query.setCurrentPageNumber(1);
        Map eq = new HashMap();
        eq.put("type", "SCRIPTER_PROPERTIES_CONFIGURATION");
        eq.put("name", key);
        query.setEqMap(eq);
        String jsonRequest = JsonUtil.toJsonWithoutEmpth(query);
        HttpResponsePOJO pojo = HttpClientUtil.jsonRequest(url, jsonRequest, "POST", null);
        QueryResultPOJO result = JsonUtil.toPojo(pojo.getBody(), QueryResultPOJO.class);
        if (result.getResult().size() > 0) {
            return JsonUtil.getValue(JsonUtil.toJson(result.getResult().get(0)), "description");
        } else {
            return "";
        }

    }

}
