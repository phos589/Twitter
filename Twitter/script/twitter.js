import { tweets } from "../script/Tweet.js";
import { trendingTopics } from "./Trend.js";

function displayTweets() {
    
const tweetList = document.querySelector('.tweet-list');
tweetList.innerHTML = '';

    tweets.forEach(function(tweet) {
        let tweetHTML = `
            <div class="tweet-content">
                <img src="${tweet.image}" alt="User Avatar" class="user-avatar-left profile-image">
                <div class="tweet-text">
                    <span class="user-name">${tweet.userName}</span>
                    <span class="user-handle">${tweet.userHandle}</span>
                    <p>${tweet.tweetText}</p>
                </div>
                <div class="tweet-image-container">
                ${tweet.tweetimage ? `<img src="${tweet.tweetimage}" alt="Tweet Image">` : ''}
            </div>
        </div>
            <div class="tweet-comments">
                <textarea class="comment-input" placeholder="Add a comment"></textarea>
            </div>
            <div class="tweet-actions">
                <button class="comment-button">Comment</button>
                <button class="like-button" data-count="0">Like <span class="count">0</span></button>
                <button class="retweet-button" data-count="0">Retweet <span class="count">0</span></button>

                <div class="comments-list"></div>
            </div>
            
        `;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = tweetHTML;

        tweetList.appendChild(tempDiv);

        const likeButton = tempDiv.querySelector(".like-button");
        const retweetButton = tempDiv.querySelector(".retweet-button");

        likeButton.addEventListener("click", function() {
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

        retweetButton.addEventListener("click", function() {
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

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = tweetHTML;
    
            tweetList.appendChild(tempDiv);
    
            const commentButton = tempDiv.querySelector(".comment-button");
            const commentsList = tempDiv.querySelector(".comments-list");
    
            commentButton.addEventListener("click", () => {
                const commentInput = tempDiv.querySelector(".comment-input");
                const commentText = commentInput.value;
    
                if (commentText.trim() !== '') {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.innerHTML = `
                        <div class="comment-user-info">
                            <img src="image/userProfile/1.jpg" alt="User Avatar" class="comment-user-avatar">
                            <div class="comment-user-details">
                                <span class="comment-user-name">Guts</span>
                                <span class="comment-user-handle">@Guts142</span>
                            </div>
                        </div>
                        <p class="comment-text">${commentText}</p>
                    `;
    
                    commentsList.appendChild(commentElement);
                    commentInput.value = '';
                }
            });
    
        });
    });
}

let topicList = document.querySelector('.topic-list');

trendingTopics.forEach(function(topic) {
    let listItem = document.createElement('li');
    let link = document.createElement('a');
    link.href = "#";
    link.textContent = '#' + topic;
    listItem.appendChild(link);
    topicList.appendChild(listItem);
});
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const searchResults = document.getElementById("searchResults");

    searchButton.addEventListener("click", function (event) {
        event.stopPropagation(); 
        searchResults.style.display = "block";

        const sampleResultsHTML = `
            <div>John Doe</div>
            <div>Jane Smith</div>
            <div>Trending Topic 1</div>
            <div>Trending Topic 2</div>
            <div>Trending Topic 3</div>
        `;

        searchResults.innerHTML = sampleResultsHTML;
    });

    searchInput.addEventListener("click", function (event) {
        event.stopPropagation();
    });
});


document.getElementById("tweet-button").addEventListener("click", function () {

const tweetText = document.querySelector(".tweet-form textarea").value;
const imageFile = document.querySelector("#image-upload").files[0];


if (tweetText.trim() !== "") {

    const newTweet = {
        image: "image/Profile/1.jpg",
        userName: "Guts",
        userHandle: "@Guts455",
        tweetText: tweetText,
        tweetimage: "",
    };
    
if (imageFile) {
    
    const reader = new FileReader();
    reader.onload = function (e) {
        newTweet.tweetimage = e.target.result; 
        tweets.push(newTweet);
        document.querySelector(".tweet-form textarea").value = "";
        displayTweets();
    };
    reader.readAsDataURL(imageFile);
} else {

    tweets.push(newTweet);
    document.querySelector(".tweet-form textarea").value = "";
    displayTweets();
}

document.querySelector(".tweet-form textarea").value = "";
document.querySelector("#image-upload").value = "";

displayTweets();
    }
});

const suggestionDetails = document.querySelector(".suggestion-details");

// Loop through the tweets array and generate HTML for each tweet
for (let tweet of tweets) {
    // Create a new tweet element
    const tweetElement = document.createElement("div");
    tweetElement.classList.add("tweet");

    // Generate the HTML for the tweet and append it to the suggestion-details
    tweetElement.innerHTML = `
        <img src="${tweet.image}" alt="User Avatar" class="profile-image">
        <div class="tweet-details">
            <span class="user-name">${tweet.userName}</span>
            <span class="user-handle">${tweet.userHandle}</span>
        </div>
    `;

    suggestionDetails.appendChild(tweetElement);
}

displayTweets();