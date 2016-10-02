/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.query.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;

/**
 *
 * @author zoudan
 */
@Entity
public class Qutuostaffentity implements Serializable {

    private static final long serialVersionUID = 1L;

//---------------------------generic attributes begin ----------------------------
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long parentId;
    private String name;
    private String parentName;
    private String category;
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

//---------------------------generic attributes end ----------------------------
//---------------------------special attributes start --------------------------
    private String institution;                         //机构
    private String zhanyechu_code;                      //展业处代码
    private String zhanyeke_code;                       //展业课代码
    private String zhanyequ_code;                       //展业区代码
    private String personal_code;                       //个人代码
    private String staff_name;                          //姓名
    private String sex;                                 //性别
    private String begin_time;                          //入司时间
    private String curent_rank;                         //职级
    private String id_last_four;                        //证件号后四位
    private String renewal_history;                     //续期历史数据

    private String educate_benefits;                    //育成利益
    private String zengke_benefits;                     //增课利益
    private String zengchu_benefits;                    //增处利益
    private String development_allowance;               //区部发展津贴
    private String other_income_percent;                //其他收入占比

    private String str1;
    private String str2;
    private String str3;
    private String str4;
    private String str5;
    private String str6;
    private String str7;
    private String str8;
    private String str9;
    private String str10;

    @Size(max = 2147483647)
    @Column(name = "str11")
    private String str11;

    @Size(max = 2147483647)
    @Column(name = "str12")
    private String str12;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getLastModifier() {
        return lastModifier;
    }

    public void setLastModifier(String lastModifier) {
        this.lastModifier = lastModifier;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public Timestamp getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime(Timestamp lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
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

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Integer getModifyCount() {
        return modifyCount;
    }

    public void setModifyCount(Integer modifyCount) {
        this.modifyCount = modifyCount;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getZhanyechu_code() {
        return zhanyechu_code;
    }

    public void setZhanyechu_code(String zhanyechu_code) {
        this.zhanyechu_code = zhanyechu_code;
    }

    public String getZhanyeke_code() {
        return zhanyeke_code;
    }

    public void setZhanyeke_code(String zhanyeke_code) {
        this.zhanyeke_code = zhanyeke_code;
    }

    public String getZhanyequ_code() {
        return zhanyequ_code;
    }

    public void setZhanyequ_code(String zhanyequ_code) {
        this.zhanyequ_code = zhanyequ_code;
    }

    public String getPersonal_code() {
        return personal_code;
    }

    public void setPersonal_code(String personal_code) {
        this.personal_code = personal_code;
    }

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getBegin_time() {
        return begin_time;
    }

    public void setBegin_time(String begin_time) {
        this.begin_time = begin_time;
    }

    public String getCurent_rank() {
        return curent_rank;
    }

    public void setCurent_rank(String curent_rank) {
        this.curent_rank = curent_rank;
    }

    public String getId_last_four() {
        return id_last_four;
    }

    public void setId_last_four(String id_last_four) {
        this.id_last_four = id_last_four;
    }

    public String getRenewal_history() {
        return renewal_history;
    }

    public void setRenewal_history(String renewal_history) {
        this.renewal_history = renewal_history;
    }

    public String getEducate_benefits() {
        return educate_benefits;
    }

    public void setEducate_benefits(String educate_benefits) {
        this.educate_benefits = educate_benefits;
    }

    public String getZengke_benefits() {
        return zengke_benefits;
    }

    public void setZengke_benefits(String zengke_benefits) {
        this.zengke_benefits = zengke_benefits;
    }

    public String getZengchu_benefits() {
        return zengchu_benefits;
    }

    public void setZengchu_benefits(String zengchu_benefits) {
        this.zengchu_benefits = zengchu_benefits;
    }

    public String getDevelopment_allowance() {
        return development_allowance;
    }

    public void setDevelopment_allowance(String development_allowance) {
        this.development_allowance = development_allowance;
    }

    public String getOther_income_percent() {
        return other_income_percent;
    }

    public void setOther_income_percent(String other_income_percent) {
        this.other_income_percent = other_income_percent;
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

    public String getStr6() {
        return str6;
    }

    public void setStr6(String str6) {
        this.str6 = str6;
    }

    public String getStr7() {
        return str7;
    }

    public void setStr7(String str7) {
        this.str7 = str7;
    }

    public String getStr8() {
        return str8;
    }

    public void setStr8(String str8) {
        this.str8 = str8;
    }

    public String getStr9() {
        return str9;
    }

    public void setStr9(String str9) {
        this.str9 = str9;
    }

    public String getStr10() {
        return str10;
    }

    public void setStr10(String str10) {
        this.str10 = str10;
    }

    public String getStr11() {
        return str11;
    }

    public void setStr11(String str11) {
        this.str11 = str11;
    }

    public String getStr12() {
        return str12;
    }

    public void setStr12(String str12) {
        this.str12 = str12;
    }
    
    


    @Override
    public int hashCode() {
        int hash = 7;
        hash = 17 * hash + Objects.hashCode(this.name);
        hash = 17 * hash + Objects.hashCode(this.parentName);
        hash = 17 * hash + Objects.hashCode(this.category);
        hash = 17 * hash + Objects.hashCode(this.description);
        hash = 17 * hash + Objects.hashCode(this.type);
        hash = 17 * hash + Objects.hashCode(this.status);
        hash = 17 * hash + Objects.hashCode(this.institution);
        hash = 17 * hash + Objects.hashCode(this.zhanyechu_code);
        hash = 17 * hash + Objects.hashCode(this.zhanyeke_code);
        hash = 17 * hash + Objects.hashCode(this.zhanyequ_code);
        hash = 17 * hash + Objects.hashCode(this.staff_name);
        hash = 17 * hash + Objects.hashCode(this.sex);
        hash = 17 * hash + Objects.hashCode(this.begin_time);
        hash = 17 * hash + Objects.hashCode(this.curent_rank);
        hash = 17 * hash + Objects.hashCode(this.id_last_four);
        hash = 17 * hash + Objects.hashCode(this.renewal_history);
        hash = 17 * hash + Objects.hashCode(this.educate_benefits);
        return hash;
    }

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
        final Qutuostaffentity other = (Qutuostaffentity) obj;
        if (!Objects.equals(this.institution, other.institution)) {
            return false;
        }
        if (!Objects.equals(this.zhanyechu_code, other.zhanyechu_code)) {
            return false;
        }
        if (!Objects.equals(this.zhanyeke_code, other.zhanyeke_code)) {
            return false;
        }
        if (!Objects.equals(this.zhanyequ_code, other.zhanyequ_code)) {
            return false;
        }
        if (!Objects.equals(this.staff_name, other.staff_name)) {
            return false;
        }
        if (!Objects.equals(this.sex, other.sex)) {
            return false;
        }
        if (!Objects.equals(this.begin_time, other.begin_time)) {
            return false;
        }
        if (!Objects.equals(this.curent_rank, other.curent_rank)) {
            return false;
        }
        if (!Objects.equals(this.id_last_four, other.id_last_four)) {
            return false;
        }
        if (!Objects.equals(this.renewal_history, other.renewal_history)) {
            return false;
        }
        if (!Objects.equals(this.educate_benefits, other.educate_benefits)) {
            return false;
        }
        if (!Objects.equals(this.zengke_benefits, other.zengke_benefits)) {
            return false;
        }
        if (!Objects.equals(this.zengchu_benefits, other.zengchu_benefits)) {
            return false;
        }
        if (!Objects.equals(this.development_allowance, other.development_allowance)) {
            return false;
        }
        if (!Objects.equals(this.other_income_percent, other.other_income_percent)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Qutuostaffentity{" + "id=" + id + ", parentId=" + parentId + ", name=" + name + ", parentName=" + parentName + ", category=" + category + ", description=" + description + ", type=" + type + ", status=" + status + ", creator=" + creator + ", lastModifier=" + lastModifier + ", createTime=" + createTime + ", lastUpdateTime=" + lastUpdateTime + ", enabled=" + enabled + ", valid=" + valid + ", deleted=" + deleted + ", priority=" + priority + ", modifyCount=" + modifyCount + ", institution=" + institution + ", zhanyechu_code=" + zhanyechu_code + ", zhanyeke_code=" + zhanyeke_code + ", zhanyequ_code=" + zhanyequ_code + ", personal_code=" + personal_code + ", staff_name=" + staff_name + ", sex=" + sex + ", begin_time=" + begin_time + ", curent_rank=" + curent_rank + ", id_last_four=" + id_last_four + ", renewal_history=" + renewal_history + ", educate_benefits=" + educate_benefits + ", zengke_benefits=" + zengke_benefits + ", zengchu_benefits=" + zengchu_benefits + ", development_allowance=" + development_allowance + ", other_income_percent=" + other_income_percent + ", str1=" + str1 + ", str2=" + str2 + ", str3=" + str3 + ", str4=" + str4 + ", str5=" + str5 + ", str6=" + str6 + ", str7=" + str7 + ", str8=" + str8 + ", str9=" + str9 + ", str10=" + str10 + ", str11=" + str11 + ", str12=" + str12 + '}';
    }


}
