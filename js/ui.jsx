// Define Components

var Card = React.createClass({

    render: function() {

    	var content = this.props.json.map(function(arg){

    		
    		if (!arg.data.preview) {
    			var imgURL = 'reddit.jpg'
    		} else {
    			var imgURL = arg.data.preview.images[0].source.url
    		}

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

// End Define Conponents


var DATA
var DATA_limit = 5

function fetch_data() {

	ReactDOM.unmountComponentAtNode(document.getElementById('content')); // Kill Exist Cards
	ReactDOM.render(<Spinner />, document.getElementById('spin')); // Render Spinner Before Load Data

	var subreddit = location.hash.replace(/\#/,'')

	$('#search_input').val(subreddit)

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

// Render Cards
function render() {
	ReactDOM.render(<Card json={DATA.data.children} />, document.getElementById('content'));
	
}

// First time fetching
fetch_data()

// Fetch data again if subreddit change
window.onhashchange = fetch_data

$('#search_input').keypress(function(e) {
    if(e.which == 13) {
        location.hash = '#' + $('#search_input').val()
    }
})

