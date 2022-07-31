exports = async function() {
 
  const clientId = context.values.get("HOSPITABLE_CLIENT_ID");
  const clientSecret = context.values.get("HOSPITABLE_CLIENT_SECRET");
 
  const accessToken = await context.http.post({
    url: "https://auth.hospitable.com/oauth/token",
    headers: {"Content-Type": ["application/json"]},
    body: { 
      "client_id": clientId,
      "client_secret": clientSecret,
      "audience": "api.hospitable.com",
      "grant_type": "client_credentials"
    },
    encodeBodyAsJSON: true
  }).then(response => {
      const ejson_body = EJSON.parse(response.body.text());
      return ejson_body
  });
  
  return accessToken;
};