import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import passportFacebook from "passport-facebook";
import userMod from "../models/user";

const GoogleStrategy = passportGoogle.Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

const FacebookStrategy = passportFacebook.Strategy;
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL;

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, cb) => {
        let user = await userMod.findOne({ email: profile.emails[0].value });
        if (user == null) {
            user = await userMod.create({ 
                firstName: profile.name.givenName, 
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                password: "12345"
            });
        }
        return cb(null, user);
    }
));

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID, 
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: FACEBOOK_CALLBACK_URL
    },
    (request, accessToken, refreshToken, profile, cb) => {
        // let user = await userMod.findOne({ email: profile.emails });
        console.log(profile);
        cb(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;
