var React = require('react')

var CardImage = React.createClass({

    render: function() {
        return (<a className="image" href={ this.props.linkURL }><img src={ this.props.imgURL } />
                </a>)
    }

})

module.exports = CardImage;