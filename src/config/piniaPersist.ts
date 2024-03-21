/*
 * @Author: 可可乐
 * @Date: 2023-04-20 13:57:58
 * @LastEditors: 可可乐
 * @LastEditTime: 2023-04-20 13:58:03
 * @FilePath: /vite-demo/src/config/piniaPersist.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { PersistedStateOptions } from "pinia-plugin-persistedstate";

/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 * */
const piniaPersistConfig = (key: string, paths?: string[]) => {
	const persist: PersistedStateOptions = {
		key,
		storage: localStorage,
		// storage: sessionStorage,
		paths
	};
	return persist;
};

export default piniaPersistConfig;
