/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.scripter.entity;

import java.io.Serializable;
import java.math.BigInteger;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author lxy
 */
@Entity
@Table(name = "history_script", catalog = "scripter", schema = "script")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "HistoryScript.findAll", query = "SELECT h FROM HistoryScript h"),
    @NamedQuery(name = "HistoryScript.findById", query = "SELECT h FROM HistoryScript h WHERE h.id = :id"),
    @NamedQuery(name = "HistoryScript.findByParentId", query = "SELECT h FROM HistoryScript h WHERE h.parentId = :parentId"),
    @NamedQuery(name = "HistoryScript.findByCreateTime", query = "SELECT h FROM HistoryScript h WHERE h.createTime = :createTime"),
    @NamedQuery(name = "HistoryScript.findByLastUpdateTime", query = "SELECT h FROM HistoryScript h WHERE h.lastUpdateTime = :lastUpdateTime"),
    @NamedQuery(name = "HistoryScript.findByAuthor", query = "SELECT h FROM HistoryScript h WHERE h.author = :author"),
    @NamedQuery(name = "HistoryScript.findByTitle", query = "SELECT h FROM HistoryScript h WHERE h.title = :title"),
    @NamedQuery(name = "HistoryScript.findByContent", query = "SELECT h FROM HistoryScript h WHERE h.content = :content"),
    @NamedQuery(name = "HistoryScript.findByDescription", query = "SELECT h FROM HistoryScript h WHERE h.description = :description"),
    @NamedQuery(name = "HistoryScript.findByStatus", query = "SELECT h FROM HistoryScript h WHERE h.status = :status"),
    @NamedQuery(name = "HistoryScript.findByLastModifier", query = "SELECT h FROM HistoryScript h WHERE h.lastModifier = :lastModifier"),
    @NamedQuery(name = "HistoryScript.findByEnabled", query = "SELECT h FROM HistoryScript h WHERE h.enabled = :enabled"),
    @NamedQuery(name = "HistoryScript.findByValid", query = "SELECT h FROM HistoryScript h WHERE h.valid = :valid"),
    @NamedQuery(name = "HistoryScript.findByDeleted", query = "SELECT h FROM HistoryScript h WHERE h.deleted = :deleted"),
    @NamedQuery(name = "HistoryScript.findByStr1", query = "SELECT h FROM HistoryScript h WHERE h.str1 = :str1"),
    @NamedQuery(name = "HistoryScript.findByStr2", query = "SELECT h FROM HistoryScript h WHERE h.str2 = :str2"),
    @NamedQuery(name = "HistoryScript.findByStr3", query = "SELECT h FROM HistoryScript h WHERE h.str3 = :str3"),
    @NamedQuery(name = "HistoryScript.findByStr4", query = "SELECT h FROM HistoryScript h WHERE h.str4 = :str4"),
    @NamedQuery(name = "HistoryScript.findByStr5", query = "SELECT h FROM HistoryScript h WHERE h.str5 = :str5"),
    @NamedQuery(name = "HistoryScript.findByFigure1", query = "SELECT h FROM HistoryScript h WHERE h.figure1 = :figure1"),
    @NamedQuery(name = "HistoryScript.findByFigure2", query = "SELECT h FROM HistoryScript h WHERE h.figure2 = :figure2"),
    @NamedQuery(name = "HistoryScript.findByFigure3", query = "SELECT h FROM HistoryScript h WHERE h.figure3 = :figure3"),
    @NamedQuery(name = "HistoryScript.findByBool1", query = "SELECT h FROM HistoryScript h WHERE h.bool1 = :bool1"),
    @NamedQuery(name = "HistoryScript.findByBool2", query = "SELECT h FROM HistoryScript h WHERE h.bool2 = :bool2"),
    @NamedQuery(name = "HistoryScript.findByBool3", query = "SELECT h FROM HistoryScript h WHERE h.bool3 = :bool3")})
public class HistoryScript implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Column(name = "parent_id")
    private BigInteger parentId;
    @Size(max = 255)
    @Column(name = "create_time")
    private String createTime;
    @Size(max = 255)
    @Column(name = "last_update_time")
    private String lastUpdateTime;
    @Size(max = 64)
    @Column(name = "author")
    private String author;
    @Size(max = 255)
    @Column(name = "title")
    private String title;
    @Size(max = 255)
    @Column(name = "type")
    private String type;    
    @Size(max = 2147483647)
    @Column(name = "content")
    private String content;
    @Size(max = 2147483647)
    @Column(name = "description")
    private String description;
    @Size(max = 64)
    @Column(name = "status")
    private String status;
    @Size(max = 64)
    @Column(name = "last_modifier")
    private String lastModifier;
    @Column(name = "enabled")
    private Boolean enabled = true;
    @Column(name = "valid")
    private Boolean valid = true;
    @Column(name = "deleted")
    private Boolean deleted = false;
    @Size(max = 255)
    @Column(name = "str1")
    private String str1;
    @Size(max = 255)
    @Column(name = "str2")
    private String str2;
    @Size(max = 255)
    @Column(name = "str3")
    private String str3;
    @Size(max = 255)
    @Column(name = "str4")
    private String str4;
    @Size(max = 255)
    @Column(name = "str5")
    private String str5;
    @Column(name = "figure1")
    private BigInteger figure1;
    @Column(name = "figure2")
    private BigInteger figure2;
    @Column(name = "figure3")
    private BigInteger figure3;
    @Column(name = "bool1")
    private Boolean bool1;
    @Column(name = "bool2")
    private Boolean bool2;
    @Column(name = "bool3")
    private Boolean bool3;

    public HistoryScript() {
    }

    public HistoryScript(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigInteger getParentId() {
        return parentId;
    }

    public void setParentId(BigInteger parentId) {
        this.parentId = parentId;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime(String lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLastModifier() {
        return lastModifier;
    }

    public void setLastModifier(String lastModifier) {
        this.lastModifier = lastModifier;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public String getStr1() {
        return str1;
    }

    public void setStr1(String str1) {
        this.str1 = str1;
    }

    public String getStr2() {
        return str2;
    }

    public void setStr2(String str2) {
        this.str2 = str2;
    }

    public String getStr3() {
        return str3;
    }

    public void setStr3(String str3) {
        this.str3 = str3;
    }

    public String getStr4() {
        return str4;
    }

    public void setStr4(String str4) {
        this.str4 = str4;
    }

    public String getStr5() {
        return str5;
    }

    public void setStr5(String str5) {
        this.str5 = str5;
    }

    public BigInteger getFigure1() {
        return figure1;
    }

    public void setFigure1(BigInteger figure1) {
        this.figure1 = figure1;
    }

    public BigInteger getFigure2() {
        return figure2;
    }

    public void setFigure2(BigInteger figure2) {
        this.figure2 = figure2;
    }

    public BigInteger getFigure3() {
        return figure3;
    }

    public void setFigure3(BigInteger figure3) {
        this.figure3 = figure3;
    }

    public Boolean getBool1() {
        return bool1;
    }

    public void setBool1(Boolean bool1) {
        this.bool1 = bool1;
    }

    public Boolean getBool2() {
        return bool2;
    }

    public void setBool2(Boolean bool2) {
        this.bool2 = bool2;
    }

    public Boolean getBool3() {
        return bool3;
    }

    public void setBool3(Boolean bool3) {
        this.bool3 = bool3;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof HistoryScript)) {
            return false;
        }
        HistoryScript other = (HistoryScript) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "v2.service.scripter.entity.HistoryScript[ id=" + id + " ]";
    }
    
}
