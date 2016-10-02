/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.query.service;

import com.alibaba.fastjson.JSON;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.codehaus.jackson.map.JsonMappingException;
import org.eclipse.persistence.jaxb.JAXBContextProperties;
import v2.service.generic.library.constants.GenericStatus;
import v2.service.generic.library.model.QueryPOJO;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.library.utils.CloneUtil;
import v2.service.generic.library.utils.JsonUtil;
import v2.service.generic.query.entity.Genericentity;


@Stateless
public class QueryService {

    @PersistenceContext(unitName = "queryPU")
    private EntityManager em;

    protected EntityManager getEntityManager() {
        return em;
    }

    public QueryResultPOJO testAdd() {
        try {
            Class clazz = Class.forName("v2.service.generic.query.entity.ZEntity");
            Object object = clazz.newInstance();
            Method[] methods = clazz.getDeclaredMethods();
            for (Method m : methods) {
                if (m.getName().startsWith("set")) {
                    String methodName = m.getName();
                    if (methodName.equalsIgnoreCase("setName")) {
                        m.invoke(object, "LYTest" + System.currentTimeMillis());
                    }
                }
            }
            em.persist(object);
            em.flush();

            QueryResultPOJO queryResultPOJO = new QueryResultPOJO();
            queryResultPOJO.setCurrentPageNumber(1);
            queryResultPOJO.setPageMaxSize(1);
            queryResultPOJO.setCurrentPageSize(1);
            queryResultPOJO.setHasError(Boolean.FALSE);
            queryResultPOJO.setStatusCode(GenericStatus.Service_Successed);
            return queryResultPOJO;
        } catch (Exception e) {
            QueryResultPOJO queryResultPOJO = new QueryResultPOJO();
            queryResultPOJO.setHasError(Boolean.TRUE);
            queryResultPOJO.setErrorMessage(e.getMessage());
            queryResultPOJO.setStatusCode(GenericStatus.Service_Failed);
            return queryResultPOJO;
        }
    }

    

    public boolean cascadeImport(String jsonString) {
        try {
            List<Genericentity> genericentityList = JSON.parseObject(jsonString, new TypeToken<List<Genericentity>>(){}.getType());
            for(Genericentity genericentity : genericentityList){
                em.persist(genericentity);
            }
        } catch (Exception ex) {
            Logger.getLogger(QueryService.class.getName()).log(Level.WARNING, null, ex);
            return false;
        }
        return true;
    }

    private void clearChildrenIdAndParentId(Genericentity genericentity) {
        Set<Genericentity> set = genericentity.getChildren();
        if (set.size() == 0) {
            return;
        }
        for (Genericentity g : set) {
            g.setId(null);
            g.setParentid(null);
            clearChildrenIdAndParentId(g);
        }
    }

    public String cascadeExport(Long id,boolean flag) throws IOException {
        Genericentity genericentity = em.find(Genericentity.class, id);
        Genericentity g = JsonUtil.toPojo(JsonUtil.toJson(genericentity), Genericentity.class);
        g.setId(null);
        clearChildrenIdAndParentId(g);
        List<Genericentity> returnList = new ArrayList<>();
        returnList.add(g);
        return JsonUtil.toJson(returnList);
    }

    public String cascadeExport(String condition,boolean flag) throws IOException, Exception {
        condition = "".equals(condition)?"1=1":condition;
        List<Genericentity> genericentityList = em.createNativeQuery("SELECT * FROM Genericentity g WHERE "+condition,Genericentity.class)
                .getResultList();
        if (genericentityList.isEmpty()) {
            return null;
        }
        List<Genericentity> returnList = new ArrayList<>();
        for (Genericentity genericentity : genericentityList) {
            Genericentity g = new Genericentity();
            g = JsonUtil.toPojo(JsonUtil.toJson(genericentity), Genericentity.class);
            g.setId(null);
            if(flag){
                clearChildrenIdAndParentId(g);
            }else{
                g.setChildren(null);
            }
            returnList.add(g);
        }
        return JsonUtil.toJson(returnList);
    }

    public QueryResultPOJO query(QueryPOJO queryPOJO) {
        try {
            String query_from_part = "FROM " + queryPOJO.getClassName() + " entity";

            String eq_sql_part = eqBuilder(queryPOJO);
            if (eq_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + eq_sql_part;
            }

            String eqOr_sql_part = eqOrBuilder(queryPOJO);
            if (eqOr_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + eqOr_sql_part;
            }

            String nq_sql_part = nqBuilder(queryPOJO);
            if (nq_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + nq_sql_part;
            }

            String nqOr_sql_part = nqOrBuilder(queryPOJO);
            if (nqOr_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + nqOr_sql_part;
            }

            String like_sql_part = likeBuilder(queryPOJO);
            if (like_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + like_sql_part;
            }

            String likeOr_sql_part = likeOrBuilder(queryPOJO);
            if (likeOr_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + likeOr_sql_part;
            }

            String gt_sql_part = gtBuilder(queryPOJO);
            if (gt_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + gt_sql_part;
            }

            String gtOr_sql_part = gtOrBuilder(queryPOJO);
            if (gtOr_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + gtOr_sql_part;
            }

            String lt_sql_part = ltBuilder(queryPOJO);
            if (lt_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + lt_sql_part;
            }

            String ltOr_sql_part = ltOrBuilder(queryPOJO);
            if (ltOr_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + ltOr_sql_part;
            }

            String between_sql_part = betweenBuilder(queryPOJO);
            if (between_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + between_sql_part;
            }

            String betweenOr_sql_part = betweenOrBuilder(queryPOJO);
            if (betweenOr_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + betweenOr_sql_part;
            }

            String in_sql_part = inBuilder(queryPOJO);
            if (in_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + in_sql_part;
            }

            String inOr_sql_part = inOrBuilder(queryPOJO);
            if (inOr_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + inOr_sql_part;
            }

            String null_sql_part = nullBuilder(queryPOJO);
            if (null_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + null_sql_part;
            }

            String nullOr_sql_part = nullOrBuilder(queryPOJO);
            if (nullOr_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + nullOr_sql_part;
            }

            String notNull_sql_part = notNullBuilder(queryPOJO);
            if (notNull_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + notNull_sql_part;
            }

            String notNullOr_sql_part = notNullOrBuilder(queryPOJO);
            if (notNullOr_sql_part != null) {
                query_from_part = whereBuilder(query_from_part) + notNullOr_sql_part;
            }

            long totalCounts = getTotalCounts(query_from_part);

            String orderBy_sql_part = orderByBuilder(queryPOJO);
            if (orderBy_sql_part != null) {
                query_from_part = query_from_part + orderBy_sql_part;
            }

            String query_sql = "SELECT DISTINCT entity " + query_from_part;

//            System.out.println("The sql is:" + query_sql);
            Query query = em.createQuery(query_sql);

            query.setFirstResult((queryPOJO.getCurrentPageNumber() - 1) * queryPOJO.getPageMaxSize());
            query.setMaxResults(queryPOJO.getPageMaxSize());
            List result = query.getResultList();

            QueryResultPOJO queryResultPOJO = new QueryResultPOJO();
            queryResultPOJO.setCurrentPageNumber(queryPOJO.getCurrentPageNumber());
            queryResultPOJO.setPageMaxSize(queryPOJO.getPageMaxSize());
            queryResultPOJO.setCurrentPageSize(result.size());
            queryResultPOJO.setResult(result);
            queryResultPOJO.setTotalCounts(totalCounts);
            queryResultPOJO.setHasError(Boolean.FALSE);
            queryResultPOJO.setStatusCode(GenericStatus.Service_Successed);
            return queryResultPOJO;
        } catch (Exception e) {
            QueryResultPOJO queryResultPOJO = new QueryResultPOJO();
            queryResultPOJO.setHasError(Boolean.TRUE);
            queryResultPOJO.setErrorMessage(e.getMessage());
            queryResultPOJO.setStatusCode(GenericStatus.Service_Failed);
            return queryResultPOJO;
        }

    }

    private long getTotalCounts(String query_from_part) {
        // query_from_part should be like this : FROM ZEntity entity ...
        String query = "SELECT COUNT(entity.id) " + query_from_part;
        long countResult = (long) em.createQuery(query).getSingleResult();

        return countResult;
    }

    public QueryResultPOJO mockQuery() {
        QueryPOJO queryPOJO = new QueryPOJO();
        queryPOJO.setClassName("YEntity");
        queryPOJO.setPageMaxSize(5);
        queryPOJO.setCurrentPageNumber(1);

        Map<String, Object> eqMap = new HashMap<>();
        eqMap.put("description", "2");
//        eqMap.put("name", "Thu May 05 16:54:10 CST 2016");
//        queryPOJO.setEqMap(eqMap);
//        queryPOJO.setEqORMap(eqMap);
//        queryPOJO.setNqMap(eqMap);
//        queryPOJO.setNqORMap(eqMap);
//        queryPOJO.setLikeMap(eqMap);
//        queryPOJO.setLikeORMap(eqMap);
//        queryPOJO.setLtMap(eqMap);

//        Map<String, List<Object>> betweenMap = new HashMap<>();
//        List list = new ArrayList();
//        list.add(1);
//        list.add(2);
//        betweenMap.put("description", list);
//        queryPOJO.setBetweenMap(betweenMap);
//        Map<String, List<Object>> inMap = new HashMap<>();
//        List list = new ArrayList();
//        list.add(1);
//        list.add(3);
//        inMap.put("description", list);
//        queryPOJO.setInMap(inMap);
//        List<String> nullList = new ArrayList<>();
//        nullList.add("description");
//        queryPOJO.setIsNullList(nullList);
        Map<String, Boolean> orderMap = new HashMap<>();
        orderMap.put("name", Boolean.TRUE);
        orderMap.put("description", Boolean.FALSE);
        queryPOJO.setOrderMap(orderMap);

        return query(queryPOJO);
    }

    private String whereBuilder(String query_sql) {
        if (!query_sql.contains("WHERE")) {
            query_sql = query_sql + " WHERE ";
        } else {
            query_sql = query_sql + " AND ";
        }
        return query_sql;
    }

    private String eqBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getEqMap().size() > 0) {
                result = compareBuilder(queryPOJO.getEqMap(), "EQ");
            }
        }

        return result;
    }

    private String eqOrBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getEqORMap().size() > 0) {
                result = compareBuilder(queryPOJO.getEqORMap(), "EQ_OR");
            }
        }

        return result;
    }

    private String nqBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getNqMap().size() > 0) {
                result = compareBuilder(queryPOJO.getNqMap(), "NQ");
            }
        }

        return result;
    }

    private String nqOrBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getNqORMap().size() > 0) {
                result = compareBuilder(queryPOJO.getNqORMap(), "NQ_OR");
            }
        }

        return result;
    }

    private String likeBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getLikeMap().size() > 0) {
                result = compareBuilder(queryPOJO.getLikeMap(), "LIKE");
            }
        }
        return result;
    }

    private String likeOrBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getLikeORMap().size() > 0) {
                result = compareBuilder(queryPOJO.getLikeORMap(), "LIKE_OR");
            }
        }
        return result;
    }

    private String gtBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getGtMap().size() > 0) {
                result = compareBuilder(queryPOJO.getGtMap(), "GT");
            }
        }
        return result;
    }

    private String gtOrBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getGtORMap().size() > 0) {
                result = compareBuilder(queryPOJO.getGtORMap(), "GT_OR");
            }
        }
        return result;
    }

    private String ltBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getLtMap().size() > 0) {
                result = compareBuilder(queryPOJO.getLtMap(), "LT");
            }
        }
        return result;
    }

    private String ltOrBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getLtORMap().size() > 0) {
                result = compareBuilder(queryPOJO.getLtORMap(), "LT_OR");
            }
        }
        return result;
    }

    private String betweenBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getBetweenMap().size() > 0) {
                result = compareBuilder(queryPOJO.getBetweenMap(), "BETWEEN");
            }
        }
        return result;
    }

    private String betweenOrBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getBetweenORMap().size() > 0) {
                result = compareBuilder(queryPOJO.getBetweenORMap(), "BETWEEN_OR");
            }
        }
        return result;
    }

    private String inBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getInMap().size() > 0) {
                result = compareBuilder(queryPOJO.getInMap(), "IN");
            }
        }
        return result;
    }

    private String inOrBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getInORMap().size() > 0) {
                result = compareBuilder(queryPOJO.getInORMap(), "IN_OR");
            }
        }
        return result;
    }

    private String nullBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getIsNullList().size() > 0) {
                Map map = new HashMap();
                map.put("KEY", queryPOJO.getIsNullList());
                result = compareBuilder(map, "NULL");
            }
        }
        return result;
    }

    private String nullOrBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getIsNullORList().size() > 0) {
                Map map = new HashMap();
                map.put("KEY", queryPOJO.getIsNullORList());
                result = compareBuilder(map, "NULL_OR");
            }
        }
        return result;
    }

    private String notNullBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getIsNotNullList().size() > 0) {
                Map map = new HashMap();
                map.put("KEY", queryPOJO.getIsNotNullList());
                result = compareBuilder(map, "NOT_NULL");
            }
        }
        return result;
    }

    private String notNullOrBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getIsNotNullORList().size() > 0) {
                Map map = new HashMap();
                map.put("KEY", queryPOJO.getIsNotNullORList());
                result = compareBuilder(map, "NOT_NULL_OR");
            }
        }
        return result;
    }

    private String orderByBuilder(QueryPOJO queryPOJO) {
        String result = null;
        if (queryPOJO != null) {
            if (queryPOJO.getOrderMap().size() > 0) {
                result = "";
                Set<String> keys = queryPOJO.getOrderMap().keySet();

                for (String key : keys) {
                    String tmp = "";
                    boolean ascending = queryPOJO.getOrderMap().get(key);
                    if (ascending) {
                        tmp = " " + paramKeyBuilder(key) + " ASC,";
                    } else {
                        tmp = " " + paramKeyBuilder(key) + " DESC,";
                    }
                    result += tmp;
                }
                result = result.substring(0, result.length() - 1);

                result = " ORDER BY " + result;
            }
        }
        return result;
    }

    private String compareBuilder(Map compareMap, String compareType) {
        String result = "";
        String ops_text = "";
        String ops_symbol = "";
        if ("EQ".equalsIgnoreCase(compareType)) {
            ops_text = "AND";
            ops_symbol = "=";
        } else if ("EQ_OR".equalsIgnoreCase(compareType)) {
            ops_text = "OR";
            ops_symbol = "=";
        } else if ("NQ".equalsIgnoreCase(compareType)) {
            ops_text = "AND";
            ops_symbol = "!=";
        } else if ("NQ_OR".equalsIgnoreCase(compareType)) {
            ops_text = "OR";
            ops_symbol = "!=";
        } else if ("LIKE".equalsIgnoreCase(compareType)) {
            ops_text = "AND";
            ops_symbol = "LIKE";
        } else if ("LIKE_OR".equalsIgnoreCase(compareType)) {
            ops_text = "OR";
            ops_symbol = "LIKE";
        } else if ("GT".equalsIgnoreCase(compareType)) {
            ops_text = "AND";
            ops_symbol = ">";
        } else if ("GT_OR".equalsIgnoreCase(compareType)) {
            ops_text = "OR";
            ops_symbol = ">";
        } else if ("LT".equalsIgnoreCase(compareType)) {
            ops_text = "AND";
            ops_symbol = "<";
        } else if ("LT_OR".equalsIgnoreCase(compareType)) {
            ops_text = "OR";
            ops_symbol = "<";
        } else if ("BETWEEN".equalsIgnoreCase(compareType)) {
            ops_text = "AND";
        } else if ("BETWEEN_OR".equalsIgnoreCase(compareType)) {
            ops_text = "OR";
        } else if ("IN".equalsIgnoreCase(compareType)) {
            ops_text = "AND";
        } else if ("IN_OR".equalsIgnoreCase(compareType)) {
            ops_text = "OR";
        } else if ("NULL".equalsIgnoreCase(compareType)) {
            ops_text = "AND";
            ops_symbol = " IS NULL ";
        } else if ("NULL_OR".equalsIgnoreCase(compareType)) {
            ops_text = "OR";
            ops_symbol = " IS NULL ";
        } else if ("NOT_NULL".equalsIgnoreCase(compareType)) {
            ops_text = "AND";
            ops_symbol = " IS NOT NULL ";
        } else if ("NOT_NULL_OR".equalsIgnoreCase(compareType)) {
            ops_text = "OR";
            ops_symbol = " IS NOT NULL ";
        }
        Set<String> keys = compareMap.keySet();
        for (String key : keys) {
            Object value = compareMap.get(key);
            String tmp = "";
            if (compareType.contains("NULL")) {
                List<String> valueList = (List<String>) value;
                for (String v : valueList) {
                    tmp = paramKeyBuilder(v) + ops_symbol + ops_text + " ";
                }
            } else if (compareType.contains("IN")) {
                List<Object> valueList = (List<Object>) value;
                if (valueList.size() >= 1) {
                    if (valueList.get(0) instanceof Integer) {
                        List<Long> longList = new ArrayList<Long>();
                        for (Object v : valueList) {
                            longList.add(Long.parseLong(v.toString()));
                        }
                        String vs = "";
                        for (Long v : longList) {
                            vs += v + ",";
                        }
                        vs = vs.substring(0, vs.length() - 1);
                        tmp = "(" + paramKeyBuilder(key) + " IN (" + vs + ")) " + ops_text + " ";
                    } else {
                        String vs = "";
                        for (Object v : valueList) {
                            vs += "'" + v + "',";
                        }
                        vs = vs.substring(0, vs.length() - 1);
                        tmp = "(" + paramKeyBuilder(key) + " IN (" + vs + ")) " + ops_text + " ";
                    }

                }
            } else if (compareType.contains("BETWEEN")) {
                List<Object> valueList = (List<Object>) value;
                if (valueList.size() > 1) {
                    Object min = valueList.get(0);
                    if (min instanceof Integer) {
                        min = Long.parseLong(min.toString());
                    }
                    Object max = valueList.get(1);
                    if (max instanceof Integer) {
                        max = Long.parseLong(max.toString());
                    }
                    tmp = "(" + paramKeyBuilder(key) + " BETWEEN " + min + " AND " + max + ") " + ops_text + " ";
                }
            } else if (compareType.contains("LIKE")) {
                tmp = paramKeyBuilder(key) + " " + ops_symbol + " '%" + value + "%' " + ops_text + " ";
            } else {
                if (value instanceof Integer) {
                    value = Long.parseLong(value.toString());
                    tmp = paramKeyBuilder(key) + " " + ops_symbol + " " + value + " " + ops_text + " ";
                } else {
                    tmp = paramKeyBuilder(key) + " " + ops_symbol + " '" + value + "' " + ops_text + " ";
                }
            }

            result += tmp;
        }
        if (result.endsWith(" " + ops_text + " ")) {
            int endSize = ops_text.length() + 2;
            result = result.substring(0, result.length() - endSize);
        }
        result = "(" + result + ")";

        return result;
    }

    private String paramKeyBuilder(String paramKey) {
        return "entity." + paramKey;
    }

}
