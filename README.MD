<img src="assets/logo.png" width="150" alt="butteros logo">

# ButterOS

An interactive web opertating system running via html and css with cool apps and features!

## Test it on Slack
Go on the slack and visit `#bot-spam` and run any command!
## Quick Start
Simple quick start guide to help you setup the bot and get it running!

### Requirements
 - A hosting provider or a server to host the website, thats it!

### Prerequisites
A working server with static html/css/js support

## How it Works
 The bot uses socket mode which means it connects to Slack using a websocket. When a user sends a /command, it sends a request to the server side with the code where it processes and sends a response.
  - The bot uses the `profanease` library for the moderation to filter bad words when using the `/emoji-bot-convert` command.
  - The bot uses the `axios` library for web requests for the `/emoji-bot-cat-fact` command. 



## Apps
The WebOS currently features `2` app:
 - `Calculator` - Calculates stuff 
 - `SimplyEpic` - Google search but no ai and only searches academic sites (3 to be exact)

## Credits
  - Special thanks to [this](https://www.reddit.com/r/copypasta/comments/1cf5dg7/emoji_alphabet_emojis_that_look_like_or_contain/) reddit post for the Emoji substitution list
  - Special thanks to the [Profanease](https://www.npmjs.com/package/profanease) library for the moderation features 
  - HUGE thanks to [this github project](https://github.com/nploc1209/TeXpress/blob/main/README.md) for helping me what a good readme loos like

## Important Links
 - [Stardance project](https://stardance.hackclub.com/projects/61558)
## AI Usage
 - Little to no ai was used in this project. The only ai is the vs code autofill
# This bot was made for HackClub Stardance 2026
![Stardance logo](assets/stardance.avif)