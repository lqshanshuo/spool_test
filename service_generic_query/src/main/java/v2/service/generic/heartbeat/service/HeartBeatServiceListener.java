
package v2.service.generic.heartbeat.service;
import java.util.logging.Logger;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class HeartBeatServiceListener implements ServletContextListener {

    private Logger logger = Logger.getLogger(HeartBeatServiceListener.class.getName());
    
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        logger.info("HeartBeatServiceListener context initialized...");
        HeartBeatManager.getInstance().initialize();
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        logger.info("HeartBeatServiceListener context destroyed...");
        HeartBeatManager.getInstance().destory();
    }
}
