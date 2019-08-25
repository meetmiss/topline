<template>
  <div>
    <van-nav-bar title="首页" />
    <van-tabs v-model="active" sticky>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id" >
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in articles" :key="item.id" :title="item.title" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import * as channel from '@/api/channel'
import { getArticles } from '@/api/article'
export default {
  data () {
    return {
      active: 0,
      articles: [],
      loading: false,
      finished: false,
      channels: [],
      timestamp: Date.now(),
      isLoading: false
    }
  },
  methods: {
    async onLoad () {
      const {
        data: { data }
      } = await getArticles({
        channel_id: 0,
        timestamp: this.timestamp
      })
      this.articles.push(...data.results)
      if (!data.per_timestamp) {
        this.loading = true
      } else {
        this.timestamp = data.pre_timestamp
      }
      this.loading = false
    },
    // 新闻推荐
    /*   async loadArticles () {
      const { data: { data } } = await getArticles({
        channel_id: 0,
        timestamp: this.timestamp
      })
      this.articles.push(...data.results)
    }, */
    // 频道列表
    async loadChannels () {
      const {
        data: { data }
      } = await channel.getDefaultOrUserChannels()
      this.channels = data.channels
    },
    // 更新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  },
  created () {
    this.loadChannels()
    // this.loadArticles()
  }
}
</script>

<style lang="less" scoped>
</style>
