import React from 'react'
import { Link } from 'react-router-dom';


const GithubUser = ({ user }) => {
    return (
        <div className="user-info">
            <Link to={`/user/${user.login}`}>
                <img className="user-info__avatar" src={user.avatar_url} alt="Avatar" />
                <span className="user-info__text">{user.login}</span>
            </Link>
        </div>
    );
}

export default GithubUser;