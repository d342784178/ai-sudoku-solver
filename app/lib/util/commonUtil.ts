// 一个辅助函数生成类名字符串
import clsx, {ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function classnames(...args: any[]) {
    return args.filter(Boolean).join(' ');
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}