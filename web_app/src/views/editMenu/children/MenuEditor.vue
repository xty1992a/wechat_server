<template>
  <ui-action :show="show" @update:show="cancel" height="80%">
    <div class="menu-editor">
      <header>
        <ui-check-group v-model="config.type" radio>
          <ui-check-item
                  v-for="it in typeList"
                  :key="it.value"
                  :value="it.value"
                  :label="it.label"
          />
        </ui-check-group>
      </header>
      <ui-cell title="按钮名称">
        <input v-model="config.name" slot="value"/>
      </ui-cell>

      <template v-if="config.type==='view'">
        <ui-cell title="链接">
          <input v-model="config.url" slot="value"/>
        </ui-cell>
      </template>
      <template v-if="config.type==='click'">
        <ui-cell title="标题">
          <input v-model="config.title" slot="value"/>
        </ui-cell>
      </template>
      <ui-button size="large" type="primary" @click="confirm">保存</ui-button>
    </div>
  </ui-action>
</template>

<script>
  export default {
	name: 'menu-menu-editor',
	components: {},
	props: {
	  show: Boolean,
	  data: Object,
	},
	data() {
	  return {
		typeList: [
		  {value: 'view', label: '网页'},
		  {value: 'click', label: '图文回复'},
		  {value: 'scancode_waitmsg', label: '扫码'},
		  {value: 'pic_sysphoto', label: '拍照'},
		  {value: 'location_select', label: '地址'},
		],
		config: {
		  title: '',
		  type: '',
		  value: '',
		  name: '',
		  list: [],
		  key: '',
		},
	  }
	},
	methods: {
	  confirm() {
		// this.$emit('change', this.config);
		this.clearConfig();
		this.cancel();
	  },
	  clearConfig() {
		let keys = ['name', 'type', 'key'];
		const keyMap = {
		  'click': 'graphicMsg',
		  'pic_sysphoto': 'take_photo',
		  'location_select': 'send_location',
		  'scancode_waitmsg': 'scancode',
		};
		switch (this.config.type) {
		  case 'view' :
			keys = [...keys, 'url'];
			break;
		  case 'click' :
			keys = [...keys, 'list'];
			break;
		}
		let config = {};
		keys.forEach(k => {
		  if (k === 'key') {
			config[k] = keyMap[this.config.type] || '';
			return
		  }
		  config[k] = this.config[k]
		});
		this.$emit('change', config);
	  },
	  cancel() {
		this.$emit('update:show', false);
	  },
	},
	computed: {},
	watch: {
	  show(now) {
		if (now) {
		  Object.keys(this.data)
			  .forEach(k => this.config[k] = this.data[k])
		}
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../../styles/index";

  .menu-editor {
    .check-group {
      display: flex;
    }

    input {
      border: 0;
    }
  }
</style>
