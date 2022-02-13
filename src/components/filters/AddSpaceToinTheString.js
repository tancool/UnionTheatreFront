export default function (string) { // 去掉空格.添加括号. 用于筛选电影类型
    if (!string) { // 如果string不存在就返回
        return;
    }
    if (typeof (string).toLocaleLowerCase() != 'string') {
        return ' ';
    }
    let reg = /,/g;
    return string.replace(reg, ' ');
}