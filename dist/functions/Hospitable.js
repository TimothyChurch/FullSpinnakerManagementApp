exports = async function({path, query}) {
  
  const token = context.function.execute('HospitableToken');
  
  const url = "api.hospitable.com/";
  const headers = {'Content-Type': 'application/json', Authorization: token};
  
  try {
    let response = await context.http.get({
      "scheme": "https",
      "host": url,
      "path": path,
      "query": query,
      "headers": headers
    }).then(response => {
        const ejson_body = EJSON.parse(response.body.text());
        return ejson_body;
    });
    return response;
  } catch(err) {
    return err;
  }
};