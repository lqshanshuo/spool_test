/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.heartbeat.service;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import v2.service.generic.library.model.http.HttpResponsePOJO;
import v2.service.generic.library.utils.HttpClientUtil;
import v2.service.generic.library.utils.JsonUtil;
import v2.service.generic.query.entity.Genericentity;
import v2.service.scripter.CacheUtil;
import v2.service.scripter.ScripterConstants;

/**
 *
 * @author root
 */
@Stateless
public class HeartBeatCheckThread extends Thread {

    private volatile boolean done = false;
    private Genericentity config;

    private int threshold = 1000;
    private int sleepSec = 5;
    String lastStatus = "";

    public void setConfig(Genericentity config) {
        this.config = config;
    }

    public Genericentity getConfig() {
        return config;
    }

    @Override
    public String toString() {
        String result = "";
        if (config != null) {
            try {
                result = JsonUtil.toJson(config);
            } catch (IOException ex) {
                Logger.getLogger(HeartBeatCheckThread.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return result;
    }

    public void run() {
        while (!done) {
            String key = config.getName();
            String url = config.getDescription();
            String stringalpha = config.getStringalpha();
            try {
//                System.out.println("Heart Beat Check Thread morning!");
                String message = toString();
                if (!"".equalsIgnoreCase(message)) {
//                    Logger.getLogger(HeartBeatCheckThread.class.getName()).log(Level.INFO, message);

                    HttpResponsePOJO result = HttpClientUtil.jsonRequest("http://"+url, null, "GET", null);
                    lastStatus = CacheUtil.getCacheDetail(ScripterConstants.CACHE_NAME_SCRIPTER_HEALTH_CHECK, key);
                    if (result.getStatusCode() >= 300 || !result.getBody().contains(stringalpha)) {
                        if ("normal".equals(lastStatus) || "".equals(lastStatus)) {
                            update(key,"abnormal");
                            threshold = 10;
                        } else if ("abnormal".equals(lastStatus)) {
                            threshold--;
                            if (threshold < 1) {
                                update(key,"death");
                                sleepSec = 5;
                            }
                        }
                    } else {
                        update(key,"normal");
                    }
                }
            } catch (Exception ex) {
                try {
                    update(key,"death");
                } catch (Exception ex1) {
                    Logger.getLogger(HeartBeatCheckThread.class.getName()).log(Level.SEVERE, null, ex1);
                }
                sleepSec = 30;
            } finally {
                try {
                    Thread.sleep(1000 * sleepSec);
                } catch (InterruptedException ex) {
                    Logger.getLogger(HeartBeatCheckThread.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
    }

    public void setDone(boolean done) {
        this.done = done;
    }
    public void update(String key, String status) throws Exception {
        if(!lastStatus.equals(status)){
            Logger.getLogger(HeartBeatCheckThread.class.getName()).log(Level.WARNING, key+"'s status change to "+status, key+"'s status change to "+status);
        }
        CacheUtil.setCacheDetail(ScripterConstants.CACHE_NAME_SCRIPTER_HEALTH_CHECK, key, status);
    }

}
