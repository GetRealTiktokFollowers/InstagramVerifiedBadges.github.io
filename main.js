/**
 * Landing Page Config
 */
var config = {
  recentActivityIntervalDuration: 5, // seconds
  recentActivities: [
    {
      avatarImageUrl: 'img/default-avatar.png', // or: avatarImageUrl: 'https://imgur.com/',
      username: 'Anonymous',
      time: 'few hours ago',
      instagramProfileUrl: 'https://instagram.com/username'
    },
    {
      avatarImageUrl: 'img/default-avatar.png',
      username: 'Anonymous',
      time: 'few minutes ago',
      instagramProfileUrl: 'https://instagram.com/username'
    },
    {
      avatarImageUrl: 'img/default-avatar.png',
      username: 'Anonymous',
      time: 'few minutes ago',
      instagramProfileUrl: 'https://instagram.com/username'
    },
    {
      avatarImageUrl: 'img/default-avatar.png',
      username: 'Anonymous',
      time: 'few seconds ago',
      instagramProfileUrl: 'https://instagram.com/username'
    },
    {
      avatarImageUrl: 'img/default-avatar.png',
      username: 'Anonymous',
      time: 'few seconds ago',
      instagramProfileUrl: 'https://instagram.com/username'
    },
    {
      avatarImageUrl: 'img/default-avatar.png',
      username: 'Anonymous',
      time: 'few seconds ago',
      instagramProfileUrl: 'https://instagram.com/username'
    },
    {
      avatarImageUrl: 'img/default-avatar.png',
      username: 'Anonymous',
      time: 'few seconds ago',
      instagramProfileUrl: 'https://instagram.com/username'
    },
    {
      avatarImageUrl: 'img/default-avatar.png',
      username: 'Anonymous',
      time: 'few seconds ago',
      instagramProfileUrl: 'https://instagram.com/username'
    },
    {
      avatarImageUrl: 'img/default-avatar.png',
      username: 'Anonymous',
      time: 'few seconds ago',
      instagramProfileUrl: 'https://instagram.com/username'
    },
    {
      avatarImageUrl: 'img/default-avatar.png',
      username: 'Anonymous',
      time: 'few seconds ago',
      instagramProfileUrl: 'https://instagram.com/username'
    },
    {
      avatarImageUrl: 'img/default-avatar.png',
      username: 'Anonymous',
      time: 'few seconds ago',
      instagramProfileUrl: 'https://instagram.com/username'
    },
    {
      avatarImageUrl: 'img/default-avatar.png',
      username: 'Anonymous',
      time: 'few seconds ago',
      instagramProfileUrl: 'https://instagram.com/username'
    },
    // add more recent activities here. Will be displayed last.
  ]
}

/**
 * Utility functions
 */
var util = {
  animate: function(element, animationName, callback) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(element).addClass('animated ' + animationName).one(animationEnd, function() {
      $(element).removeClass('animated ' + animationName);
      if (typeof callback === 'function') { callback() }
    })
  }
}

/**
 * App VM
 */
var app = {
  state: {
    username: undefined,
    displayingSection: 'badge-generator'
  },
  init: function() {
    util.animate('.badge-generator', 'fadeInDown');
    recentActivity.init();
  },
  displayFromTo: function(fromSection, toSection) {
    util.animate('.' + fromSection, 'fadeOutUp', function() {
      $('.' + fromSection).hide();
      $('.' + toSection).show();
      util.animate('.' + toSection, 'fadeInDown');
    })
    $('body').animate({ scrollTop: 0 }, "slow");
    app.state.displayingSection = toSection;
  }
}

/**
 * Badge Generator VM
 */
var badgeGenerator = {
  verifyInput: function(input) {
    if (input.length < 2) {
      alert("Please enter your Instagram Username and tap the 'Generate Badge' button.");
      return false;
    } else {
      return true;
    }
  }
};

/**
 * Badge Generator Events
 */
$('.badge-generator button').on('click', function() {
  var username = $('.badge-generator input').val();
  if(badgeGenerator.verifyInput(username)) {
    app.state.username = username;
    $('.badge-generator')
    app.displayFromTo('badge-generator','generating-badge');
    generatingBadge.initializeProgressBar();
  }
});

/**
 * Generating Badge VM
 */
var generatingBadge = {
  state: {
    progressBar: undefined
  },
  /**
   * Initializes the progress bar.
   */
  initializeProgressBar: function() {
    this.state.progressBar = new ProgressBar.Line('#progress-wrapper', {
      color: '#2C96EA',
      trailColor: '#ced5da',
      strokeWidth: 5
    });
    this.startProgressBarAnimation(); // todo remove
  },
  /**
   * Starts animating the progress bar.
   */
  startProgressBarAnimation: function() {
    this.state.progressBar.animate(1, {duration: 20000}, function() {
      app.displayFromTo('generating-badge','human-verification');
    });
    this.startProgressMessages();
  },
  /**
   * Sets custom progress bar messages as it animates.
   */
  startProgressMessages: function() {
    var progressMessages = [
      'Connected! Generating request for verification badge...',
      'Request successful, ready to add badge to account...',
    ];
    var progressMessageKey = 0;

    var progressMessageInterval = window.setInterval(function() {
      if (progressMessageKey !== 2) {
        $('.progress-message').text(progressMessages[progressMessageKey]);
        progressMessageKey++
      } else {
        window.clearInterval(progressMessageInterval);
      }
    }, 7000);
  }
}

var recentActivity = {
  state: {
    activities: config.recentActivities,
    interval: undefined
  },
  init: function() {
    var initialActivities = [
      this.state.activities[0],
      this.state.activities[1],
      this.state.activities[2],
      this.state.activities[3],
      this.state.activities[4],
      this.state.activities[5]
    ];
    for(i=0;i<6;i++) {
      var activityHtml = this.createHtml(initialActivities[i]);
      this.appendHtml(activityHtml);
    }
    this.state.activities.splice(0, 5);
    this.startInterval();
  },
  startInterval: function() {
    if (this.state.activities.length > 0) {
      this.state.interval = window.setInterval(function() {
        activityHtml = recentActivity.createHtml(recentActivity.state.activities[0]);
        recentActivity.appendHtml(activityHtml);
        $('.activities').animate({ scrollTop: 0 }, "slow");
      }, config.recentActivityIntervalDuration*1000);
    } else {

    }
  },
  createHtml: function(activity) {
    var activityHtml = "<a href='"+activity.instagramProfileUrl+"' target='blank'><div class='activity animated fadeInDown'><div class='activity-content'><img class='activity-avatar' src='"+activity.avatarImageUrl+"' /><p>"+activity.username+"</p><img class='activity-badge' src='img/badge.png' /></div><div class='activity-timestamp'><p>"+activity.time+"</p></div></div></a>";
    return activityHtml;
  },
  appendHtml: function(activityHtml) {
    $('.activities').prepend(activityHtml);
  }
}

app.init();