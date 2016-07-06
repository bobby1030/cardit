var React = require('react')
var moment = require('moment')
var CardImage = require('./CardImage.jsx')
var CardContent = require('./CardContent.jsx')
var noImage = require('../reddit.jpg')

var Card = React.createClass({

    render: function() {
        return (
            <div id="main">
              { this.props.data.map(function(arg) {
                
                    if (!arg.data.preview) {
                        var imgURL = noImage
                    } else {
                        var imgURL = arg.data.preview.images[0].source.url
                    }
                
                    var linkURL = arg.data.url
                    var title = arg.data.title
                    var postURL = 'https://www.reddit.com' + arg.data.permalink
                
                    moment.locale(navigator.language.toLowerCase())
                    var dateRelative = moment.unix(arg.data.created_utc).fromNow()
                    var dateAbsolute = moment.unix(arg.data.created_utc).format('lll')
                    // var date new Date(arg.data.created_utc).toTimeString()
                
                    return (
                        <div className="ui fluid card">
                          <CardImage imgURL={ imgURL } linkURL={ linkURL }/>
                          <CardContent title={ title } postURL={ postURL } dateRelative={ dateRelative } dateAbsolute={ dateAbsolute } />
                        </div>
                    )
                }) }
              <button className="ui fluid huge button" onClick={this.props.loadMore}>Give Me More!</button>
            </div>
        )
    },

    componentDidMount: function() {
        this.props.didMount()
    }
})


module.exports = Card;