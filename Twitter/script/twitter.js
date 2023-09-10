import { tweets } from "../script/Tweet.js";
import { trendingTopics } from "./Trend.js";

let tweetDiv = document.querySelector(".tweet-list");

tweets.forEach(function (tweet) {
    let tweetHTML = `
        <div class="tweet-content">
            <img src="${tweet.image}" alt="User Avatar" class="user-avatar-left">
            <div class="tweet-text">
                <span class="user-name">${tweet.userName}</span>
                <span class="user-handle">${tweet.userHandle}</span>
                <p>${tweet.tweetText}</p>
            </div>
        </div>
        <div class="tweet-actions">
            <button class="like-button" data-count="0">Like <span class="count">0</span></button>
            <button class="retweet-button" data-count="0">Retweet <span class="count">0</span></button>
        </div>
    `;


    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = tweetHTML;

    tweetDiv.appendChild(tempDiv);

    const likeButton = tempDiv.querySelector(".like-button");
    const retweetButton = tempDiv.querySelector(".retweet-button");

    likeButton.addEventListener("click", function () {
        let likeCount = parseInt(likeButton.getAttribute("data-count"));
    
        if (!likeButton.classList.contains("liked")) {

            likeCount++;
            likeButton.setAttribute("data-count", likeCount);
            likeButton.classList.add("liked");
        } else {

            likeCount--;
            likeButton.setAttribute("data-count", likeCount);
            likeButton.classList.remove("liked");
        }
        likeButton.querySelector(".count").textContent = likeCount;
    });

    retweetButton.addEventListener("click", function () {
        let retweetCount = parseInt(retweetButton.getAttribute("data-count"));
      
        if (!retweetButton.classList.contains("retweeted")) {
            retweetCount++;

            retweetButton.setAttribute("data-count", retweetCount);
            retweetButton.classList.add("retweeted");
        } else {

            retweetCount--;
            retweetButton.setAttribute("data-count", retweetCount);
            retweetButton.classList.remove("retweeted");
        }
        retweetButton.querySelector(".count").textContent = retweetCount;
    });
});

let topicList = document.querySelector('.topic-list');

trendingTopics.forEach(function(topic) {
    let listItem = document.createElement('li');
    let link = document.createElement('a');
    link.href = "#";
    link.textContent = '#' + topic;
    listItem.appendChild(link);
    topicList.appendChild(listItem);
});