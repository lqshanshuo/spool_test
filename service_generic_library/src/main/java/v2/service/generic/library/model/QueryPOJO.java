/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.library.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class QueryPOJO extends BaseObject {

    private static final long serialVersionUID = -2663866226797560556L;

    private String className;

    private Integer pageMaxSize;

    private Integer currentPageNumber;

    private Map<String, String> aliasMap = new HashMap<>();

    private Map<String, Boolean> orderMap = new HashMap<>();

    private Map<String, Object> eqMap = new HashMap<>();

    private Map<String, Object> nqMap = new HashMap<>();

    private Map<String, Object> likeMap = new HashMap<>();

    private Map<String, Object> gtMap = new HashMap<>();

    private Map<String, Object> ltMap = new HashMap<>();

    private Map<String, List<Object>> betweenMap = new HashMap<>();

    private Map<String, List<Object>> inMap = new HashMap<>();

    private List<String> isNullList = new ArrayList<>();

    private List<String> isNotNullList = new ArrayList<>();

    private Map<String, Object> eqORMap = new HashMap<>();

    private Map<String, Object> nqORMap = new HashMap<>();

    private Map<String, Object> likeORMap = new HashMap<>();

    private Map<String, Object> gtORMap = new HashMap<>();

    private Map<String, Object> ltORMap = new HashMap<>();

    private Map<String, List<Object>> betweenORMap = new HashMap<>();

    private Map<String, List<Object>> inORMap = new HashMap<>();

    private List<String> isNullORList = new ArrayList<>();

    private List<String> isNotNullORList = new ArrayList<>();

    public QueryPOJO() {

    }

    public QueryPOJO(String className, Integer pageMaxSize, Integer currentPageNumber) {
        this.className = className;
        this.pageMaxSize = pageMaxSize;
        this.currentPageNumber = currentPageNumber;
    }

    /**
     * @return the className
     */
    public String getClassName() {
        return className;
    }

    /**
     * @param className the className to set
     */
    public void setClassName(String className) {
        this.className = className;
    }

    /**
     * @return the eqMap
     */
    public Map<String, Object> getEqMap() {
        return eqMap;
    }

    /**
     * @param eqMap the eqMap to set
     */
    public void setEqMap(Map<String, Object> eqMap) {
        this.eqMap = eqMap;
    }

    /**
     * @return the nqMap
     */
    public Map<String, Object> getNqMap() {
        return nqMap;
    }

    /**
     * @param nqMap the nqMap to set
     */
    public void setNqMap(Map<String, Object> nqMap) {
        this.nqMap = nqMap;
    }

    /**
     * @return the likeMap
     */
    public Map<String, Object> getLikeMap() {
        return likeMap;
    }

    /**
     * @param likeMap the likeMap to set
     */
    public void setLikeMap(Map<String, Object> likeMap) {
        this.likeMap = likeMap;
    }

    /**
     * @return the gtMap
     */
    public Map<String, Object> getGtMap() {
        return gtMap;
    }

    /**
     * @param gtMap the gtMap to set
     */
    public void setGtMap(Map<String, Object> gtMap) {
        this.gtMap = gtMap;
    }

    /**
     * @return the ltMap
     */
    public Map<String, Object> getLtMap() {
        return ltMap;
    }

    /**
     * @param ltMap the ltMap to set
     */
    public void setLtMap(Map<String, Object> ltMap) {
        this.ltMap = ltMap;
    }

    /**
     * @return the betweenMap
     */
    public Map<String, List<Object>> getBetweenMap() {
        return betweenMap;
    }

    /**
     * @param betweenMap the betweenMap to set
     */
    public void setBetweenMap(Map<String, List<Object>> betweenMap) {
        this.betweenMap = betweenMap;
    }

    /**
     * @return the inMap
     */
    public Map<String, List<Object>> getInMap() {
        return inMap;
    }

    /**
     * @param inMap the inMap to set
     */
    public void setInMap(Map<String, List<Object>> inMap) {
        this.inMap = inMap;
    }

    /**
     * @return the isNullList
     */
    public List<String> getIsNullList() {
        return isNullList;
    }

    /**
     * @param isNullList the isNullList to set
     */
    public void setIsNullList(List<String> isNullList) {
        this.isNullList = isNullList;
    }

    /**
     * @return the isNotNullList
     */
    public List<String> getIsNotNullList() {
        return isNotNullList;
    }

    /**
     * @param isNotNullList the isNotNullList to set
     */
    public void setIsNotNullList(List<String> isNotNullList) {
        this.isNotNullList = isNotNullList;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#hashCode()
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result
                + ((betweenMap == null) ? 0 : betweenMap.hashCode());
        result = prime * result
                + ((className == null) ? 0 : className.hashCode());
        result = prime * result + ((eqMap == null) ? 0 : eqMap.hashCode());
        result = prime * result + ((gtMap == null) ? 0 : gtMap.hashCode());
        result = prime * result + ((inMap == null) ? 0 : inMap.hashCode());
        result = prime * result
                + ((isNotNullList == null) ? 0 : isNotNullList.hashCode());
        result = prime * result
                + ((isNullList == null) ? 0 : isNullList.hashCode());
        result = prime * result + ((likeMap == null) ? 0 : likeMap.hashCode());
        result = prime * result + ((ltMap == null) ? 0 : ltMap.hashCode());
        result = prime * result + ((nqMap == null) ? 0 : nqMap.hashCode());
        return result;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        QueryPOJO other = (QueryPOJO) obj;
        if (betweenMap == null) {
            if (other.betweenMap != null) {
                return false;
            }
        } else if (!betweenMap.equals(other.betweenMap)) {
            return false;
        }
        if (className == null) {
            if (other.className != null) {
                return false;
            }
        } else if (!className.equals(other.className)) {
            return false;
        }
        if (eqMap == null) {
            if (other.eqMap != null) {
                return false;
            }
        } else if (!eqMap.equals(other.eqMap)) {
            return false;
        }
        if (gtMap == null) {
            if (other.gtMap != null) {
                return false;
            }
        } else if (!gtMap.equals(other.gtMap)) {
            return false;
        }
        if (inMap == null) {
            if (other.inMap != null) {
                return false;
            }
        } else if (!inMap.equals(other.inMap)) {
            return false;
        }
        if (isNotNullList == null) {
            if (other.isNotNullList != null) {
                return false;
            }
        } else if (!isNotNullList.equals(other.isNotNullList)) {
            return false;
        }
        if (isNullList == null) {
            if (other.isNullList != null) {
                return false;
            }
        } else if (!isNullList.equals(other.isNullList)) {
            return false;
        }
        if (likeMap == null) {
            if (other.likeMap != null) {
                return false;
            }
        } else if (!likeMap.equals(other.likeMap)) {
            return false;
        }
        if (ltMap == null) {
            if (other.ltMap != null) {
                return false;
            }
        } else if (!ltMap.equals(other.ltMap)) {
            return false;
        }
        if (nqMap == null) {
            if (other.nqMap != null) {
                return false;
            }
        } else if (!nqMap.equals(other.nqMap)) {
            return false;
        }
        return true;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "QueryPOJO [className=" + className + ", eqMap=" + eqMap
                + ", nqMap=" + nqMap + ", likeMap=" + likeMap + ", gtMap="
                + gtMap + ", ltMap=" + ltMap + ", betweenMap=" + betweenMap
                + ", inMap=" + inMap + ", isNullList=" + isNullList
                + ", isNotNullList=" + isNotNullList + "]";
    }

    /**
     * @return the pageMaxSize
     */
    public Integer getPageMaxSize() {
        return pageMaxSize;
    }

    /**
     * @param pageMaxSize the pageMaxSize to set
     */
    public void setPageMaxSize(Integer pageMaxSize) {
        this.pageMaxSize = pageMaxSize;
    }

    /**
     * @return the currentPageNumber
     */
    public Integer getCurrentPageNumber() {
        return currentPageNumber;
    }

    /**
     * @param currentPageNumber the currentPageNumber to set
     */
    public void setCurrentPageNumber(Integer currentPageNumber) {
        this.currentPageNumber = currentPageNumber;
    }

    /**
     * @return the aliasMap
     */
    public Map<String, String> getAliasMap() {
        return aliasMap;
    }

    /**
     * @param aliasMap the aliasMap to set
     */
    public void setAliasMap(Map<String, String> aliasMap) {
        this.aliasMap = aliasMap;
    }

    /**
     * @return the orderMap
     */
    public Map<String, Boolean> getOrderMap() {
        return orderMap;
    }

    /**
     * @param orderMap the orderMap to set
     */
    public void setOrderMap(Map<String, Boolean> orderMap) {
        this.orderMap = orderMap;
    }

    /**
     * @return the eqORMap
     */
    public Map<String, Object> getEqORMap() {
        return eqORMap;
    }

    /**
     * @param eqORMap the eqORMap to set
     */
    public void setEqORMap(Map<String, Object> eqORMap) {
        this.eqORMap = eqORMap;
    }

    /**
     * @return the nqORMap
     */
    public Map<String, Object> getNqORMap() {
        return nqORMap;
    }

    /**
     * @param nqORMap the nqORMap to set
     */
    public void setNqORMap(Map<String, Object> nqORMap) {
        this.nqORMap = nqORMap;
    }

    /**
     * @return the likeORMap
     */
    public Map<String, Object> getLikeORMap() {
        return likeORMap;
    }

    /**
     * @param likeORMap the likeORMap to set
     */
    public void setLikeORMap(Map<String, Object> likeORMap) {
        this.likeORMap = likeORMap;
    }

    /**
     * @return the gtORMap
     */
    public Map<String, Object> getGtORMap() {
        return gtORMap;
    }

    /**
     * @param gtORMap the gtORMap to set
     */
    public void setGtORMap(Map<String, Object> gtORMap) {
        this.gtORMap = gtORMap;
    }

    /**
     * @return the ltORMap
     */
    public Map<String, Object> getLtORMap() {
        return ltORMap;
    }

    /**
     * @param ltORMap the ltORMap to set
     */
    public void setLtORMap(Map<String, Object> ltORMap) {
        this.ltORMap = ltORMap;
    }

    /**
     * @return the betweenORMap
     */
    public Map<String, List<Object>> getBetweenORMap() {
        return betweenORMap;
    }

    /**
     * @param betweenORMap the betweenORMap to set
     */
    public void setBetweenORMap(Map<String, List<Object>> betweenORMap) {
        this.betweenORMap = betweenORMap;
    }

    /**
     * @return the inORMap
     */
    public Map<String, List<Object>> getInORMap() {
        return inORMap;
    }

    /**
     * @param inORMap the inORMap to set
     */
    public void setInORMap(Map<String, List<Object>> inORMap) {
        this.inORMap = inORMap;
    }

    /**
     * @return the isNullORList
     */
    public List<String> getIsNullORList() {
        return isNullORList;
    }

    /**
     * @param isNullORList the isNullORList to set
     */
    public void setIsNullORList(List<String> isNullORList) {
        this.isNullORList = isNullORList;
    }

    /**
     * @return the isNotNullORList
     */
    public List<String> getIsNotNullORList() {
        return isNotNullORList;
    }

    /**
     * @param isNotNullORList the isNotNullORList to set
     */
    public void setIsNotNullORList(List<String> isNotNullORList) {
        this.isNotNullORList = isNotNullORList;
    }

}
