var React = require('react')
var CardImage = require('./CardImage.jsx')
var CardContent = require('./CardContent.jsx')
var noImage = require('../reddit.jpg')

var Card = React.createClass({

    render: function() {
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

    componentDidMount: function() {
        this.props.didMount()
    }
})


module.exports = Card;