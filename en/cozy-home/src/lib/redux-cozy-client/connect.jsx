import React, { Component } from 'react'
import { connect as reduxConnect } from 'react-redux'
import PropTypes from 'prop-types'

import { applySelectorForAction, enhancePropsForActions } from '.'
import { mapValues, filterValues } from './utils'

const connect = mapDocumentsToProps => WrappedComponent => {
  class Wrapper extends Component {
    componentDidMount() {
      const { fetchActions } = this.props
      const dispatch = this.context.store.dispatch
      for (const propName in fetchActions) {
        dispatch(fetchActions[propName])
      }
    }

    static contextTypes = {
      store: PropTypes.object
    }

    render() {
      const { store } = this.context
      const { fetchActions } = this.props
      const props = {
        ...this.props,
        ...enhancePropsForActions(this.props, fetchActions, store.dispatch)
      }
      return <WrappedComponent {...props} />
    }
  }

  const makeMapStateToProps = (initialState, initialOwnProps) => {
    const initialProps = mapDocumentsToProps(initialOwnProps)

    const isAction = action => action && action.types && action.promise
    const fetchActions = filterValues(initialProps, prop => isAction(prop))
    const otherProps = filterValues(initialProps, prop => !isAction(prop))

    const mapStateToProps = state => ({
      ...mapValues(fetchActions, action =>
        isAction(action) ? applySelectorForAction(state, action) : action
      ),
      fetchActions,
      ...otherProps
    })
    return mapStateToProps
  }

  return reduxConnect(makeMapStateToProps)(Wrapper)
}

export default connect
