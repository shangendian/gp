<template>
    <div id="djm-player">
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        player: null,
        covers: [],
        option: {
          mp4: "a",
          coverpic: { style: "stretch", src: "" },
          width: "100%",
          height: "auto",
          autoplay: true,
          listener: function(msg) {
            if (msg.type == "pause") {
            }
          },
          wording: {
            2032: "网络错误",
            2048: "请求m3u8文件失败，请检查是否跨域",
            13: "直播已经结束，请稍后再来",
            4: "视频地址出错"
          }
        }
      };
    },
    props: {
      videoUrl: {
        type: String,
        default: "",
        required: false
      },
      postUrl: {
        type: String,
        default: "",
        required: false
      },
      isLogin: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    watch: {
      videoUrl() {
        if (this.player) {
          this.player.load(this.videoUrl);
        } else {
          this.option.mp4 = this.videoUrl;
          this.player = new TcPlayer("djm-player", this.option);
          this.$nextTick(() => {
            this.setAttr();
          });
        }
      },
      "$store.state.showLogin"() {
        if (this.$store.state.showLogin) {
          this.player.pause();
        } else {
          this.player.play();
        }
      }
    },
    methods: {
      setAttr() {
        this.playerTag = document
          .getElementById("djm-player")
          .getElementsByTagName("video")[0];
        if (this.playerTag) {
          this.playerTag.setAttribute("playsinline", "true");
          this.playerTag.setAttribute("webkit-playsinline", "true");
          this.playerTag.setAttribute("x5-playsinline", "true");
        }
      }
    },
    mounted() {
      if (
        this.videoUrl ) {
        this.option.mp4 = this.videoUrl;
        this.player = new TcPlayer("djm-player", this.option);
        this.$nextTick(() => {
          this.setAttr();
        });
      }
    },
    beforeDestroy() {
      this.player = null;
    }
  };
  </script>
  
  <style lang="less">
  #djm-player {
    z-index: 188;
    height: 100%;
    .vcp-player {
      height: 100%;
    }
    .vcp-error-tips {
      height: 100%;
      width: 100%;
    }
    video {
      height: 421px;
    }
    .vcp-error-tips,
    .vcp-bigplay,
    .vcp-poster,
    .vcp-controls-panel {
      z-index: 188 !important;
    }
  }
  </style>
  