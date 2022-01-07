import { createHashHistory,createBrowserHistory } from 'history';

export const configJson = '测试引入模块'

export function testHistroyRouter (){
    const historyRouter = createBrowserHistory();
    historyRouter.push('/login')
} 

export function deepClone(obj){
    // 判断原目标是数组还是对象，进行初始化赋值
    const newObj = obj.constructor === Array ? [] :{};
    // 循环原目标
    for(let key in obj){
        // 判断当前值是否存在
      if(obj.hasOwnProperty(key)){
         // 判断是否当前要拷贝的是否是对象
         if(obj[key] && typeof obj[key] === 'object'){
          // 是对象，再次调用deepClone递归
          newObj[key] = deepClone(obj[key]);
         }else{
          // 数组，直接赋值就好
          newObj[key] = obj[key];
         }
      }
    }
    return newObj;
}