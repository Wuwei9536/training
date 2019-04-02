import DB from './DB'
// initial state
// shape: [{ id, quantity }]
const state = {
    menuItems: [{ name: '日本料理', isActive: true },
    { name: '韩国料理', isActive: false },
    { name: '中华料理', isActive: false },
    { name: '上海料理', isActive: false },
    { name: '宝山料理', isActive: false }],
    goodListItems: DB.DATA[0],
    cartListItems: DB.CART,
    maskLayer: false
}

// // getters
// const getters = {
//   cartProducts: (state, getters, rootState) => {
//     return state.items.map(({ id, quantity }) => {
//       const product = rootState.products.all.find(product => product.id === id)
//       return {
//         title: product.title,
//         price: product.price,
//         quantity
//       }
//     })
//   },

//   cartTotalPrice: (state, getters) => {
//     return getters.cartProducts.reduce((total, product) => {
//       return total + product.price * product.quantity
//     }, 0)
//   }
// }

// actions
const actions = {
    //   checkout ({ commit, state }, products) {
    //     const savedCartItems = [...state.items]
    //     commit('setCheckoutStatus', null)
    //     // empty cart
    //     commit('setCartItems', { items: [] })
    //     shop.buyProducts(
    //       products,
    //       () => commit('setCheckoutStatus', 'successful'),
    //       () => {
    //         commit('setCheckoutStatus', 'failed')
    //         // rollback to the cart saved before sending the request
    //         commit('setCartItems', { items: savedCartItems })
    //       }
    //     )
    //   },
    changeGoodListItems({ commit, state }, index) {
        commit('changeGoodListItems', index)
    },

    addCount({ commit, state }, payload) {
        commit('addCount', payload)
    },
    subCount({ commit, state }, payload) {
        commit('subCount', payload)
    },
    changeMaskLayer({ commit, state }, payload) {
        commit('changeMaskLayer', payload)
    },
    clearCartListItems({ commit, state }, payload) {
        commit('clearCartListItems', payload)
    },
    menuItemStatus({ commit, state }, payload) {
        commit('menuItemStatus', payload)
    }
}

// mutations
const mutations = {
    //   pushProductToCart (state, { id }) {
    //     state.items.push({
    //       id,
    //       quantity: 1
    //     })
    //   },

    changeMaskLayer(state, payload) {
        state.maskLayer = payload;
    },

    changeGoodListItems(state, index) {
        state.goodListItems = DB.DATA[index]
    },

    addCount(state, payload) { //type=>1:商品列表  2：购物车
        const { index, type } = payload;
        const { goodListItems, cartListItems } = state;
        if (type === 1) {
            goodListItems[index].count += 1;
        } else {
            cartListItems[index].count += 1;
        }
        if (goodListItems[index].count !== 0) {
            let isExist = false;
            for (let i in cartListItems) {
                if (cartListItems[i].id === goodListItems[index].id) {
                    // cartListItems[i].count += 1;
                    isExist = true;
                }
            }
            if (!isExist) {
                cartListItems.push(goodListItems[index])
            }
        }
    },

    subCount(state, payload) {
        const { index, type } = payload;
        const { goodListItems, cartListItems } = state;
        if (type === 1) {
            goodListItems[index].count -= 1;
        } else {
            cartListItems[index].count -= 1;
        }
        for (let i in cartListItems) {
            if (cartListItems[i].count === 0) {
                cartListItems.splice(i, 1)
            }
        }
        if (cartListItems.length === 0) {
            state.maskLayer = false;
        }
    },

    clearCartListItems(state, payload) {
        state.maskLayer = false;
        for (let i in state.cartListItems) {
            state.cartListItems[i].count = 0;
        }
        state.cartListItems = [];
    },

    menuItemStatus(state, index) {
        for (let i in state.menuItems) {
            state.menuItems[i].isActive = false;
        }
        state.menuItems[index].isActive = true;
    }
}

export default {
    // namespaced: true,
    state,
    //   getters,
    actions,
    mutations
}
