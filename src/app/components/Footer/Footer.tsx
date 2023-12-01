import { BsArrowUp } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";

export default function Footer() {
	return (
		<footer>
			<div className="footer-side">
					<img src="/decor/main_logo.png" alt="" />
					<nav className="footer-nav">
							<div className="left">
								<a href="#about">About </a>
								<a href="#schedules">Schedules </a>
								<a href="#setup">Setup </a>
							</div>
							<div className="right">
								<a href="#showcases">Showcases</a>
								<a href="#showcases">Artworks</a>
								<a href="#showcases">Socials</a>
							</div>
					</nav>
					<img src="decor/connect-footer.png" alt="" className="decor_footer" />
			</div>
			<div className="footer-content">
				<div className="footer-data">
						<p className="command">{'> View >>'} <b>footer</b>.bat</p>
						<p className="comments"> {'// Fetching credits ...'}</p>
						<p className="comments"> {'// Generating reports ...'}</p>

						<p className="about">{'>'} Some general text about anything from you</p>
						<div className="footer-socials">
							<a href="https://github.com/NikulasWraith" target="_blank" rel="noreferrer" className="social">
								<FaDiscord/>
							</a>
							<a href="https://github.com/NikulasWraith" target="_blank" rel="noreferrer" className="social">
								<FaDiscord/>
							</a>
							<a href="https://github.com/NikulasWraith" target="_blank" rel="noreferrer" className="social">
								<FaDiscord/>
							</a>
							<a href="https://github.com/NikulasWraith" target="_blank" rel="noreferrer" className="social">
								<FaDiscord/>
							</a>
							<a href="https://github.com/NikulasWraith" target="_blank" rel="noreferrer" className="social">
								<FaDiscord/>
							</a>
							<a href="https://github.com/NikulasWraith" target="_blank" rel="noreferrer" className="social">
								<FaDiscord/>
							</a>
							<a href="https://github.com/NikulasWraith" target="_blank" rel="noreferrer" className="social">
								<FaDiscord/>
							</a>
						</div>
						<button><BsArrowUp/> Back to the top <BsArrowUp/></button>
				</div>
				<div className="people">
					<div className="credits">

					</div>
					<div className="vip">
						
					</div>
				</div>
			</div>
		</footer>
	)
}