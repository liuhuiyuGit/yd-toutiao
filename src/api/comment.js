import request from '@/utils/request'

// 获取评论列表
export const getComments = ({
  isArticle,
  // 源id，文章id或评论id
  source,
  // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
  offset,
  // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
  limit
}) => {
  return request.get('/app/v1_0/comments', {
    params: {
      // a 文章的评论   c 评论的评论
      type: isArticle ? 'a' : 'c',
      source,
      offset,
      limit
    }
  })
}

// 发布评论
export const sendComment = ({
  // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
  target,
  // 评论的内容
  content,
  // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
  artId
}) => {
  return request.post('/app/v1_0/comments', {
    target,
    content,
    art_id: artId
  })
}
