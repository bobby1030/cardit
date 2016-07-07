var React = require('react')
var $ = require('jquery')
require('./lib/jquery.transit.min.js')

var Menu = React.createClass({

    handleSubmit: function(event) {
        event.preventDefault()
        this.props.onSubmit(this.state.subreddit, this.state.limit)
    },

    handleSubredditChange: function(event) {
        this.setState({
            subreddit: event.target.value.trim()
        })
    },

    handleLimitChange: function(event) {
        this.setState({
            limit: event.target.value.trim()
        })
    },

    getInitialState: function() {
        return ({
            subreddit: this.props.subreddit,
            limit: this.props.limit
        })
    },

    render: function() {
        return (
            <nav>
              <div className="ui three item blue inverted tiny stackable fixed menu">
                <a href="/" className="header item">Cardit</a>
                <div className="item">
                  <form onSubmit={ this.handleSubmit }>
                    <div className="ui left icon input">
                      <input name="subreddit" placeholder="Goto" type="text" value={ this.state.subreddit } onChange={ this.handleSubredditChange } />
                      <i className="reddit square inverted circular icon"></i>
                    </div>
                  </form>
                  <form onSubmit={ this.handleSubmit }>
                    <div className="ui left icon input">
                      <input name="limit" placeholder="Cards" type="text" value={ this.state.limit } onChange={ this.handleLimitChange } />
                      <i className="filter inverted circular icon"></i>
                    </div>
                  </form>
                </div>
                <a href="https://github.com/bobby1030/cardit" className="ui item mobile-hide">
                  <i className="github icon"></i> GitHub Repo
                </a>
              </div>
            </nav>
        )
    },

    componentDidMount: function() {
        var didScroll;
        var lastScrollTop = 0;
        var delta = 250;
        var navbarHeight = $('nav').outerHeight();

        $(window).scroll(function(event) {
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);

        function hasScrolled() {
            var st = $(this).scrollTop();

            // Make sure they scroll more than delta
            if (Math.abs(lastScrollTop - st) <= delta)
                return;

            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHeight) {
                // Scroll Down
                $('nav > div').transition({
                    y: '-10em'
                })
            } else if (st + $(window).height() < $(document).height()) {
                // Scroll Up
                $('nav > div').transition({
                    y: 0
                });
            }


            lastScrollTop = st;
        }
    }
})

module.exports = Menu;