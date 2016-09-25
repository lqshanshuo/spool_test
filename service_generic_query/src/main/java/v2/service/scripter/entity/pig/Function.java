/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.scripter.entity.pig;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author zoudan
 */
@Entity
@Table(name = "function", catalog = "scripter", schema = "pig")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Function.findAll", query = "SELECT f FROM Function f"),
    @NamedQuery(name = "Function.findById", query = "SELECT f FROM Function f WHERE f.id = :id"),
    @NamedQuery(name = "Function.findByFuncKey", query = "SELECT f FROM Function f WHERE f.funcKey = :funcKey"),
    @NamedQuery(name = "Function.findByFuncValue", query = "SELECT f FROM Function f WHERE f.funcValue = :funcValue")})
public class Function implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "func_key")
    private String funcKey;
    @Size(max = 2000)
    @Column(name = "func_value")
    private String funcValue;

    public Function() {
    }

    public Function(Long id) {
        this.id = id;
    }

    public Function(Long id, String funcKey) {
        this.id = id;
        this.funcKey = funcKey;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFuncKey() {
        return funcKey;
    }

    public void setFuncKey(String funcKey) {
        this.funcKey = funcKey;
    }

    public String getFuncValue() {
        return funcValue;
    }

    public void setFuncValue(String funcValue) {
        this.funcValue = funcValue;
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
        if (!(object instanceof Function)) {
            return false;
        }
        Function other = (Function) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "scripter.rest.pig.function.Function[ id=" + id + " ]";
    }
    
}
