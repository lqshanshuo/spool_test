package v2.service.generic.heartbeat.service;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.logging.Logger;
import v2.service.generic.query.entity.Genericentity;

public class HeartBeatManager {

    private Logger loger = Logger.getLogger(HeartBeatManager.class.getName());
    private static HeartBeatManager instance = null;

    public HeartBeatMonitor monitor;

    private static ExecutorService scheduler = Executors.newCachedThreadPool();

    public Map<String, Thread> resourcePool = new ConcurrentHashMap<>();

    public Map<String, String> checkResult = new ConcurrentHashMap<>();

    private HeartBeatManager() {

    }

    public static HeartBeatManager getInstance() {
        if (instance == null) {
            synchronized (HeartBeatManager.class) {
                instance = new HeartBeatManager();
            }
        }
        return instance;
    }

    public void initialize() {

    }

    public void destory() {
        Set<String> keys = resourcePool.keySet();
        for (String key : keys) {
            removeHeatBeatCheckThread(key);
        }
        scheduler.shutdown();
        if (monitor != null) {
            monitor.isStop(true);
        }
        checkResult.clear();
    }

    public void addHeatBeatCheckThread(Genericentity config) {
        if (config != null) {
            HeartBeatCheckThread thread = new HeartBeatCheckThread();
            thread.setConfig(config);
            resourcePool.put(config.getName(), thread);
            scheduler.submit(thread);

//            loger.log(Level.INFO, "Heart Beat [" + config.getName() + "] has been added to heart beat resource pool!");
        }
    }

    public void removeHeatBeatCheckThread(String name) {
        if (name != null) {
            if (resourcePool.containsKey(name)) {
                HeartBeatCheckThread thread = (HeartBeatCheckThread) resourcePool.get(name);
                resourcePool.remove(name);
                thread.setDone(true);
//                loger.log(Level.INFO, "Heart Beat [" + name + "] has been removed from heart beat resource pool!");
            }
        }
    }

    public void checkHeatBeatCheckThread(Genericentity config) {
        if (config != null) {
            HeartBeatCheckThread thread = (HeartBeatCheckThread) resourcePool.get(config.getName());
            Genericentity originalConfig = thread.getConfig();
            boolean compareFlag = compare(config, originalConfig);
            if (!compareFlag) {
                removeHeatBeatCheckThread(config.getName());
            }
//            loger.log(Level.INFO, "Heart Beat [" + config.getName() + "] has been checked to heart beat resource pool!");
        }
    }

    private boolean compare(Genericentity from, Genericentity to) {
        if (from.equals(to)) {
            return true;
        }
        return false;
    }
}
