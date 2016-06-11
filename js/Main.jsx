// Import Libraries
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

// Import Assets
require('semantic-ui/dist/semantic.min.css')
require('../css/style.css')


// Import Modules
var Card = require('./Card.jsx')
var ControlBox = require('./ControlBox.jsx')
var Spinner = require('./Spinner.jsx')


var Main = React.createClass({

    getInitialState: function() {

        return ({
            subreddit: '',
            subredditLimit: 25,
            spinnerDisplay: true,
            subredditData: null
        });
    },

    controlOnSubmit: function(subreddit, limit) {
        this.setState({
            subreddit: subreddit,
            subredditLimit: limit
        })

        this.fetchSubredditData(subreddit, limit)
    },

    startSpinner: function() {
        this.setState({
            spinnerDisplay: true
        })
        console.log('Spinner Started')
    },

    stopSpinner: function() {
        this.setState({
            spinnerDisplay: false
        })
        console.log('Spinner Stopped')
    },

    componentWillMount: function() {
        this.fetchSubredditData(this.state.subreddit, this.state.subredditLimit)
    },

    fetchSubredditData: function(subreddit, limit) {
        var parent = this

        this.startSpinner()
        console.log('Gonna Fetch:' + subreddit)
        if (subreddit.length > 0) {
            $.getJSON('http://www.reddit.com/r/' + subreddit + '/new.json?' + 'limit=' + limit, function(res) {
                parent.setState({
                    subredditData: res.data.children
                })
                console.log('Fetch Success')
                parent.stopSpinner()
            }) // Fetch subreddit data
                .error(function() {
                    console.log("404: Cannot Found The Subreddit: " + subreddit);
                    parent.stopSpinner()
                }); // If error, redirect to homepage
        } else {
            $.getJSON('http://www.reddit.com/new.json?' + 'limit=' + limit, function(res) {
                parent.setState({
                    subredditData: res.data.children
                })
                console.log('Fetch Home Success')
                parent.stopSpinner()
            }) // If no subreddit given, fetch reddit homepage.  
                .error(function() {
                    console.log("404: Cannot Connect To Reddit");
                    parent.stopSpinner()
                });
        }


    },

    render: function() {

        var renderCard;
        if (this.state.subredditData != null) {
            renderCard = <Card data={ this.state.subredditData } didMount={ this.stopSpinner } />
        }

        return (
            <div>
              <Spinner display={ this.state.spinnerDisplay } />
              <div className="ui centered stackable grid">
                <div className="twelve wide column">
                  { renderCard }
                </div>
              </div>
              <ControlBox subreddit={ this.state.subreddit } limit={ this.state.subredditLimit } onSubmit={ this.controlOnSubmit } />
            </div>
            );
    }


})

ReactDOM.render(<Main />, document.getElementById('content'));