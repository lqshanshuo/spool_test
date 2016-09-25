/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.heartbeat.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.ejb.Schedule;
import javax.ejb.Singleton;
import v2.service.generic.library.model.QueryPOJO;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.query.entity.Genericentity;
import v2.service.generic.query.service.QueryService;

/**
 *
 * @author root
 */
@Singleton
public class HeartBeatMonitor {

    private Logger logger = Logger.getLogger(HeartBeatMonitor.class.getName());
    @EJB
    QueryService queryService;
    
    private boolean isStop = false;
    public void isStop(boolean isStop) {
        this.isStop = isStop;
    }
    public HeartBeatMonitor() {
        super();
        logger.log(Level.INFO, "init HeartBeatMonitor !");
        HeartBeatManager.getInstance().monitor = this;
    }

    /**
     * 1 retrieve heart beat pre-check resource list 
     * 2 compare and synchronize resource list with the heart beat manager resource pool 
     * 2.1 list has & pool has, ignore 
     * 2.2 list has & pool not, create new heart beat check thread, add to pool 
     * 2.3 list not & pool has, shutdown thread, remove it from pool
     *
     */
    @Schedule(second = "*/10", minute = "*", hour = "*", persistent = false)
    public void scan() {
        if (!isStop) {
            try {
//                logger.log(Level.INFO, "heart beat monitor say hi to every sub system!");
                QueryResultPOJO result = retrieveResource();
                if (result != null && (!result.getHasError())) {
                    List<Genericentity> resourceList = result.getResult();
                    Map<String,String> tmpMap = new HashMap<>();
                    if (resourceList != null & resourceList.size() > 0) {
                        
                        for(Genericentity entity: resourceList){
                            String resource_name = entity.getName();
                            tmpMap.put(resource_name, resource_name);
                            if(HeartBeatManager.getInstance().resourcePool.containsKey(resource_name)){
                               //2.1 list has & pool has, ignore 
                                HeartBeatManager.getInstance().checkHeatBeatCheckThread(entity);
//                                Logger.getLogger(HeartBeatMonitor.class.getName()).log(Level.INFO,"ignore...");
                            }else{
                               //2.2 list has & pool not, create new heart beat check thread, add to pool 
//                                Logger.getLogger(HeartBeatMonitor.class.getName()).log(Level.INFO,"addHeatBeatCheckThread...");
                                HeartBeatManager.getInstance().addHeatBeatCheckThread(entity);
                            }
                        }
                        
                    }
                    Set<String> poolKeys = HeartBeatManager.getInstance().resourcePool.keySet();
                        for(String poolKey:poolKeys){
                            if(!tmpMap.containsKey(poolKey)){
                                // 2.3 list not & pool has, shutdown thread, remove it from pool
//                                Logger.getLogger(HeartBeatMonitor.class.getName()).log(Level.INFO,"removeHeatBeatCheckThread...");
                                HeartBeatManager.getInstance().removeHeatBeatCheckThread(poolKey);
                            }
                        }
                }

            } catch (Exception ex) {
                Logger.getLogger(HeartBeatMonitor.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
            }
        }

    }



    private QueryResultPOJO retrieveResource() throws Exception {
        QueryResultPOJO result = null;
        QueryPOJO query = new QueryPOJO();
        query.setClassName("Genericentity");
        query.setPageMaxSize(100);
        query.setCurrentPageNumber(1);
        Map eq = new HashMap();
        eq.put("type", "HEART_BEAT_RESOURCE");
        query.setEqMap(eq);
        
        if(queryService!=null){
            result = queryService.query(query);
        }
        
        return result;
    }
}
