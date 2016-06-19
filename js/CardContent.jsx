var React = require('react')

var CardContent = React.createClass({

    render: function() {
        return (<div className="content">
                  <a className="header" href={ this.props.postURL }>
                    { this.props.title }
                  </a>
                  <div className="meta">
                    <span className="date" title={ this.props.dateAbsolute }>{ this.props.dateRelative }</span>
                  </div>
                </div>)
    }
})

module.exports = CardContent;