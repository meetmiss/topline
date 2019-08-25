import request from '@/utils/request'
export const getArticles = data => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params: {
      channel_id: data.channel_id,
      timestamp: data.timestamp,
      with_top: 1
    }
  })
}
