import { json } from "body-parser";

// 查找父级
export function getParent(list, childId) {
 
    var arrRes = [];
    if (list.length == 0) {
        if (childId) {
            arrRes.unshift(list);
        }
        return arrRes;
    }
    let rev = (data, nodeId) => {
        for (var i = 0, length = data.length; i < length; i++) {
            let node = data[i];
            if (node.id == nodeId) {
  
                arrRes.unshift(node);
                rev(list, node.parentId);
                break;
            } else {
                if (node.children) {
                    rev(node.children, nodeId);
                }
            }
        }
        return arrRes;
    };
    arrRes = rev(list, childId);
 
    return arrRes;
}

// 查找父级
export function getParent2(key, tree, prop) {
    let p = {
        children: prop.children || 'children',
        key: prop.key || 'id'
    }
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node[p.children]) {
            if (node[p.children].some(item => item[p.key] === key)) {
                parentKey = node;
            } else if (getParent2(key, node[p.children])) {
                parentKey = getParent2(key, node[p.children]);
            }
        }
    }
    return parentKey;
}

// 转树
export function toTree(list, parId, options = {
    children: 'children',
    parentId: 'parentId',
    id: 'id'
}) {
    /*
     *  配置父id和子id的数据源
     */
    // console.log(children, parentId, id)
    let len = list.length;

    function loop(parId) {
        let res = [];
        for (let i = 0; i < len; i++) {
            let item = list[i];
            if (item[options.parentId || 'parentId'] === parId) {
                item[options.children || 'children'] = loop(item[options.id || 'id']);
                if (item[options.children || 'children'].length === 0) delete item[options.children || 'children'];
                res.push(item);
            }
        }
        return res;
    }
    return loop(parId);
}

// 反转树
export function invertTree(data) {
    let res = []
    let arr = JSON.parse(JSON.stringify(data))
    let findChildName = (list) => {
        list.forEach(item => {
            if (item.children) {
                findChildName(item.children)
                delete item.children
                res.push(item)
            } else {
                res.push(item)
            }
        });
    }
    findChildName(arr)
    return res
}

// 防抖
export function debounce(fn, time) {
    var delay = time || 200;
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delay);
    };
}

// 节流
export function throttle(fn, time) {
    var last;
    var timer;
    var interval = time || 200;
    return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
}
// 重构数组
export function refactoringArr (list, option) {
    const len = list.length
    const parId = 0
    function loop (parId) {
      const res = []
      let ites = {}
      for (let i = 0; i < len; i++) {
        const item = list[i]
        ites = {
          ...option(item)
        }
        if (item['parentId'] === parId) {
          ites['children'] = item['children'] = loop(item['id'])
          if (item['children'].length === 0) delete ites['children']
          res.push(ites)
        }
      }
      return res
    }
    return loop(parId)
  }
