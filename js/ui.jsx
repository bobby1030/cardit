var Card = React.createClass({

    render: function() {

    	var content = this.props.json.map(function(arg){

    		var imgURL = arg.data.preview.images[0].source.url
    		var titleURL = arg.data.url
    		var title = arg.data.title
    		var date = new Date(arg.data.created_utc).toTimeString()

			return(
    			<div className="ui fluid card">
    				<a className="image" href={imgURL}>
          				<img src={imgURL} />
        			</a>
        			<div className="content">
          				<a className="header" href={titleURL}>{title}</a>
         	 			<div className="meta">
            				<span className="date">{date}</span>
          				</div>
       		 		</div>
        		</div>
        	)
    	})

        return (
        	<div>
        	{content}
        	</div>
        );
    }

});

var Spinner = React.createClass ({
	render: function() {

		return (
			<div className="spinner">
	        	<div className="double-bounce1" />
	        	<div className="double-bounce2" />
	      	</div>
      	)
	}
})

var DATA
var DATA_limit = 5

function fetch_data() {

	ReactDOM.render(<Spinner />, document.getElementById('spin')); // Render Spinner Before Load Data

	var subreddit = location.hash.replace(/\#/,'')
	if (subreddit) {
		$.getJSON('http://www.reddit.com/r/' + subreddit + '/new.json?' + 'limit=' + DATA_limit, function(data){
			DATA = data
			render()
			ReactDOM.unmountComponentAtNode(document.getElementById('spin'));
		}) // Fetch subreddit data
	}else{
		$.getJSON('http://www.reddit.com/new.json?' + 'limit=' + DATA_limit, function(data){
			DATA = data
			render()
			ReactDOM.unmountComponentAtNode(document.getElementById('spin'));
		})	// If no subreddit given, fetch reddit homepage.	
	}
}

function render() {
	ReactDOM.render(<Card json={DATA.data.children} />, document.getElementById('content'));
}

// Fetch data again if subreddit change
window.onhashchange = fetch_data

// First time fetching
fetch_data()