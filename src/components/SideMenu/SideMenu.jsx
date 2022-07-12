import React from 'react';
import { Link } from 'react-router-dom';
import { BsMoonFill, BsSunFill, BsXLg } from "react-icons/bs";
import './sideMenu.scss';

const SideMenu = ({
    menuOpen,
    handleMenu,
    theme,
    handleTheme
}) => {

    return (
        <div className={`side-menu-container ${!menuOpen ? 'openMenu' : ''} ${theme ? 'lightMode':'darkMode'}`}>
            <div className='menu-header bottom-border'>
                <span onClick={handleMenu} className='exit-btn icon'>
                    <BsXLg />
                </span>
                <span onClick={handleTheme} className='icon'>
                    {theme ? <BsMoonFill /> : <BsSunFill /> }
                </span>
            </div>
            <div className='menu-nav'>
                <nav>
                    <ul>
                        <li><Link to='/coins' onClick={handleMenu}><h1>Coins</h1></Link></li>
                        <li><Link to='/news' onClick={handleMenu}><h1>News</h1></Link></li>
                        <li><Link to='/exchanges' onClick={handleMenu}><h1>Exchanges</h1></Link></li>
                        <li><Link to='/' onClick={handleMenu}><h1>NFT Builder</h1></Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default SideMenu