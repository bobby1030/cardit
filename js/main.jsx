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

    componentWillMount() {
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

var Card = React.createClass({

    render() {
        return (

            <div>
              { this.props.data.map(function(arg) {
                
                    if (!arg.data.preview) {
                        var imgURL = noImage
                    } else {
                        var imgURL = arg.data.preview.images[0].source.url
                    }
                
                    var titleURL = arg.data.url
                    var title = arg.data.title
                    var date = new Date(arg.data.created_utc).toTimeString()
                
                    return (
                        <div className="ui fluid card">
                          <CardImage imgURL={ imgURL } />
                          <CardContent title={ title } titleURL={ titleURL } date={ date } />
                        </div>
                    )
                }) }
            </div>
        )
    },

    componentDidMount() {
        this.props.didMount()
    }
})

var CardImage = React.createClass({

    render() {
        return (<a className="image" href={ this.props.imgURL }><img src={ this.props.imgURL } />
                </a>)
    }

})

var CardContent = React.createClass({

    render() {
        return (<div className="content">
                  <a className="header" href={ this.props.titleURL }>
                    { this.props.title }
                  </a>
                  <div className="meta">
                    <span className="date">{ this.props.date }</span>
                  </div>
                </div>)
    }
})

var ControlBox = React.createClass({

    getInitialState: function() {
        return ({
            subreddit: this.props.subreddit,
            limit: this.props.limit
        })
    },

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
                      <input name="limit" placeholder="Cards (Below 100)" type="text" value={ this.state.limit } onChange={ this.handleLimitChange } />
                      <i className="filter icon"></i>
                    </div>
                  </form>
                </div>

        )
    }
})

var Spinner = React.createClass({

    render: function() {

        if (this.props.display == true) {
            return (
                <div id="spin">
                  <div className="spinner">
                    <div className="double-bounce1" />
                    <div className="double-bounce2" />
                  </div>
                </div>
            )
        } else {
            return null
        }

    }
})

ReactDOM.render(<Main />, document.getElementById('content'));