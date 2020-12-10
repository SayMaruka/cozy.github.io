import Settings from 'ducks/settings/Settings'
import AccountsSettings from 'ducks/settings/AccountsSettings'
import GroupSettings, { NewGroupSettings } from 'ducks/settings/GroupSettings'
import GroupsSettings from 'ducks/settings/GroupsSettings'
import Configuration from 'ducks/settings/Configuration'
import Debug from 'ducks/settings/Debug'

export { getDefaultedSettingsFromCollection } from './helpers'

// components
export {
  Settings,
  AccountsSettings,
  GroupsSettings,
  GroupSettings,
  NewGroupSettings,
  Configuration,
  Debug
}
