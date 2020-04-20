var sharpNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G","G#"]
var flatNotes = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G","Ab"]
//                0    1     2    3    4     5    6     7    8    9     10  11
var text = document.getElementById("userNote");
var answer = document.getElementById("answer");
var help = document.getElementById("helpText");
var selectedInterval;


document.getElementById("interval").addEventListener("change", display, false);
text.addEventListener("input", display, false);

function display() {
    selectedInterval = document.getElementById("interval");
    var inputText = text.value
    resetText()
    getAnswer()
}

function getAnswer(){
    var userNote = {pitch:"", pitchIdx:-1, flats:false, accidental:"", inputText:"", interval:-1}
    userNote.interval = parseInt(selectedInterval.value);
    userNote.inputText = text.value.substring(0, 2)
    userNote.pitch = userNote.inputText.substring(0, 1).toUpperCase();
    userNote.accidental = "";
    if (userNote.inputText.length > 1) {
        userNote.accidental= userNote.inputText.substring(1, 2).toLowerCase();
    }
    userNote.inputText = userNote.pitch + userNote.accidental
    
    if (checkUserNote(userNote)) {
        answer.innerHTML = getAnswerPitch(userNote)
    } else {
        answer.innerHTML = badInput(userNote)
    }
}

function getAnswerPitch(userNote){
    sharpsOrFlats(userNote);
    var ansPitch = "";
    if (userNote.flats) {
        if (userNote.pitchIdx + userNote.interval < flatNotes.length){
            ansPitch = flatNotes[userNote.interval + userNote.pitchIdx]
        } else{
            ansPitch = flatNotes[userNote.interval + userNote.pitchIdx - 12]
        }
    }
    else {
        if (userNote.pitchIdx + userNote.interval < sharpNotes.length){
            ansPitch = sharpNotes[userNote.interval + userNote.pitchIdx]
        } else{
            ansPitch = sharpNotes[userNote.interval + userNote.pitchIdx - 12]
        }
    } 

    if (text.value.length > userNote.inputText.length) {
        help.innerHTML = "It looks like you've written extra characters, so I'll just use the first two."
    }
    return ansPitch
}

function resetText(){
    help.innerHTML = "<br>"
    answer.innerHTML = ""
}

function badInput(userNote){
    if (userNote.inputText.length > 0) {
        help.innerHTML = 'Sorry, "' + text.value + '" is not a valid note.'
    }
    return "";
}

function checkUserNote(userNote){
    var validNote = false;
    for(let i = 0 ; i < flatNotes.length; i++) {
        if (userNote.inputText == flatNotes[i]){
            userNote.pitchIdx = i;
            validNote = true;
        } else if (userNote.inputText == sharpNotes[i]){
            userNote.pitchIdx = i;
            validNote = true;
        }
     }
    return validNote;
}

function sharpsOrFlats(userNote){
    var flatKeys = ["Bb", "C", "Db", "Eb","F", "Gb", "Ab"]
    var sharpKeys = ["A", "A#", "B", "C#", "D", "D#", "E", "F#", "G","G#"]
    for(let i = 0 ; i < flatKeys.length; i++) {
        if (userNote.inputText == flatKeys[i]){
            userNote.flats = true;
        }
    }    
}