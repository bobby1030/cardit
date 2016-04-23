var Card = React.createClass({

    render: function() {
        return (
            <div className="ui fluid card">
        		<a className="image" href={this.props.image}>
          			<img src={this.props.image} />
        		</a>
        		<div className="content">
          			<a className="header" href={this.props.post}>I'm A Title</a>
          			<div className="meta">
            			<span className="date">Give Me A Date</span>
          			</div>
        		</div>
        		<a href={this.props.image} download>
          			<div className="ui bottom attached button">
            			<i className="download icon" /> Download
          			</div>
        		</a>
      		</div>
        );
    }

});

ReactDOM.render(<Card image="http://fakeimg.pl/1280x720" post="http://fakeimg.pl/1280x720"/>, document.getElementById('content'));
