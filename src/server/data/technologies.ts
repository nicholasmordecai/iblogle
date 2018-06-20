export default class Technologies {
    public static get list() {
        return shuffle([
            // dev ops
            { title: 'Digital Ocean', filters: 'dev-ops', href: '/', imgSmall: '/img/tech/digital-ocean.png' },
            { title: 'Amazon AWS', filters: 'dev-ops', href: '/', imgSmall: '/img/tech/aws.png' },
            { title: 'Centos 6/7', filters: 'dev-ops', href: '/', imgSmall: '/img/tech/centos.png' },
            { title: 'Ubuntu >= 10.04', filters: 'dev-ops', href: '/', imgSmall: '/img/tech/ubuntu.png' },
            { title: 'CircleCI', filters: 'dev-ops', href: '/', imgSmall: '/img/tech/circleci.png' },
            { title: 'Travis', filters: 'dev-ops', href: '/', imgSmall: '/img/tech/travis.png' },
            { title: 'Jenkins', filters: 'dev-ops', href: '/', imgSmall: '/img/tech/jenkins.png' },
            { title: 'DataDog', filters: 'dev-ops', href: '/', imgSmall: '/img/tech/datadog.png' },
            { title: 'Sentry.io', filters: 'dev-ops', href: '/', imgSmall: '/img/tech/sentry.png' },
            { title: 'Postman', filters: 'dev-ops', href: '/', imgSmall: '/img/tech/postman.png' },
            { title: 'Insomnia', filters: 'dev-ops', href: '/', imgSmall: '/img/tech/insomnia.jpg' },
            { title: 'Git', filters: 'dev-ops', href: '/', imgSmall: '/img/tech/git.png' },

            //apis
            { title: 'Twilio', filters: 'apis', href: '/', imgSmall: '/img/tech/twilio.png' },
            { title: 'SendInBlue', filters: 'apis', href: '/', imgSmall: '/img/tech/sendinblue.png' },
            { title: 'Gmail', filters: 'apis', href: '/', imgSmall: '/img/tech/gmail.png' },
            { title: 'Slack', filters: 'apis', href: '/', imgSmall: '/img/tech/slack.png' },
            { title: 'Whatsapp', filters: 'apis', href: '/', imgSmall: '/img/tech/whatsapp.png' },
            { title: 'Facebook Graph', filters: 'apis', href: '/', imgSmall: '/img/tech/facebook.png' },
            { title: 'Auth Rocket', filters: 'apis', href: '/', imgSmall: '/img/tech/authrocket.png' },
            { title: 'Elastic Search', filters: 'apis', href: '/', imgSmall: '/img/tech/elastic.png' },
            { title: 'Shopify', filters: 'apis', href: '/', imgSmall: '/img/tech/shopify.png' },
            { title: 'Cahrgebee', filters: 'apis', href: '/', imgSmall: '/img/tech/chargebee.png' },
            { title: 'PayPal', filters: 'apis', href: '/', imgSmall: '/img/tech/paypal.png' },
            { title: 'WorldPay', filters: 'apis', href: '/', imgSmall: '/img/tech/worldpay.jpg' },

            // frameworks / libraries
            { title: 'Angular 2', filters: 'libs', href: '/', imgSmall: '/img/tech/angular.png' },
            { title: 'Wordpress', filters: 'libs server-side', href: '/', imgSmall: '/img/tech/wordpress.jpg' },
            { title: 'Pixi.js', filters: 'libs', href: '/', imgSmall: '/img/tech/pixijs.png' },
            { title: 'Phaser.io', filters: 'libs', href: '/', imgSmall: '/img/tech/phaser.png' },
            { title: 'Chart.js', filters: 'libs', href: '/', imgSmall: '/img/tech/chartjs.jpg' },
            { title: 'D3.js', filters: 'libs', href: '/', imgSmall: '/img/tech/d3.png' },
            { title: 'Google Maps', filters: 'libs apis', href: '/', imgSmall: '/img/tech/gmaps.png' },
            { title: 'leaflet', filters: 'libs apis', href: '/', imgSmall: '/img/tech/leaflet.png' },
            { title: 'GeoHex', filters: 'libs', href: '/', imgSmall: '/img/tech/geohex.png' },
            { title: 'JQuery', filters: 'libs', href: '/', imgSmall: '/img/tech/jquery.png' },
            { title: 'Bootstrap 2/3/4', filters: 'libs', href: '/', imgSmall: '/img/tech/bootstrap.jpg' },
            { title: 'Cordova', filters: 'libs', href: '/', imgSmall: '/img/tech/cordova.png' },

            // Server Side
            { title: 'NodeJS', filters: 'server-side', href: '/', imgSmall: '/img/tech/nodejs.png' },
            { title: 'PM2', filters: 'server-side', href: '/', imgSmall: '/img/tech/pm2.png' },
            { title: 'BCrypt / Script', filters: 'server-side', href: '/', imgSmall: '/img/tech/crypto.png' },
            { title: 'Handlebars', filters: 'server-side', href: '/', imgSmall: '/img/tech/handlebars.png' },
            { title: 'Karma', filters: 'server-side', href: '/', imgSmall: '/img/tech/karma.png' },
            { title: 'Mocha', filters: 'server-side', href: '/', imgSmall: '/img/tech/mocha.png' },
            { title: 'Chai', filters: 'server-side', href: '/', imgSmall: '/img/tech/chai.png' },
            { title: 'Istanbul', filters: 'server-side', href: '/', imgSmall: '/img/tech/coverage.png' },
            { title: 'Auto Generating Docs', filters: 'server-side', href: '/', imgSmall: '/img/tech/docs.png' },
            { title: 'OAuth2', filters: 'server-side', href: '/', imgSmall: '/img/tech/oauth.jpg' },
            { title: 'JSON Web Tokens', filters: 'server-side', href: '/', imgSmall: '/img/tech/jwt.png' },
            { title: 'Gulp', filters: 'server-side', href: '/', imgSmall: '/img/tech/gulp.png' },
            { title: 'Webpack', filters: 'server-side', href: '/', imgSmall: '/img/tech/webpack.png' },
            //{ title: '', filters: 'server-side', href: '/', imgSmall: '/img/tech/' },
            
        ]);
    }
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}