<template>
  <div class="edit-menu">
    <section class="block menu-item">
      <ui-collapse v-model="open">
        <ui-collapse-item
                @click.native="clickMenu(menu)"
                v-for="(menu,index) in menus"
                :title="menu.name"
                :key="menu.name"
                :value="index"
        >
          <div class="menu-content">
            <template v-if="menu.sub_button">
              <ul class="list sub-menus">
                <li class="item" v-for="item in menu.sub_button">
                  <ui-cell
                          :title="item.name"
                          :icon="getIcon(item)"
                          @click="clickMenu(menu, item)"
                  />
                </li>
              </ul>
            </template>
            <!--<template v-else>-->
            <!--<ui-cell :title="menu.name" :icon="getIcon(menu)"/>-->
            <!--</template>-->
          </div>
        </ui-collapse-item>
      </ui-collapse>
    </section>

    <MenuEditor :show.sync="actionShow" :data="editMenu" @change="updateMenu"/>
  </div>
</template>

<script>
  import MenuEditor from './children/MenuEditor'
  import {getWxMenu} from '../../api'

  export default {
	name: 'edit-menu',
	components: {MenuEditor},
	data() {
	  return {
		actionShow: false,
		open: [],
		menus: [],
		editMenu: null,
		isSub: false,
	  }
	},
	async created() {
	  let res = await getWxMenu();
	  console.log(res);
	  if (res.success) {
		this.menus = res.data.button;
	  }
	},
	methods: {
	  clickMenu(menu, item) {
		if (!item && menu.sub_button) return;
		this.isSub = Boolean(item);
		console.log(item ? item.name : menu.name);
		this.editIndex = this.menus.findIndex(m => m.name === menu.name);
		this.editMenu = item || menu;
		this.actionShow = true;
	  },
	  updateMenu(item) {
		let menu = this.menus[this.editIndex];
		let menus = this.menus;
		if (this.isSub) {
		  if (menu.sub_button) {
			menus = menu.sub_button;
		  }
		}
		let index = menus.findIndex(m => m.name === item.name);
		console.log(index, menus, item.name);
		menus[index] = item
	  },
	  getIcon({type}) {
		switch (type) {
		  case 'view':
			return 'icon_wangye';
		  case 'click':
			return 'renjijiaohu';
		  case 'scancode_waitmsg':
			return 'saoma';
		  case 'pic_sysphoto':
			return 'xingzhuang-tupian';
		  case 'location_select':
			return 'dingwei';
		  default:
			return 'icon_wangye'
		}
	  },
	},
	computed: {},
	watch: {
	  actionShow(now) {
		if (now) return;
		if (!this.isSub) {
		  this.open = this.open.filter(i => i !== this.editIndex);
		}
		this.editMenu = null
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../styles/index";

  .edit-menu {
    background-color: #f7f7f7;
    height: 100%;
    padding: 10px;

    .block {
      margin-bottom: 10px;
      .shadow;

      .block-title {
        padding: 10px;
      }

      .menu-content {
        padding-left: 10px;
      }
    }

  }

</style>
