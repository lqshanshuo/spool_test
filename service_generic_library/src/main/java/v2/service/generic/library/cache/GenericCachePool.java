package v2.service.generic.library.cache;

import java.util.HashMap;
import java.util.Map;

public class GenericCachePool {

    private static GenericCachePool instance = null;

    private Map<String, GenericCache> cachePool = new HashMap<>();

    private GenericCachePool() {

    }

    public static GenericCachePool getInstance() {
        if (instance == null) {
            synchronized (GenericCachePool.class) {
                instance = new GenericCachePool();
            }
        }
        return instance;
    }

    
    public static Map getCachePool(){
        return GenericCachePool.getInstance().cachePool;
    }
    
    
    public static Object getCacheDetail(String cacheCategory, String cacheName) {
        Object result = null;
        if (GenericCachePool.getInstance().cachePool.containsKey(cacheCategory)) {
            GenericCache cache = GenericCachePool.getInstance().cachePool.get(cacheCategory);
            if (cache!=null && cache.getCache().containsKey(cacheName)) {
                result = cache.getCache().get(cacheName);
            }
        }

        return result;
    }

    public static void setCacheDetail(String cacheCategory, String cacheName, Object cacheDetail) {
        if (GenericCachePool.getInstance().cachePool.containsKey(cacheCategory)) {
            GenericCache cache = GenericCachePool.getInstance().cachePool.get(cacheCategory);
            if (cache != null) {
                cache.getCache().put(cacheName, cacheDetail);
            } else {
                cache = new GenericCache();
                cache.getCache().put(cacheName, cacheDetail);
            }

        } else {
            GenericCache cache = new GenericCache();
            cache.getCache().put(cacheName, cacheDetail);
            GenericCachePool.getInstance().cachePool.put(cacheCategory, cache);
        }
    }

    public static void cleanCache(String cacheCategory, String cacheName) {

        if (cacheCategory == null || "".equalsIgnoreCase(cacheCategory)) {
            GenericCachePool.getInstance().cachePool.clear();
        } else if (cacheName == null || "".equalsIgnoreCase(cacheName)) {
            GenericCache cache = GenericCachePool.getInstance().cachePool.get(cacheCategory);
            if(cache!=null){
                cache.getCache().clear();
            }
        }else{
            GenericCache cache = GenericCachePool.getInstance().cachePool.get(cacheCategory);
            if (cache!=null && cache.getCache().containsKey(cacheName)) {
                cache.getCache().remove(cacheName);
            }
        }

    }
}
