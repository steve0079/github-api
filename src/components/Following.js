import React, { useState, useEffect } from 'react'
import GithubUser from './GithubUser';
import axios from 'axios'
import Infinite from 'react-infinite';

const Following = (props) => {

    const [page, setPage] = useState(1);
    const [following, setFollowing] = useState([]);
    const [infiniteLoadBeginEdgeOffsetState, setInfinite] = useState(10);

    const fetchData = async () => {
        const result = await axios(
            `https://api.github.com/users/${props.match.params.username}/following?page={page}&per_page=50`
        );

        if (result.data.length > 0) { // if we have more new items
            setFollowing(following.concat(result.data));
            setPage(page + 1);
        } else {
            setInfinite(undefined);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData, props.match.params.username]);


    // return !following
    //     ? <div>LOADING FOLLOWING...</div>
    //     : <div className="following-page">
    //         <h2>Followed by {props.match.params.username}</h2>
    //         {/* <ul> */}
    //             {following.map(user => <GithubUser user={user}/>)}
    //         {/* </ul> */}
    //     </div>

    return (
        <div className="following-page" >
            <div className="following-header">
                <h2>{props.match.params.username} is following</h2>
            </div>
            {!following ?
                <div className="following-header">
                    <h2>Loading who {props.match.params.username} is following</h2>
                </div> : null}
            <Infinite className="following-scroll" 
                isInfiniteLoading={!following} 
                onInfiniteLoad={fetchData} 
                useWindowAsScrollContainer={true} 
                elementHeight={50} 
                infiniteLoadBeginEdgeOffset={infiniteLoadBeginEdgeOffsetState} 
                loadingSpinnerDelegate={<div className="loading-div"> 
                <img 
                    src="https://media.giphy.com/media/3o7bu8sRnYpTOG1p8k/giphy.gif" 
                    alt="Loading" 
                    width="42" 
                    height="42" /></div>} >
                {
                    following.map(user =>
                        <GithubUser user={user} key={user.id} />
                    )
                }
            </Infinite>
        </div>
    )

}

export default Following;