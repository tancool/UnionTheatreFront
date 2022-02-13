export default function (arg) {
    if (!(arg instanceof Array)) {
        return '';
    }
    let returnStr = ''
    arg.forEach((item,index)=>{
        returnStr+= item.chinaNameOfStar+ " ";
    });
    return returnStr;
};
