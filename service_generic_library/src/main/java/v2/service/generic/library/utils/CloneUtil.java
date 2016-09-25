
package v2.service.generic.library.utils;

import java.lang.reflect.Method;

public class CloneUtil {
    public static Object fulfill(Object from, Object to) throws Exception{
    	Method[] methods = from.getClass().getDeclaredMethods();
    	for(Method m: methods){
    		if(m.getName().startsWith("get")){
    			Object value = m.invoke(from);
    			if(value!=null){
    				String methodName = m.getName();
        			String desMethod = methodName.replace("get","set");
        			Method[] tos = to.getClass().getDeclaredMethods();
        			for(Method me: tos){
        				String mn = me.getName();
        				if(mn.equalsIgnoreCase(desMethod)){
        					me.invoke(to, value);
        				}
        			}
    			}
    		}
    	}
    	return to;
    }
}
