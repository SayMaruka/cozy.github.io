import { Component } from 'react'
import PropTypes from 'prop-types'

export default class CozyProvider extends Component {
  static propTypes = {
    domain: PropTypes.string,
    secure: PropTypes.bool,
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    }),
    client: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  }

  static childContextTypes = {
    domain: PropTypes.string,
    secure: PropTypes.bool,
    store: PropTypes.object,
    client: PropTypes.object.isRequired
  }

  static contextTypes = {
    store: PropTypes.object
  }

  getChildContext() {
    return {
      domain: this.props.domain,
      secure: this.props.secure,
      store: this.props.store || this.context.store,
      client: this.props.client
    }
  }

  render() {
    return this.props.children || null
  }
}
