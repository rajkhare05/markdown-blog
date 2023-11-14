import facebook from "../assets/facebook_icon.png"
import instagram from "../assets/instagram_icon.png"
import linkedin from "../assets/linkedin_icon.png"
import twitter from "../assets/twitter_icon.png"
import "../styles/footer.css"

function Footer() {
    return (
        <footer>
            <hr />
            <div className = "networks-and-links">
                <div id="social-networks">
                    <img src={facebook} alt="facebook icon" />
                    <img src={twitter} alt="twitter icon" />
                    <img src={linkedin} alt="linkedin icon" />
                    <img src={instagram} alt="instagram icon" />
                </div>
                <div id="site-links">
                    <div id="site-links-row1">
                        <a className="site-link-tab">About</a>
                        <a className="site-link-tab">Career</a>
                        <a className="site-link-tab">Pricing</a>
                        <a className="site-link-tab">Terms & Conditions</a>
                        <a className="site-link-tab">Privacy Policy</a>
                    </div>
                    <div id="site-links-row2">
                        <a className="site-link-tab">RSS Feed</a>
                        <a className="site-link-tab">Get a quote</a>
                        <a className="site-link-tab">Contact Us</a>
                    </div>
                </div>
             </div>
        </footer>
    )
}

export default Footer
