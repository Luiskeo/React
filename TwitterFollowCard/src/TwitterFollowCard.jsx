import { useState } from "react"

export function TwitterFollowCard ({ userName, children, inicialIsFollowing}){
    const [isFollowing, setIsFollowing] = useState(inicialIsFollowing)


    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing
    ? 'tw-followcard-button is-following'
    : 'tw-followcard-button'

    const handleclick = () => {
        setIsFollowing(!isFollowing)
    }

    return(
    <article className='tw-followcard'>
        <header className='tw-followcard-header'>
            <img
            className='tw-followcard-img' 
            alt="MiduAvatar" 
            src={`https://unavatar.io/${userName}`}/>
            <div className='tw-followcard-div'>
                <strong>{children}</strong>
                <span className='tw-followcard-username'>@{userName}</span>
            </div>
        </header>
        <aside>
            <button className={buttonClassName} onClick={handleclick}>
            <span className="tw-followcard-text">{text}</span>
            <span className="tw-followcard-stopFollow">Dejar de seguir</span>
            </button>
        </aside>
    </article>
    )
}

