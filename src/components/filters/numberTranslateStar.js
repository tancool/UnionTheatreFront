
// 用户评论 : 根据用户的评论数返回星星
export default function (likeNum) {
    if (!parseInt(likeNum)) {
        return '-';
    }
    let returnStr = '';
    for (let i = 0; i < likeNum; i++) {
        returnStr += ' *';
    }
    return returnStr;
}