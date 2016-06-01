var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
require('semantic-ui/dist/semantic.min.css')
require('../css/style.css')
var noImage = require('../reddit.jpg')

// Define Components

var Main = React.createClass({
    render: function() {
        return (
            <div>
              <Card json={ DATA.res.data.children } />
              <Search />
            </div>
        )
    }
})

var Card = React.createClass({

    render: function() {

        return (

            <div>
              { this.props.json.map(function(arg) {
                
                
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
                          <a
                             className="image"
                             href={ imgURL }><img src={ imgURL } /></a>
                          <div className="content">
                            <a
                               className="header"
                               href={ titleURL }>
                              { title }
                            </a>
                            <div className="meta">
                              <span className="date">{ date }</span>
                            </div>
                          </div>
                        </div>
                    )
                }
                ) }
            </div>
        )
    }

});

var Search = React.createClass({

    componentDidMount: function() {
        $('#search_input').keypress(function(e) {
            if (e.which == 13) {
                location.hash = '#' + $('#search_input').val()
            }
        })
    },

    render: function() {
        return (<div
                     id="search"
                     className="ui left icon input">
                  <input
                         id="search_input"
                         placeholder="Goto Subreddit..."
                         type="text"
                         defaultValue={ DATA.subreddit } />
                  <i className="tag icon"></i>
                </div>)
    }
})

var Spinner = React.createClass({
    render: function() {

        return (
            <div className="spinner">
              <div className="double-bounce1" />
              <div className="double-bounce2" />
            </div>
        )
    }
})

// End Define Conponents

var DATA = {}
DATA.limit = 10
DATA.subreddit

var fetch = {
    start: function() {
    	fetch.before()
    },

    before: function() {
    	DATA.subreddit = location.hash.replace(/\#/, '')
	    ReactDOM.unmountComponentAtNode(document.getElementById('content')); // Kill Exist Cards
	    ReactDOM.render(<Spinner />, document.getElementById('spin')); // Render Spinner Before Load Data
	    fetch.fetch()
    },

    fetch: function(){

	   	if (DATA.subreddit) {
	        $.getJSON('http://www.reddit.com/r/' + DATA.subreddit + '/new.json?' + 'limit=' + DATA.limit, function(data) {
	        	DATA.res = data
	        	ReactDOM.unmountComponentAtNode(document.getElementById('spin'));
	        	fetch.after()
	       	}) // Fetch subreddit data
	       	.error(function() { alert("404: Cannot Found The Subreddit: " + DATA.subreddit); location.hash = ''}); // If error, redirect to homepage
	    } else {
	        $.getJSON('http://www.reddit.com/new.json?' + 'limit=' + DATA.limit, function(data) {
	            DATA.res = data
	            ReactDOM.unmountComponentAtNode(document.getElementById('spin'));
	            fetch.after()
	        })// If no subreddit given, fetch reddit homepage.	
	        .error(function() { alert("404: Cannot Connect To Reddit"); }); 
	  	}
    },

    after: function(){
    	render()
    }
}

// Render Cards
function render() {
    ReactDOM.render(<Main />, document.getElementById('content'));
}

// First time fetching
fetch.start()

// Fetch data again if subreddit change
window.onhashchange = fetch.start