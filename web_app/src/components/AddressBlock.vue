<template>
  <!--			// var userName = res.userName; // 收货人姓名
			// var postalCode = res.postalCode; // 邮编
			// var provinceName = res.provinceName; // 国标收货地址第一级地址（省）
			// var cityName = res.cityName; // 国标收货地址第二级地址（市）
			// var countryName = res.countryName; // 国标收货地址第三级地址（国家）
			// var detailInfo = res.detailInfo; // 详细收货地址信息
			// var nationalCode = res.nationalCode; // 收货地址国家码
			// var telNumber = res.telNumber; // 收货人手机号码
-->
  <div class="address-block" :class="address?'hasAddress':'no-address'" @click="openAddress">
    <template v-if="hasAddress">
      <p class="nick-name">
        <span class="text">{{address.userName}}</span>
        <span class="mobile">{{address.telNumber}}</span>
        <i class="iconfont icon-xiangyoujiantou"></i>
      </p>
      <p class="full-address">
        <i class="iconfont icon-llcouponsupportedshopaddress"></i>
        <span>{{fullAddress}}</span>
      </p>
    </template>
    <template v-else>
      <ui-button>+收货地址</ui-button>
    </template>
  </div>
</template>

<script>
  export default {
	name: 'address-block',
	components: {},
	props: {
	  address: Object,
	},
	data() {
	  return {}
	},
	created() {
	},
	methods: {
	  expressClick() {
	  },
	  openAddress() {
		wx && wx.openAddress({
		  success: res => {
			console.log(res);
			this.$emit('change', res)
		  },
		});
	  },
	},
	computed: {
	  hasAddress() { // 用户是否有默认地址
		return Boolean(this.address)
	  },
	  fullAddress() {
		if (!this.address) return '';
		// var provinceName = res.provinceName; // 国标收货地址第一级地址（省）
		// var cityName = res.cityName; // 国标收货地址第二级地址（市）
		// var countryName = res.countryName; // 国标收货地址第三级地址（国家）
		// var detailInfo = res.detailInfo; // 详细收货地址信息
		let {provinceName, cityName, detailInfo} = this.address;
		return provinceName + cityName + detailInfo;
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">
@import "../styles/index.less";
  .address-block {
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    border-radius: 2px;
    background-color: #fff;
    margin-bottom: 10px;
    .address-stamp();

    &.hasAddress {
      padding: 10px 10px 20px;

      .nick-name {
        line-height: 1.5;
        overflow: hidden;
        padding: 5px 0 15px;

        .text {
          padding-right: 20px;
          font-size: 17px;
        }

        .mobile {
          font-size: 18px;
          font-weight: bold;
        }

        .iconfont {
          float: right;
          font-size: 10px;
        }
      }

      .full-address {
        position: relative;
        padding-left: 20px;
        .multi-line;

        .iconfont {
          position: absolute;
          left: 0;
        }
      }
    }

    &.no-address {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .express-enter, .express-leave-to {
    transform: translate3d(0, -100%, 0);
  }

  .express-enter-active, .express-leave-active {
    transition: .3s;
  }

</style>
