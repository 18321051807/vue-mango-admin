/*
 * @Author: kkle
 * @Date: 2022-11-11 17:21:41
 * @LastEditTime: 2024-03-12 10:18:32
 * @LastEditors: kkle
 * @Description:
 * @FilePath: /vue-mango-admin/src/utils/storage.ts
 */
/**
 * 封装操作localstorage本地存储的方法
 * @auther kkle
 */

import { ACCESS_TOKEN } from "@/config/config";

/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const storage = {
	set(key: string, value: any) {
		window.localStorage.setItem(key, JSON.stringify(value));
	},

	get<T>(key: string) {
		const value = window.localStorage.getItem(key);
		if (value && value != "undefined" && value != "null")
			return <T>JSON.parse(value);
		else return "{}";
	},

	remove(key: string) {
		window.localStorage.removeItem(key);
	},

	clear() {
		window.localStorage.clear()
	}
};


import Cookies from 'js-cookie';

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
	// 设置临时缓存
	set(key: string, val: any) {
		if (key === ACCESS_TOKEN) return Cookies.set(key, val);
		window.sessionStorage.setItem(key, JSON.stringify(val));
	},
	// 获取临时缓存
	get(key: string) {
		if (key === ACCESS_TOKEN) return Cookies.get(key);
		let json = <string>window.sessionStorage.getItem(key);
		return JSON.parse(json);
	},
	// 移除临时缓存
	remove(key: string) {
		if (key === ACCESS_TOKEN) return Cookies.remove(key);
		window.sessionStorage.removeItem(key);
	},
	// 移除全部临时缓存
	clear() {
		Cookies.remove(ACCESS_TOKEN);
		window.sessionStorage.clear();
	},
};
