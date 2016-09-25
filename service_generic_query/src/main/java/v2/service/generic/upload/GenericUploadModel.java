/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.upload;

/**
 *
 * @author root
 */
public class GenericUploadModel {

    private String UNIQUE_ID;
    private String SYSTEM_ID;
    private String MODULE_ID;
    private String FUNCTION_ID;
    private String destination_folder;
    private String fileName;
    private String fileExtName;
    private String destination;
    private String accessUrl;

    public String getAccessUrl() {
        return accessUrl;
    }

    public void setAccessUrl(String accessUrl) {
        this.accessUrl = accessUrl;
    }
    

    public String getUNIQUE_ID() {
        return UNIQUE_ID;
    }

    public void setUNIQUE_ID(String UNIQUE_ID) {
        this.UNIQUE_ID = UNIQUE_ID;
    }

    public String getSYSTEM_ID() {
        return SYSTEM_ID;
    }

    public void setSYSTEM_ID(String SYSTEM_ID) {
        this.SYSTEM_ID = SYSTEM_ID;
    }

    public String getMODULE_ID() {
        return MODULE_ID;
    }

    public void setMODULE_ID(String MODULE_ID) {
        this.MODULE_ID = MODULE_ID;
    }

    public String getFUNCTION_ID() {
        return FUNCTION_ID;
    }

    public void setFUNCTION_ID(String FUNCTION_ID) {
        this.FUNCTION_ID = FUNCTION_ID;
    }

    public String getDestination_folder() {
        return destination_folder;
    }

    public void setDestination_folder(String destination_folder) {
        this.destination_folder = destination_folder;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileExtName() {
        return fileExtName;
    }

    public void setFileExtName(String fileExtName) {
        this.fileExtName = fileExtName;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
    
    
}
