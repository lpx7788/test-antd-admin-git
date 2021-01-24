import getUser from './user';
// import menu from './menu';
// import oauth from './oauth';
import getMenu from './menu';

/**
 * 模拟数据mock
 *
 * mock是否开启模拟数据拦截
 */

const options = {mock: false};

getUser({mock: true});
// oauth(options);

getMenu({mock: true});