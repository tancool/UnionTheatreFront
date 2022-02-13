export default function (num) {
    if (!num) {
        return false;
    }
    if (!parseInt(num)) {
        return '-';
    }
    let transmateNum = parseInt(num); // 转换为数字.
    let dateFormat = new Date(transmateNum);
    let getYear = dateFormat.getFullYear();
    let getMonth = dateFormat.getMonth() + 1;
    let getDay = dateFormat.getDate();
    let returnStr = getYear + "-" + getMonth + "-" + getDay;
    return returnStr;
}