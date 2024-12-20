<template>
    <div class="content">
        <a-steps
            :current="1"
            size="small"
            :items="stepTitle"
            class="step"
        ></a-steps>
        <div class="address-box">
            <div class="address-list-box" :class="{'more-address': moreVisibility}">
                <div class="add-item-box" v-for="addItem in addressData" :class="{ 'add-checked': addItem.checked }">
                    <div class="name-box" @click="selectAddress(addItem)">
                        <span class="name">{{ addItem.name }}</span>
                        <span class="province">{{ addItem.provinceName }}</span>
                    </div>
                    <div class="deail-box">
                        <span class="name">{{ addItem.name }}</span>
                        <span class="province">{{ addItem.provinceName }}</span>
                        <span class="city">{{ addItem.cityName }}</span>
                        <span class="county">{{ addItem.countyName }}</span>
                        <span class="town" v-if="addItem.townName">{{ addItem.townName }}</span>
                        <span class="address">{{ addItem.address }}</span>
                        <span class="phone">{{ addItem.phone }}</span>
                        <span class="default" v-if="addItem.default">默认地址</span>
                    </div>
                    <div class="action-box">
                        <a v-if="!addItem.default" @click="setDefaul(addItem)">设为默认地址</a>
                        <a @click="showModal(addItem)">编辑</a>
                        <a-popconfirm v-if="!addItem.checked"
                            title="确定要删除此地址吗?"
                            ok-text="确定"
                            cancel-text="取消"
                            @confirm="deleteAddress(addItem)"
                        >
                            <a href="#">删除</a>
                        </a-popconfirm>
                    </div>
                </div>
            </div>
            <div class="show-more-box" @click="toggleMore">
                <span v-if="!moreVisibility">更多地址<DownOutlined class="more-icon"/></span>
                <span v-else>收起地址<UpOutlined class="more-icon"/></span>
            </div>
        </div>
        <a-list item-layout="horizontal" :data-source="globalStore.shoppingCartItems" :bordered="true">
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-list-item-meta>
                        <template #avatar>
                            <img :src="item.img" width="50px"/>
                        </template>
                        <template #title>
                            <a href="" class="list-title">{{ item.name }}</a>
                        </template>
                        <template #description>
                            <span>{{ globalStore.currencyFormat(item.price) }}</span>
                        </template>
                    </a-list-item-meta>
                    <template #actions>
                        <span class="count">× {{ item.count }}</span>
                    </template>
                    <template #extra>
                        <span class="brief-price">{{ globalStore.currencyFormat(item.price * item.count) }}</span>
                    </template>
                </a-list-item>
            </template>
            <template #footer>
                <div class="list-footer">
                    <span class="cart-count">{{ globalStore.shoppingCartItems.length }}款，共{{ shoppingCartCounts() }}件</span>
                    <span>合计:<span class="brief-price">{{ totalPrice() }}</span></span>
                    <a-button type="primary" @click="submitOrder">提交订单</a-button>
                </div>
            </template>
        </a-list>
    </div>
    <a-modal v-model:open="modalVisibility" title="地址" @ok="saveAddress">
        <a-form
            :label-col="{ style: { width: '150px' } }"
            :wrapper-col="{ span: 14 }"
            layout="horizontal"
            style="max-width: 600px"
            :rules="rules"
            :model="formState"
            ref="formRef"
        >
            <a-form-item label="收件人" name="name">
                <a-input v-model:value="formState.name"/>
            </a-form-item>
            <a-form-item label="手机号" name="phone">
                <a-input v-model:value="formState.phone"/>
            </a-form-item>
            <a-form-item label="所在地区" name="region">
                <a-cascader :options="options" v-model:value="formState.region"/>
            </a-form-item>
            <a-form-item label="详细地址" name="address">
                <a-textarea :rows="4" v-model:value="formState.address"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script lang="ts" setup>
import { GlobalStore } from '@/stores/global-store';
import { ref, onBeforeMount, reactive, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import userApi from '@/api/user';
import type { UnwrapRef } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';

interface FormState {
    name: string;
    phone: string;
    region: string[];
    address: string;
}
const router = useRouter();
const globalStore = GlobalStore();
const addressData = ref<any[]>([]);
const modalVisibility = ref<boolean>(false);
const moreVisibility = ref<boolean>(false);
const formRef = ref();
const options = reactive<any[]>([
    {
        value: '江苏',
        label: '江苏',
        children: [
            {
                value: '苏州',
                label: '苏州',
                children: [
                    {
                        value: '虎丘区',
                        label: '虎丘区',
                    },
                ],
            },
        ],
    },
]);
const formState: UnwrapRef<FormState> = reactive({
    name: '',
    phone: '',
    region: [],
    address: '',
});
const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '收件人不能为空', trigger: 'change' }],
  phone: [{ required: true, message: '手机号不能为空', trigger: 'change' }],
  region: [{ required: true, message: '请选择所在地区', trigger: 'change' }],
  address: [{ required: true, message: '详细地址不能为空', trigger: 'change' }]
};
const stepTitle = reactive<any[]>([
    { title: '购物车' },
    { title: '提交订单' },
    { title: '确认支付' },
]);

onBeforeMount(() => {
    userApi.getAddress().then((result:any)=>{
        if(result.success){
            let defaultAdd:any
            result.data.forEach((item:any) => {
                if(item.default){
                    item.checked = true;
                    defaultAdd = item;
                }else{
                    item.checked = false;
                    addressData.value.push(item);
                }
            });
            if(defaultAdd){
                addressData.value.unshift(defaultAdd);
            }else{
                addressData.value[0].checked = true;
            }
        }
    })
})

const shoppingCartCounts = () => {
    let count:number = 0;
    globalStore.shoppingCartItems.forEach((item:any)=>{
        count += item.count
    })
    return count;
}

const totalPrice = () => {
    let price = 0;
    globalStore.shoppingCartItems.forEach((item:any)=>{
        price += (item.count * item.price);
    })
    return globalStore.currencyFormat(price);
}

const setDefaul = (curItem:any) => {
    let params = {
        id: curItem.id,
    }
    userApi.setAddressDefault(params).then((result:any)=>{
        if(result.success){
            addressData.value.forEach((item:any)=>{
                item.default = false;
            })
            curItem.default = true;
            selectAddress(curItem);
        }
    })
}

const deleteAddress = (curItem:any) => {
    let params = {
        id: curItem.id,
    }
    userApi.deleteAddress(params).then((result:any)=>{
        console.log("%c Line:119 🍰 result", "color:#ffffff;background:#3f7cff", result);
        if(result.success){
            let index = addressData.value.indexOf(curItem);
            addressData.value.splice(index,1);
        }
    })
}

const selectAddress = (curItem:any) => {
    let index = addressData.value.indexOf(curItem);
    addressData.value.splice(index,1);
    addressData.value.unshift(curItem);
    addressData.value[1].checked = false;
    addressData.value[0].checked = true;
    moreVisibility.value = false;
}

const saveAddress = () => {
    formRef.value.validate()
    .then(() => {
        console.log('values', formState, toRaw(formState));
        modalVisibility.value = false;
    })
    .catch((error:any) => {
        console.log('error', error);
    });
}

const showModal = (curItem?:any) => {
    modalVisibility.value = true;
    if(formRef.value){
        formRef.value.resetFields();
    }
    formState.name = curItem.name;
    formState.phone = curItem.phone;
    formState.address = curItem.address;
    formState.region = [curItem.provinceName, curItem.cityName, curItem.countyName]
}

const submitOrder = () => {
    router.push('/payway')
}

const toggleMore = () => {
    moreVisibility.value = !moreVisibility.value
}

</script>

<style scoped>
.content{
    max-width: 1220px;
    margin: 0 auto;
    margin-top: 50px;
}
.step {
    margin-bottom: 40px;
}
.input-count {
    width: 50px;
}
:deep(.ant-list .ant-list-item .ant-list-item-meta){
    align-items: center;
}
.list-title {
    font-size: 18px;
}
.brief-price {
    color: brown;
    font-size: 18px;
    width: 100px;
    text-align: right;
}
.list-footer {
    text-align: right;
}
.list-footer .cart-count {
    color: #999;
    margin-right: 5px;
}
.list-footer .brief-price {
    margin-left: 5px;
    margin-right: 20px;
}

.add-item-box {
    width: 100%;
    margin: 6px 0;
    display: flex;
    align-items: center;
    font-size: 12px;
}
.name-box {
    position: relative;
    border: 1px solid #ddd;
    height: 18px;
    line-height: 18px;
    padding: 5px 10px;
    width: 120px;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    height: 30px;
    box-sizing: border-box;
}
.name-box:hover,
.add-item-box.add-checked .name-box {
    border: 2px solid #e4393c;
    padding: 4px 10px;
}
.add-item-box.add-checked .name-box::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 12px;
    height: 12px;
    overflow: hidden;
    background: url(//misc.360buyimg.com/user/purchase/2.0.0/css/i/selected-icon.png) no-repeat;
}
.name-box .name{
    margin-right: 8px;
}
.deail-box .name,
.deail-box .address,
.deail-box .phone {
    margin-right: 15px;
}
.deail-box .province,
.deail-box .city {
    margin-right: 4px;
}
.deail-box .default {
    background: #ccc;
    padding: 3px 5px;
}
.add-item-box .deail-box {
    flex: 1;
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
}
.add-item-box:hover .deail-box {
    background: #ffe4e5;
}
.add-item-box .action-box {
    display: none;
    background: #ffe4e5;
    height: 30px;
    line-height: 30px;
    padding-right: 8px;
}
.add-item-box .action-box a {
    margin-left: 8px;
}
.add-item-box:hover .action-box {
    display: block;
}

.show-more-box {
    cursor: pointer;
    font-size: 14px;
    margin-top: 8px;
    font-size: 12px;
}
.show-more-box .more-icon {
    margin-left: 5px;
}
.address-list-box {
    max-height: 40px;
    overflow: hidden;
}
.address-list-box.more-address {
    max-height: 180px;
    overflow: auto;
}

.address-box {
    border: 1px solid #d9d9d9;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    padding: 12px 24px;
    border-bottom: 0px;
}
:deep(.ant-list){
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
}
</style>