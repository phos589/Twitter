import { tweets } from "../script/Tweet.js";
import { trendingTopics } from "../script/Trend.js";

function displayTweets() {
    
const tweetList = document.querySelector('.tweet-list');
tweetList.innerHTML = '';

    tweets.forEach(function(tweet) {
        let tweetHTML = `
        <div class="tweet-section">
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
                <input type="file" id="comment-image-input" class="comment-image-input" style="display: none;">
                <label for="comment-image-input" class="image-upload-label input">Choose an image</label>
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
        //retweet not used  
        /*
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
            
        });*/
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

    searchInput.addEventListener("input", function () {
        const userInput = searchInput.value.trim().toLowerCase();

        if (userInput.length >= 3) {
            searchResults.style.display = "block";

            const maxUsers = 5;
            const maxTopics = 10;

            let usersHTML = "";
            let topicsHTML = "";
            let hasResults = false; 
            
            for (let i = 0; i < maxUsers && i < tweets.length; i++) {
                const userTweet = tweets[i].userName.toLowerCase();
                const userImage = tweets[i].image;
                const Handle = tweets[i].userHandle;


                if (userTweet.includes(userInput) || Handle.toLowerCase().includes(userInput)) {
                    const userResultHTML = `
                        <div>
                            <img src="${userImage}" alt="User Avatar" class="user-avatar-left profile-image">
                            <div class="tweet-text">
                                <span class="user-name">${tweets[i].userName}</span>
                                <span class="user-handle">${tweets[i].userHandle}</span>
                            </div>
                        </div>
                    `;
                    usersHTML += userResultHTML;
                    hasResults = true;

                }
            }

            const topicList = document.createElement('ul');
            topicList.classList.add('trending-topics-search');

            trendingTopics.slice(0, maxTopics).forEach(function (topic) {
                
                if (topic.toLowerCase().includes(userInput)) {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = "#";
                    link.textContent = '#' + topic;
                    listItem.appendChild(link);
                    topicList.appendChild(listItem);
                    hasResults = true;
                }
            });

            if (!hasResults) {
                searchResults.innerHTML = "<p>No results found.</p>";
            } else {
                topicsHTML += topicList.outerHTML;
                searchResults.innerHTML = usersHTML + topicsHTML;
            }

        } else {
            searchResults.style.display = "none"; 
        }
    });
});

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("comment-button")) {
        const commentButton = event.target;
        const tweetSection = commentButton.closest(".tweet-section");

        if (tweetSection) {
            const commentInput = tweetSection.querySelector(".comment-input");
            const commentImageInput = tweetSection.querySelector(".comment-image-input");

            if (commentInput) {

                const commentText = commentInput.value.trim();
                const commentImageFile = commentImageInput.files[0];

                if (commentText !== "") {
                    const comment = {
                        image: "image/Profile/1.jpg",
                        userName: "Guts",
                        userHandle: "@Guts455",
                        tweetimage: "", 
                        commentText: commentText
                    };

                    if (commentImageFile) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            comment.tweetimage = e.target.result; 
                            displayComment(comment, tweetSection); 
                            addCommentListStyle(tweetSection);
                        };
                        reader.readAsDataURL(commentImageFile);
                    } else {
                        displayComment(comment, tweetSection); 
                        addCommentListStyle(tweetSection);
                    }

                    commentInput.value = "";
                    commentImageInput.value = "";
                }
            }
        }
    }
});

function addCommentListStyle(tweetSection) {
    const commentsList = tweetSection.querySelector(".comments-list");
    if (commentsList) {
        commentsList.classList.add("comment-list-style");
    }
}


function displayComment(comment, tweetSection) {
    const commentsList = tweetSection.querySelector(".comments-list");

    if (commentsList) {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");

        commentElement.innerHTML = `
            <img src="${comment.image}" alt="User Avatar" class="user-avatar-left profile-image">
            <div class="tweet-text">
                <span class="user-name">${comment.userName}</span>
                <span class="user-handle">${comment.userHandle}</span>
                <p>${comment.commentText}</p>
            </div>
            <div class="tweet-image-container">
                ${comment.tweetimage ? `<img src="${comment.tweetimage}" alt="Tweet Image">` : ''}
            </div>
        `;

        commentsList.appendChild(commentElement);
    }
}



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
                tweets.unshift(newTweet);
                document.querySelector(".tweet-form textarea").value = "";
                document.querySelector("#image-upload").value = "";
                displayTweets(); 
            };
            reader.readAsDataURL(imageFile);
        } else {
            tweets.unshift(newTweet);
            document.querySelector(".tweet-form textarea").value = "";
            document.querySelector("#image-upload").value = "";
            displayTweets();
        }
    }
});

document.querySelector(".tweet-form textarea").value = "";
document.querySelector("#image-upload").value = "";

const suggestionDetails = document.querySelector(".suggestion-details");

for (let tweet of tweets) {

    const tweetElement = document.createElement("div");
    tweetElement.classList.add("tweet");

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