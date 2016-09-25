package v2.service.generic.library.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class FileUtil {
	
	protected static final Log log = LogFactory.getLog(FileUtil.class);
	
	public static boolean delAllFile(String path) {
		boolean flag = false;
		File file = new File(path);
		if (!file.exists()) {
			return flag;
		}
		if (!file.isDirectory()) {
			return flag;
		}
		String[] tempList = file.list();
		File temp = null;
		for (int i = 0; i < tempList.length; i++) {
			if (path.endsWith("/")) {
				temp = new File(path + tempList[i]);
			} else {
				temp = new File(path + "/" + tempList[i]);
			}
			if (temp.isFile()) {
				temp.delete();
			}
		}
		return flag;
	}
	
	public static boolean deleteWholeDir(String path){
		boolean flag = false;
        File dir=new File(path);
        
        try{
        	 if(dir.exists()){
                 File[] tmp=dir.listFiles();
                 for(int i=0;i<tmp.length;i++){
                     if(tmp[i].isDirectory()){
                     	deleteWholeDir(path+"/"+tmp[i].getName());
                     }
                     else{
                         tmp[i].delete();
                     }
                 }
                 dir.delete();
             }
        	 flag=true;
        }catch(Exception e){
        	log.error(e.getMessage());
        }
        return flag;
    }
	
	public static boolean deleteFile(String path,String filename){
		boolean flag = false;
        File file=new File(path+"/"+filename);
        if(file.exists()&&file.isFile()){
        	file.delete();
        	flag=true;
        }
        return flag;
    }
	
	public static boolean createDir(String path){
		boolean flag = false;
        File dir=new File(path);
        if(!dir.exists()){
            dir.mkdirs();
            flag=true;
        }else{
        	flag=true;
        }
        return flag;
    }
	
	public static boolean copyFile(String src,String dest) throws IOException{
		
        FileInputStream in=new FileInputStream(src);
        return writeFile(in,dest);
        
    }
	public static boolean writeFile(InputStream inputStream, String dest) throws IOException{
		boolean flag = false;
		FileOutputStream out =null;
		try{
		 File file=new File(dest);
	        if(!file.exists()){
	            file.createNewFile();
	        }
	        out=new FileOutputStream(file);
	        int c;
	        byte buffer[]=new byte[1024];
	        while((c=inputStream.read(buffer))!=-1){
	            for(int i=0;i<c;i++)
	                out.write(buffer[i]);        
	        }
	        flag=true;
		}catch(Exception e){
			log.error(e.getMessage());
		}finally{
			if(inputStream!=null){
				inputStream.close();
			}
			if(out!=null){
				out.close();
			}
		}
		return flag;
	}
	public static void main(String args[]) throws Exception{
//		FileUtil.delAllFile("d://tmp");
//		FileUtil.deleteFile("d:/tmp", "baidu.jpg");
//		FileUtil.deleteWholeDir("d:/tmp");
//		FileUtil.createDir("d:/tmp2");
//		FileUtil.copyFile("D://lms/images/upload/yangliu/logo.jpg", "d:/tmp2/logo.jpg");
		FileUtil.createDir("/opt/matrix/demo/upload");
	}
}
