import request from '@/utils/request'

// 获取搜索建议
export const getSuggestion = (q) => {
  return request.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}

// 获取搜索结果
export const getSearchResults = ({
  // 页码
  page,
  // 每页显示多少条
  perPage,
  // 搜索的关键字
  q
}) => {
  return request.get('/app/v1_0/search', {
    params: {
      // 页码
      page,
      // 每页显示多少条
      per_page: perPage,
      // 搜索的关键字
      q
    }
  })
}
