package v2.service.generic.sharing.utils;

import com.google.common.base.Charsets;
import com.google.common.hash.Hashing;


public class HashUtil {

	/**
	 * Utility function for generate a 66 digital hash key.
	 * Prefix is a extension attribute used for specify the APM business module, but it also can be used for other purpose.
	 * UniqueKey is the content which will be hashed by this algorithm.
	 * Timestamp is a extension attribute used for specify  the time stamp.
	 * @param prefix
	 * @param uniqueKey
	 * @param timestamp
	 * @return
	 */
	public static String genPublicUrlHash(String prefix, String uniqueKey, Long timestamp) {
		String result = "";

		if (timestamp != null) {
			uniqueKey = uniqueKey + timestamp;
		}

		String hashed = Hashing.sha256().hashString(uniqueKey, Charsets.UTF_8).toString();
		
		if(prefix!=null){
			result = prefix + hashed;
		}
		return result;
	}
}
