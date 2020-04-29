let api = 'https://misconfigured-app.com/'
const API_KEY = process.env.REACT_APP_GUIDEBOX_API_KEY 

const apiHost = host => { api = host }
const urlFor = resource => `${api}${resource}`

const HTTP_OK = 200

const throwResponseError = response => {
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

const emitNativeError = error => {
  throw error
}

const statusCheck = successStatuses => response => {
  if (successStatuses.includes(response.status)) {
    return response
  } else {
    throwResponseError(response)
  }
}

const okCheck = statusCheck([HTTP_OK])

const headers = {
  'Content-Type': 'application/json'
}

const paramsWithApiKey = params => {
  const result = new URLSearchParams(params)
  result.set('api_key', API_KEY)
  return result
}

// The fetch function initiates a connection to the web service.
// fetch returns a _promise_: an object that represents a future result.
// Thus, the function’s result needs to be `await`ed because its result
// is not known right away. Any errors encountered during execution will
// be handled by the usual `catch` clause.
//
// The `okCheck` function ensures that the response came back with a
// status of 200 (i.e., HTTP OK). If it passes that check, its body is
// then converted to JSON via the `json` function—another promise.
// This promise is returned directly, so that `query`’s caller can `await`
// its result, finally going about the actual work of putting this result
// on the web page.
const query = async (resource, params) => {
  try {
    const response = await fetch(`${urlFor(resource)}?${paramsWithApiKey(params)}`, {
      headers
    })

    const responseJson = okCheck(response)
    return responseJson.json()
  } catch(error) {
    emitNativeError(error)
  }
}

const searchGifs = params => query('gifs/search', params)

export {
  apiHost,
  searchBy
}


