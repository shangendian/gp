<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>

<script>
//引入富文本编辑器
import "../../public/UE/ueditor.config.js";
import "../../public/UE/ueditor.all.js";
import "../../public/UE/lang/zh-cn/zh-cn.js";
//引入富文本编辑器 end
export default {
  name: "Uediter",

  data() {
    return {
      editor: null
    };
  },
  props: {
    value: "",
    config: {}
  },
  watch: {
    value: "updateValue"
  },
  mounted() {
    const _this = this;

    this.editor = window.UE.getEditor("editor", this.config);

    this.editor.addListener("ready", function() {
      _this.editor.setContent(_this.value);
    });
  },

  methods: {
    getUEContent() {
      return this.editor.getContent().replace(/\\\\/g, "\\");
    },
    getUETxt() {
      return this.editor.getContentTxt();
    },
    updateValue(newVal, oldVal) {
      this.editor.setContent(newVal);
    }
  },

  destroyed() {
    this.editor.destroy();
  }
};
</script>
<style>
</style>