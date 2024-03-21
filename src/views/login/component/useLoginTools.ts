
import { FormInstance } from 'ant-design-vue';
import type {
    RuleObject,
    NamePath,
    Rule as ValidationRule,
} from 'ant-design-vue/lib/form/interface';

export enum LoginStateEnum {
    LOGIN,
    REGISTER,
    RESET_PASSWORD,
    MOBILE,
    QR_CODE,
}

const currentState = ref(LoginStateEnum.LOGIN);

/**
 * @description: 登陆表单状态
 * @return {*}
 */
export const useLoginState = () => {
    function setLoginState(state: LoginStateEnum) {
        currentState.value = state;
    }
    const getLoginState = computed(() => currentState.value);

    function handleBackLogin() {
        setLoginState(LoginStateEnum.LOGIN);
    }
    return { setLoginState, getLoginState, handleBackLogin };
}

/**
 * @description: 表单验证规则
 * @param {Recordable} formData
 * @return {*}
 */
export const useFormRules = (formData?: Recordable) => {
    function createRule(message: string): ValidationRule[] {
        return [
            {
                required: true,
                message,
                trigger: "change",
            }
        ]
    }

    // 账号
    const AccountNumberRule = createRule("请输入账号")
    // 密码
    const SecretCodeRule = createRule("请输入密码")
    const getSmsFormRule = computed(() => createRule("请输入验证码"));
    // 手机号码
    const getMobileFormRule = computed(() => createRule("请输入手机号"));

    const smsFormRule = unref(getSmsFormRule);
    const mobileFormRule = unref(getMobileFormRule);


    const validateConfirmPassword = (password: string) => {
        return async (_: RuleObject, value: string) => {
            if (!value) {
                return Promise.reject("请确认密码");
            }
            if (value !== password) {
                return Promise.reject("两次密码不一致");
            }
            return Promise.resolve();
        };
    };

    const validatePolicy = async (_: RuleObject, value: boolean) => {
        return !value ? Promise.reject("勾选才能注册") : Promise.resolve();
    };

    const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {

        switch (unref(currentState)) {
            case LoginStateEnum.REGISTER:
                return {
                    account: unref(AccountNumberRule),
                    confirmPassword: [
                        { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
                    ],
                    policy: [{ validator: validatePolicy, trigger: 'change' }],
                    password: unref(SecretCodeRule),
                    sms: smsFormRule,
                    mobile: mobileFormRule,
                };
            case LoginStateEnum.RESET_PASSWORD:
                return {
                    sms: smsFormRule,
                    mobile: mobileFormRule,
                };
            case LoginStateEnum.MOBILE:
                return {
                    sms: smsFormRule,
                    mobile: mobileFormRule,
                };
            default:
                return {
                    account: unref(AccountNumberRule),
                    password: unref(SecretCodeRule),
                };
        }
    })
    return { getFormRules }
}


/**
 * @description: 提交表单
 * @param {Ref} formRef
 * @return {*}
 */
export const useFormValid = (formRef: Ref<FormInstance>) => {
    const validate = computed(() => {
        const form = unref(formRef);
        return form?.validate ?? ((_nameList?: NamePath) => Promise.resolve());
    });

    const validForm = async () => {
        const form = unref(formRef);
        if (!form) return;
        const data = await form.validate();
        return data as any;
    }
    const resetForm = () => {
        const form = unref(formRef);
        return form?.resetFields ?? ((_nameList?: NamePath) => Promise.resolve());
    }
    return { validate, validForm, resetForm };
}


export const useCount = (count: number) => {
    const currentCount = ref(count);
    const isStart = ref(false);
    let timerId: ReturnType<typeof setInterval> | null;

    const clear = () => {
        timerId && window.clearInterval(timerId);
    }

    const stop = () => {
        isStart.value = false;
        clear();
        timerId = null;
    }

    const start = () => {
        if (unref(isStart) || !!timerId) {
            return;
        }
        isStart.value = true;
        timerId = setInterval(() => {
            if (unref(currentCount) === 1) {
                stop();
                currentCount.value = count;
            } else {
                currentCount.value -= 1;
            }
        }, 1000);
    }

    const reset = () => {
        currentCount.value = count;
        stop();
    }

    const restart = () => {
        reset();
        start();
    }

    return { start, reset, restart, clear, stop, currentCount, isStart };
}