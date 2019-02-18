# Castclient

This is a no-frills web application for playing back lists of audio files. I built it because I could not find a basic playback utility which would allow me to use Google Chromecast to broadcast music to 3 different rooms in my apartment. I just wanted a simple utility to playback a list of audio files. Most of what is available is oriented toward video playback, so audio playback is an afterthought. These utilities were often complicated to use and had a lot of overhead due to reading album art and what not. (One had troubles handling lists of more than ten files.)

A demo is available [here](https://castclient-234cf.firebaseapp.com/). 
 
**Features**
 1. Files may be uploaded using the upload button or dragging and dropping files onto the page
 2. Next/Previous buttons for moving through the list or click on an item to start playing it immediately
 3. Volume control
 4. Looping button
 5. Shuffle button
 6. Play order may be changed by dragging and dropping within the list

**Trouble-shooting:**
- If files don't play or only the first file plays, make sure that you do not have 'autoplay' disabled in your browser.

**Tech stuff:**
- Angular 7, Typescript, Html, Css, Scss
- Developed using the Angular CLI in Visual Studio Code 
