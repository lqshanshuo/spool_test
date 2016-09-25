/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.scripter.entity.job;

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
@Table(name = "job_recall",catalog = "scripter",schema = "job")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "JobRecall.findAll", query = "SELECT j FROM JobRecall j"),
    @NamedQuery(name = "JobRecall.findById", query = "SELECT j FROM JobRecall j WHERE j.id = :id"),
    @NamedQuery(name = "JobRecall.findByApplicationId", query = "SELECT j FROM JobRecall j WHERE j.applicationId = :applicationId"),
    @NamedQuery(name = "JobRecall.findByJobId", query = "SELECT j FROM JobRecall j WHERE j.jobId = :jobId"),
    @NamedQuery(name = "JobRecall.findByAppName", query = "SELECT j FROM JobRecall j WHERE j.appName = :appName"),
    @NamedQuery(name = "JobRecall.findByUsername", query = "SELECT j FROM JobRecall j WHERE j.username = :username"),
    @NamedQuery(name = "JobRecall.findByProgress", query = "SELECT j FROM JobRecall j WHERE j.progress = :progress"),
    @NamedQuery(name = "JobRecall.findByStatus", query = "SELECT j FROM JobRecall j WHERE j.status = :status"),
    @NamedQuery(name = "JobRecall.findByQueue", query = "SELECT j FROM JobRecall j WHERE j.queue = :queue"),
    @NamedQuery(name = "JobRecall.findByStartedTime", query = "SELECT j FROM JobRecall j WHERE j.startedTime = :startedTime"),
    @NamedQuery(name = "JobRecall.findByElapsedTime", query = "SELECT j FROM JobRecall j WHERE j.elapsedTime = :elapsedTime"),
    @NamedQuery(name = "JobRecall.findByRecordCreatedTime", query = "SELECT j FROM JobRecall j WHERE j.recordCreatedTime = :recordCreatedTime"),
    @NamedQuery(name = "JobRecall.findByRecordModifiedTime", query = "SELECT j FROM JobRecall j WHERE j.recordModifiedTime = :recordModifiedTime"),
    @NamedQuery(name = "JobRecall.findByInputDir", query = "SELECT j FROM JobRecall j WHERE j.inputDir = :inputDir"),
    @NamedQuery(name = "JobRecall.findByOutputDir", query = "SELECT j FROM JobRecall j WHERE j.outputDir = :outputDir"),
    @NamedQuery(name = "JobRecall.findByInputContent", query = "SELECT j FROM JobRecall j WHERE j.inputContent = :inputContent"),
    @NamedQuery(name = "JobRecall.findByInputType", query = "SELECT j FROM JobRecall j WHERE j.inputType = :inputType"),
    @NamedQuery(name = "JobRecall.findByOutputRowCounts", query = "SELECT j FROM JobRecall j WHERE j.outputRowCounts = :outputRowCounts"),
    @NamedQuery(name = "JobRecall.findByOutputColumnCounts", query = "SELECT j FROM JobRecall j WHERE j.outputColumnCounts = :outputColumnCounts"),
    @NamedQuery(name = "JobRecall.findByStr1", query = "SELECT j FROM JobRecall j WHERE j.str1 = :str1"),
    @NamedQuery(name = "JobRecall.findByStr2", query = "SELECT j FROM JobRecall j WHERE j.str2 = :str2"),
    @NamedQuery(name = "JobRecall.findByStr3", query = "SELECT j FROM JobRecall j WHERE j.str3 = :str3"),
    @NamedQuery(name = "JobRecall.findByStr4", query = "SELECT j FROM JobRecall j WHERE j.str4 = :str4"),
    @NamedQuery(name = "JobRecall.findByStr5", query = "SELECT j FROM JobRecall j WHERE j.str5 = :str5"),
    @NamedQuery(name = "JobRecall.findByStr6", query = "SELECT j FROM JobRecall j WHERE j.str6 = :str6"),
    @NamedQuery(name = "JobRecall.findByStr7", query = "SELECT j FROM JobRecall j WHERE j.str7 = :str7"),
    @NamedQuery(name = "JobRecall.findByStr8", query = "SELECT j FROM JobRecall j WHERE j.str8 = :str8"),
    @NamedQuery(name = "JobRecall.findByStr9", query = "SELECT j FROM JobRecall j WHERE j.str9 = :str9"),
    @NamedQuery(name = "JobRecall.findByStr10", query = "SELECT j FROM JobRecall j WHERE j.str10 = :str10"),
    @NamedQuery(name = "JobRecall.findByFigure1", query = "SELECT j FROM JobRecall j WHERE j.figure1 = :figure1"),
    @NamedQuery(name = "JobRecall.findByFigure2", query = "SELECT j FROM JobRecall j WHERE j.figure2 = :figure2"),
    @NamedQuery(name = "JobRecall.findByFigure3", query = "SELECT j FROM JobRecall j WHERE j.figure3 = :figure3"),
    @NamedQuery(name = "JobRecall.findByFigure4", query = "SELECT j FROM JobRecall j WHERE j.figure4 = :figure4"),
    @NamedQuery(name = "JobRecall.findByFigure5", query = "SELECT j FROM JobRecall j WHERE j.figure5 = :figure5"),
    @NamedQuery(name = "JobRecall.findByBool1", query = "SELECT j FROM JobRecall j WHERE j.bool1 = :bool1"),
    @NamedQuery(name = "JobRecall.findByBool2", query = "SELECT j FROM JobRecall j WHERE j.bool2 = :bool2"),
    @NamedQuery(name = "JobRecall.findByBool3", query = "SELECT j FROM JobRecall j WHERE j.bool3 = :bool3"),
    @NamedQuery(name = "JobRecall.findByBool4", query = "SELECT j FROM JobRecall j WHERE j.bool4 = :bool4"),
    @NamedQuery(name = "JobRecall.findByBool5", query = "SELECT j FROM JobRecall j WHERE j.bool5 = :bool5")})
public class JobRecall implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Size(max = 255)
    @Column(name = "application_id")
    private String applicationId;
    @Size(max = 255)
    @Column(name = "job_id")
    private String jobId;
    @Size(max = 255)
    @Column(name = "app_name")
    private String appName;
    @Size(max = 255)
    @Column(name = "username")
    private String username;
    @Size(max = 255)
    @Column(name = "progress")
    private String progress;
    @Size(max = 255)
    @Column(name = "status")
    private String status;
    @Size(max = 255)
    @Column(name = "queue")
    private String queue;
    @Size(max = 255)
    @Column(name = "started_time")
    private String startedTime;
    @Size(max = 255)
    @Column(name = "elapsed_time")
    private String elapsedTime;
    @Column(name = "record_created_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date recordCreatedTime;
    @Column(name = "record_modified_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date recordModifiedTime;
    @Size(max = 255)
    @Column(name = "input_dir")
    private String inputDir;
    @Size(max = 255)
    @Column(name = "output_dir")
    private String outputDir;
    @Size(max = 2147483647)
    @Column(name = "input_content")
    private String inputContent;
    @Size(max = 255)
    @Column(name = "input_type")
    private String inputType;
    @Column(name = "output_row_counts")
    private BigInteger outputRowCounts;
    @Column(name = "output_column_counts")
    private BigInteger outputColumnCounts;
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
    @Size(max = 255)
    @Column(name = "str6")
    private String str6;
    @Size(max = 255)
    @Column(name = "str7")
    private String str7;
    @Size(max = 255)
    @Column(name = "str8")
    private String str8;
    @Size(max = 255)
    @Column(name = "str9")
    private String str9;
    @Size(max = 255)
    @Column(name = "str10")
    private String str10;
    @Column(name = "figure1")
    private BigInteger figure1;
    @Column(name = "figure2")
    private BigInteger figure2;
    @Column(name = "figure3")
    private BigInteger figure3;
    @Column(name = "figure4")
    private BigInteger figure4;
    @Column(name = "figure5")
    private BigInteger figure5;
    @Column(name = "bool1")
    private Boolean bool1;
    @Column(name = "bool2")
    private Boolean bool2;
    @Column(name = "bool3")
    private Boolean bool3;
    @Column(name = "bool4")
    private Boolean bool4;
    @Column(name = "bool5")
    private Boolean bool5;

    public JobRecall() {
    }

    public JobRecall(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProgress() {
        return progress;
    }

    public void setProgress(String progress) {
        this.progress = progress;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getQueue() {
        return queue;
    }

    public void setQueue(String queue) {
        this.queue = queue;
    }

    public String getStartedTime() {
        return startedTime;
    }

    public void setStartedTime(String startedTime) {
        this.startedTime = startedTime;
    }

    public String getElapsedTime() {
        return elapsedTime;
    }

    public void setElapsedTime(String elapsedTime) {
        this.elapsedTime = elapsedTime;
    }

    public Date getRecordCreatedTime() {
        return recordCreatedTime;
    }

    public void setRecordCreatedTime(Date recordCreatedTime) {
        this.recordCreatedTime = recordCreatedTime;
    }

    public Date getRecordModifiedTime() {
        return recordModifiedTime;
    }

    public void setRecordModifiedTime(Date recordModifiedTime) {
        this.recordModifiedTime = recordModifiedTime;
    }

    public String getInputDir() {
        return inputDir;
    }

    public void setInputDir(String inputDir) {
        this.inputDir = inputDir;
    }

    public String getOutputDir() {
        return outputDir;
    }

    public void setOutputDir(String outputDir) {
        this.outputDir = outputDir;
    }

    public String getInputContent() {
        return inputContent;
    }

    public void setInputContent(String inputContent) {
        this.inputContent = inputContent;
    }

    public String getInputType() {
        return inputType;
    }

    public void setInputType(String inputType) {
        this.inputType = inputType;
    }

    public BigInteger getOutputRowCounts() {
        return outputRowCounts;
    }

    public void setOutputRowCounts(BigInteger outputRowCounts) {
        this.outputRowCounts = outputRowCounts;
    }

    public BigInteger getOutputColumnCounts() {
        return outputColumnCounts;
    }

    public void setOutputColumnCounts(BigInteger outputColumnCounts) {
        this.outputColumnCounts = outputColumnCounts;
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

    public BigInteger getFigure4() {
        return figure4;
    }

    public void setFigure4(BigInteger figure4) {
        this.figure4 = figure4;
    }

    public BigInteger getFigure5() {
        return figure5;
    }

    public void setFigure5(BigInteger figure5) {
        this.figure5 = figure5;
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

    public Boolean getBool4() {
        return bool4;
    }

    public void setBool4(Boolean bool4) {
        this.bool4 = bool4;
    }

    public Boolean getBool5() {
        return bool5;
    }

    public void setBool5(Boolean bool5) {
        this.bool5 = bool5;
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
        if (!(object instanceof JobRecall)) {
            return false;
        }
        JobRecall other = (JobRecall) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "general.query.entity.JobRecall[ id=" + id + " ]";
    }
    
}
