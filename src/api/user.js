import axios from '@/utils/request'
/**
 * 登录
 *
 */
export const login = ({
  mobile,
  code
}) => {
  return axios.post('/app/v1_0/authorizations', {
    mobile,
    code
  })
}

// 拉黑作者，id 作者的id
export const blacklists = (id) => {
  return axios.post('/app/v1_0/user/blacklists', {
    target: id
  })
}

// 关注用户
export const followUser = (id) => {
  return axios.post('/app/v1_0/user/followings', {
    // 关注用户的id
    target: id
  })
}

// 取消关注用户
export const unFollowUser = (id) => {
  return axios.delete(`/app/v1_0/user/followings/${id}`)
}
