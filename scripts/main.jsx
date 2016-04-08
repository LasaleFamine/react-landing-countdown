/**
 * main.jsx
 *
 * react-landing-countdown
 * @author Alessio Occhipinti / @lasalefamine
 * @deps jQuery, MomentJs, Formsy-react (https://github.com/christianalfoni/formsy-react)
 * GitHub: https://github.com/LasaleFamine/react-landing-countdown
 *
 * All components in one file. 
 * I used a Scoop theme as layout: http://www.scoopthemes.com/ 
 */


moment.locale('it');

var MainContainer = React.createClass({
  render: function() {
    return (
      <div>
        <HeadContainer />
      </div>
    )
  }
});

var HeadContainer = React.createClass({
  render: function() {
    return (
      <div className="main-content">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <img src="images/logo.png" alt="Logo" />
            <h2 className="subtitle">We're working hard to launch our website and we'll be ready very soon</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <CountdownTimer />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <FormGetNotified />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 align-center">
            <ul className="social-network social-circle">
              <li><a href="#" className="icoFacebook" title="Facebook"><i className="fa fa-facebook" /></a>
              </li>
              <li><a href="#" className="icoTwitter" title="Twitter"><i className="fa fa-twitter" /></a>
              </li>
              <li><a href="#" className="icoGit" title="Github"><i className="fa fa-github" /></a>
              </li>
              <li><a href="#" className="icoLinkedin" title="Linkedin"><i className="fa fa-linkedin" /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
})


var FormGetNotified = React.createClass({
    getInitialState: function() {
        return {
            canSubmit: false
        };
    },
    enableButton: function(event) {
      this.setState({ canSubmit: true })
    },
    disableButton: function(event) {
      this.setState({ canSubmit: false })
    },
    submit: function(model) {
      // Submit form via jQuery/AJAX
      var data = {
        email: model.email
      };

      $.ajax({
        type: 'POST',
        url: '/some/url',
        data: data
      })
      .done(function(data) {
        alert("Sent");
      })
      .fail(function(jqXhr) {
        alert('failed to register');
      });
    },
    render: function() {
      return(
        <div>     
          <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-inline signup">
            <div className="form-group">
              <InputEmail name="email" validations="isEmail" validationError="This is not a valid email" required/>
            </div>
            <button type="submit" disabled={!this.state.canSubmit} className="btn btn-theme">Get Notified!</button>
          </Formsy.Form>
        </div>
      )

    }
});


var InputEmail = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function () {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;
    className = className + ' inputBox';

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <input className="form-control" type="email" onChange={this.changeValue} value={this.getValue()}/>
        <span className="help-block">{errorMessage}</span>
      </div>
    );
  }
});

var CountdownTimer = React.createClass({

  getInitialState: function() {
    return {
      secondsRemaining: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
    };
  },
  tick: function() {
    this.setState({
      secondsRemaining: this.state.secondsRemaining - 1,
      seconds: this.state.seconds - 1
    });
    
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
    }
    if(this.state.seconds <= 0) {
      this.setFormattedRes();
    }
  },
  componentDidMount: function() {
    this.setState({ secondsRemaining: this.getSecondsRemaining() });
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },


  getSecondsRemaining: function() {
    var dateNow = moment(),
        toDate = moment('2016-05-22');
    var diffSec = toDate.diff(dateNow, 'seconds');
    return diffSec;
  },
  setFormattedRes: function() {
    var seconds = this.state.secondsRemaining;
    var secFormatted = ((seconds % 86400) % 3600) % 60;
    var minFormatted = Math.floor(((seconds % 86400) % 3600) / 60);
    var daysFormatted = Math.floor(seconds / 86400);
    var hoursFormatted = Math.floor((seconds % 86400) / 3600);
    this.setState({
      seconds: secFormatted,
      minutes: minFormatted,
      hours: hoursFormatted,
      days: daysFormatted
    })
    /* TODO years */
  },

  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <h3 className="white-text bigEntrance">
              Giorni: {this.state.days}
            </h3>
          </div>
          <div className="col-md-3">
            <h3 className="white-text">
              Ore: {this.state.hours}
            </h3>
          </div>
          <div className="col-md-3">
            <h3 className="white-text">
              Minuti: {this.state.minutes}
            </h3>
          </div>
          <div className="col-md-3">
            <h3 className="white-text">
              Secondi formattati: {this.state.seconds}
            </h3>
          </div>
        </div>       
      </div>
    );
  }
});

ReactDOM.render(
  <MainContainer />, document.getElementById('content'));
