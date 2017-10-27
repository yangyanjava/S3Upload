/**
	 * 获取oss/s3身份验证
	 */
@RequestMapping(value = "getAuthIdentity", method = RequestMethod.GET)
@ResponseBody 
public Map < String,String > getOssIdentity(HttpServletRequest request, HttpServletResponse response, String cdn) throws Exception {

    String bucket = "你的bucket";
    String host = "https://" + bucket + ".s3.amazonaws.com/";
    // 拼接头信息
    String policy_document = "{\"expiration\": \"2109-01-01T00:00:00Z\"," + "\"conditions\": [" + "{\"bucket\": \"" + bucket + "\"}," + "{\"acl\": \"public-read\"}," + "[\"starts-with\", \"$Content-Type\", \"\"]," + "[\"starts-with\", \"$name\", \"\"]," + "[\"starts-with\", \"$key\", \"\"]," + "[\"starts-with\", \"$Filename\", \"\"]," + "[\"content-length-range\", 0, 10111148576]" + "]" + "}";

    String policy = (new BASE64Encoder()).encode(policy_document.getBytes("UTF-8")).replaceAll("\n", "").replaceAll("\r", "");
    Mac hmac = Mac.getInstance("HmacSHA1");
    hmac.init(new SecretKeySpec("你的secretKey".getBytes("UTF-8"), "HmacSHA1"));
    // 获取签名
    String signature = (new BASE64Encoder()).encode(hmac.doFinal(policy.getBytes("UTF-8"))).replaceAll("\n", "");
    Map < String,
    String > respMap = identityMap("你的accessKey", host, policy, signature);
    return respMap;
}

private Map < String,
String > identityMap(String accessid, String host, String encodedPolicy, String postSignature) {
    Map < String,
    String > respMap = new LinkedHashMap < String,
    String > ();
    respMap.put("accessid", accessid);
    respMap.put("policy", encodedPolicy);
    respMap.put("signature", postSignature);
    respMap.put("host", host);
    return respMap;
}
