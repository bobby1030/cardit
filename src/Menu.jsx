var React = require('react');
var Headroom = require('react-headroom').default;

var Menu = React.createClass({

    handleSubmit: function(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.subreddit, this.state.limit);
    },

    handleSubredditChange: function(event) {
        this.setState({
            subreddit: event.target.value.trim()
        });
    },

    handleLimitChange: function(event) {
        this.setState({
            limit: event.target.value.trim()
        });
    },

    getInitialState: function() {
        return ({
            subreddit: this.props.subreddit,
            limit: this.props.limit
        });
    },

    render: function() {
        return (
            <nav id="menu">
              <Headroom>
                <div className="ui three item blue inverted tiny stackable menu">
                  <a href="/" className="header item">Cardit</a>
                  <div className="item">
                    <form onSubmit={ this.handleSubmit }>
                      <div className="ui left icon input">
                        <input name="subreddit" placeholder="Goto" type="text" value={ this.state.subreddit } onChange={ this.handleSubredditChange } />
                        <i className="reddit square inverted circular icon"></i>
                      </div>
                    </form>
                    <form onSubmit={ this.handleSubmit }>
                      <div className="ui left icon input">
                        <input name="limit" placeholder="Cards" type="text" value={ this.state.limit } onChange={ this.handleLimitChange } />
                        <i className="filter inverted circular icon"></i>
                      </div>
                    </form>
                  </div>
                  <a href="https://github.com/bobby1030/cardit" className="ui item mobile-hide">
                    <i className="github icon"></i> GitHub Repo
                  </a>
                </div>
              </Headroom>
            </nav>
        );
    }
});

module.exports = Menu;
