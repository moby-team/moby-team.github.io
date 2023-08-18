// what exactly are we doing here?
// we need to convert the user's speech to text so that the
// reader knows when to start it's lines

// user to scan document or take a picture (file upload page doc parsing)
// document ai to parse the document
    // use the workbench to break up the document into parts that make sense to the user
    // use ChatGPT to break up into meaningful objects (char, lines)
// user has to clearly define which character they are reading for
    // edge case - there may be more than 2 chars
// text to speech will be creating audio file(s) as user is progressing thru steps
    // backend will give each char a voice (male/female - we can review options)
    // ML tech will read for the other char(s)
// button or verbal command to indicate start
    // edge case - user or AI starts first depending on script
// speech to text for streaming audio from microphone
    // ML/AI needs to listen for key prompts/words on when to come in
// AI to know when end of scanned document is reached
// finish

// KEY POINTS
// do not need to record the lines at all
// app just needs to be able to process and recognize the lines
// reader should start next line at the right time

// user gets to page
// pass down who the user is going to be reading for
// if script starts with AI (if first block of text char name !== char name that user chose)
    // may need to map through list of characters if there are more than 1 other chars aside from user
    // start first block of script using tts
// else 
    // start listening for user to speak using stt
    // possibly compare transcript with respective block of script in case of improv?
// when user finishes their part (transcript == block of script)
    // AI continues script part using tts
// recursive until end of script
