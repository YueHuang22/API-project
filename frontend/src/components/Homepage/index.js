import React from "react";
import { NavLink } from "react-router-dom";
import './HomePage.css'

function HomePage() {

    return (
        <div>
            <div className='middle'>
                <div className="h1p">
                    <h1 className="" data-testid="search-intro-title">Celebrating 20 years of real connections on Meetup</h1>
                    <p>Whatever you’re looking to do this year, Meetup can help. For 20 years, people have turned to Meetup to meet people, make friends, find support, grow a business, and explore their interests. Thousands of events are happening every day—join the fun.</p>
                </div>

                <div className="">
                    <span className='span1'>
                        <span className='span2'>
                            <img className='img1' alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27520%27%20height=%27232%27/%3e"></img>
                        </span>
                        <img className='img2' alt=" a Meetup Online Event" srcSet="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640 1x, https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=1080 2x" src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=1080" decoding="async" data-nimg="intrinsic" ></img>
                    </span>
                </div>
            </div>
            <div>
                <NavLink exact to="/groups">Join a group</NavLink>
                <br></br>
                <NavLink exact to="/events">Find an event</NavLink>
                <br></br>
                <NavLink exact to="/groups/new">Start a group</NavLink>
                <br></br>
                <NavLink exact to="/signup">Join meetup</NavLink>
            </div>
        </div >
    )
}

export default HomePage;