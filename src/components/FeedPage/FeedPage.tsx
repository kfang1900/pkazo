import React from 'react';

import Logo from 'assets/logo.svg';

import Header from 'components/common/Header';
import { useNavigate } from 'react-router-dom';
import FeedPost from 'components/FeedPage/FeedPost'

import styles from 'styles/FeedPage/FeedPage.module.scss'

const FeedPage = () => {

    return (
        <div>
            <Header navigate={useNavigate()} />
            <div className = {styles['post-container']}>
                <FeedPost
                    imgs={["https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg",
                        "https://imagedesigncom.com/wp-content/uploads/2013/02/cool-nature-wallpapers-hd-1920x1200.jpg",
                        "https://trendsinusa.com/wp-content/uploads/2018/01/wallpaper.wiki-Amazing-views-cool-nature-photos-1920x1140-PIC-WPE0012823.jpg"]}
                    timestamp = {1642052147000}
                    title = "Post Title"
                    caption = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    likes = {3200} />
                <FeedPost
                    imgs={["https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg", Logo]}
                    timestamp = {1641052147000}
                    title = "Post Title"
                    caption = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    likes = {0}
                    sellPost = {true}
                    postType = "Photograph"
                    price = {1500000} />
            </div>
        </div>
    );
}

export default FeedPage;
