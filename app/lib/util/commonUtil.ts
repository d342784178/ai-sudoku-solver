// 一个辅助函数生成类名字符串
export function classnames(...args: any[]) {
    return args.filter(Boolean).join(' ');
}