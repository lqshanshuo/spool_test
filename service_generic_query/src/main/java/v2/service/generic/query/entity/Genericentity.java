/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.query.entity;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author lqshanshuo
 */
@Entity
@Table(name = "genericentity")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Genericentity.findAll", query = "SELECT g FROM Genericentity g"),
    @NamedQuery(name = "Genericentity.findById", query = "SELECT g FROM Genericentity g WHERE g.id = :id"),
    @NamedQuery(name = "Genericentity.findByBooleanalpha", query = "SELECT g FROM Genericentity g WHERE g.booleanalpha = :booleanalpha"),
    @NamedQuery(name = "Genericentity.findByBooleanbeta", query = "SELECT g FROM Genericentity g WHERE g.booleanbeta = :booleanbeta"),
    @NamedQuery(name = "Genericentity.findByBooleandelta", query = "SELECT g FROM Genericentity g WHERE g.booleandelta = :booleandelta"),
    @NamedQuery(name = "Genericentity.findByBooleangamma", query = "SELECT g FROM Genericentity g WHERE g.booleangamma = :booleangamma"),
    @NamedQuery(name = "Genericentity.findByCategory", query = "SELECT g FROM Genericentity g WHERE g.category = :category"),
    @NamedQuery(name = "Genericentity.findByCreatetime", query = "SELECT g FROM Genericentity g WHERE g.createtime = :createtime"),
    @NamedQuery(name = "Genericentity.findByCreator", query = "SELECT g FROM Genericentity g WHERE g.creator = :creator"),
    @NamedQuery(name = "Genericentity.findByDeleted", query = "SELECT g FROM Genericentity g WHERE g.deleted = :deleted"),
    @NamedQuery(name = "Genericentity.findByDescription", query = "SELECT g FROM Genericentity g WHERE g.description = :description"),
    @NamedQuery(name = "Genericentity.findByEnabled", query = "SELECT g FROM Genericentity g WHERE g.enabled = :enabled"),
    @NamedQuery(name = "Genericentity.findByLastmodifier", query = "SELECT g FROM Genericentity g WHERE g.lastmodifier = :lastmodifier"),
    @NamedQuery(name = "Genericentity.findByLastupdatetime", query = "SELECT g FROM Genericentity g WHERE g.lastupdatetime = :lastupdatetime"),
    @NamedQuery(name = "Genericentity.findByModifycount", query = "SELECT g FROM Genericentity g WHERE g.modifycount = :modifycount"),
    @NamedQuery(name = "Genericentity.findByName", query = "SELECT g FROM Genericentity g WHERE g.name = :name"),
    @NamedQuery(name = "Genericentity.findByNumberalpha", query = "SELECT g FROM Genericentity g WHERE g.numberalpha = :numberalpha"),
    @NamedQuery(name = "Genericentity.findByNumberbeta", query = "SELECT g FROM Genericentity g WHERE g.numberbeta = :numberbeta"),
    @NamedQuery(name = "Genericentity.findByNumberdelta", query = "SELECT g FROM Genericentity g WHERE g.numberdelta = :numberdelta"),
    @NamedQuery(name = "Genericentity.findByNumberepsilon", query = "SELECT g FROM Genericentity g WHERE g.numberepsilon = :numberepsilon"),
    @NamedQuery(name = "Genericentity.findByNumbereta", query = "SELECT g FROM Genericentity g WHERE g.numbereta = :numbereta"),
    @NamedQuery(name = "Genericentity.findByNumbergamma", query = "SELECT g FROM Genericentity g WHERE g.numbergamma = :numbergamma"),
    @NamedQuery(name = "Genericentity.findByNumberkappa", query = "SELECT g FROM Genericentity g WHERE g.numberkappa = :numberkappa"),
    @NamedQuery(name = "Genericentity.findByNumberlambda", query = "SELECT g FROM Genericentity g WHERE g.numberlambda = :numberlambda"),
    @NamedQuery(name = "Genericentity.findByNumberlota", query = "SELECT g FROM Genericentity g WHERE g.numberlota = :numberlota"),
    @NamedQuery(name = "Genericentity.findByNumberomega", query = "SELECT g FROM Genericentity g WHERE g.numberomega = :numberomega"),
    @NamedQuery(name = "Genericentity.findByNumbertheta", query = "SELECT g FROM Genericentity g WHERE g.numbertheta = :numbertheta"),
    @NamedQuery(name = "Genericentity.findByNumberzeta", query = "SELECT g FROM Genericentity g WHERE g.numberzeta = :numberzeta"),
    @NamedQuery(name = "Genericentity.findByParentid", query = "SELECT g FROM Genericentity g WHERE g.parentid = :parentid"),
    @NamedQuery(name = "Genericentity.findByPriority", query = "SELECT g FROM Genericentity g WHERE g.priority = :priority"),
    @NamedQuery(name = "Genericentity.findByStatus", query = "SELECT g FROM Genericentity g WHERE g.status = :status"),
    @NamedQuery(name = "Genericentity.findByStringalpha", query = "SELECT g FROM Genericentity g WHERE g.stringalpha = :stringalpha"),
    @NamedQuery(name = "Genericentity.findByStringbeta", query = "SELECT g FROM Genericentity g WHERE g.stringbeta = :stringbeta"),
    @NamedQuery(name = "Genericentity.findByStringdelta", query = "SELECT g FROM Genericentity g WHERE g.stringdelta = :stringdelta"),
    @NamedQuery(name = "Genericentity.findByStringepsilon", query = "SELECT g FROM Genericentity g WHERE g.stringepsilon = :stringepsilon"),
    @NamedQuery(name = "Genericentity.findByStringeta", query = "SELECT g FROM Genericentity g WHERE g.stringeta = :stringeta"),
    @NamedQuery(name = "Genericentity.findByStringgamma", query = "SELECT g FROM Genericentity g WHERE g.stringgamma = :stringgamma"),
    @NamedQuery(name = "Genericentity.findByStringkappa", query = "SELECT g FROM Genericentity g WHERE g.stringkappa = :stringkappa"),
    @NamedQuery(name = "Genericentity.findByStringlambda", query = "SELECT g FROM Genericentity g WHERE g.stringlambda = :stringlambda"),
    @NamedQuery(name = "Genericentity.findByStringlota", query = "SELECT g FROM Genericentity g WHERE g.stringlota = :stringlota"),
    @NamedQuery(name = "Genericentity.findByStringomega", query = "SELECT g FROM Genericentity g WHERE g.stringomega = :stringomega"),
    @NamedQuery(name = "Genericentity.findByStringtheta", query = "SELECT g FROM Genericentity g WHERE g.stringtheta = :stringtheta"),
    @NamedQuery(name = "Genericentity.findByStringzeta", query = "SELECT g FROM Genericentity g WHERE g.stringzeta = :stringzeta"),
    @NamedQuery(name = "Genericentity.findByType", query = "SELECT g FROM Genericentity g WHERE g.type = :type"),
    @NamedQuery(name = "Genericentity.findByValid", query = "SELECT g FROM Genericentity g WHERE g.valid = :valid")})
public class Genericentity implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Column(name = "booleanalpha")
    private Boolean booleanalpha;
    @Column(name = "booleanbeta")
    private Boolean booleanbeta;
    @Column(name = "booleandelta")
    private Boolean booleandelta;
    @Column(name = "booleangamma")
    private Boolean booleangamma;
    @Size(max = 255)
    @Column(name = "category")
    private String category;
    @Column(name = "createtime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createtime;
    @Size(max = 255)
    @Column(name = "creator")
    private String creator;
    @Column(name = "deleted")
    private Boolean deleted;
    @Size(max = 255)
    @Column(name = "description")
    private String description;
    @Column(name = "enabled")
    private Boolean enabled;
    @Size(max = 255)
    @Column(name = "lastmodifier")
    private String lastmodifier;
    @Column(name = "lastupdatetime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastupdatetime;
    @Column(name = "modifycount")
    private BigInteger modifycount;
    @Size(max = 2147483647)
    @Column(name = "name")
    private String name;
    @Column(name = "numberalpha")
    private BigInteger numberalpha;
    @Column(name = "numberbeta")
    private BigInteger numberbeta;
    @Column(name = "numberdelta")
    private BigInteger numberdelta;
    @Column(name = "numberepsilon")
    private BigInteger numberepsilon;
    @Column(name = "numbereta")
    private BigInteger numbereta;
    @Column(name = "numbergamma")
    private BigInteger numbergamma;
    @Column(name = "numberkappa")
    private BigInteger numberkappa;
    @Column(name = "numberlambda")
    private BigInteger numberlambda;
    @Column(name = "numberlota")
    private BigInteger numberlota;
    @Column(name = "numberomega")
    private BigInteger numberomega;
    @Column(name = "numbertheta")
    private BigInteger numbertheta;
    @Column(name = "numberzeta")
    private BigInteger numberzeta;
    @Column(name = "parentid")
    private BigInteger parentid;
    @Column(name = "priority")
    private BigInteger priority;
    @Size(max = 255)
    @Column(name = "status")
    private String status;
    @Size(max = 255)
    @Column(name = "stringalpha")
    private String stringalpha;
    @Size(max = 255)
    @Column(name = "stringbeta")
    private String stringbeta;
    @Size(max = 255)
    @Column(name = "stringdelta")
    private String stringdelta;
    @Size(max = 255)
    @Column(name = "stringepsilon")
    private String stringepsilon;
    @Size(max = 255)
    @Column(name = "stringeta")
    private String stringeta;
    @Size(max = 255)
    @Column(name = "stringgamma")
    private String stringgamma;
    @Size(max = 255)
    @Column(name = "stringkappa")
    private String stringkappa;
    @Size(max = 255)
    @Column(name = "stringlambda")
    private String stringlambda;
    @Size(max = 255)
    @Column(name = "stringlota")
    private String stringlota;
    @Size(max = 255)
    @Column(name = "stringomega")
    private String stringomega;
    @Size(max = 2147483647)
    @Column(name = "stringtheta")
    private String stringtheta;
    @Size(max = 2147483647)
    @Column(name = "stringzeta")
    private String stringzeta;
    @Size(max = 255)
    @Column(name = "type")
    private String type;
    @Column(name = "valid")
    private Boolean valid;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "parentid")
    protected Set<Genericentity> children = new HashSet();

    public Set<Genericentity> getChildren() {
        return children;
    }

    public void setChildren(Set<Genericentity> children) {
        this.children = children;
    }

    public Genericentity() {
    }

    public Genericentity(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getBooleanalpha() {
        return booleanalpha;
    }

    public void setBooleanalpha(Boolean booleanalpha) {
        this.booleanalpha = booleanalpha;
    }

    public Boolean getBooleanbeta() {
        return booleanbeta;
    }

    public void setBooleanbeta(Boolean booleanbeta) {
        this.booleanbeta = booleanbeta;
    }

    public Boolean getBooleandelta() {
        return booleandelta;
    }

    public void setBooleandelta(Boolean booleandelta) {
        this.booleandelta = booleandelta;
    }

    public Boolean getBooleangamma() {
        return booleangamma;
    }

    public void setBooleangamma(Boolean booleangamma) {
        this.booleangamma = booleangamma;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public String getLastmodifier() {
        return lastmodifier;
    }

    public void setLastmodifier(String lastmodifier) {
        this.lastmodifier = lastmodifier;
    }

    public Date getLastupdatetime() {
        return lastupdatetime;
    }

    public void setLastupdatetime(Date lastupdatetime) {
        this.lastupdatetime = lastupdatetime;
    }

    public BigInteger getModifycount() {
        return modifycount;
    }

    public void setModifycount(BigInteger modifycount) {
        this.modifycount = modifycount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigInteger getNumberalpha() {
        return numberalpha;
    }

    public void setNumberalpha(BigInteger numberalpha) {
        this.numberalpha = numberalpha;
    }

    public BigInteger getNumberbeta() {
        return numberbeta;
    }

    public void setNumberbeta(BigInteger numberbeta) {
        this.numberbeta = numberbeta;
    }

    public BigInteger getNumberdelta() {
        return numberdelta;
    }

    public void setNumberdelta(BigInteger numberdelta) {
        this.numberdelta = numberdelta;
    }

    public BigInteger getNumberepsilon() {
        return numberepsilon;
    }

    public void setNumberepsilon(BigInteger numberepsilon) {
        this.numberepsilon = numberepsilon;
    }

    public BigInteger getNumbereta() {
        return numbereta;
    }

    public void setNumbereta(BigInteger numbereta) {
        this.numbereta = numbereta;
    }

    public BigInteger getNumbergamma() {
        return numbergamma;
    }

    public void setNumbergamma(BigInteger numbergamma) {
        this.numbergamma = numbergamma;
    }

    public BigInteger getNumberkappa() {
        return numberkappa;
    }

    public void setNumberkappa(BigInteger numberkappa) {
        this.numberkappa = numberkappa;
    }

    public BigInteger getNumberlambda() {
        return numberlambda;
    }

    public void setNumberlambda(BigInteger numberlambda) {
        this.numberlambda = numberlambda;
    }

    public BigInteger getNumberlota() {
        return numberlota;
    }

    public void setNumberlota(BigInteger numberlota) {
        this.numberlota = numberlota;
    }

    public BigInteger getNumberomega() {
        return numberomega;
    }

    public void setNumberomega(BigInteger numberomega) {
        this.numberomega = numberomega;
    }

    public BigInteger getNumbertheta() {
        return numbertheta;
    }

    public void setNumbertheta(BigInteger numbertheta) {
        this.numbertheta = numbertheta;
    }

    public BigInteger getNumberzeta() {
        return numberzeta;
    }

    public void setNumberzeta(BigInteger numberzeta) {
        this.numberzeta = numberzeta;
    }

    public BigInteger getParentid() {
        return parentid;
    }

    public void setParentid(BigInteger parentid) {
        this.parentid = parentid;
    }

    public BigInteger getPriority() {
        return priority;
    }

    public void setPriority(BigInteger priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStringalpha() {
        return stringalpha;
    }

    public void setStringalpha(String stringalpha) {
        this.stringalpha = stringalpha;
    }

    public String getStringbeta() {
        return stringbeta;
    }

    public void setStringbeta(String stringbeta) {
        this.stringbeta = stringbeta;
    }

    public String getStringdelta() {
        return stringdelta;
    }

    public void setStringdelta(String stringdelta) {
        this.stringdelta = stringdelta;
    }

    public String getStringepsilon() {
        return stringepsilon;
    }

    public void setStringepsilon(String stringepsilon) {
        this.stringepsilon = stringepsilon;
    }

    public String getStringeta() {
        return stringeta;
    }

    public void setStringeta(String stringeta) {
        this.stringeta = stringeta;
    }

    public String getStringgamma() {
        return stringgamma;
    }

    public void setStringgamma(String stringgamma) {
        this.stringgamma = stringgamma;
    }

    public String getStringkappa() {
        return stringkappa;
    }

    public void setStringkappa(String stringkappa) {
        this.stringkappa = stringkappa;
    }

    public String getStringlambda() {
        return stringlambda;
    }

    public void setStringlambda(String stringlambda) {
        this.stringlambda = stringlambda;
    }

    public String getStringlota() {
        return stringlota;
    }

    public void setStringlota(String stringlota) {
        this.stringlota = stringlota;
    }

    public String getStringomega() {
        return stringomega;
    }

    public void setStringomega(String stringomega) {
        this.stringomega = stringomega;
    }

    public String getStringtheta() {
        return stringtheta;
    }

    public void setStringtheta(String stringtheta) {
        this.stringtheta = stringtheta;
    }

    public String getStringzeta() {
        return stringzeta;
    }

    public void setStringzeta(String stringzeta) {
        this.stringzeta = stringzeta;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
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
        if (!(object instanceof Genericentity)) {
            return false;
        }
        Genericentity other = (Genericentity) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        if ((this.description == null && other.description != null) || (this.description != null && !this.description.equals(other.description))) {
            return false;
        }
        if ((this.stringalpha == null && other.stringalpha != null) || (this.stringalpha != null && !this.stringalpha.equals(other.stringalpha))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "v2.service.generic.query.entity.Genericentity[ id=" + id + " ]";
    }
    
}
