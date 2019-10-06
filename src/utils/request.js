import _ from "lodash"

const request = {
  get: function(url) {
    return makeRequest(url, "GET")
  },

  post: function(url, data) {
    return makeRequest(url, {
      method: "POST",
      body: JSON.stringify(data)
    })
  },

  put: function(url, data) {
    return makeRequest(url, {
      method: "PUT",
      body: JSON.stringify(data)
    })
  },

  patch: function(url, data, headers) {
    return makeRequest(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers
    })
  }
}
function makeRequest(url, options) {
  const spreadableOptions = _.omit(options, "headers")

  return fetch(url, {
    ...spreadableOptions,
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers
    })
  }).then(function(response) {
    if (!response.ok) {
      return response.json().then(function(error) {
        throw new Error(error.message)
      })
    }
    const res = response.json()
    console.log(res)
    return res
  })
}

export default request
