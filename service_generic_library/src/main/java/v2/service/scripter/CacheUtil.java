package v2.service.scripter;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import v2.service.generic.library.model.QueryPOJO;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.library.model.ResponsePOJO;
import v2.service.generic.library.model.http.HttpResponsePOJO;
import v2.service.generic.library.utils.HttpClientUtil;
import v2.service.generic.library.utils.JsonUtil;
import static v2.service.scripter.ConfigurationUtil.getLocalAddressURL;

public class CacheUtil {

    private static String instance = null;

    public static String getCacheDetail(String cacheCategory, String cacheName) throws Exception {
        QueryPOJO query = new QueryPOJO();
        Map eq = new HashMap();
        eq.put("cacheCategory", cacheCategory);
        eq.put("cacheName", cacheName);
        query.setEqMap(eq);
        String jsonRequest = JsonUtil.toJsonWithoutEmpth(query);
        HashMap map = new HashMap<>();
        map.put("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        HttpResponsePOJO pojo = HttpClientUtil.jsonRequest(getLocalAddressURL()+"service_generic_query/api/genericCache/getCacheDetail", "queryJson="+jsonRequest, "POST", map);
        ResponsePOJO result = JsonUtil.toPojo(pojo.getBody(), ResponsePOJO.class);
        if (result.getResult().size() > 0) {
            return result.getResult().get(0).toString();
        } else {
            return "";
        }
    }

    public static boolean setCacheDetail(String cacheCategory, String cacheName, String cacheDetail) throws Exception {
        QueryPOJO query = new QueryPOJO();
        Map eq = new HashMap();
        eq.put("cacheCategory", cacheCategory);
        eq.put("cacheName", cacheName);
        eq.put("cacheDetail", cacheDetail);
        query.setEqMap(eq);
        String jsonRequest = JsonUtil.toJsonWithoutEmpth(query);
        HashMap map = new HashMap<>();
        map.put("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        HttpResponsePOJO pojo = HttpClientUtil.jsonRequest(getLocalAddressURL()+"service_generic_query/api/genericCache/setCacheDetail", "queryJson="+jsonRequest, "POST", map);
        ResponsePOJO result = JsonUtil.toPojo(pojo.getBody(), ResponsePOJO.class);
        if (result.getStatusCode()==200) {
            return true;
        } else {
            return false;
        }
    }
    
    public static boolean cleanCache(String cacheCategory, String cacheName) throws Exception {
        QueryPOJO query = new QueryPOJO();
        Map eq = new HashMap();
        eq.put("cacheCategory", cacheCategory);
        eq.put("cacheName", cacheName);
        query.setEqMap(eq);
        String jsonRequest = JsonUtil.toJsonWithoutEmpth(query);
        HashMap map = new HashMap<>();
        map.put("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        HttpResponsePOJO pojo = HttpClientUtil.jsonRequest(getLocalAddressURL()+"service_generic_query/api/genericCache/cleanCache", "queryJson="+jsonRequest, "POST", map);
        ResponsePOJO result = JsonUtil.toPojo(pojo.getBody(), ResponsePOJO.class);
        if (result.getStatusCode()==200) {
            return true;
        } else {
            return false;
        }
    }
}
