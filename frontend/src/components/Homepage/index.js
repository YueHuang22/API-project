import React from "react";
import { NavLink } from "react-router-dom";
import './HomePage.css'

function HomePage() {

    return (
        <>
            <div className="homepage">
                <div className="center">
                    <div className='text-img'>
                        <div className="text">
                            <h1 className="h1">Celebrating 20 years of real connections on Meetup</h1>
                            <p className="p">Whatever you’re looking to do this year, Meetup can help. For 20 years, people have turned to Meetup to meet people, make friends, find support, grow a business, and explore their interests. Thousands of events are happening every day—join the fun.</p>
                        </div>

                        <div className="img">
                            <img alt=" a Meetup Online Event" srcSet="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640 1x, https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=1080 2x" src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=1080" decoding="async" data-nimg="intrinsic" ></img>
                        </div>
                    </div>

                    <div className="cardsection">
                        <div className="cards">
                            <img role="presentation" alt="" src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=384" decoding="async" data-nimg="intrinsic" srcSet="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=256 1x, https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=384 2x"></img>
                            <br></br>
                            <NavLink exact to="/groups" style={{ textDecoration: 'none', color: "#008294" }}>Join a group</NavLink>
                            <p className="cardtext">Do what you love, meet others who love it, find your community. The rest is history!</p>
                        </div>

                        <div className="cards">
                            <img role="presentation" alt="" src="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=384" decoding="async" data-nimg="intrinsic" srcSet="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=256 1x, https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=384 2x"></img>
                            <br></br>
                            <NavLink exact to="/events" style={{ textDecoration: 'none', color: "#008294" }}>Find an event</NavLink>
                            <p className="cardtext">Events are happening on just about any topic you can think of, from online gaming and photography to yoga and hiking.</p>
                        </div>

                        <div className="cards">
                            <img role="presentation" alt="" src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=384" decoding="async" data-nimg="intrinsic" srcSet="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=256 1x, https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=384 2x"></img>
                            <br></br>
                            <NavLink exact to="/groups/new" style={{ textDecoration: 'none', color: "#008294" }}>Start a group</NavLink>
                            <p className="cardtext">You don’t have to be an expert to gather people together and explore shared interests.</p>
                        </div>
                    </div>

                    <div className="join-button">
                        <NavLink exact to="/signup" className="buttontext" style={{ textDecoration: 'none', color: "white" }}>Join Meetup</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;