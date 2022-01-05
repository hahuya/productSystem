import { createHashHistory,createBrowserHistory } from 'history';

export const configJson = '测试引入模块'

export function testHistroyRouter (){
    const historyRouter = createBrowserHistory();
    historyRouter.push('/login')
} 