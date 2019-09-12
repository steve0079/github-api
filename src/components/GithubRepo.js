import React from 'react'

const GithubRepo = ({ repo }) => {
    return (
        <div className="repo-div">
            <a href={`${repo.html_url}`}>
            <span>{repo.html_url}</span>
            </a>
            {repo.stargazers_count}
            <img src="https://i.imgur.com/g0gbFkV.png" alt="stars" className="repo-star"/>
        </div>
    );
}

export default GithubRepo;