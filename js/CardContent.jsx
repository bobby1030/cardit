var React = require('react')

var CardContent = React.createClass({

    render: function() {
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

module.exports = CardContent;