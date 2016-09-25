/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.query.service;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import v2.service.generic.library.constants.GenericStatus;
import v2.service.generic.library.model.CUDPOJO;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.library.model.ResponsePOJO;

@Stateless
public class CUDService {

    @PersistenceContext(unitName = "queryPU")
    private EntityManager em;

    protected EntityManager getEntityManager() {
        return em;
    }

    public ResponsePOJO add(CUDPOJO pojo) {
        ResponsePOJO result = new ResponsePOJO();
        try {
            Object object = build(pojo, null);
            em.persist(object);
            em.flush();
            List result_list = new ArrayList();
            result_list.add(object);
            result.setResult(result_list);
            result.setHasError(Boolean.FALSE);
            result.setStatusCode(GenericStatus.Service_Successed);
        } catch (Exception e) {
            e.printStackTrace();
            result.setHasError(Boolean.TRUE);
            result.setErrorMessage(e.getMessage());
            result.setStatusCode(GenericStatus.Service_Failed);
        }
        return result;
    }

    public ResponsePOJO update(CUDPOJO pojo) {
        ResponsePOJO result = new ResponsePOJO();
        try {

            Object val = pojo.getAttributes().get("id");
            Long id_val = Long.parseLong(val.toString());
            Class clazz = Class.forName(pojo.getClassName());
            Object entity_in_db = em.find(clazz, id_val);
            Object object = build(pojo, entity_in_db);
            em.persist(object);
            em.flush();
            List result_list = new ArrayList();
            result_list.add(object);
            result.setResult(result_list);
            result.setHasError(Boolean.FALSE);
            result.setStatusCode(GenericStatus.Service_Successed);
        } catch (Exception e) {
            e.printStackTrace();
            result.setHasError(Boolean.TRUE);
            result.setErrorMessage(e.getMessage());
            result.setStatusCode(GenericStatus.Service_Failed);
        }
        return result;
    }

    public ResponsePOJO remove(CUDPOJO pojo) {
        ResponsePOJO result = new ResponsePOJO();
        try {
            Object val = pojo.getAttributes().get("id");
            Long id_val = Long.parseLong(val.toString());
            Class clazz = Class.forName(pojo.getClassName());
            Object entity_in_db = em.find(clazz, id_val);
            em.remove(entity_in_db);
            em.flush();
            List result_list = new ArrayList();
            result.setResult(result_list);
            result.setHasError(Boolean.FALSE);
            result.setStatusCode(GenericStatus.Service_Successed);
        } catch (Exception e) {
            e.printStackTrace();
            result.setHasError(Boolean.TRUE);
            result.setErrorMessage(e.getMessage());
            result.setStatusCode(GenericStatus.Service_Failed);
        }
        return result;
    }

    private Object build(CUDPOJO pojo, Object obj) throws ClassNotFoundException, InvocationTargetException, IllegalAccessException, IllegalArgumentException, InstantiationException {
        Class clazz = Class.forName(pojo.getClassName());
        Object object = null;
        if (obj == null) {
            object = clazz.newInstance();
        } else {
            object = obj;
        }

        Method[] methods = clazz.getDeclaredMethods();
        for (Method m : methods) {
            if (m.getName().startsWith("set")) {
                String methodName = m.getName();

                Map attMap = pojo.getAttributes();
                Set<String> keys = attMap.keySet();
                for (String key : keys) {
                    if (methodName.equalsIgnoreCase("set" + key)) {
                        Object val = attMap.get(key);
                        if (val instanceof Integer) {
                            try {
                                Long long_val = Long.parseLong(val.toString());
                                m.invoke(object, long_val);
                            } catch (java.lang.IllegalArgumentException e) {
                                BigInteger _val = new BigInteger(val.toString());
                                m.invoke(object, _val);
                            }

                        } else {
                            m.invoke(object, val);
                        }

                    }
                }

            }
        }
        return object;
    }

}
