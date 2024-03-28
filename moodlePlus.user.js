// ==UserScript==
// @name         moodlePlus
// @namespace    https://violentmonkey.github.io/
// @version      0.1
// @description  Solving moodle tests
// @author       Mental Gravis
// @match        https://elearning.uni-obuda.hu/kmooc/mod/quiz/attempt.php*
// @match        https://elearning.uni-obuda.hu/kmooc/course/view.php*
// @run-at       document-end
// @icon         https://yt3.googleusercontent.com/ytc/AIf8zZSOeyqxYvSBMIUH8oGQLBrFv70jTTdF5qaTh_UUtg=s900-c-k-c0x00ffffff-no-rj
// @require      https://code.jquery.com/jquery-3.6.4.min.js#sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=
// @require      https://userscripts-mirror.org/scripts/source/107941.user.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.13.1/underscore-min.js
// @updateURL    https://github.com/MentalGravis/moodlePlus/releases/latest/download/moodlePlus.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    jQuery(document).ready(function(){

        /* Maybe later on...
        // const openButton = document.createElement('button');
        // openButton.textContent = 'Terc-PLUS menü';
        // openButton.style.display = 'block';
        // openButton.style.position = 'fixed';
        // openButton.style.top = '10px';
        // openButton.style.left = '10px';
        // openButton.style.height = '30px';
        // //openButton.style.fontSize = '14px';
        // openButton.style.color = 'white';
        // openButton.style.borderRadius = '0px';
        // openButton.style.cursor = 'pointer';
        // openButton.style.zIndex = '9998'; // Set a high z-index value for the button
        // openButton.style.border = 'none';
        // openButton.style.backgroundColor = '#14458e';
        // document.body.append(openButton);*/ // A button

        /* Path of the vagiate bar
        // document.querySelectorAll("#page-navbar > nav > ol > li")
        //
        // Path of the question
        // document.querySelector("#responseform > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3)").innerText
        // Shorter, but idk about it reliabilility
        // document.querySelector("div.qtext").innerText

        // Path for answers
        // document.querySelectorAll("#responseform > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div").forEach(function(element){console.log(element.children[1].children[1].innerText)})
        // Shorter, but idk about it reliabilility
        // document.querySelectorAll("div.answer > div").forEach(function(element){console.log(element.children[1].children[1].innerText)})*/ // Paths for things


        function gmKeyGenerator () {                // Generates a key for GM storage, basically reads elements of the top menu bar which is the path of the test in the moodle side, and mash them together making a unique key (hopefully)
            var gmkey = ""; // Will be the key for GM_setValue
            document.querySelectorAll("#page-navbar > nav > ol > li").forEach(function(element){if(element.children[0]){gmkey+=element.children[0].innerText}});
            // console.log(gmkey);
            return gmkey;
        }

        function answerColl () {                    // Gets the answer content, and makes a dictionary for the possibility to mark right and wrong answers (default to false)
            let answerList = [];
            document.querySelectorAll("div.answer > div").forEach(function(element){answerList.push(element.children[1].children[1].innerText)});

            let answerDict = {};
            answerList.forEach(function(element){answerDict[element] = false});

            return answerDict;
        }

        function questionGen () {                   // Gets the question textContent
            let question = document.querySelector("div.qtext").innerText;
            return question;
        }


        function gmValueGenerator (){               // Creates a dictionary with key as question and value as dictionary which contains answers and if they are good or not
            let question = questionGen();

            let answerDict = answerColl();

            let packedQuestion = {};
            packedQuestion[question] = answerDict;

            return packedQuestion;
        }

        function gmSetValue (dictToStringify){      // Adds a dictionary JSON.stringify form to the GM storage on the relevant key
            // GM_setValue(gmKeyGenerator(), JSON.stringify(dictToStringify));
            GM_setValue(gmKeyGenerator(), dictToStringify);
        }

        function gmGenerator (){                    // Adds the packedQuestion to the relevant key
            let packedQuestion = gmValueGenerator();
            gmSetValue(packedQuestion);
        }

        function openPackedQ (){                    // Reads the GM storage and returns the relevant question-answer dictionary for the tests
            let gotBackFromGM = GM_getValue(gmKeyGenerator(), false);
            // return JSON.parse(gotBackFromGM);
            return gotBackFromGM;
        }

        function pushNewQuestion (questionDict) {   // Adds the question + answers to the right GM key slot
            let allQuestions = questionDict;
            let actualQuestion = gmValueGenerator();

            allQuestions[Object.keys(actualQuestion)[0]] = Object.values(actualQuestion)[0];

            gmSetValue(allQuestions);
        }

        var isAlreadyStored = GM_getValue(gmKeyGenerator(), false);

        if(isAlreadyStored){                        // Logic of the storage (still in dev)
            let testAllQuestions = openPackedQ();
            let actualQuestion = questionGen()
            // console.log(testAllQuestions);

            if(testAllQuestions[actualQuestion]){
                // console.log("Already in there");
            }else{
                pushNewQuestion(testAllQuestions);
            }

            // console.log(testAllQuestions)
        }else{
            gmGenerator();
        }

        // GM_setClipboard(questionGen(),"text");



        /*------------  Get back  ---------------*/

        var question = questionGen();
        var allQuestionAnswer = openPackedQ()

        if(allQuestionAnswer[question]){
            let answerToCurrentQuestion = _.invert(allQuestionAnswer[question])[true]

            // console.log(answerToCurrentQuestion);
            if(answerToCurrentQuestion){
                document.querySelectorAll(".answer > div").forEach((element) => {
                    if(element.children[1].children[1].innerText==answerToCurrentQuestion){
                        element.style.backgroundColor = "#49be25";
                        element.children[0].click();
                    }
                })
            }
        }
    });
})()