import { BsArrowUp, BsTwitterX } from "react-icons/bs";
import { FaDiscord, FaTwitch, FaYoutube, FaYoutubeSquare } from "react-icons/fa";
import './Footer.scss';
import { TbRectangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { fetchData, urlFor } from "@/db/client";

type VIPData = {
  _id: string;
  pfp: any; 
  name: string;
  handle: string;
  link: string; 
}
export default async function Footer() {
	const vipData = await fetchData(`
		*[_type == 'vip']{
			_id,
			pfp,
			name,
			handle,
			link
		}
	`) as VIPData[]
	
	const People  = (link:string,pfp:string,name:string,handle:string) => {
		return (
			<a className="ppl" href={link} key={name}>
				<div className="pfp">
					<img src={pfp} alt="" />
				</div>
				<div className="detail">
					<p className="name">{name}</p>
					<p className="handle">{handle}</p>
				</div>
			</a>
		)
	}
	return (
		<>
			<div className="footer-decor">
				<img src="decor/header_l.png" alt="" className="l" />
				<img src="decor/header_r.png" alt=""  className="r"/>
			</div>
			<footer id="footer">
			<div className="container">
			<div className="footer-side">
					<img src="/decor/main_logo.png" alt="" className="logo" />
					<nav className="footer-nav">
							<div className="section left">
								<a href="#about">About </a>
								<a href="#schedules">Schedules </a>
								<a href="#setup">Setup </a>
							</div>
							<div className="section right">
								<a href="#showcase">Showcases</a>
								<a href="#artwork">Artworks</a>
								<a href="#socials">Socials</a>
							</div>
					</nav>
					<img src="decor/footer_decor_thingy.png" alt="" />
			</div>
			<div className="footer-content">
				<div className="footer-data">
						<p className="command">{'> View >>'} <b>footer</b>.bat</p>
						<p className="comments"> {'// Fetching credits ...'}</p>
						<p className="comments"> {'// Generating reports ...'}</p>

						<p className="about">{'>'} Some general text about anything from you</p>
						<div className="footer-socials">
							<a href="https://discord.gg/dpXAAuKgaG" target="_blank" rel="noreferrer" className="social">
								<FaDiscord/>
							</a>
							<a href="https://twitter.com/NikulasWraith" target="_blank" rel="noreferrer" className="social">
								<BsTwitterX/>
							</a>
							<a href="https://www.twitch.tv/nikulaswraith" target="_blank" rel="noreferrer" className="social">
								<FaTwitch/>
							</a>
							<a href="https://www.youtube.com/@nikulaswraith" target="_blank" rel="noreferrer" className="social">
								<FaYoutube/>
							</a>
							<a href="https://www.youtube.com/@nikulaswraithextra" target="_blank" rel="noreferrer" className="social">
								<FaYoutubeSquare/>
							</a>
							<a href="https://vstream.com/c/@Nikulas_Wraith" target="_blank" rel="noreferrer" className="social">
								<TbTriangleInvertedFilled/>
							</a>
							<a href="https://bsky.app/profile/nikulaswraith.bsky.social" target="_blank" rel="noreferrer" className="social">
								<TbRectangleFilled/>
							</a>
						</div>
						<a href="#top" className="top-button"><BsArrowUp/> Back to the top <BsArrowUp/></a>
						<a href="https://www.youtube.com/@minrxa" target="_blank" className="special-credit"><img src="decor/minrxa.png" alt="" /></a>
				</div>
				<div className="people">
					<div className="credits">
							<div className="head">
									<h2> {'>>'} Credits</h2>
							</div>
							<div className="list">
								<a className="credit" href="#" >
									<p className="role">{'>'} Website Design</p>
									<p className="handle">@their_handle</p>
								</a>
								<a className="credit" href="#" >
									<p className="role">{'>'} Website Design</p>
									<p className="handle">@their_handle</p>
								</a>
								<a className="credit" href="#" >
									<p className="role">{'>'} Website Design</p>
									<p className="handle">@their_handle</p>
								</a>
								<a className="credit" href="#" >
									<p className="role">{'>'} Website Design</p>
									<p className="handle">@their_handle</p>
								</a>
								<a className="credit" href="#" >
									<p className="role">{'>'} Website Design</p>
									<p className="handle">@their_handle</p>
								</a>
							</div>
					</div>
					<div className="vip">
							<div className="head">
							<h2> {'>>'} VIP</h2>
							</div>
							<div className="list">
								{vipData.map((vip)=> People(vip.link,urlFor(vip.pfp).url(),vip.name,vip.handle))}
{/* 								
								<a className="ppl" href="#" >
									<div className="pfp">
										<img src="" alt="" />
									</div>
									<div className="detail">
										<p className="name">Person name</p>
										<p className="handle">@their_handle</p>
									</div>
								</a>
								<a className="ppl" href="#" >
									<div className="pfp">
										<img src="" alt="" />
									</div>
									<div className="detail">
										<p className="name">Person name</p>
										<p className="handle">@their_handle</p>
									</div>
								</a>
								<a className="ppl" href="#" >
									<div className="pfp">
										<img src="" alt="" />
									</div>
									<div className="detail">
										<p className="name">Person name</p>
										<p className="handle">@their_handle</p>
									</div>
								</a>
								<a className="ppl" href="#" >
									<div className="pfp">
										<img src="" alt="" />
									</div>
									<div className="detail">
										<p className="name">Person name</p>
										<p className="handle">@their_handle</p>
									</div>
								</a>
								 */}
							</div>
					</div>
				</div>
			</div>
			</div>
		</footer>
		</>
	)
}