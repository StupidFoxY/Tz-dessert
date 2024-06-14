<template>
    <a-modal v-model:open="globalStore.loginVisible" title="登录 | 注册">
        <a-form
            :model="formState"
            :label-col="{ style: { width: '68px' } }"
            name="login_form"
            class="login-form"
            @finish="onSubmit"
            :footer="null"
        >
            <a-form-item
                label="用户名"
                name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]"
            >
                <a-input v-model:value="formState.username">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>

            <a-form-item
                label="密码"
                name="password"
                :rules="[{ required: true, message: 'Please input your password!' }]"
            >
                <a-input-password v-model:value="formState.password">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
            </a-form-item>

            <a-form-item>
                <a-form-item name="remember" no-style>
                    <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
                </a-form-item>
                <a class="login-form-forgot" href="">忘记密码</a>
            </a-form-item>

            <a-form-item>
                <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                    登录
                </a-button>
                <a href="">立即注册！</a>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { setCookie } from 'typescript-cookie';
import userApi from '@/api/user';

import { GlobalStore } from '@/stores/global-store';
const globalStore = GlobalStore();

const emit = defineEmits<{
  logined: []
}>()

interface FormState {
    username: string;
    password: string;
    remember: boolean;
}
const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
});
const onSubmit = (values: any) => {
    let params = {
        username: values.username,
        password: values.password,
    }
    userApi.login(params).then((result: any) => {
        globalStore.loginVisible = false;
        if (result.success) {
            sessionStorage.setItem('user', JSON.stringify(result.data.user));
            sessionStorage.setItem('token',result.data.token);
            if(values.remember) {
                setCookie('token', result.data.token, { expires: 7, path: '' });
            }
            message.success(result.message);
            emit('logined');
        }else {
            message.error(result.message);
        }
    })
};

const disabled = computed(() => {
    return !(formState.username && formState.password);
});
</script>

<style scoped>
.login-form {
    max-width: 300px;
    margin: 20px auto;
}
.login-form-forgot {
    float: right;
}
.login-form-button {
    width: 100%;
    margin-bottom: 5px;
}
</style>