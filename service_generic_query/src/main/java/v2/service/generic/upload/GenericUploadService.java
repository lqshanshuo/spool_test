/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.upload;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.AccessDeniedException;
import java.util.Date;
import java.util.Map;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import v2.service.generic.library.constants.GenericStatus;
import v2.service.generic.library.model.CUDPOJO;
import v2.service.generic.library.model.ResponsePOJO;
import v2.service.generic.library.utils.FileUtil;
import v2.service.generic.library.utils.JsonUtil;
import v2.service.generic.library.utils.StringUtil;
import v2.service.generic.query.service.CUDService;
import v2.service.generic.query.service.QueryService;

/**
 *
 * @author ly
 */
@WebServlet(name = "GenericUploadService", urlPatterns = {"/GenericUploadService"})
@MultipartConfig
public class GenericUploadService extends HttpServlet {

    @EJB
    CUDService cudService;

    @EJB
    QueryService queryService;

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String result = null;
        response.addHeader("Cache-Control", "no-cache");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("applicaiton/json");
        final PrintWriter writer = response.getWriter();
//        String functionCode = request.getParameter("functionCode");
//        System.out.println("functionCode is:"+functionCode);

        result = businessFunction(request);
        try {
            if (result != null) {
                writer.write(result);
            }
        } catch (Exception fne) {
            fne.printStackTrace();
        } finally {
            if (writer != null) {
                writer.close();
            }
        }
    }

    /**
     * Function logic:
     *
     * 1, Validate the parameter:
     *    1.0 'UNIQUE_ID': '{username}','{passportID}' ..etc
     *    1.1 'SYSTEM_ID': 'scripter','matrix','xxx'
     *    1.2 'MODULE_ID': 'notebook','profile'..etc
     *    1.3 'FUNCTION_ID' : 'xxx_images','xxx_portrait','xxx_backup_files'
     *
     * 2, Validation Failed, return Service Failed Generic Response JSON 
     *    2.1 Response JSON didn't contain any error tip such as missing 'UNIQUE' to avoid hack
     *    2.2 The suffix support file type: 'jpeg','jpg','png','svg','gif','json','xls','xlsx','csv','doc','docx','ppt','pptx','pdf'
     * 
     * 
     * 3,Validation Success, upload the resource to the destination 
     * 
     *    3.1 Destination Root Path in glassfish-web.xml, default is 
     *    <property description="Uploaded Images" name="alternatedocroot_1" value="from=/matrix/upload/* dir=/opt/" />
     *    
     *    3.2 If UNIQUE_ID = carina, SYSTEM_ID = scripter, MODULE_ID = notebook, FUNCTION_ID = upload_icons
     *    The Destination folder should be:
     *    actual path: /opt/matrix/upload/scripter/carina/notebook/upload_icons/
     *    web path: http://localhost:port/matrix_client_v2/matrix/upload
     * 4, Save the upload log to the Persistence Database 
     *    4.1 Entity: Genericentity
     *    4.2 Attributes-Columns Mapping:
     *          4.2.1 UNIQUE_ID:stringalpha
     *          4.2.2 SYSTEM_ID:stringbeta
     *          4.2.3 MODULE_ID:stringdelta
     *          4.2.4 FUNCTION_ID:stringgamma
     *          4.2.5 {file_name}:stringeta
     *          4.2.6 'GENERIC_UPLOAD_FUNCTION':type
     *          4.2.7 {access_url}:stringkappa
     *          4.2.8 {destination_folder}:stringlambda
     * 
     * 5, return Service Success Generic Response JSON, result is the reference path of the upload resources
     *
     * @param request
     * @return
     * @throws IOException
     */
    private String businessFunction(HttpServletRequest request) throws IOException {
        ResponsePOJO result = new ResponsePOJO();
        GenericUploadModel model = new GenericUploadModel();
        try {
            boolean validation_result = step1_validation(request,model);
            if(!validation_result){
                step2_validationFailedHandler(result,model);
            }else{
                boolean upload_result = step3_upload(request,result,model);
                if(upload_result){
                    result = step4_persistence(request,result,model);
                    result = step5_successHandler(result,model);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            result.setHasError(Boolean.TRUE);
            result.setErrorMessage(e.getMessage());
            result.setStatusCode(GenericStatus.Service_Failed);
        }
        return JsonUtil.toJson(result);
    }


     /**
      * 1, Validate the parameter:
      *    1.0 'UNIQUE_ID': '{username}','{passportID}' ..etc
      *    1.1 'SYSTEM_ID': 'scripter','matrix','xxx'
      *    1.2 'MODULE_ID': 'notebook','profile'..etc
      *    1.3 'FUNCTION_ID' : 'xxx_images','xxx_portrait','xxx_backup_files'
      */
    private boolean step1_validation(HttpServletRequest request,GenericUploadModel model) throws IOException, ServletException{
        boolean validation_result = false;
        String UNIQUE_ID = request.getParameter("UNIQUE_ID");
        String SYSTEM_ID = request.getParameter("SYSTEM_ID");
        String MODULE_ID = request.getParameter("MODULE_ID");
        String FUNCTION_ID = request.getParameter("FUNCTION_ID");
        
        
        model.setUNIQUE_ID(UNIQUE_ID);
        model.setSYSTEM_ID(SYSTEM_ID);
        model.setMODULE_ID(MODULE_ID);
        model.setFUNCTION_ID(FUNCTION_ID);
        
        
        if(StringUtil.isNullOrEmpty(UNIQUE_ID)||StringUtil.isNullOrEmpty(SYSTEM_ID)||StringUtil.isNullOrEmpty(MODULE_ID)||StringUtil.isNullOrEmpty(FUNCTION_ID)){
            validation_result = false;
        }else{
            final Part filePart = request.getPart("file");
            String fileName = getFileName(filePart);
            // This is an exception handle for the special characters
            fileName = fileName.replaceAll("\\(", "lll");
            fileName = fileName.replaceAll("\\)", "rrr");
            String fileExtName = fileName.substring(fileName.lastIndexOf(".")+1);
            fileName = UNIQUE_ID+"_"+System.currentTimeMillis()+"."+fileExtName;
            model.setFileName(fileName);
            model.setFileExtName(fileExtName);
            //The suffix support file type: 'jpeg','jpg','png','svg','gif','json','xls','xlsx','csv','doc','docx','ppt','pptx','pdf'
            if("jpeg".equalsIgnoreCase(fileExtName)
                    ||"jpg".equalsIgnoreCase(fileExtName)
                    ||"png".equalsIgnoreCase(fileExtName)
                    ||"gif".equalsIgnoreCase(fileExtName)
                    ||"svg".equalsIgnoreCase(fileExtName)
                    ||"json".equalsIgnoreCase(fileExtName)
                    ||"xls".equalsIgnoreCase(fileExtName)
                    ||"xlsx".equalsIgnoreCase(fileExtName)
                    ||"csv".equalsIgnoreCase(fileExtName)
                    ||"doc".equalsIgnoreCase(fileExtName)
                    ||"docx".equalsIgnoreCase(fileExtName)
                    ||"ppt".equalsIgnoreCase(fileExtName)
                    ||"pptx".equalsIgnoreCase(fileExtName)
                    ||"pdf".equalsIgnoreCase(fileExtName)){
                validation_result = true;
            }
            
        }
        
        
        
        return validation_result;
    }
    
    private void step2_validationFailedHandler(ResponsePOJO result,GenericUploadModel model){
        
        result.setHasError(Boolean.TRUE);
        result.setErrorMessage("GENERIC_UPLOAD_VALIDATION_FAILED");
        result.setStatusCode(GenericStatus.Service_Failed);
    }
    /**
     * 3,Validation Success, upload the resource to the destination 
     * 
     *    3.1 Destination Root Path in glassfish-web.xml, default is 
     *    <property description="Uploaded Images" name="alternatedocroot_1" value="from=/matrix/upload/* dir=/opt/" />
     *    
     *    3.2 If UNIQUE_ID = carina, SYSTEM_ID = scripter, MODULE_ID = notebook, FUNCTION_ID = upload_icons
     *    The Destination folder should be:
     *    actual path: /opt/matrix/upload/scripter/carina/notebook/upload_icons/
     *    web path: http://localhost:port/matrix_client_v2/matrix/upload
     * @param request 
     */
    private String DEFAULT_DESTINATION_FOLDER_PREFIX = "/opt";
    private String DEFAULT_UPLOAD_FOLDER="/matrix/upload/";
    private boolean step3_upload(HttpServletRequest request,ResponsePOJO result,GenericUploadModel model) throws IOException, ServletException{
        boolean uploadResult = false;
        String UNIQUE_ID = model.getUNIQUE_ID();
        String SYSTEM_ID = model.getSYSTEM_ID();
        String MODULE_ID = model.getMODULE_ID();
        String FUNCTION_ID = model.getFUNCTION_ID();
        String destination_folder = DEFAULT_DESTINATION_FOLDER_PREFIX+DEFAULT_UPLOAD_FOLDER+SYSTEM_ID+"/"+UNIQUE_ID+"/"+MODULE_ID+"/"+FUNCTION_ID;
        String accessUrl_folder = DEFAULT_UPLOAD_FOLDER+SYSTEM_ID+"/"+UNIQUE_ID+"/"+MODULE_ID+"/"+FUNCTION_ID;
        model.setDestination_folder(destination_folder);
        // write the file to the file specified
        FileUtil.createDir(destination_folder);
        
        String fileName = model.getFileName();
        
        
        final String destination = destination_folder + "/" + fileName;
        final String accessUrl = accessUrl_folder + "/" + fileName;
        model.setAccessUrl(accessUrl);
        model.setDestination(destination);
        try {
            final Part filePart = request.getPart("file");
            boolean flag = FileUtil.writeFile(filePart.getInputStream(), destination);
            if (!flag) {
                result.setHasError(Boolean.TRUE);
                result.setErrorMessage("WRITE_FILE_FAILED");
                result.setStatusCode(GenericStatus.Service_Failed);
            } 
            uploadResult = true;
        } catch (FileNotFoundException fne) {
            result.setHasError(Boolean.TRUE);
            result.setErrorMessage("ERROR_CODE_FILE_NOT_FOUND");
            result.setStatusCode(GenericStatus.Service_Failed);
        } catch (AccessDeniedException ade) {
            result.setHasError(Boolean.TRUE);
            result.setErrorMessage("ACCESS DENIED");
            result.setStatusCode(GenericStatus.Service_Failed);
        }
        return uploadResult;
    }
    /**
     * 4, Save the upload log to the Persistence Database 
     *    4.1 Entity: Genericentity
     *    4.2 Attributes-Columns Mapping:
     *          4.2.1 UNIQUE_ID:stringalpha
     *          4.2.2 SYSTEM_ID:stringbeta
     *          4.2.3 MODULE_ID:stringdelta
     *          4.2.4 FUNCTION_ID:stringgamma
     *          4.2.5 {file_name}:stringeta
     *          4.2.6 'GENERIC_UPLOAD_FUNCTION':type
     *          4.2.7 {access_url}:stringkappa
     *          4.2.8 {destination_folder}:stringlambda
     * @param request 
     */
    private ResponsePOJO step4_persistence(HttpServletRequest request,ResponsePOJO result,GenericUploadModel model){
        CUDPOJO pojo = new CUDPOJO();
        pojo.setClassName("v2.service.generic.query.entity.Genericentity");
        Map attributes = pojo.getAttributes();
        attributes.put("type", "GENERIC_UPLOAD_FUNCTION");
        attributes.put("stringalpha", model.getUNIQUE_ID());
        attributes.put("stringbeta", model.getSYSTEM_ID());
        attributes.put("stringdelta", model.getMODULE_ID());
        attributes.put("stringgamma", model.getFUNCTION_ID());
        attributes.put("stringeta", model.getFileName());
        attributes.put("stringkappa", model.getAccessUrl());
        attributes.put("stringlambda", model.getDestination_folder());
        attributes.put("createtime", new Date());
        attributes.put("deleted", false);
        attributes.put("enabled", true);
        attributes.put("valid", true);
        result = cudService.add(pojo);
        return result;
    }
    
    /**
     * return Service Success Generic Response JSON, result is the reference path of the upload resources
     * @param result
     * @param model 
     */
    private ResponsePOJO step5_successHandler(ResponsePOJO result,GenericUploadModel model){
        result.setHasError(Boolean.FALSE);
        result.setStatus("GENERIC_UPLOAD_SERVICE_SUCCESS!");
        result.setStatusCode(GenericStatus.Service_Successed);
        return result;
    }
    
    private String getFileName(final Part part) {
        for (String content : part.getHeader("content-disposition").split(";")) {
            if (content.trim().startsWith("filename")) {
                return content.substring(content.indexOf('=') + 1).trim()
                        .replace("\"", "");
            }
        }
        return null;
    }
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
