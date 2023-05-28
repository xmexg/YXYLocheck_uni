if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$3 = {
    data() {
      return {};
    },
    onLoad() {
    },
    methods: {}
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", { id: "userShow" })
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/HBuilderX/HBProjects/YXYLocheck/pages/index/index.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _sfc_main$2 = {
    globalData: {
      nowUser: ""
    },
    data() {
      return {
        phone: "",
        passwd: "",
        userList: []
      };
    },
    onLoad() {
      this.upUserList();
    },
    methods: {
      upUserList() {
        this.userList = [];
        let that = this;
        uni.getStorageInfo({
          success(res) {
            res.keys.forEach((ph, k) => {
              let pa = uni.getStorageSync(ph);
              that.userList.push({ "phone": ph, "passwd": pa });
            });
          },
          fail() {
            uni.showToast({
              title: "无法读取本地用户信息"
            });
          }
        });
      },
      addUser() {
        if (this.phone && this.passwd) {
          uni.setStorageSync(this.phone, this.passwd);
          this.userList.push({ "phone": this.phone, "passwd": this.passwd });
          uni.showToast({ title: "保存成功" });
          this.phone = "";
          this.passwd = "";
        }
      },
      changeUserInfo() {
      },
      choUser(user) {
        getApp().globalData.nowUser = user;
        formatAppLog("log", "at pages/account/account.vue:94", getApp().globalData.nowUser);
      },
      delUser(user) {
        uni.removeStorageSync(user.phone);
        this.upUserList();
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { id: "con" }, [
        vue.createElementVNode("view", {
          id: "adduser",
          class: "blockcenter"
        }, [
          vue.createElementVNode("view", { id: "adduser_title" }, "添加优学院账号"),
          vue.createElementVNode("view", {
            id: "adduser_con",
            class: "blockcenter"
          }, [
            vue.createElementVNode("view", {
              id: "adduser_input",
              class: "blockcenter"
            }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "number",
                  maxlength: "11",
                  placeholder: "请输入手机号",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.phone = $event),
                  "confirm-type": "next",
                  "confirm-hold": true
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.phone]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  placeholder: "请输入密码",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.passwd = $event),
                  "confirm-type": "done"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.passwd]
              ])
            ]),
            vue.createElementVNode("view", {
              id: "adduser_btn",
              class: "blockcenter"
            }, [
              vue.createElementVNode("button", {
                type: "primary",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.addUser && $options.addUser(...args))
              }, "保存")
            ])
          ])
        ]),
        vue.createElementVNode("view", { id: "showUserList" }, [
          vue.createElementVNode("view", { id: "showUserList_title" }, "已保存的用户信息"),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.userList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                id: "showUserList_info",
                class: "blockcenter"
              }, [
                vue.createElementVNode("div", { class: "showUserList_info_list" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "userList_phone" },
                    "手机号: " + vue.toDisplayString(item.phone),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "userList_passwd" },
                    "密码: " + vue.toDisplayString(item.passwd),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("swiper", { class: "showUser_swiper" }, [
                    vue.createElementVNode("swiper-item", null, [
                      vue.createElementVNode(
                        "view",
                        { class: "user_fun" },
                        vue.toDisplayString(index + 1),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("swiper-item", null, [
                      vue.createElementVNode("view", { class: "userList_index" }, [
                        vue.createElementVNode("view", null, [
                          vue.createElementVNode("view", null, [
                            vue.createElementVNode("input", {
                              type: "text",
                              placeholder: "请输入新的密码",
                              value: item.passwd,
                              "confirm-type": "done"
                            }, null, 8, ["value"])
                          ]),
                          vue.createElementVNode("button", {
                            type: "default",
                            onClick: _cache[3] || (_cache[3] = (...args) => $options.changeUserInfo && $options.changeUserInfo(...args))
                          }, "修改")
                        ]),
                        vue.createElementVNode("view", null, [
                          vue.createElementVNode("button", {
                            type: "primary",
                            onClick: ($event) => $options.choUser(item)
                          }, "选中", 8, ["onClick"]),
                          vue.createElementVNode("button", {
                            type: "warn",
                            onClick: ($event) => $options.delUser(item)
                          }, "删除", 8, ["onClick"])
                        ])
                      ])
                    ])
                  ])
                ])
              ]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ])
      ])
    ]);
  }
  const PagesAccountAccount = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/HBuilderX/HBProjects/YXYLocheck/pages/account/account.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { id: "con" });
  }
  const PagesAboutAbout = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/HBuilderX/HBProjects/YXYLocheck/pages/about/about.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/account/account", PagesAccountAccount);
  __definePage("pages/about/about", PagesAboutAbout);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/HBuilderX/HBProjects/YXYLocheck/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
