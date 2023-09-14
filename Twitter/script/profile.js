import { tweets,userProfile } from "../script/Tweet.js";
import { trendingTopics } from "../script/Trend.js";

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

  function populateProfile() {
    const profilePicture = document.querySelector(".profile-image-user");
    const profileName = document.querySelector(".profile-name");
    const profileHandle = document.querySelector(".profile-handle");
    const profileBio = document.querySelector(".profile-bio");
    const profileBanner = document.querySelector(".profile-banner");
  
    if (profilePicture) {
      profilePicture.src = userProfile[0].image;
      profilePicture.alt = "Profile Picture";
    }
  
    if (profileName) {
      profileName.textContent = userProfile[0].userName;
    }
  
    if (profileHandle) {
      profileHandle.textContent = userProfile[0].userHandle;
    }
  
    if (profileBio) {
      profileBio.textContent = userProfile[0].profileBio;
    }
  }

  populateProfile();