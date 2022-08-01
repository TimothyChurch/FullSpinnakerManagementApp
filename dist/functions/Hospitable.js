exports = async function() {
  
  const token = context.functions.execute("HospitableTokenExchange");
  
  const url = "api.hospitable.com";
  const headers = {'Content-Type': ['application/json'], Authorization: token};
  const path = "/calendar/521572";
  const query = { start_date: ["2022-07-01"], end_date: ["2022-08-30"]};
  try {
    const response = await context.http.get({
      "scheme": "https",
      "host": url,
      "path": path,
      "query": query,
      "headers": headers
    }).then((response) => {
      return response
    })
    // .then(response => {
    //   return response.status
    //     // const ejson_body = EJSON.parse(response.body.text());
    //     // return ejson_body;
    // });
    return response;
  } catch(err) {
    return err;
  }
};