var React = require('react')

var ControlBox = React.createClass({
    
    handleSubmit: function(event) {
        event.preventDefault()
        this.props.onSubmit(this.state.subreddit, this.state.limit)
    },

    handleSubredditChange: function(event) {
        this.setState({
            subreddit: event.target.value.trim()
        })
    },

    handleLimitChange: function(event) {
        this.setState({
            limit: event.target.value.trim()
        })
    },

    getInitialState: function() {
        return ({
            subreddit: this.props.subreddit,
            limit: this.props.limit
        })
    },

    render: function() {
        return (<div id="control" className="ui segment">
                  <form onSubmit={ this.handleSubmit }>
                    <div className="ui left icon input">
                      <input name="subreddit" placeholder="Goto Subreddit..." type="text" value={ this.state.subreddit } onChange={ this.handleSubredditChange } />
                      <i className="reddit square icon"></i>
                    </div>
                  </form>
                  <form onSubmit={ this.handleSubmit }>
                    <div className="ui left icon input">
                      <input name="limit" placeholder="Load cards per request" type="text" value={ this.state.limit } onChange={ this.handleLimitChange } />
                      <i className="filter icon"></i>
                    </div>
                  </form>
                </div>

        )
    }
})

module.exports = ControlBox;