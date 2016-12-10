// Import Libraries
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

// Import Assets
require('../css/semantic/dist/semantic.min.css');
require('../css/style.css');

// Import Modules
var Card = require('./Card.jsx');
var Menu = require('./Menu.jsx');
var Spinner = require('./Spinner.jsx');


var Main = React.createClass({

    loadLocalStorage: function(key) {
        if (localStorage.state != null && localStorage.state != 'undefined') {
            var state = JSON.parse(localStorage.state);
            return state[key];
        } else {
            return false;
        }
    },

    handleMenuSubmit: function(subreddit, limit) {
        this.setState({
            subreddit: subreddit,
            subredditLimit: limit,
            subredditData: [] // Clear Subreddit Data to prevent different Subreddit concatenation
        });

        this.fetchSubredditData(subreddit, limit);
    },

    startSpinner: function() {
        this.setState({
            spinnerDisplay: true
        });
        console.log('Spinner Started');
    },

    stopSpinner: function() {
        this.setState({
            spinnerDisplay: false
        });
        console.log('Spinner Stopped');
    },

    loadMoreHandler: function() {
        this.fetchSubredditData(this.state.subreddit, this.state.subredditLimit, this.state.lastRedditPostID);
    },

    fetchSubredditData: function(subreddit, limit, after) {
        var parent = this // Fuck jQuery's 'this' conflict
        this.startSpinner();

        console.log('Gonna Fetch:' + subreddit);

        if (subreddit.length > 0) {
            var url = 'https://www.reddit.com/r/' + subreddit + '/new.json?' + 'limit=' + limit + '&after=' + after;
        } else {
            var url = 'https://www.reddit.com/new.json?' + 'limit=' + limit + '&after=' + after;
        }

        $.getJSON(url)
            .done(function(res) {
                parent.setState({
                    subredditData: parent.state.subredditData.concat(res.data.children),
                    lastRedditPostID: res.data.children[res.data.children.length - 1].data.name
                });
                console.log('Fetch Success');
                parent.stopSpinner();
            }) // Fetch subreddit data
            .error(function() {
                console.log("404: Cannot Found The Subreddit: " + subreddit);
                parent.stopSpinner();
            });
    },

    getInitialState: function() {
        return ({
            subreddit: this.loadLocalStorage('subreddit') || '',
            subredditLimit: this.loadLocalStorage('subredditLimit') || 5,
            spinnerDisplay: true,
            subredditData: [],
            lastRedditPostID: null
        });
    },

    componentWillMount: function() {
        this.fetchSubredditData(this.state.subreddit, this.state.subredditLimit, this.state.lastRedditPostID);
    },

    componentDidUpdate: function() {
        localStorage.state = JSON.stringify(this.state);
    },

    render: function() {
        var renderCard;
        if (this.state.subredditData !== []) {
            renderCard = <Card data={ this.state.subredditData } loadMore={ this.loadMoreHandler } />;
        }

        return (
            <div>
              <Spinner display={ this.state.spinnerDisplay } />
              <Menu subreddit={ this.state.subreddit } limit={ this.state.subredditLimit } onSubmit={ this.handleMenuSubmit } />
              <div className="ui centered stackable grid">
                <div className="twelve wide column">
                  { renderCard }
                </div>
              </div>
            </div>
            );
    }


});

ReactDOM.render(<Main />, document.getElementById('content'));
