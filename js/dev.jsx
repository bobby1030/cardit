var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
require('semantic-ui/dist/semantic.min.css')
require('../css/style.css')
var noImage = require('../reddit.jpg')

var Main = React.createClass({

    getInitialState: function() {
        return ({
            subreddit: '',
            spinnerDisplay: true,
        });
    },

    changeSubreddit: function(event){
    	this.setState({ subreddit: event.target.value})
    },

    render: function() {
        return (
            <div>
              <div id="spin">
                <Spinner display={this.state.spinnerDisplay} />
              </div>
              <div class="ui centered stackable grid">
                <div class="twelve wide column">
                </div>
              </div>
              <Search subreddit={ this.state.subreddit } onChange={this.changeSubreddit}/>
            </div>
            );
    }

})

var Search = React.createClass({

    render: function() {
        return (<div
                     id="search"
                     className="ui left icon input">
                  <input
                         id="search_input"
                         placeholder="Goto Subreddit..."
                         type="text"
                         value={ this.props.subreddit }
                         onChange={ this.props.onChange }/>
                  <i className="tag icon"></i>
                </div>)
    }
})

var Spinner = React.createClass({

    render: function() {

        if (this.props.display == true) {
            return (
                <div className="spinner">
                  <div className="double-bounce1" />
                  <div className="double-bounce2" />
                </div>
            )
        } else {
            return null
        }

    }
})

ReactDOM.render(<Main />, document.getElementById('content'));