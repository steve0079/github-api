import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Infinite from 'react-infinite';
import GithubUser from './GithubUser';

const Followers = (props) => {

    const [page, setPage] = useState(1);
    const [followers, setFollowers] = useState([]);
    const [infiniteLoadBeginEdgeOffsetState, setInfinite] = useState(10);

    const fetchData = async () => {
        const result = await axios(
            `https://api.github.com/users/${props.match.params.username}/followers?page={page}&per_page=50`
        );

        if (result.data.length > 0) {
            setFollowers(followers.concat(result.data))
            setPage(page + 1)
        } else {
            setInfinite(undefined);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData, props.match.params.username]);

    // return !followers
    //     ? <div>LOADING FOLLOWERS...</div>
    //     : <div className="followers-page">
    //         <h2>Followers of {props.match.params.username}</h2>
    //         {followers.map(user => <GithubUser user={user} />)}
    //     </div>

    return (
        <div className="followers-page">
            <div className="followers-header">
                <h2>Followers of {props.match.params.username}</h2>
            </div>
            {!followers ?
                <div className="followers-header">
                    <h2>Loading Followers of {props.match.params.username}</h2>
                </div> : null}
            <Infinite className="followers-scroll"
                isInfiniteLoading={!followers}
                onInfiniteLoad={fetchData}
                useWindowAsScrollContainer={true}
                elementHeight={50}
                infiniteLoadBeginEdgeOffset={infiniteLoadBeginEdgeOffsetState}
                loadingSpinnerDelegate={<div
                    className="loading-div">
                    <img src="https://media.giphy.com/media/3o7bu8sRnYpTOG1p8k/giphy.gif"
                        alt="Loading"
                        width="42"
                        height="42" /> </div>} >
                {
                    followers.map(user => <GithubUser user={user} key={user.id}/>)
                }
            </Infinite>
        </div>
    )
};

export default Followers;