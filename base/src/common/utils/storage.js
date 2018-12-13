/**
 * Created by mark on 2017/8/22.
 */

export default {
  /**
   * 存储localStorage
   */
  setStore:(name, content) =>{
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },
  /**
   * 获取localStorage
   */
  getStore:(name) => {
    if (!name) return;
    return window.localStorage.getItem(name);
  },
  /**
   * 清除localStorage
   */
  clearStore:() => {
    window.localStorage.clear();
  }
}
