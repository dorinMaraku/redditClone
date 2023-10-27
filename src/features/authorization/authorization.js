import axios from "axios"

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
//const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET
const TYPE = 'code'
const RANDOM_STRING = 'authorized'
const URI = import.meta.env.VITE_URI
const DURATION = 'permanent'
const SCOPE_STRING = 'identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread'

let accessToken;
let refreshToken;
let expiresIn;
let tokenExpiration

export const getAuthCode = () => {
  const accessUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${TYPE}&state=${RANDOM_STRING}&redirect_uri=${URI}&duration=${DURATION}&scope=${SCOPE_STRING}`
  window.location = accessUrl
}

export const getToken = async () => { 
  const authCode = new URLSearchParams(window.location.search).get('code');
  // body 
  const params = new URLSearchParams();
  params.append('code', authCode);
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', URI);

  console.log(authCode);
  try {
    let response = await axios.post('https://www.reddit.com/api/v1/access_token', 
    params.toString(), 
    {
      headers: {
        Authorization: `Basic ${window.btoa(`${CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)}`,
        "Content-Type": 'application/x-www-form-urlencoded'
      }
    })
    const body = await response.data
    console.log(body)
    
    accessToken = body.access_token
    refreshToken = body.refresh_token
    expiresIn = body.expires_in

    if(!accessToken) {
      console.error('Access token is missing');
      return null;
    }
    tokenExpiration = new Date(new Date().getTime() + expiresIn * 1000).toUTCString()
    const now = new Date().toUTCString()
    if (now >= tokenExpiration) {
      console.log('Access token has expired. Refreshing...');
      const refreshedToken = await refreshTokenAngGetNewAccessToken();
      if (refreshedToken) {
        return refreshedToken;
      } else { 
        console.error('Failed to refresh token');
        return null;
      }
    } else {
      return accessToken
    }
  } catch (error) {
    console.error('failed to retireve access token', error)  
  }
}

const refreshTokenAngGetNewAccessToken = async () => {
  if (!refreshToken) {
    console.error('refresh token is missing')
    return null;
  }

  //use refresh_token to obtain new access token
  try {
    const newParams = new URLSearchParams();
    newParams.append('grant_type', 'refresh_token');
    newParams.append('refresh_token', refreshToken);
    const response = await axios.post('https://www.reddit.com/api/v1/access_token', 
    newParams.toString(), 
    {
      headers: {
        Authorization: `Basic ${window.btoa(`${CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)}`,
        "Content-Type": 'application/x-www-form-urlencoded'
      }
    })
    
    if (response.status === 200) {
      const data = await response.data
      console.log(response, data)
      //refresh access token and refresh token
      accessToken = data.access_token;
      refreshToken = data.refresh_token;
      
      //update experies_in 
      expiresIn = data.expires_in
      tokenExpiration = new Date(new Date().getTime() + expiresIn * 1000).toUTCString()
      console.log('Access token refreshed successfully')
      return accessToken
    } else {
      console.error('Error refreshing access token', response.statusText)
      return null;
    }
  } 
  catch (error) {
    console.error('Error refreshing access token', error)
    return null;
  }
}

export let data
//get user info
export const getUserInfo = async () => {
  getAuthCode()
  await getToken();
  if (!accessToken) {
    console.error('Access token is missing or expired')
    return;
  }
  try {
    const response = await axios.get('https://oauth.reddit.com/api/v1/me', 
      {headers: {'Authorization': 'bearer ' + accessToken}})
    console.log(response)
    if(response.status === 200) {
      data = await response.data
      console.log(data)
    } else if (response.status === 401) {
      console.log('Recieved 401 error. Retrying with a refreshed token')
      const refreshedToken = await refreshTokenAngGetNewAccessToken()
      if(refreshedToken) {
        getUserInfo() // retry the API request with the refershed token
      } else {
        console.error('Failed to refresh the access token')
      }
    } else {
      console.error('Error making authenticated API request', response.statusText)
    }

  }
  catch (error) {
    console.error('Error making authenticatied API request', error)
  }
}