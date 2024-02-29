// 一个辅助函数生成类名字符串
import clsx, {ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function classnames(...args: any[]) {
    return args.filter(Boolean).join(' ');
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
    return process.env.NEXT_PUBLIC_APP_URL + path;
}

export class IterableReadableStream<T> {
    private reader: ReadableStreamDefaultReader<T>

    constructor(reader: ReadableStreamDefaultReader<T>) {
        this.reader = reader;
    }

    [Symbol.asyncIterator]() {
        const that = this;
        return {
            async next() {
                const {done, value} = await that.reader.read();
                return {done, value};
            }
        };
    }
}