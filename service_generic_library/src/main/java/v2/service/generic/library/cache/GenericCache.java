
package v2.service.generic.library.cache;

import java.util.HashMap;
import java.util.Map;
import v2.service.generic.library.model.BasePOJO;

public class GenericCache extends BasePOJO{
    private Map cache = new HashMap();

    public Map getCache() {
        return cache;
    }

    public void setCache(Map cache) {
        this.cache = cache;
    }
    
}
