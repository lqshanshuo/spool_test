
package v2.service.generic.library;

import java.util.HashMap;
import java.util.Map;
import v2.service.generic.library.model.QueryPOJO;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.library.model.http.HttpResponsePOJO;
import v2.service.generic.library.utils.HttpClientUtil;
import v2.service.generic.library.utils.JsonUtil;
import v2.service.scripter.ConfigurationUtil;
import static v2.service.scripter.ConfigurationUtil.getRequestURL;


public class GetConfigurationValueExample {
    public static void main(String[] args) throws Exception {
        String result = test();
        System.out.println("result is:"+result);
//         System.out.println(ConfigurationUtil.getValue("runningjob.rooturl_prefix","http://localhost:41535/service_generic_query/api/query/native"));
    }
    
    
    public static String test() throws Exception {

        QueryPOJO query = new QueryPOJO();
        query.setClassName("Genericentity");
        query.setPageMaxSize(1);
        query.setCurrentPageNumber(1);
        Map eq = new HashMap();
        eq.put("id", 258);
        query.setEqMap(eq);
        String jsonRequest = JsonUtil.toJsonWithoutEmpth(query);
        HttpResponsePOJO pojo = HttpClientUtil.jsonRequest("http://localhost:41535/service_generic_query/api/query/native", jsonRequest, "POST", null);
        QueryResultPOJO result = JsonUtil.toPojo(pojo.getBody(), QueryResultPOJO.class);
        if (result.getResult().size() > 0) {
            return JsonUtil.getValue(JsonUtil.toJson(result.getResult().get(0)), "description");
        } else {
            return "";
        }

    }
}
