import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import android.util.Base64;
public class DemoAES{
	private static final String CIPHER = "AES/ECB/PKCS5Padding";
	public static void main(String []args) {
		String test = "ABC";
		String out = getCStr(test);
		System.out.println(test+" 's code: "+out);
			
	}
	public static String getCStr(String str) {
		try {
			String yuanBase64 = Base64.encodeToString(encrypt(str, "ulearning2021331"), 0);
			System.out.println("yuanBase64 code:"+yuanBase64 );
			return getCString(yuanBase64);
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}
    
	public static byte[] encrypt(String str, String str2) throws Exception {
		SecretKeySpec secretKeySpec = new SecretKeySpec(str2.getBytes(), "AES");
		Cipher cipher = Cipher.getInstance(CIPHER);
		cipher.init(1, secretKeySpec);
		byte[] encrypted = cipher.doFinal(str.getBytes("UTF-8"));
		StringBuilder sb = new StringBuilder();
		for(byte b : encrypted) {
			sb.append(String.format("%02x ", b));
		}
		System.out.println("evely Block Data:\t"+sb);
		return encrypted;
	}
    
	private static String getCString(String str) {
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < str.length(); i++) {
			if (sb.length() < 10) {
				sb.append((char) (((int) (Math.random() * 26.0d)) + 97));
			}
			sb.append(str.charAt(i));
		}
		return sb.toString();
	}
}
