import crypto from 'crypto';
// 定义请求头和认证信息
const appId = 'your_app_id';
const apiKey = 'your_api_key';
const apiSecret = 'your_api_secret';
const requestUrl = 'wss://ws-api.xf-yun.com/v1/private/ma008db16';

// 解析请求 URL
function parseUrl(requestUrl: string): { host: string; path: string; schema: string } {
    const stidx = requestUrl.indexOf("://");
    let host = requestUrl.substring(stidx + 3);
    const schema = requestUrl.substring(0, stidx + 3);
    const edidx = host.indexOf("/");
    if (edidx <= 0) {
        throw new Error("invalid request url:" + requestUrl);
    }
    const path = host.substring(edidx);
    host = host.substring(0, edidx);
    return {host, path, schema};
}

// 构建 WebSocket 认证请求 URL
function assembleWsAuthUrl(requestUrl: string, method: string, apiKey: string, apiSecret: string): string {
    const u = parseUrl(requestUrl);
    const now = new Date();
    const date = now.toUTCString();
    const signatureOrigin = `host: ${u.host}\ndate: ${date}\n${method} ${u.path} HTTP/1.1`;
    console.log('signatureOrigin', signatureOrigin)
    const signatureSha = createSignature(signatureOrigin, apiSecret);
    const authorizationOrigin = `api_key="${apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signatureSha}"`;
    console.log('authorizationOrigin', authorizationOrigin)
    const authorization = btoa(authorizationOrigin);
    const values = {
        host: u.host,
        date: date,
        authorization: authorization,
    };
    return `${requestUrl}?${new URLSearchParams(values).toString()}`;
}

// 创建签名
function createSignature(message: string, secret: string) {
// 使用HMAC-SHA256算法进行签名
    const signature_sha = crypto.createHmac('sha256', secret)
        .update(message)
        .digest('hex');

// 将签名的16进制表示进行Base64编码
    const signature = Buffer.from(signature_sha, 'hex').toString('base64');
    return signature
}

function saveFile(data: File, filename: string, mimeType: string) {
    // Blob对象用来创建一个包含数据的文件对象
    const blob = new Blob([data], {type: mimeType});
    // 创建一个隐藏的a元素
    const a = document.createElement('a');
    a.style.display = 'none';
    // 利用URL.createObjectURL()方法为Blob对象创建一个临时URL
    const url = URL.createObjectURL(blob);
    a.href = url;
    // 指定下载的文件名
    a.download = filename;
    // 将a元素添加到文档中
    document.body.appendChild(a);
    // 触发a元素的点击事件来执行下载
    a.click();
    // 在下载完成后清理生成的临时URL和添加的a元素
    document.body.removeChild(a);
    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 100);
}

const a = new Map([
    ['1', 'docx'],
    ['2', 'pptx'],
    ['0', 'xls'],
]);

// WebSocket 客户端
export class WebsocketDemo {
    private ws: WebSocket;
    private appId: string;
    private apiSecret: string;
    private resultType: string;
    private file: File;
    private fileName: string;
    private fileExtName: string;

    constructor(appId: string, apiKey: string, apiSecret: string, file: File, resultType: string) {
        this.appId = appId;
        this.apiSecret = apiSecret;
        this.file = file;
        this.resultType = resultType;
        this.ws = new WebSocket(assembleWsAuthUrl(requestUrl, 'GET', apiKey, apiSecret));
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onerror = this.onError.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        const fileFullName = file.name;
        this.fileName = fileFullName.slice(0, fileFullName.lastIndexOf('.'));
        this.fileExtName = fileFullName.slice(fileFullName.lastIndexOf('.')+1, fileFullName.length);
        console.log(this.fileName)
        console.log(this.fileExtName)
    }

    private onOpen() {
        console.log("onOpen");
        this.startSendMessage();
    }

    private onMessage(event: MessageEvent) {
        console.log("onMessage", event.data);
        const message = JSON.parse(event.data);
        if (message.header.status === 1) {
            const binary_string = window.atob(message.payload.result.text);
            const bytes = new Uint8Array(binary_string.length);
            for (let i = 0; i < binary_string.length; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            const blob = new Blob([bytes], {type: 'application/octet-stream'});
            const file = new File([blob], "output." + this.resultType);
            saveFile(file, this.fileName + '.' + a.get(this.resultType), 'application/octet-stream');
        }
    }


    private onError(error: Event) {
        console.log("onError", error);
    }

    private onClose() {
        console.log("***onClose***");
    }

    private async startSendMessage() {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const body = {
                "header": {
                    "app_id": "5c2b33cc",
                    "status": 2,
                },
                "parameter": {
                    "s15282f39": {
                        "category": "ch_en_public_cloud",
                        "result": {
                            "encoding": "utf8",
                            "compress": "raw",
                            "format": "plain"
                        }
                    },
                    "s5eac762f": {
                        "result_type": `${this.resultType}`,
                        "result": {
                            "encoding": "utf8",
                            "compress": "raw",
                            "format": "plain"
                        }
                    }
                },
                "payload": {
                    "test": {
                        "encoding": `${this.fileExtName}`,
                        "image": `${(reader.result as string).slice(22)}`,
                        "status": 3
                    }
                }
            };
            const signature = await createSignature(JSON.stringify(body), this.apiSecret);
            console.log('signature', signature)
            const authHeader = `api_key="${apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
            const authHeaderValue = btoa(authHeader);
            const values = new URLSearchParams({
                host: this.ws.url.split('://')[1].split('/')[0],
                date: new Date().toUTCString(),
                authorization: authHeaderValue,
            });
            const urlWithParams = `${this.ws.url}?${values.toString()}`;
            this.ws.send(JSON.stringify(body));
        };
        reader.readAsDataURL(this.file);
    }
}

// // 主函数
// async function main() {
//     const appId = 'your_app_id';
//     const apiKey = 'your_api_key';
//     const apiSecret = 'your_api_secret';
//     const fileInput = document.getElementById('fileInput') as HTMLInputElement;
//     const file = fileInput.files[0]; // 假设你有一个文件输入元素
//     const resultType = '2'; // 选择输出格式 2:ppt、1:doc、0:excel,结果将保存在output中
//
//     if (file) {
//         const demo = new WebsocketDemo(appId, apiKey, apiSecret, file, resultType);
//     } else {
//         console.error("No file selected.");
//     }
// }
//
// // 确保在 DOM 加载完成后执行 main 函数
// window.addEventListener('load', main);