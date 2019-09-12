import React, { useState, useEffect } from 'react'
import GithubRepo from './GithubRepo';
import axios from 'axios'
import Infinite from 'react-infinite';

const Repos = (props) => {

    const [page, setPage] = useState(1);
    const [repos, setRepos] = useState([]);
    const [infiniteLoadBeginEdgeOffsetState, setInfinite] = useState(10);

    const fetchData = async () => {
        const result = await axios(
            `https://api.github.com/users/${props.match.params.username}/repos?page={page}&per_page=50`
        );

        if (result.data.length > 0) { // if we have more new items
            setRepos(repos.concat(result.data));
            setPage(page + 1);
        } else {
            setInfinite(undefined);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData, props.match.params.username]);


    // return !repos
    //     ? <div>LOADING REPOS...</div>
    //     : <div className="repos-page">
    //         <h2>{props.match.params.username}'s repos</h2>
    //         {repos.map(repo => <GithubRepo repo={repo} />)}
    //     </div>

    return (
        <div className="repos-page" >
            <div className="repos-header">
                <h2>{props.match.params.username}'s repos</h2>
            </div>
            {!repos ?
                <div className="repos-header">
                    <h2>Loading followers of {props.match.params.username}</h2>
                </div> : null}
            <Infinite className="repos-scroll" isInfiniteLoading={!repos} onInfiniteLoad={fetchData} useWindowAsScrollContainer={true} elementHeight={50} infiniteLoadBeginEdgeOffset={infiniteLoadBeginEdgeOffsetState} loadingSpinnerDelegate={<div className="loading-div"> <img src="https://media.giphy.com/media/3o7bu8sRnYpTOG1p8k/giphy.gif" alt="Loading" width="42" height="42" /> </div>} >
                {
                    repos.map(repo =>
                        <GithubRepo repo={repo} key={repo.id} />
                    )
                }
            </Infinite>
        </div>
    )

}

export default Repos;