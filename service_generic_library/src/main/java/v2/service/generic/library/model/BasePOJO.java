package v2.service.generic.library.model;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * Base Entity for framework
 *
 * @author yangliu
 *
 */
public class BasePOJO extends BaseObject {

    private static final long serialVersionUID = 809994138621078975L;

    private Long id;
    private Long parentId;

    private String name;
    private String description;
    private String type;
    private String status;
    private String creator;
    private String lastModifier;

    private Timestamp createTime;
    private Timestamp lastUpdateTime;

    private Boolean enabled;
    private Boolean valid;
    private Boolean deleted;

    private Integer priority;
    private Integer modifyCount;

    private BaseObject child;

    private List<String> messages = new ArrayList<>();

    public BasePOJO() {
        super();
    }

    public BasePOJO(String name, String description, String status) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.createTime = new Timestamp(System.currentTimeMillis());
    }

    /**
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return the parentId
     */
    public Long getParentId() {
        return parentId;
    }

    /**
     * @param parentId the parentId to set
     */
    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @return the creator
     */
    public String getCreator() {
        return creator;
    }

    /**
     * @param creator the creator to set
     */
    public void setCreator(String creator) {
        this.creator = creator;
    }

    /**
     * @return the lastModifier
     */
    public String getLastModifier() {
        return lastModifier;
    }

    /**
     * @param lastModifier the lastModifier to set
     */
    public void setLastModifier(String lastModifier) {
        this.lastModifier = lastModifier;
    }

    /**
     * @return the createTime
     */
    public Timestamp getCreateTime() {
        return createTime;
    }

    /**
     * @param createTime the createTime to set
     */
    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    /**
     * @return the lastUpdateTime
     */
    public Timestamp getLastUpdateTime() {
        return lastUpdateTime;
    }

    /**
     * @return the child
     */
    public BaseObject getChild() {
        return child;
    }

    /**
     * @param child the child to set
     */
    public void setChild(BaseObject child) {
        this.child = child;
    }

    /**
     * @param lastUpdateTime the lastUpdateTime to set
     */
    public void setLastUpdateTime(Timestamp lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    /**
     * @return the enabled
     */
    public Boolean getEnabled() {
        return enabled;
    }

    /**
     * @param enabled the enabled to set
     */
    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    /**
     * @return the valid
     */
    public Boolean getValid() {
        return valid;
    }

    /**
     * @param valid the valid to set
     */
    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    /**
     * @return the deleted
     */
    public Boolean getDeleted() {
        return deleted;
    }

    /**
     * @param deleted the deleted to set
     */
    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    /**
     * @return the priority
     */
    public Integer getPriority() {
        return priority;
    }

    /**
     * @param priority the priority to set
     */
    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    /**
     * @return the modifyCount
     */
    public Integer getModifyCount() {
        return modifyCount;
    }

    /**
     * @param modifyCount the modifyCount to set
     */
    public void setModifyCount(Integer modifyCount) {
        this.modifyCount = modifyCount;
    }

    /**
     * @return the serialversionuid
     */
    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#hashCode()
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result
                + ((createTime == null) ? 0 : createTime.hashCode());
        result = prime * result + ((creator == null) ? 0 : creator.hashCode());
        result = prime * result + ((deleted == null) ? 0 : deleted.hashCode());
        result = prime * result
                + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((enabled == null) ? 0 : enabled.hashCode());
        result = prime * result
                + ((lastModifier == null) ? 0 : lastModifier.hashCode());
        result = prime * result
                + ((lastUpdateTime == null) ? 0 : lastUpdateTime.hashCode());
        result = prime * result
                + ((modifyCount == null) ? 0 : modifyCount.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result
                + ((priority == null) ? 0 : priority.hashCode());
        result = prime * result + ((status == null) ? 0 : status.hashCode());
        result = prime * result + ((type == null) ? 0 : type.hashCode());
        result = prime * result + ((valid == null) ? 0 : valid.hashCode());
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
        BasePOJO other = (BasePOJO) obj;
        if (createTime == null) {
            if (other.createTime != null) {
                return false;
            }
        } else if (!createTime.equals(other.createTime)) {
            return false;
        }
        if (creator == null) {
            if (other.creator != null) {
                return false;
            }
        } else if (!creator.equals(other.creator)) {
            return false;
        }
        if (deleted == null) {
            if (other.deleted != null) {
                return false;
            }
        } else if (!deleted.equals(other.deleted)) {
            return false;
        }
        if (description == null) {
            if (other.description != null) {
                return false;
            }
        } else if (!description.equals(other.description)) {
            return false;
        }
        if (enabled == null) {
            if (other.enabled != null) {
                return false;
            }
        } else if (!enabled.equals(other.enabled)) {
            return false;
        }
        if (lastModifier == null) {
            if (other.lastModifier != null) {
                return false;
            }
        } else if (!lastModifier.equals(other.lastModifier)) {
            return false;
        }
        if (lastUpdateTime == null) {
            if (other.lastUpdateTime != null) {
                return false;
            }
        } else if (!lastUpdateTime.equals(other.lastUpdateTime)) {
            return false;
        }
        if (modifyCount == null) {
            if (other.modifyCount != null) {
                return false;
            }
        } else if (!modifyCount.equals(other.modifyCount)) {
            return false;
        }
        if (name == null) {
            if (other.name != null) {
                return false;
            }
        } else if (!name.equals(other.name)) {
            return false;
        }
        if (priority == null) {
            if (other.priority != null) {
                return false;
            }
        } else if (!priority.equals(other.priority)) {
            return false;
        }
        if (status == null) {
            if (other.status != null) {
                return false;
            }
        } else if (!status.equals(other.status)) {
            return false;
        }
        if (type == null) {
            if (other.type != null) {
                return false;
            }
        } else if (!type.equals(other.type)) {
            return false;
        }
        if (valid == null) {
            if (other.valid != null) {
                return false;
            }
        } else if (!valid.equals(other.valid)) {
            return false;
        }
        return true;
    }
    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */

    @Override
    public String toString() {
        return "BasePOJO [name=" + name + ", description=" + description
                + ", type=" + type + ", status=" + status + ", creator="
                + creator + ", lastModifier=" + lastModifier + ", createTime="
                + createTime + ", lastUpdateTime=" + lastUpdateTime
                + ", enabled=" + enabled + ", valid=" + valid + ", deleted="
                + deleted + ", priority=" + priority + ", modifyCount="
                + modifyCount + "]";
    }

    /**
     * @return the messages
     */
    public List<String> getMessages() {
        return messages;
    }

    /**
     * @param messages the messages to set
     */
    public void setMessages(List<String> messages) {
        this.messages = messages;
    }

}
