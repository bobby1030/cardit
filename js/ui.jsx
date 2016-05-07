var Card = React.createClass({

    render: function() {

    	var content = this.props.json.map(function(arg){

		return(
    		<div className="ui fluid card">
    		<a className="image" href={arg.data.preview.images[0].source.url}>
          			<img src={arg.data.preview.images[0].source.url} />
        	</a>
        	<div className="content">
          		<a className="header" href={arg.data.url}>{arg.data.title}</a>
          		<div className="meta">
            		<span className="date">GIVE ME A DATE</span>
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

var DATA
var DATA_limit = 5

function fetch_data() {

	var subreddit = location.hash.replace(/\#/,'')
	if (subreddit) {
		$.getJSON('http://www.reddit.com/r/' + subreddit + '/new.json?' + 'limit=' + DATA_limit, function(data){
			DATA = data
			render()
		}) // Fetch subreddit data
	}else{
		$.getJSON('http://www.reddit.com/new.json?' + 'limit=' + DATA_limit, function(data){
			DATA = data
			render()
		})	// If no subreddit given, fetch reddit homepage.	
	}
}

// function parse_data() {
// 	DATA_rawjson.data.children.forEach(function(element){
// 		DATA.image.push(element.data.preview.images[0].source.url)
// 	})
// 	console.log(DATA.image)
// 	render()
//	
// }

function render() {
	ReactDOM.render(<Card json={DATA.data.children} />, document.getElementById('content'));
}

fetch_data()