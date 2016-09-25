/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.query.entity;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
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
@Table(name = "share")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Share.findAll", query = "SELECT s FROM Share s"),
    @NamedQuery(name = "Share.findById", query = "SELECT s FROM Share s WHERE s.id = :id"),
    @NamedQuery(name = "Share.findByJson", query = "SELECT s FROM Share s WHERE s.json = :json"),
    @NamedQuery(name = "Share.findByType", query = "SELECT s FROM Share s WHERE s.type = :type"),
    @NamedQuery(name = "Share.findByTag", query = "SELECT s FROM Share s WHERE s.tag = :tag"),
    @NamedQuery(name = "Share.findByUsername", query = "SELECT s FROM Share s WHERE s.username = :username"),
    @NamedQuery(name = "Share.findByCreatetime", query = "SELECT s FROM Share s WHERE s.createtime = :createtime"),
    @NamedQuery(name = "Share.findByToken", query = "SELECT s FROM Share s WHERE s.token = :token"),
    @NamedQuery(name = "Share.findByExpiretime", query = "SELECT s FROM Share s WHERE s.expiretime = :expiretime"),
    @NamedQuery(name = "Share.findByValid", query = "SELECT s FROM Share s WHERE s.valid = :valid"),
    @NamedQuery(name = "Share.findByDeleted", query = "SELECT s FROM Share s WHERE s.deleted = :deleted"),
    @NamedQuery(name = "Share.findByBooleanalpha", query = "SELECT s FROM Share s WHERE s.booleanalpha = :booleanalpha"),
    @NamedQuery(name = "Share.findByBooleanbeta", query = "SELECT s FROM Share s WHERE s.booleanbeta = :booleanbeta"),
    @NamedQuery(name = "Share.findByBooleangamma", query = "SELECT s FROM Share s WHERE s.booleangamma = :booleangamma"),
    @NamedQuery(name = "Share.findByNumberalpha", query = "SELECT s FROM Share s WHERE s.numberalpha = :numberalpha"),
    @NamedQuery(name = "Share.findByNumberbeta", query = "SELECT s FROM Share s WHERE s.numberbeta = :numberbeta"),
    @NamedQuery(name = "Share.findByNumbergamma", query = "SELECT s FROM Share s WHERE s.numbergamma = :numbergamma"),
    @NamedQuery(name = "Share.findByStringalpha", query = "SELECT s FROM Share s WHERE s.stringalpha = :stringalpha"),
    @NamedQuery(name = "Share.findByStringbeta", query = "SELECT s FROM Share s WHERE s.stringbeta = :stringbeta"),
    @NamedQuery(name = "Share.findByStringgamma", query = "SELECT s FROM Share s WHERE s.stringgamma = :stringgamma")})
public class Share implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Size(max = 2147483647)
    @Column(name = "json")
    private String json;
    @Size(max = 2147483647)
    @Column(name = "type")
    private String type;
    @Size(max = 2147483647)
    @Column(name = "tag")
    private String tag;
    @Size(max = 2147483647)
    @Column(name = "username")
    private String username;
    @Column(name = "createtime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createtime;
    @Size(max = 2147483647)
    @Column(name = "token")
    private String token;
    @Column(name = "expiretime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expiretime;
    @Column(name = "valid")
    private Boolean valid;
    @Column(name = "deleted")
    private Boolean deleted;
    @Column(name = "booleanalpha")
    private Boolean booleanalpha;
    @Column(name = "booleanbeta")
    private Boolean booleanbeta;
    @Column(name = "booleangamma")
    private Boolean booleangamma;
    @Column(name = "numberalpha")
    private BigInteger numberalpha;
    @Column(name = "numberbeta")
    private BigInteger numberbeta;
    @Column(name = "numbergamma")
    private BigInteger numbergamma;
    @Size(max = 255)
    @Column(name = "stringalpha")
    private String stringalpha;
    @Size(max = 255)
    @Column(name = "stringbeta")
    private String stringbeta;
    @Size(max = 255)
    @Column(name = "stringgamma")
    private String stringgamma;

    public Share() {
    }

    public Share(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getExpiretime() {
        return expiretime;
    }

    public void setExpiretime(Date expiretime) {
        this.expiretime = expiretime;
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

    public Boolean getBooleangamma() {
        return booleangamma;
    }

    public void setBooleangamma(Boolean booleangamma) {
        this.booleangamma = booleangamma;
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

    public BigInteger getNumbergamma() {
        return numbergamma;
    }

    public void setNumbergamma(BigInteger numbergamma) {
        this.numbergamma = numbergamma;
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

    public String getStringgamma() {
        return stringgamma;
    }

    public void setStringgamma(String stringgamma) {
        this.stringgamma = stringgamma;
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
        if (!(object instanceof Share)) {
            return false;
        }
        Share other = (Share) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "v2.service.generic.query.entity.Share[ id=" + id + " ]";
    }
    
}
