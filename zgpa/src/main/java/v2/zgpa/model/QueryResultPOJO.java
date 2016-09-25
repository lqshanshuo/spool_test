package v2.zgpa.model;

import v2.service.generic.library.model.ResponsePOJO;

public class QueryResultPOJO<T> extends ResponsePOJO{

	private static final long serialVersionUID = -166071960583144611L;

	
	private Long totalCounts;
	private Integer pageMaxSize;
	private Integer currentPageNumber;
	private Integer currentPageSize;

	

	/**
	 * @return the totalCounts
	 */
	public Long getTotalCounts() {
		return totalCounts;
	}
	/**
	 * @param totalCounts the totalCounts to set
	 */
	public void setTotalCounts(Long totalCounts) {
		this.totalCounts = totalCounts;
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
	 * @return the currentPageSize
	 */
	public Integer getCurrentPageSize() {
		return currentPageSize;
	}
	/**
	 * @param currentPageSize the currentPageSize to set
	 */
	public void setCurrentPageSize(Integer currentPageSize) {
		this.currentPageSize = currentPageSize;
	}


	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime
				* result
				+ ((currentPageNumber == null) ? 0 : currentPageNumber
						.hashCode());
		result = prime * result
				+ ((currentPageSize == null) ? 0 : currentPageSize.hashCode());
		result = prime * result
				+ ((pageMaxSize == null) ? 0 : pageMaxSize.hashCode());
		result = prime * result
				+ ((totalCounts == null) ? 0 : totalCounts.hashCode());
		return result;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		QueryResultPOJO other = (QueryResultPOJO) obj;
		if (currentPageNumber == null) {
			if (other.currentPageNumber != null)
				return false;
		} else if (!currentPageNumber.equals(other.currentPageNumber))
			return false;
		if (currentPageSize == null) {
			if (other.currentPageSize != null)
				return false;
		} else if (!currentPageSize.equals(other.currentPageSize))
			return false;
		if (pageMaxSize == null) {
			if (other.pageMaxSize != null)
				return false;
		} else if (!pageMaxSize.equals(other.pageMaxSize))
			return false;
		if (totalCounts == null) {
			if (other.totalCounts != null)
				return false;
		} else if (!totalCounts.equals(other.totalCounts))
			return false;
		return true;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "PagingPOJO [totalCounts=" + totalCounts + ", pageMaxSize="
				+ pageMaxSize + ", currentPageNumber=" + currentPageNumber
				+ ", currentPageSize=" + currentPageSize 
				+ "]";
	}
	
	
}
