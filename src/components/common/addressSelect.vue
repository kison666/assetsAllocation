<template>
    <!--居住地址三级联动选项-->
    <section class="showChose" v-show="showChose">
        <section class="address">
            <section class="title">
                <h4>单位地址</h4>
                <span @click="closeAdd()">×</span>
            </section>
            <section class="title">
                <div class="area" @click="provinceSelected()">{{Province?Province:info[province-1].name}}</div>
                <div class="area" @click="citySelected()" :class="City?'':'active'">{{City?City:'请选择'}}</div>
                <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
            </section>
            <ul>
                <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.id, v.name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.name}}</li>
                <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.name, k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.name}}</li>
                <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.name, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}</li>
            </ul>
        </section>
    </section>
</template>
<script>
import {
    addressData
} from '../../data/addressData'
export default {
    data() {
            return {
                showChose: false,
                showProvince: true,
                showCity: false,
                showDistrict: false,
                showCityList: false,
                showDistrictList: false,
                province: 9,
                city: 73,
                district: 726,
                GetProvinceId: 2,
                District: false,
                Province: false,
                City: false,
                // v-for循环判断是否为当前
                selected: false,
                info: addressData, //省市地区联动数据
                addressProvince: '', //省份名称
                addressCity: '', //城市名称
                addressArea: '' //区名称
            }
        },
        props: ['showAddressSelect'],
        methods: {
            choseAdd: function() {
                this.showChose = true;
            },
            closeAdd: function() {
                this.showChose = false;
                //向父类传值
                this.$emit('listenChildChange', this.addressProvince, this.addressCity, this.addressArea);
            },
            _filter(add, name, code) {
                let result = [];
                for (let i = 0; i < add.length; i++) {
                    if (code == add[i].id) {
                        result = add[i][name];
                    }
                }
                return result;
            },
            getProvinceId: function(code, input, index) {
                this.province = code;
                this.Province = input;
                this.showProvince = false;
                this.showCity = true;
                this.showDistrict = false;
                this.showCityList = this._filter(this.info, 'city', this.province);
                // 点击选择当前
                this.info.map(a => a.selected = false);
                this.info[index].selected = true;
                this.addressProvince = input;
            },
            provinceSelected: function() {
                // 清除市级和区级列表
                this.showCityList = false;
                this.showDistrictList = false;
                // 清除市级和区级选项
                this.City = false;
                this.District = false;
                // 选项页面的切换
                this.showProvince = true;
                this.showCity = false;
                this.showDistrict = false;
            },
            getCityId: function(code, input, index) {
                this.city = code;
                this.City = input;
                this.showProvince = false;
                this.showCity = false;
                this.showDistrict = true;
                this.showDistrictList = this._filter(this.showCityList, 'district', this.city);
                // 选择当前添加active
                this.showCityList.map(a => a.selected = false);
                this.showCityList[index].selected = true;
                this.addressCity = input;
            },
            citySelected: function() {
                this.showProvince = false;
                this.showCity = true;
                this.showDistrict = false;
            },
            getDistrictId: function(code, input, index) {
                this.district = code;
                this.District = input;
                // 选择当前添加active
                this.showDistrictList.map(a => a.selected = false);
                this.showDistrictList[index].selected = true;
                // 选取市区选项之后关闭弹层
                this.showChose = false;
                this.addressArea = input;

                //向父类传值
                this.$emit('listenChildChange', this.addressProvince, this.addressCity, this.addressArea);
            },
            districtSelected: function() {
                this.showProvince = false;
                this.showCity = false;
                this.showDistrict = true;
            },

            //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
            async listenPropChange() {


            }
        },
        watch: {

            //监听父级传来的currentTradeType，当值发生变化的时候重新获取数据
            showAddressSelect: function(value) {
                this.listenPropChange();
                this.showChose = value;
            }
        }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.myAddress {
    width: 100%;
    background-color: white;
    border-top: 4px solid rgba(245, 245, 245, 1);
    color: #333;
}

.myAddress .cont {
    border-bottom: 1px solid rgba(245, 245, 245, 0.8);
}

.myAddress .cont span {
    display: inline-block;
    font-size: 0.28rem;
    color: #333;
    line-height: 0.88rem;
    margin-left: 0.32rem;
}

.myAddress .cont section {
    float: left;
}

.myAddress .cont p {
    display: inline-block;
    font-size: 0.28rem;
    color: #333333;
    line-height: 0.88rem;
    margin-left: 1rem;
}

.myAddress .cont .pic2 {
    float: right;
    width: 0.14rem;
    height: 0.24rem;
    margin: 0.32rem 0.32rem 0.32rem 0;
}

.myAddress .cont p.text {
    margin-left: 0.72rem;
}

.showChose {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 120;
    background: rgba(0, 0, 0, 0.5);
}

.address {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 121;
    background: #444;
    width: 100%;
    padding: .6rem;
}

.title h4 {
    display: inline-block;
    margin-left: .6rem;
    font-size: 0.7rem;
    line-height: 0.88rem;
    font-weight: normal;
    color: $fontGreyColor2;
}

.title span {
    margin: 0.42rem 0 0 .6rem;
    font-size: 1rem;
    line-height: 0.34rem;
    color: $fontGreyColor2;
}

.area {
    display: inline-block;
    font-size: 0.65rem;
    line-height: 0.88rem;
    margin-left: 0.42rem;
    color: $fontColor;
}

.addList {
    width: 100%;
    padding-left: 0.32rem;
    font-size: 0.65rem;
    line-height: 1.18rem;
    color: $fontColor;
}


/* 修改的格式 */

.address ul {
    width: 95%;
    height: 100%;
    max-height: 6.4rem;
    margin-top: .6rem;
    overflow: auto;
}

.address ul li {
    margin-left: 5%;
}

.address .title .active {
    color: #0071B8;
    border-bottom: 0.02rem solid #0071B8;
}

.address ul .active {
    color: #0071B8;
}
</style>
