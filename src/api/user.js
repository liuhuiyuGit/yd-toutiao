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
