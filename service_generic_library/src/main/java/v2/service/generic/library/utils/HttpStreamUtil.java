/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.library.utils;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Response;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 *
 * @author lqshanshuo
 */
public class HttpStreamUtil {
    
    public static Response downLoad(HttpServletResponse response, String content, String defaultName) {
        if (defaultName == null || "".equalsIgnoreCase(defaultName)) {
            defaultName = "scripter_download.txt";
        }
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment; filename=" + defaultName);
        try {
            OutputStream ostream = response.getOutputStream();
            byte[] buffer = content.getBytes("utf-8");
            ostream.write(buffer);
            ostream.flush();
            ostream.close();
            
            Response.ResponseBuilder builder = Response.ok();
            return builder.build();
        } catch (IOException ex) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    public static List<File> upLoad(HttpServletRequest request, String dir) {
        List<File> returnList = new ArrayList<>();
        if (!Misc.isNULL(dir)) {
            if ('/' != dir.charAt(0)) {
                dir = "/" + dir;
            }
        } else {
            dir = "/";
        }
        
        File cache_dir = new File("/tmp");
        File data_dir = new File(request.getSession().getServletContext().getRealPath("") + "/upload/" + dir);
        if (!cache_dir.isDirectory()) {
            Misc.mkdirs(cache_dir.getAbsolutePath());
        }
        if (!data_dir.isDirectory()) {
            Misc.mkdirs(data_dir.getAbsolutePath());
        }
        
        try {
            //创建一个基于硬盘的FileItem工厂  
            DiskFileItemFactory factory = new DiskFileItemFactory();
            //设置向硬盘写数据时所用的缓冲区的大小，此处为100M
            factory.setSizeThreshold(100 * 1024 * 1024);
            //设置临时目录  
            factory.setRepository(cache_dir);
            //创建一个文件上传处理器  
            ServletFileUpload upload = new ServletFileUpload(factory);
            //设置允许上传的文件的最大尺寸，此处为100M
            upload.setSizeMax(100 * 1024 * 1024);
            
            List /* FileItem */ items = upload.parseRequest(request);
            
            Iterator iter = items.iterator();
            while (iter.hasNext()) {
                FileItem item = (FileItem) iter.next();
                if (!item.isFormField()) {
                    //处理上传文件  
                    String filename = item.getName();
                    if (filename.equals("") && item.getSize() == 0) {
                        break;
                    }
                    File uploadedFile = new File(data_dir + "/" + filename);
                    item.write(uploadedFile);
                    returnList.add(uploadedFile);
                    System.out.println(data_dir.getAbsolutePath() + "/" + filename);
                }
            }
        } catch (Exception e) {
            Logger.getLogger(HttpStreamUtil.class.getName()).log(Level.SEVERE, null, e);
        }
        return returnList;
    }
}

class Misc {
    
    public static File mkdirs(String dir) {
        
        boolean ret = false;
        File new_dir = new File(dir);
        if (!new_dir.isDirectory()) {
            ret = new_dir.mkdirs();
            if (!ret) {
                return null;
            }
        }
        return new_dir;
    }

    public static boolean isNULL(String obj) {
        if (null == obj || "".equals(obj)) {
            return true;
        }
        
        return false;
    }
}
