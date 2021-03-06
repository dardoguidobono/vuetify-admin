import colors from 'vuetify/es5/util/colors';
import store from '@/utils/store';
import * as types from './mutations_types';


const setKeyUp = (events) => {
  document.onkeyup = (e) => {
    // 兼容FF和IE和Opera
    const event = e || window.event;
    const key = event.which || event.keyCode || event.charCode;
    if (key === 13) { // enter
      if (events.enter) {
        events.enter();
      }
    } else if (key === 27) { // esc
      if (events.esc) {
        events.esc();
      }
    }
  };
};
const removeKeyUp = () => {
  document.onkeyup = null;
};

export default {

  [types.MUTATION_G_SHOW_ALERT](state, payload) {
    state.snackbars.push(payload);
    state.snackbar = true;
  },

  [types.MUTATION_G_CLOSE_ALERT](state) {
    state.snackbars.shift();
    state.snackbar = false;
  },

  [types.MUTATION_G_SHOW_NEXT_ALERT](state) {
    if (state.snackbars.length > 0) {
      state.snackbar = true;
    }
  },

  [types.MUTATION_G_UPDATE_THEME_COLOR](state, payload) {
    state.themeColor = payload;
    state.vue.$vuetify.theme.primary = colors[payload.field].darken1;
    store.set('theme_color', state.themeColor);
  },

  [types.MUTATION_G_UPDATE_THEME_IS_DARK](state, payload) {
    state.themeIsDark = payload;
    store.set('theme_is_dark', state.themeIsDark);
  },

  [types.MUTATION_G_INIT_THEME_COLOR](state) {
    const themeColor = store.get('theme_color');
    if (themeColor !== null) {
      state.themeColor = themeColor;
    }
    state.vue.$vuetify.theme.primary = colors[state.themeColor.field].darken1;
  },

  [types.MUTATION_G_INIT_THEME_IS_DARK](state) {
    const themeIsDark = store.get('theme_is_dark');
    if (themeIsDark !== null) {
      state.themeIsDark = themeIsDark;
    }
  },

  [types.MUTATION_G_ATTACH_VUE](state, payload) {
    state.vue = payload;
  },

  [types.MUTATION_G_ADD_KEY_UP](state, payload) {
    state.keyupEvents.unshift(payload);
    setKeyUp(payload);
  },

  [types.MUTATION_G_REMOVE_KEY_UP](state) {
    state.keyupEvents.shift();
    if (state.keyupEvents.length > 0) {
      setKeyUp(state.keyupEvents[0]);
    } else {
      removeKeyUp();
    }
  },

};
