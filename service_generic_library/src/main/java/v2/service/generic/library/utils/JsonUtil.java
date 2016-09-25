package v2.service.generic.library.utils;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import v2.service.generic.library.model.BasePOJO;

public class JsonUtil {

    public static <T> String toJson(T t) throws IOException, JsonGenerationException, JsonMappingException {
        ObjectMapper mapper = new ObjectMapper();
//        mapper.setSerializationInclusion(JsonSerialize.Inclusion.NON_NULL);
        String result = mapper.writeValueAsString(t);
        return result;
    }
    
    public static <T> String toJsonWithoutEmpth(T t) throws IOException, JsonGenerationException, JsonMappingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonSerialize.Inclusion.NON_NULL);
        String result = mapper.writeValueAsString(t);
        return result;
    }  

    public static <T> T toPojo(String jsonContent, Class<T> clazz) throws JsonParseException, JsonMappingException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        T t = (T) mapper.readValue(jsonContent, clazz);
        return t;
    }

    public static BasePOJO toExceptionPOJO(String description, String statusCode) {
        BasePOJO pojo = new BasePOJO();
        pojo.setName("EXCEPTION");
        pojo.setStatus(statusCode);
        pojo.setDescription(description);
        pojo.setCreateTime(new Timestamp(System.currentTimeMillis()));
        return pojo;
    }

    public static BasePOJO toExceptionPOJO(String description) {
        return toExceptionPOJO(description, "200");
    }
    
    public static String toExceptionJson(String description){
        String result = "";
        try {
            result = toJsonWithoutEmpth(toExceptionPOJO(description));
        } catch (IOException ex) {
            Logger.getLogger(JsonUtil.class.getName()).log(Level.SEVERE, null, ex);
        }
        return result;
    }

    public static BasePOJO toSuccessPOJO(String description) {
        BasePOJO pojo = new BasePOJO();
        pojo.setName("SUCCESS");
        pojo.setStatus("200");
        pojo.setDescription(description);
        pojo.setCreateTime(new Timestamp(System.currentTimeMillis()));
        return pojo;
    }

    public static boolean isNullOrEmptyCheck(String value) {
        if (value == null || "".equalsIgnoreCase(value)) {
            return true;
        }
        return false;
    }

    public static String getValue(String json,String key) throws Exception{
         ObjectMapper mapper = new ObjectMapper();

         JsonNode root = mapper.readTree(json);
         String result = root.path(key).asText();
         return result;
    }
}
