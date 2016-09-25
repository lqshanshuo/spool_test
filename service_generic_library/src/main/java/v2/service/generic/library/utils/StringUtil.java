package v2.service.generic.library.utils;

public class StringUtil {
	/**
	 * This util function will format the string which seperate by comma
	 * @param text
	 * @return
	 */
	public static String formatCommaString(String text){
		String[] arr = text.split(",");
		String result="";
		for(String s: arr){
			if(!"".equalsIgnoreCase(s.trim())){
				result+=s+",";
			}
		}
		if(result.endsWith(",")){
			result=result.substring(0,result.length()-1);
		}
		return result;
	}
        
        public static boolean isNullOrEmpty(String input){
            if(input==null||input.trim().equalsIgnoreCase("")){
                return true;
            }else{
                return false;
            }
        }
        
        
}
