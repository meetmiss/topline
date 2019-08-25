import request from '@/utils/request'

export const getDefaultOrUserChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
