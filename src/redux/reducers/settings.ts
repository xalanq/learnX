import { ISettingsAction } from "../types/actions";
import { SET_AUTO_REFRESHING, SET_TABS_ORDER } from "../types/constants";
import { ISettingsState, Tab } from "../types/state";

export default function settings(
  state: ISettingsState = {
    tabsOrder: [
      Tab.Notices,
      Tab.Files,
      Tab.Assignments,
      Tab.Courses,
      Tab.Settings
    ],
    autoRefreshing: true
  },
  action: ISettingsAction
): ISettingsState {
  switch (action.type) {
    case SET_TABS_ORDER:
      return {
        ...state,
        tabsOrder: action.payload
      };
    case SET_AUTO_REFRESHING:
      return {
        ...state,
        autoRefreshing: action.payload
      };
  }
  return state;
}